export type ObservabilityConfig = {
  serviceName: string;
  environment?: string;
  sentryDsn?: string;
  tracesSampleRate?: number;
};

const SENSITIVE_KEYS = [
  "otp",
  "password",
  "token",
  "authorization",
  "secret",
  "code",
];

function scrubValue(key: string, value: unknown): unknown {
  const lower = key.toLowerCase();
  if (SENSITIVE_KEYS.some((k) => lower.includes(k))) {
    return "[Redacted]";
  }
  return value;
}

function scrubObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = scrubObject(v as Record<string, unknown>);
    } else {
      out[k] = scrubValue(k, v);
    }
  }
  return out;
}

let initialized = false;

type SentryEvent = {
  request?: { headers?: Record<string, string> };
};

/**
 * Initialize client-side observability (Sentry). No-op when DSN is missing.
 * Call from Next.js instrumentation.ts via @manovaspace/observability/next.
 */
export async function initObservability(
  config: ObservabilityConfig,
): Promise<void> {
  if (initialized || !config.sentryDsn) {
    return;
  }

  try {
    const Sentry = (await import("@sentry/nextjs")) as unknown as {
      init: (opts: {
        dsn: string;
        environment?: string;
        tracesSampleRate?: number;
        beforeSend?: (event: SentryEvent) => SentryEvent;
      }) => void;
    };
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment ?? "development",
      tracesSampleRate: config.tracesSampleRate ?? 0.1,
      beforeSend(event: SentryEvent) {
        if (event.request?.headers) {
          event.request.headers = scrubObject(
            event.request.headers as Record<string, unknown>,
          ) as Record<string, string>;
        }
        return event;
      },
    });
    initialized = true;
  } catch {
    // @sentry/nextjs optional — apps without peer dep skip silently
  }
}

export { scrubObject, scrubValue };
