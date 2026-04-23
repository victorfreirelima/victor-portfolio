'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.documentList()
                  .title('Site Settings')
                  .id('siteSettings-list')
                  .schemaType('siteSettings')
                  .filter('_type == "siteSettings"')
              ),
            S.divider(),
            S.listItem()
              .title('Projects')
              .child(
                S.documentList()
                  .title('Projects')
                  .id('projects-list')
                  .schemaType('project')
                  .filter('_type == "project"')
                  .child(id => 
                    S.document()
                      .documentId(id)
                      .schemaType('project')
                      .views([S.view.form()])
                  )
              ),
            S.listItem()
              .title('Philosophy')
              .child(
                S.documentList()
                  .title('Philosophy')
                  .id('philosophy-list')
                  .schemaType('philosophy')
                  .filter('_type == "philosophy"')
              ),
            S.listItem()
              .title('Timeline')
              .child(
                S.documentList()
                  .title('Timeline')
                  .id('timeline-list')
                  .schemaType('timeline')
                  .filter('_type == "timeline"')
              ),
            S.listItem()
              .title('Contact')
              .child(
                S.documentList()
                  .title('Contact')
                  .id('contact-list')
                  .schemaType('contact')
                  .filter('_type == "contact"')
              ),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        return S.document().views([S.view.form()])
      }
    })
  ],
})
