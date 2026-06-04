import { createHash, randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createSerwistRoute as createSerwistRouteBase, withSerwist } from "@serwist/turbopack";

export { withSerwist };

export type SerwistRouteOptions = {
  swSrc?: string;
  revision?: string;
  offlineUrl?: string;
  useNativeEsbuild?: boolean;
};

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export function resolvePwaRevision(explicit?: string): string {
  return (
    explicit ??
    process.env.PWA_REVISION ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    randomUUID()
  );
}

export function resolveDefaultSwSrc(): string {
  return join(packageRoot, "sw", "default.js");
}

export function createSerwistRoute(options: SerwistRouteOptions = {}) {
  const offlineUrl = options.offlineUrl ?? "/~offline";
  const revision = resolvePwaRevision(options.revision);

  return createSerwistRouteBase({
    swSrc: options.swSrc ?? resolveDefaultSwSrc(),
    useNativeEsbuild: options.useNativeEsbuild ?? true,
    additionalPrecacheEntries: [{ url: offlineUrl, revision }],
  });
}

/** ponytail: stable revision from a deploy id without shelling out to git */
export function revisionFromDeployId(deployId: string): string {
  return createHash("sha256").update(deployId).digest("hex").slice(0, 12);
}
