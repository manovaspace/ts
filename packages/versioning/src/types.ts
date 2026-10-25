export type PublicEnvironment = "development" | "staging" | "production";

export type SystemVersionPlacement = "root" | "rail" | "mobile" | "inline";

export interface WebVersionIdentity {
  readonly service: "web";
  readonly version: string;
  readonly buildId: string;
  readonly builtAt: string;
  readonly environment: PublicEnvironment;
}

export interface ApiVersionIdentity {
  readonly service: "api";
  readonly version: string;
  readonly buildId: string;
  readonly builtAt: string;
  readonly environment: PublicEnvironment;
  readonly contractVersion: string;
}

export type ApiVersionMetadata =
  | { status: "available"; identity: ApiVersionIdentity }
  | { status: "unavailable" };

export type SystemInfoClipboardPayload = {
  environment: PublicEnvironment;
  timestamp: string;
  web: {
    version: string;
    buildId: string;
    builtAt: string;
  };
  api?: {
    version: string;
    buildId: string;
    builtAt: string;
    contractVersion: string;
  };
};

export interface UseAppVersionUpdateOptions {
  apiEndpoint?: string;
  pollIntervalMs?: number;
  staleTimeMs?: number;
  packageVersion?: string;
  storageKey?: string;
  enabled?: boolean;
}

export interface UseAppVersionUpdateResult {
  isUpdateAvailable: boolean;
  currentVersion: string;
  currentBuildId: string;
  newVersion: string | null;
  newBuildId: string | null;
  newBuiltAt: string | null;
  isDismissed: boolean;
  reloadApp: () => void;
  dismissUpdate: () => void;
  notifyRemoteBuildId: (
    buildId: string,
    version?: string,
    builtAt?: string,
  ) => void;
}
