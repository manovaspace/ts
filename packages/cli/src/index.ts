import { spawn } from "node:child_process";
import { ensureManovaBinary } from "./installer.js";

export * from "./installer.js";

export async function runCli(
  args: string[] = process.argv.slice(2),
): Promise<number> {
  const binaryPath = await ensureManovaBinary();

  // If invoked with no arguments (e.g. `npx @manovaspace/cli`), launch onboarding wizard by default
  const finalArgs = args.length === 0 ? ["onboard"] : args;

  return new Promise<number>((resolve, reject) => {
    const child = spawn(binaryPath, finalArgs, {
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
