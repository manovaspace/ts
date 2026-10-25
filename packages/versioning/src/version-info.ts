import type {
  ApiVersionIdentity,
  ApiVersionMetadata,
  SystemInfoClipboardPayload,
  WebVersionIdentity,
} from "./types";

export function toPersianDigits(value: string | number): string {
  const str = String(value);
  const persianMap: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };
  return str.replace(/[0-9]/g, (w) => persianMap[w] ?? w);
}

export function formatVisibleVersion(
  version: string,
  persianize = true,
): string {
  if (!version) return "";
  return persianize ? toPersianDigits(version) : version;
}

export async function fetchApiVersion(
  url = "/api/v1/meta/version",
  signal?: AbortSignal,
): Promise<ApiVersionMetadata> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return { status: "unavailable" };
    const data = (await res.json()) as Partial<ApiVersionIdentity>;
    if (data?.service === "api" && data.version) {
      const environment =
        data.environment === "production" ||
        data.environment === "staging" ||
        data.environment === "development"
          ? data.environment
          : "development";
      return {
        status: "available",
        identity: {
          service: "api",
          version: String(data.version),
          buildId: String(data.buildId ?? "unknown"),
          builtAt: String(data.builtAt ?? ""),
          environment,
          contractVersion: String(data.contractVersion ?? "1.0.0"),
        },
      };
    }
    return { status: "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}

export function buildSystemInfoClipboardJson(
  web: WebVersionIdentity,
  api?: ApiVersionMetadata,
): string {
  const payload: SystemInfoClipboardPayload = {
    environment: web.environment,
    timestamp: new Date().toISOString(),
    web: {
      version: web.version,
      buildId: web.buildId,
      builtAt: web.builtAt,
    },
    ...(api?.status === "available"
      ? {
          api: {
            version: api.identity.version,
            buildId: api.identity.buildId,
            builtAt: api.identity.builtAt,
            contractVersion: api.identity.contractVersion,
          },
        }
      : {}),
  };
  return JSON.stringify(payload, null, 2);
}
