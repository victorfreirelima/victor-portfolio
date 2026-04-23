import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function check() {
  const data = await client.fetch(`*[_type in ["project", "siteSettings"] && language == "en"]{_id, _type, "slug": slug.current, title, heroImage}`)
  console.log(JSON.stringify(data, null, 2))
}
check()
