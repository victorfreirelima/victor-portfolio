import { getCliClient } from 'sanity/cli'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = getCliClient()

async function dumpAll() {
  const docs = await client.fetch(`*[defined(translations)] {_id, _type, translations}`)
  console.log("Documents with translations defined:", docs.length)
  const docsNotNull = docs.filter((d: any) => d.translations !== null)
  console.log("Documents with translations NOT null:", docsNotNull.length)
  if (docsNotNull.length > 0) {
      console.log(JSON.stringify(docsNotNull, null, 2))
  }
}

dumpAll()
