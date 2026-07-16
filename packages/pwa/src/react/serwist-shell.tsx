"use client";

import { SerwistProvider } from "@serwist/turbopack/react";
import type { ReactNode } from "react";

export type SerwistShellProps = {
  children: ReactNode;
  swUrl?: string;
};

const DEFAULT_SW_URL = "/serwist/sw.js";

export function SerwistShell({
  children,
  swUrl = DEFAULT_SW_URL,
}: SerwistShellProps) {
  if (process.env.NODE_ENV !== "production") {
    return <>{children}</>;
  }

  return <SerwistProvider swUrl={swUrl}>{children}</SerwistProvider>;
}
