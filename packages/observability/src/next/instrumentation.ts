import { initObservability } from "../index.js";

export type NextInstrumentationOptions = {
  serviceName: string;
};

/**
 * Register Next.js instrumentation hook for Sentry.
 */
export async function registerNextInstrumentation(
  options: NextInstrumentationOptions,
): Promise<void> {
  await initObservability({
    serviceName: options.serviceName,
    environment: process.env.NODE_ENV,
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}
