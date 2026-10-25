import type { PublicEnvironment, WebVersionIdentity } from "./types";

const DEV_BUILD_ID_FALLBACK = "local";
const DEV_BUILD_TIME_FALLBACK = "1970-01-01T00:00:00.000Z";

export interface ResolveIdentityOptions {
  packageVersion?: string;
  env?: {
    NEXT_PUBLIC_APP_VERSION?: string;
    NEXT_PUBLIC_BUILD_ID?: string;
    NEXT_PUBLIC_BUILD_TIME?: string;
    NEXT_PUBLIC_DEPLOY_ENV?: string;
    NODE_ENV?: string;
  };
}

export function resolvePublicEnvironment(
  deployEnv?: string,
  nodeEnv?: string,
): PublicEnvironment {
  if (
    deployEnv === "production" ||
    deployEnv === "staging" ||
    deployEnv === "development"
  ) {
    return deployEnv;
  }
  if (nodeEnv === "production") return "production";
  if (nodeEnv === "staging") return "staging";
  return "development";
}

export function resolveWebVersionIdentity(
  options: ResolveIdentityOptions = {},
): WebVersionIdentity {
  const env = options.env ?? {
    NEXT_PUBLIC_APP_VERSION:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_APP_VERSION
        : undefined,
    NEXT_PUBLIC_BUILD_ID:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_BUILD_ID
        : undefined,
    NEXT_PUBLIC_BUILD_TIME:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_BUILD_TIME
        : undefined,
    NEXT_PUBLIC_DEPLOY_ENV:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEPLOY_ENV
        : undefined,
    NODE_ENV: typeof process !== "undefined" ? process.env.NODE_ENV : undefined,
  };
  const packageVersion = options.packageVersion ?? "0.0.0";

  const version = env.NEXT_PUBLIC_APP_VERSION?.trim() || packageVersion;
  const buildId = env.NEXT_PUBLIC_BUILD_ID?.trim() || DEV_BUILD_ID_FALLBACK;
  const builtAt = env.NEXT_PUBLIC_BUILD_TIME?.trim() || DEV_BUILD_TIME_FALLBACK;
  const environment = resolvePublicEnvironment(
    env.NEXT_PUBLIC_DEPLOY_ENV,
    env.NODE_ENV,
  );

  return Object.freeze({
    service: "web",
    version,
    buildId,
    builtAt,
    environment,
  });
}
