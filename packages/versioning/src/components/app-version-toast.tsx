"use client";

import { Button } from "@manovaspace/ui";
import { useAppVersionUpdate } from "../use-app-version-update";
import { toPersianDigits } from "../version-info";

export interface AppVersionToastLabels {
  updateAvailable?: string;
  reloadNow?: string;
  dismiss?: string;
  versionLabel?: string;
}

export interface AppVersionToastProps {
  apiEndpoint?: string;
  pollIntervalMs?: number;
  packageVersion?: string;
  locale?: "fa" | "en" | string;
  labels?: AppVersionToastLabels;
  className?: string;
}

export const DEFAULT_TOAST_LABELS_FA: Required<
  Omit<AppVersionToastLabels, "versionLabel">
> = {
  updateAvailable: "بروزرسانی جدید در دسترس است",
  reloadNow: "بارگذاری مجدد",
  dismiss: "بعداً",
};

export const DEFAULT_TOAST_LABELS_EN: Required<
  Omit<AppVersionToastLabels, "versionLabel">
> = {
  updateAvailable: "A new version is available",
  reloadNow: "Reload now",
  dismiss: "Later",
};

export function formatToastVersionLabel(
  version: string,
  locale?: string,
): string {
  if (!version) return "";
  const isEnglish = locale === "en" || locale?.startsWith("en-");
  return isEnglish ? version : toPersianDigits(version);
}

export function AppVersionToast({
  apiEndpoint,
  pollIntervalMs,
  packageVersion,
  locale = "fa",
  labels,
  className,
}: AppVersionToastProps) {
  const {
    isUpdateAvailable,
    isDismissed,
    newVersion,
    reloadApp,
    dismissUpdate,
  } = useAppVersionUpdate({
    apiEndpoint,
    pollIntervalMs,
    packageVersion,
  });

  if (!isUpdateAvailable || isDismissed) {
    return null;
  }

  const isEnglish = locale === "en" || locale?.startsWith("en-");
  const defaultLabels = isEnglish
    ? DEFAULT_TOAST_LABELS_EN
    : DEFAULT_TOAST_LABELS_FA;
  const resolvedLabels = {
    ...defaultLabels,
    ...labels,
  };

  const formattedVersion = newVersion
    ? formatToastVersionLabel(newVersion, locale)
    : null;
  const versionDisplay = formattedVersion
    ? resolvedLabels.versionLabel
      ? `${resolvedLabels.versionLabel} ${formattedVersion}`
      : formattedVersion
    : null;

  const baseClassName =
    "fixed bottom-6 start-6 z-50 flex max-w-md flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-2xl sm:flex-row sm:items-center animate-in fade-in slide-in-from-bottom-4 duration-200 motion-reduce:animate-none";
  const rootClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <div role="status" aria-live="polite" className={rootClassName}>
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium leading-normal">
          {resolvedLabels.updateAvailable}
        </p>
        {versionDisplay ? (
          <p className="text-xs text-muted-foreground font-mono">
            {versionDisplay}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto sm:ms-auto">
        <Button type="button" variant="ghost" size="sm" onClick={dismissUpdate}>
          {resolvedLabels.dismiss}
        </Button>
        <Button type="button" variant="default" size="sm" onClick={reloadApp}>
          {resolvedLabels.reloadNow}
        </Button>
      </div>
    </div>
  );
}
