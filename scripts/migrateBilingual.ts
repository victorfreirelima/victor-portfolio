import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({
  projectId: 'hnwjteam',
  dataset: 'production',
  token: 'skkoBdvaTVc2qJe2UTamiAHTRKaN86o5xcYy6PJ6vIASQEmKpUrMrJGRmJtk2I9MJBQqPapK11MRNDaEa6',
  useCdn: false
})

async function migrateBilingual() {
  console.log('--- Migrating Sanity Translations to v5 Format with Auth ---')
  
  const metadataDocs = await client.fetch(`*[_type == "translation.metadata"]`)
  
  console.log(`Found ${metadataDocs.length} metadata documents.`);

  for (const doc of metadataDocs) {
    if (!doc.translations || !Array.isArray(doc.translations)) continue;

    console.log(`Migrating metadata document: ${doc._id}`);

    const newTranslations = doc.translations.map((t: any) => {
      if (t.language) return t; // Already migrated
      const lang = t._key;
      return {
        _key: Math.random().toString(36).substring(2, 10),
        value: t.value,
        language: lang
      };
    });

    const newDoc = {
      ...doc,
      translations: newTranslations
    };

    delete newDoc._createdAt;
    delete newDoc._updatedAt;
    delete newDoc._rev;

    try {
      await client.createOrReplace(newDoc);
      console.log(`✅ successfully migrated: ${doc._id}`);
    } catch (e) {
      console.error(`❌ failed to migrate: ${doc._id}`, e);
    }
  }

  // Also check if any project, siteSettings have a "translations" field locally
  const looseDocs = await client.fetch(`*[defined(translations) && _type != "translation.metadata"]{_id, _type, translations}`)
  console.log(`Found ${looseDocs.length} documents with loose translations fields.`);

  console.log('--- Migration Finished ---')
}

migrateBilingual();
