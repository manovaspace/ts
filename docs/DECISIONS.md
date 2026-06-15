# Documentation site decisions

## Approved (2026-07-16)

| Decision | Choice |
| --- | --- |
| **Generator** | [Astro Starlight](https://starlight.astro.build/) |
| **Phase A URL** | `https://manovaspace.github.io/ts/` (GitHub **project** Pages from `manovaspace/ts`) |
| **Phase B URL** | `https://manovaspace.github.io/` (org landing — deferred until second public repo) |
| **Custom domain** | Deferred (`docs.manovaspace.dev` optional in Phase C) |

## Rationale

- Starlight: professional OSS defaults, search, low maintenance vs Next/Fumadocs for four small packages
- Project Pages first: ships with the monorepo; org site comes when `manovaspace/go` exists

Full generator comparison and migration triggers: Manova workspace [`docs/manovaspace/DOCUMENTATION-SITE.md`](../../../docs/manovaspace/DOCUMENTATION-SITE.md) *(staff planning doc — not published to Pages)*.

## Implementation

See [DOCUMENTATION-SITE.md](./DOCUMENTATION-SITE.md) for Phases A–C.

**FT-004 / MS-FT-004:** `done` — live at [manovaspace.github.io/ts](https://manovaspace.github.io/ts/) after Pages enabled.
