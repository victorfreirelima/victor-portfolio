# Portfolio content review

This branch prepares a bilingual editorial revision based on Victor's résumé and confirmed contribution to Soficom Cloud. It preserves the existing project URLs, document IDs and screenshots. The Soficom case uses an explicitly labelled explanatory diagram because the repository's old Soficom mockups depict unrelated infrastructure monitoring.

## Preview

Vercel preview deployments automatically display `content/portfolio-review.json` over the published CMS data. Set `PORTFOLIO_CONTENT_REVIEW=0` to inspect unchanged CMS content, or `PORTFOLIO_CONTENT_REVIEW=1` for a local review build. Production deployments continue to use Sanity; there is no production content override.

```bash
npm ci
PORTFOLIO_CONTENT_REVIEW=1 npm run dev
```

Review `/pt-br`, `/en`, and all seven project routes in each language. The résumé has not been added to this public repository. The download button remains hidden until Victor explicitly authorizes a public destination and a `resumeUrl` is configured in Studio.

## Stage content in Sanity

```bash
node --env-file=.env.local scripts/reviewPortfolio.mjs
node --env-file=.env.local scripts/reviewPortfolio.mjs --drafts
```

The first command is a dry run and saves a local backup plus proposed documents in the ignored `.portfolio-review/` directory. The second requires `SANITY_API_WRITE_TOKEN` or `SANITY_API_TOKEN` in the environment and creates drafts only. It refuses to overwrite existing drafts and never publishes, patches or deletes published documents. It reads the configured project and dataset, defaulting to the existing `hnwjteam` / `production` configuration.

After reviewing the preview, deploy the schema/rendering changes and review and publish the drafts in Sanity Studio. Do not assume merging the code publishes the content revision. Production content changes only when the Sanity documents are published.

The six existing case studies retain only interface descriptions and contribution summaries. Unverified metrics and technical guarantees are removed from the review. The Soficom improvement is identified as implemented based on Victor's confirmation. Real Soficom screenshots can be added later through Studio.

## Validation

```bash
node --test tests/portfolio-review.test.mjs
npx tsc --noEmit
PORTFOLIO_CONTENT_REVIEW=1 npm run build
```

The repository-wide lint command has pre-existing errors, mainly explicit `any` types in legacy components and scripts. Keep those separate from this content release.
