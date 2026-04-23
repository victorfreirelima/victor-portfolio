import {migrateToLanguageField} from 'sanity-plugin-internationalized-array/migrations'

// The v6 format migration operates on translation metadata AND anywhere internationalized arrays exist
const DOCUMENT_TYPES: string[] = ['translation.metadata', 'siteSettings', 'project', 'philosophy', 'timeline', 'contact']

export default migrateToLanguageField(DOCUMENT_TYPES)
