"use client";

import {
  Badge,
  Button,
  DataValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useDirection,
} from "@manovaspace/ui";
import { useEffect, useRef, useState } from "react";
import type {
  ApiVersionMetadata,
  SystemVersionPlacement,
  WebVersionIdentity,
} from "../types";
import {
  buildSystemInfoClipboardJson,
  fetchApiVersion,
  formatVisibleVersion,
} from "../version-info";
import { resolveWebVersionIdentity } from "../web-version-identity";

export interface SystemVersionLabels {
  version: string;
  openDetails: string;
  dialogTitle: string;
  webFrontend: string;
  apiBackend: string;
  versionField: string;
  buildIdField: string;
  builtAtField: string;
  contractVersionField: string;
  apiUnavailable: string;
  copySystemInfo: string;
  copied: string;
  copyFailed: string;
  close: string;
}

export interface SystemVersionProps {
  placement?: SystemVersionPlacement;
  apiEndpoint?: string;
  /** Fetch on mount by default; set true to fetch only while the details dialog is open. */
  fetchOnOpen?: boolean;
  packageVersion?: string;
  locale?: string;
  /** @deprecated Prefer `locale` for locale-aware digits. */
  persianDigits?: boolean;
  dir?: "ltr" | "rtl";
  labels?: Partial<SystemVersionLabels>;
  className?: string;
}

const defaultLabels: SystemVersionLabels = {
  version: "Version",
  openDetails: "View system version and build information",
  dialogTitle: "System version and build information",
  webFrontend: "Web frontend",
  apiBackend: "API backend",
  versionField: "Version:",
  buildIdField: "Build ID:",
  builtAtField: "Built at:",
  contractVersionField: "Contract:",
  apiUnavailable: "The API is unavailable or starting up.",
  copySystemInfo: "Copy system information",
  copied: "Copied",
  copyFailed: "Could not copy system information",
  close: "Close",
};

function placementClassName(
  placement: SystemVersionPlacement,
  className?: string,
): string {
  const base = (() => {
    if (placement === "root") {
      return "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/85 px-4 py-2 text-center backdrop-blur-sm supports-[backdrop-filter]:bg-background/70 motion-reduce:backdrop-blur-none";
    }
    if (placement === "rail") {
      return "shrink-0 border-t border-border px-3 py-2 flex justify-center";
    }
    if (placement === "mobile") {
      return "shrink-0 border-t border-border px-4 py-3 flex justify-center";
    }
    return "inline-flex items-center";
  })();

  return className ? `${base} ${className}` : base;
}

export function SystemVersion({
  placement = "rail",
  apiEndpoint = "/api/v1/meta/version",
  fetchOnOpen = false,
  packageVersion = "0.0.0",
  locale = "en-US",
  persianDigits,
  dir: dirOverride,
  labels: labelOverrides,
  className,
}: SystemVersionProps) {
  const contextDir = useDirection();
  const dir = dirOverride ?? contextDir;
  const labels = { ...defaultLabels, ...labelOverrides };
  const [webIdentity] = useState<WebVersionIdentity>(() =>
    resolveWebVersionIdentity({ packageVersion }),
  );
  const [apiMeta, setApiMeta] = useState<ApiVersionMetadata>({
    status: "unavailable",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (fetchOnOpen && !isOpen) return;

    const controller = new AbortController();
    void fetchApiVersion(apiEndpoint, controller.signal).then((metadata) => {
      if (!controller.signal.aborted) setApiMeta(metadata);
    });

    return () => controller.abort();
  }, [apiEndpoint, fetchOnOpen, isOpen]);

  useEffect(
    () => () => {
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyState("failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        buildSystemInfoClipboardJson(webIdentity, apiMeta),
      );
      setCopyState("copied");
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
      copyResetTimer.current = setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
    }
  };

  const legacyVisibleVersion =
    persianDigits === undefined
      ? undefined
      : formatVisibleVersion(webIdentity.version, persianDigits);
  const visibleVersion = legacyVisibleVersion ?? webIdentity.version;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div dir={dir} className={placementClassName(placement, className)}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto cursor-pointer gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground shadow-none transition-colors hover:bg-muted/50 hover:text-foreground"
            aria-label={`${labels.openDetails}: ${visibleVersion}`}
          >
            <span className="font-sans text-[11px]">{labels.version}</span>
            {legacyVisibleVersion === undefined ? (
              <DataValue
                value={webIdentity.version}
                locale={locale}
                dir="ltr"
                className="text-[11px] font-semibold tabular-nums text-foreground"
              />
            ) : (
              <span className="font-data text-[11px] font-semibold tabular-nums text-foreground">
                {legacyVisibleVersion}
              </span>
            )}
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-success"
            />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent
        dir={dir}
        className="max-h-[min(90vh,48rem)] space-y-4 overflow-y-auto [&_[data-slot=dialog-close]]:hidden"
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-base">
              {labels.dialogTitle}
            </DialogTitle>
            <Badge
              variant="outline"
              className="text-[10px] font-mono uppercase"
            >
              {webIdentity.environment}
            </Badge>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsOpen(false)}
            aria-label={labels.close}
          >
            <span aria-hidden="true">×</span>
          </Button>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {labels.openDetails}
        </DialogDescription>

        <div className="space-y-3 text-xs">
          <section
            className="space-y-1.5 rounded-lg bg-muted/40 p-3 font-mono"
            dir="ltr"
            aria-label={labels.webFrontend}
          >
            <h3 className="font-sans font-semibold text-muted-foreground">
              {labels.webFrontend}
            </h3>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                {labels.versionField}
              </span>
              <DataValue
                value={webIdentity.version}
                locale={locale}
                dir="ltr"
                className="font-bold tabular-nums"
              />
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                {labels.buildIdField}
              </span>
              <DataValue
                value={webIdentity.buildId}
                locale={locale}
                dir="ltr"
              />
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                {labels.builtAtField}
              </span>
              <DataValue
                value={webIdentity.builtAt}
                locale={locale}
                dir="ltr"
                className="text-[11px]"
              />
            </div>
          </section>

          <section
            className="space-y-1.5 rounded-lg bg-muted/40 p-3 font-mono"
            dir="ltr"
            aria-label={labels.apiBackend}
          >
            <h3 className="font-sans font-semibold text-muted-foreground">
              {labels.apiBackend}
            </h3>
            {apiMeta.status === "available" ? (
              <>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {labels.versionField}
                  </span>
                  <DataValue
                    value={apiMeta.identity.version}
                    locale={locale}
                    dir="ltr"
                    className="font-bold tabular-nums"
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {labels.buildIdField}
                  </span>
                  <DataValue
                    value={apiMeta.identity.buildId}
                    locale={locale}
                    dir="ltr"
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {labels.contractVersionField}
                  </span>
                  <DataValue
                    value={apiMeta.identity.contractVersion}
                    locale={locale}
                    dir="ltr"
                    className="tabular-nums"
                  />
                </div>
              </>
            ) : (
              <p className="font-sans italic text-muted-foreground">
                {labels.apiUnavailable}
              </p>
            )}
          </section>
        </div>

        <DialogFooter className="flex-row justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copyState === "copied"
              ? labels.copied
              : copyState === "failed"
                ? labels.copyFailed
                : labels.copySystemInfo}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            {labels.close}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
