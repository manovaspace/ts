import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const ms = (pkg) => `link:../../../manovaspace/ts/packages/${pkg}`;
const msFromOrbitApp = (pkg) =>
  `link:../../../../manovaspace/ts/packages/${pkg}`;

const targets = [
  {
    path: "orbit/orbit-frontend/apps/template/package.json",
    links: {
      "@manovaspace/observability": msFromOrbitApp("observability"),
      "@manovaspace/pwa": msFromOrbitApp("pwa"),
      "@manovaspace/tsconfig": msFromOrbitApp("tsconfig"),
      "@manovaspace/tokens": msFromOrbitApp("tokens"),
      "@manovaspace/ui": msFromOrbitApp("ui"),
      "@manovaspace/devtools": msFromOrbitApp("devtools"),
    },
  },
  {
    path: "orbit/orbit-frontend/apps/storybook/package.json",
    links: {
      "@manovaspace/tsconfig": msFromOrbitApp("tsconfig"),
      "@manovaspace/tokens": msFromOrbitApp("tokens"),
      "@manovaspace/ui": msFromOrbitApp("ui"),
      "@manovaspace/devtools": msFromOrbitApp("devtools"),
    },
  },
  {
    path: "orbit/orbit-frontend/packages/data/package.json",
    links: {
      "@manovaspace/tsconfig": msFromOrbitApp("tsconfig"),
    },
  },
  {
    path: "clients/kaazhe/frontend/package.json",
    links: {
      "@manovaspace/pwa": ms("pwa"),
      "@manovaspace/tsconfig": ms("tsconfig"),
      "@manovaspace/tokens": ms("tokens"),
      "@manovaspace/ui": ms("ui"),
    },
  },
  {
    path: "clients/jtash/frontend/package.json",
    links: {
      "@manovaspace/markdown": ms("markdown"),
      "@manovaspace/tsconfig": ms("tsconfig"),
      "@manovaspace/tokens": ms("tokens"),
      "@manovaspace/ui": ms("ui"),
    },
  },
  {
    path: "clients/manova/waypoint/package.json",
    links: {
      "@manovaspace/tsconfig": ms("tsconfig"),
      "@manovaspace/tokens": ms("tokens"),
      "@manovaspace/ui": ms("ui"),
    },
  },
  {
    path: "clients/manova/manova-frontend/package.json",
    links: {
      "@manovaspace/tsconfig": ms("tsconfig"),
      "@manovaspace/tokens": ms("tokens"),
      "@manovaspace/ui": ms("ui"),
    },
  },
];

for (const { path, links } of targets) {
  const file = join(workspaceRoot, path);
  const pkg = JSON.parse(readFileSync(file, "utf8"));

  for (const section of ["dependencies", "devDependencies", "peerDependencies"]) {
    const deps = pkg[section];
    if (!deps) continue;

    for (const [name, link] of Object.entries(links)) {
      if (deps[name]?.startsWith("^")) {
        deps[name] = link;
        console.log(`${path}: ${section}.${name} → ${link}`);
      }
    }
  }

  writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
}
