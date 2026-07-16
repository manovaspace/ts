# Documentation site (GitHub Pages)

Planning doc for **FT-004** in [FUTURE-TRIGGERS.md](../FUTURE-TRIGGERS.md).  
Owner intent: **build a public docs site** — not urgent while package count is low.

## Goal

Professional public documentation for `@manovaspace/*` at a stable URL, discoverable from npm package pages and GitHub org profile.

## URL options

| URL | Setup | Best for |
| --- | --- | --- |
| `https://manovaspace.github.io/ts/` | GitHub Pages from **`manovaspace/ts`** repo (project site) | Docs tied to the monorepo; simplest first step |
| `https://manovaspace.github.io/` | Org site from **`manovaspace/manovaspace.github.io`** repo **or** org Pages from `main` | Multi-repo org landing + links to `ts`, future `go` |
| `https://docs.manovaspace.dev` (custom domain) | CNAME + DNS on GitHub Pages | Brand polish; add after content exists |

**Recommendation:** Start with **project site** `manovaspace.github.io/ts`, migrate to **org site** when `go` or a second TS repo ships.

## Generator options (most → least “professional OSS” in 2026)

### 1. Astro Starlight (recommended)

- **Pros:** Modern defaults, sidebar, search, i18n-ready, fast, MDX, used by many serious OSS projects
- **Cons:** Slightly more setup than VitePress
- **Fit:** Org-quality docs with room to grow

```
manovaspace/ts/
├── docs/              # Starlight content
├── packages/
└── astro.config.mjs
```

Deploy: GitHub Actions → `peaceiris/actions-gh-pages` or official Astro deploy action → `gh-pages` branch.

### 2. VitePress

- **Pros:** Lightweight, excellent for library reference, Vue ecosystem standard, very fast
- **Cons:** Vue-tinted (fine for TS libs)
- **Fit:** If you want minimal config and API-heavy pages

### 3. Docusaurus

- **Pros:** Battle-tested (Meta, many large projects), versioning, blog plugin
- **Cons:** Heavier, React-only, more boilerplate for a 4-package monorepo
- **Fit:** 10+ packages or need doc versioning per major release

### 4. Next.js static export (Fumadocs)

- **Pros:** Same stack as `orbit-docs`; staff already know it
- **Cons:** Heavier than Starlight/VitePress for a tiny public site; overkill for MIT libs
- **Fit:** Only if you want to reuse orbit-docs components verbatim

### 5. README-only + GitHub wiki

- **Pros:** Zero maintenance
- **Cons:** Not “professional” for an npm org you want adopters to trust
- **Fit:** Pre-FT-004 only

## Recommended path (professional, incremental)

### Phase A — Project Pages (1–2 days)

1. Add **Starlight** under `manovaspace/ts/docs/` (or `website/`)
2. Pages: Home, Getting started, one page per package (sync from package README)
3. Workflow `.github/workflows/docs.yml` — build on `main`, deploy to `gh-pages`
4. Enable Pages: repo Settings → Pages → deploy from `gh-pages`
5. Link from root `README.md` and each `package.json` `homepage` → `https://manovaspace.github.io/ts/`

### Phase B — Org landing (when `go` or 2+ repos)

1. Create `manovaspace.github.io` repo with org overview + package grid
2. Cross-link `ts`, `go`, npm org
3. Optional custom domain

### Phase C — Polish

- npm package `homepage` → doc site per package
- Search (Starlight built-in)
- “Edit this page” → GitHub link
- CI: fail if doc links break

## What not to do

- Duplicate **staff** `orbit-docs` on public Pages (VPN URLs, proprietary ADRs)
- Publish **client** or **@orbit/** proprietary content
- Stand up Docusaurus for four small READMEs before FT-004 triggers

## Trigger (reminder)

Agents: fire **FT-004** when implementing this file’s Phase A **or** when trigger conditions in `FUTURE-TRIGGERS.md` match. Notify the user before building.
