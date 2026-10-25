"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  UseAppVersionUpdateOptions,
  UseAppVersionUpdateResult,
} from "./types";
import { fetchApiVersion } from "./version-info";
import { resolveWebVersionIdentity } from "./web-version-identity";

export const DEFAULT_API_ENDPOINT = "/api/v1/meta/version";
export const DEFAULT_POLL_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
export const DEFAULT_STALE_TIME_MS = 2 * 60 * 1000; // 2 minutes
export const DEFAULT_STORAGE_KEY = "orbit.dismissed_update_build_id";

export interface ResolveUpdateAvailableParams {
  localBuildId: string;
  localEnvironment?: string;
  remoteBuildId: string;
}

export function resolveUpdateAvailable({
  localBuildId,
  localEnvironment,
  remoteBuildId,
}: ResolveUpdateAvailableParams): boolean {
  if (!remoteBuildId || remoteBuildId === "unknown") return false;
  if (!localBuildId) return false;
  if (localBuildId === "local" && localEnvironment === "development")
    return false;
  return localBuildId !== remoteBuildId;
}

export function useAppVersionUpdate(
  options: UseAppVersionUpdateOptions = {},
): UseAppVersionUpdateResult {
  const {
    apiEndpoint = DEFAULT_API_ENDPOINT,
    pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
    staleTimeMs = DEFAULT_STALE_TIME_MS,
    storageKey = DEFAULT_STORAGE_KEY,
    packageVersion,
    enabled = true,
  } = options;

  const localIdentity = useMemo(
    () => resolveWebVersionIdentity({ packageVersion }),
    [packageVersion],
  );

  const [remoteBuildId, setRemoteBuildId] = useState<string | null>(null);
  const [remoteVersion, setRemoteVersion] = useState<string | null>(null);
  const [remoteBuiltAt, setRemoteBuiltAt] = useState<string | null>(null);
  const [dismissedBuildId, setDismissedBuildId] = useState<string | null>(null);

  const lastCheckRef = useRef<number>(0);

  // Read dismissed build ID from sessionStorage once mounted
  useEffect(() => {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    try {
      const stored = window.sessionStorage.getItem(storageKey);
      if (stored) {
        setDismissedBuildId(stored);
      }
    } catch {
      // Ignore storage read errors (e.g. sandboxed iframe or private browsing)
    }
  }, [storageKey]);

  const notifyRemoteBuildId = useCallback(
    (buildId: string, version?: string, builtAt?: string) => {
      if (!buildId) return;
      setRemoteBuildId(buildId);
      if (version !== undefined) {
        setRemoteVersion(version);
      }
      if (builtAt !== undefined) {
        setRemoteBuiltAt(builtAt);
      }
    },
    [],
  );

  const check = useCallback(async () => {
    if (!enabled) return;
    lastCheckRef.current = Date.now();
    try {
      const metadata = await fetchApiVersion(apiEndpoint);
      if (metadata.status === "available") {
        setRemoteBuildId(metadata.identity.buildId);
        setRemoteVersion(metadata.identity.version);
        setRemoteBuiltAt(metadata.identity.builtAt);
      }
    } catch {
      // Ignore network errors during background check
    }
  }, [apiEndpoint, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Trigger initial check
    void check();

    if (typeof window === "undefined") return;

    const handleFocus = () => {
      const now = Date.now();
      if (now - lastCheckRef.current >= staleTimeMs) {
        void check();
      }
    };

    window.addEventListener("focus", handleFocus);

    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (pollIntervalMs > 0) {
      intervalId = setInterval(() => {
        void check();
      }, pollIntervalMs);
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [check, enabled, pollIntervalMs, staleTimeMs]);

  const reloadApp = useCallback(() => {
    if (typeof window !== "undefined" && window.location) {
      window.location.reload();
    }
  }, []);

  const dismissUpdate = useCallback(() => {
    if (remoteBuildId) {
      setDismissedBuildId(remoteBuildId);
      if (typeof window !== "undefined" && window.sessionStorage) {
        try {
          window.sessionStorage.setItem(storageKey, remoteBuildId);
        } catch {
          // Ignore storage write errors
        }
      }
    }
  }, [remoteBuildId, storageKey]);

  const isUpdateAvailable = resolveUpdateAvailable({
    localBuildId: localIdentity.buildId,
    localEnvironment: localIdentity.environment,
    remoteBuildId: remoteBuildId ?? "",
  });

  const newBuildId = isUpdateAvailable ? remoteBuildId : null;
  const newVersion = isUpdateAvailable ? remoteVersion : null;
  const newBuiltAt = isUpdateAvailable ? remoteBuiltAt : null;
  const isDismissed = Boolean(
    newBuildId && dismissedBuildId && dismissedBuildId === newBuildId,
  );

  return {
    isUpdateAvailable,
    currentVersion: localIdentity.version,
    currentBuildId: localIdentity.buildId,
    newVersion,
    newBuildId,
    newBuiltAt,
    isDismissed,
    reloadApp,
    dismissUpdate,
    notifyRemoteBuildId,
  };
}

export type { UseAppVersionUpdateOptions, UseAppVersionUpdateResult };
