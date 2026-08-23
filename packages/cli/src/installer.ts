import { execSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export interface PlatformInfo {
  os: "linux" | "darwin" | "windows";
  arch: "amd64" | "arm64";
  binaryName: string;
}

export function getPlatformInfo(): PlatformInfo {
  const platform = process.platform;
  const arch = process.arch;

  let os: "linux" | "darwin" | "windows";
  if (platform === "linux") os = "linux";
  else if (platform === "darwin") os = "darwin";
  else if (platform === "win32") os = "windows";
  else throw new Error(`Unsupported operating system: ${platform}`);

  let resolvedArch: "amd64" | "arm64";
  if (arch === "x64") resolvedArch = "amd64";
  else if (arch === "arm64") resolvedArch = "arm64";
  else throw new Error(`Unsupported CPU architecture: ${arch}`);

  const binaryName = os === "windows" ? "manova.exe" : "manova";
  return { os, arch: resolvedArch, binaryName };
}

export function findLocalBinary(): string | null {
  // 1. Check PATH
  try {
    const whichCmd =
      process.platform === "win32" ? "where manova" : "which manova";
    const path = execSync(whichCmd, { stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim()
      .split("\n")[0];
    if (path && existsSync(path)) {
      return path;
    }
  } catch {
    // Not in PATH
  }

  // 2. Check local ~/.manova/bin/manova
  const userBin = join(
    homedir(),
    ".manova",
    "bin",
    process.platform === "win32" ? "manova.exe" : "manova",
  );
  if (existsSync(userBin)) {
    return userBin;
  }

  // 3. Check workspace directory layout ~/Dev/Manova/orbit/orbit-cli/bin/manova
  const devBin = join(
    homedir(),
    "Dev",
    "Manova",
    "orbit",
    "orbit-cli",
    "bin",
    process.platform === "win32" ? "manova.exe" : "manova",
  );
  if (existsSync(devBin)) {
    return devBin;
  }

  return null;
}

export async function ensureManovaBinary(): Promise<string> {
  const local = findLocalBinary();
  if (local) {
    return local;
  }

  const { os, arch, binaryName } = getPlatformInfo();
  const targetDir = join(homedir(), ".manova", "bin");
  mkdirSync(targetDir, { recursive: true });
  const targetPath = join(targetDir, binaryName);

  // If already downloaded
  if (existsSync(targetPath)) {
    return targetPath;
  }

  // Attempt download from official release CDN / GitHub
  const version = "latest";
  const downloadUrl = `https://github.com/manovaspace/orbit-cli/releases/${version}/download/manova-${os}-${arch}`;

  console.log(
    `\x1b[36mℹ\x1b[0m Downloading Manova CLI binary for ${os}-${arch}...`,
  );

  try {
    const res = await fetch(downloadUrl);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const { writeFileSync } = await import("node:fs");
      writeFileSync(targetPath, Buffer.from(buffer), { mode: 0o755 });
      chmodSync(targetPath, 0o755);
      return targetPath;
    }
  } catch (_err) {
    // Network or release unavailable; fallback to compiling or running via Go if available
  }

  // Fallback: Check if Go compiler is present to compile directly
  try {
    execSync("go version", { stdio: "ignore" });
    console.log(
      `\x1b[33m⚠\x1b[0m Binary release not cached; building via Go toolchain...`,
    );
    execSync(
      `go install git.dev.manova.space/manova/orbit-cli/cmd/manova@latest`,
      { stdio: "inherit" },
    );
    const goBin = join(
      process.env.GOPATH || join(homedir(), "go"),
      "bin",
      binaryName,
    );
    if (existsSync(goBin)) {
      return goBin;
    }
  } catch {
    // Go not installed
  }

  throw new Error(
    `Manova CLI binary could not be found or downloaded automatically for ${os}-${arch}.\n` +
      `Please ensure internet access or install Go >= 1.23 to build locally: git clone ssh://git@git.dev.manova.space/manova/orbit-cli.git`,
  );
}
