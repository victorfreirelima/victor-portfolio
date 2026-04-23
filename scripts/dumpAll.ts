import { getCliClient } from 'sanity/cli'
import * as dotenv from 'dotenv'
import fs from 'fs'
dotenv.config({ path: '.env.local' })

const client = getCliClient()

async function dumpAll() {
  const docs = await client.fetch(`*[] {_id, _type, translations, language, __i18n_refs}`)
  fs.writeFileSync('allDocs.json', JSON.stringify(docs, null, 2))
}

dumpAll()
