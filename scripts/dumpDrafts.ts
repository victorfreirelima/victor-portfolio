import { getCliClient } from 'sanity/cli'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = getCliClient()

async function dumpDrafts() {
  const docs = await client.fetch(`*[ _id in path("drafts.translation.**") || _id in path("drafts.**") ] {_id, _type}`)
  const metadataDrafts = docs.filter((d: any) => d._id.includes('translation.metadata'))
  console.log("Found metadata drafts:", metadataDrafts)
}

dumpDrafts()
