#!/usr/bin/env node

import { runCli } from "../dist/index.js";

runCli(process.argv.slice(2))
  .then((exitCode) => {
    process.exit(exitCode);
  })
  .catch((err) => {
    console.error(`\x1b[31m✖ Error:\x1b[0m ${err.message}`);
    process.exit(1);
  });
