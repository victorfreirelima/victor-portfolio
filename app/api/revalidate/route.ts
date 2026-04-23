import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Sanity Webhook → On-demand revalidation
 *
 * Register this URL in your Sanity project:
 *   https://www.sanity.io/manage → API → Webhooks
 *   URL: https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Trigger on: create, update, delete
 *   Filter: _type in ["project", "siteSettings", "philosophy", "timeline", "contact"]
 *
 * Locally you can test it with:
 *   curl -X POST "http://localhost:3000/api/revalidate?secret=local-dev-secret"
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  // In production, always require a matching secret.
  // In development, allow a missing secret for easy local testing.
  if (process.env.NODE_ENV === 'production') {
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
  }

  try {
    // Parse the Sanity webhook payload to get the affected document type / slug
    let body: { _type?: string; slug?: { current?: string }; language?: string } = {}
    try {
      body = await request.json()
    } catch {
      // Body is optional; revalidate everything if it can't be parsed
    }

    const docType = body._type
    const slug = body.slug?.current
    const lang = body.language

    // Revalidate specific paths based on document type
    if (docType === 'project' && slug) {
      // Revalidate both language variants of the specific project page
      const langs = lang ? [lang] : ['en', 'pt-br']
      for (const l of langs) {
        revalidatePath(`/${l}/projects/${slug}`)
      }
      // Also revalidate homepage (project card may have changed)
      revalidatePath('/en', 'page')
      revalidatePath('/pt-br', 'page')
    } else if (docType === 'siteSettings') {
      // Site-wide settings affect every page
      revalidatePath('/', 'layout')
    } else {
      // For all other types (philosophy, timeline, contact) or unknown, blast all pages
      revalidatePath('/en', 'page')
      revalidatePath('/pt-br', 'page')
    }

    return NextResponse.json({ revalidated: true, docType, slug, lang, now: Date.now() })
  } catch (err) {
    console.error('[revalidate] Error:', err)
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}
