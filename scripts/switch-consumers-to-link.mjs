import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const targets = [
  {
    path: "orbit/orbit-frontend/apps/template/package.json",
    links: {
      "@manovaspace/observability": "link:../../../../manovaspace/ts/packages/observability",
      "@manovaspace/pwa": "link:../../../../manovaspace/ts/packages/pwa",
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "orbit/orbit-frontend/apps/storybook/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "orbit/orbit-frontend/packages/ui/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "orbit/orbit-frontend/packages/tokens/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "orbit/orbit-frontend/packages/data/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "orbit/orbit-frontend/packages/devtools/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "clients/kaazhe/frontend/package.json",
    links: {
      "@manovaspace/pwa": "link:../../../manovaspace/ts/packages/pwa",
      "@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "clients/jtash/frontend/package.json",
    links: {
      "@manovaspace/markdown": "link:../../../manovaspace/ts/packages/markdown",
      "@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "clients/manova/waypoint/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig",
    },
  },
  {
    path: "clients/manova/manova-frontend/package.json",
    links: {
      "@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig",
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
