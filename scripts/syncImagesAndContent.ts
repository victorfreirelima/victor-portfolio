import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hnwjteam',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-26',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN // Requires write token!
})

// Since we fallback to token in env, let's verify we have it.
if (!client.config().token) {
  console.warn("No SANITY_API_WRITE_TOKEN found in env. If patches fail, this is why.");
}

const STATIC_IMAGES: Record<string, string> = {
  'slicecom': '/cs-slicecom-hero.png',
  'sabesp': '/sabesp/login-siga-modulo-tac.png',
  'sigaf': '/sigaf/inicio-cgesc.png',
  'metro': '/metro/login.png',
  'myphone': '/myphone/home.png',
  'castforme': '/castforme/dashboard.png',
  // Defaults for others as they are not mapped explicitly in page.tsx fallback
  'soficom-cloud': '/cs-slicecom-hero.png', // Arbitrary safe fallback if they don't have one
  'invoicecon': '/cs-slicecom-hero.png',
  'cartao-sim': '/cs-slicecom-hero.png',
};

async function main() {
  const projects = await client.fetch(`*[_type == "project"] { _id, slug }`);
  console.log(`Found ${projects.length} projects to sync.`);
  
  for (const project of projects) {
    if (!project.slug?.current) continue;
    const slug = project.slug.current;
    
    // We only have the first 6 mapped exactly in page.tsx, the rest we can safely assign defaults.
    // The previous implementation of t.projectsGrid.projects.map was just a blind array of 6 images anyway !!
    // Wait, the translations array had 9 projects but only 6 images! This is why it was fundamentally broken.
    const mappedImage = STATIC_IMAGES[slug] || '/cs-slicecom-hero.png';
    const mappedHero = STATIC_IMAGES[slug] || '/cs-slicecom-hero.png';
    
    try {
      console.log(`Patching ${project._id} (slug: ${slug}) with image: ${mappedImage}`);
      await client.patch(project._id)
        .setIfMissing({ staticImageFallback: mappedImage })
        .set({ staticImageFallback: mappedImage })
        .commit();
        
      // Patch case study object too, safely
      await client.patch(project._id)
        .setIfMissing({ "caseStudy.staticHeroImageFallback": mappedHero })
        .commit();
        
    } catch (e) {
      console.error(`Failed patching ${project._id}:`, e);
    }
  }
  
  console.log("Image Sync Complete!");
}

main().catch(console.error);
