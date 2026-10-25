"use client";

import {
  SystemVersion as ConfigurableSystemVersion,
  type SystemVersionProps,
} from "./components/system-version";

const legacyLabels = {
  version: "نسخه",
  openDetails: "مشاهده اطلاعات و نسخه سیستم",
  dialogTitle: "مشخصات نسخه و بیلد سیستم",
  webFrontend: "بخش وب (Web Frontend):",
  apiBackend: "بخش سرور (API Backend):",
  versionField: "Version:",
  buildIdField: "Build SHA:",
  builtAtField: "Built At:",
  contractVersionField: "Contract:",
  apiUnavailable: "سرویس در دسترس نیست یا در حال بوت می‌باشد",
  copySystemInfo: "کپی مشخصات سیستم",
  copied: "✓ کپی شد!",
  copyFailed: "کپی مشخصات سیستم ناموفق بود",
  close: "بستن",
};

/** Backward-compatible root entry defaults; new consumers should use `/react`. */
export function SystemVersion(props: SystemVersionProps) {
  return (
    <ConfigurableSystemVersion
      {...props}
      labels={{ ...legacyLabels, ...props.labels }}
      locale={props.locale ?? "en-US"}
      dir={props.dir ?? "rtl"}
      persianDigits={props.persianDigits ?? true}
    />
  );
}
