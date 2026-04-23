import { getCliClient } from 'sanity/cli'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = getCliClient()

async function dump() {
  const docs = await client.fetch(`*[_type == "siteSettings"]`)
  console.log(JSON.stringify(docs, null, 2))
}

dump()
