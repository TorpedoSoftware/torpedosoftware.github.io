# torpedosoftware.llc

The Torpedo Software company website. Built as a static SPA on React, Vite, and Tailwind, with all content authored as YAML so updates do not require touching code.

## Updating content

All site data lives in `src/content/`. To add or change something, edit the matching YAML file and commit. The site redeploys on push to `main`.

| Section                   | File                        |
| ------------------------- | --------------------------- |
| Site metadata / socials   | `src/content/site.yaml`     |
| About / mission / pillars | `src/content/about.yaml`    |
| Team members              | `src/content/team.yaml`     |
| Projects                  | `src/content/projects.yaml` |
| Careers / open roles      | `src/content/careers.yaml`  |

Content is validated at build time against the Zod schemas in `src/content/schemas.ts`, so a malformed file fails the build rather than shipping broken data. Images live in `public/` (e.g. `public/team/`, `public/projects/`, `public/brand/`).

## Local development

Requires Node 20+ and Yarn.

```bash
yarn install
yarn dev          # Vite dev server
yarn test         # Vitest
yarn validate     # format check, lint, typecheck, tests
yarn build        # production build into dist/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The repository's **Pages → Source** must be set to **GitHub Actions**. The custom domain is configured via `public/CNAME` (copied into `dist/` on build), and a `404.html` fallback lets client-side routes resolve.

## Tech

React 19, Vite 6, TypeScript, Tailwind v4, Radix UI primitives, react-router 7. Content is bundled at build time, so the deployed site is a static page with no backend.
