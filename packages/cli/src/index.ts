import { spawn } from "node:child_process";
import { ensureManovaBinary, findLocalBinary, getPlatformInfo } from "./installer.js";

export * from "./installer.js";

export async function runCli(args: string[] = process.argv.slice(2)): Promise<number> {
  const binaryPath = await ensureManovaBinary();

  return new Promise<number>((resolve, reject) => {
    const child = spawn(binaryPath, args, {
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", (err) => {
      reject(err);
    });

    child.on("close", (code) => {
      resolve(code ?? 0);
    });
  });
}
