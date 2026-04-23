import { type SchemaTypeDefinition } from 'sanity'

import siteSettings from './siteSettings'
import project from './project'
import philosophy from './philosophy'
import timeline from './timeline'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, project, philosophy, timeline, contact],
}
