#!/usr/bin/env node
// Starts Next.js dev server and opens the browser once it's ready.
const { spawn } = require("child_process");
const { openSync } = require("fs");

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;
let opened = false;

const next = spawn(
  /^win/.test(process.platform) ? "next.cmd" : "next",
  ["dev", "--turbopack", "--port", String(PORT)],
  { stdio: ["inherit", "pipe", "pipe"], shell: false }
);

function tryOpen(data) {
  const text = String(data);
  process.stdout.write(text);
  if (!opened && (text.includes("Ready") || text.includes("started server") || text.includes("Local:"))) {
    opened = true;
    const open =
      process.platform === "win32"
        ? ["cmd", ["/c", "start", URL]]
        : process.platform === "darwin"
        ? ["open", [URL]]
        : ["xdg-open", [URL]];
    spawn(open[0], open[1], { detached: true, stdio: "ignore" }).unref();
    console.log(`\n\x1b[32m✓ Opened ${URL} in your browser\x1b[0m\n`);
  }
}

next.stdout.on("data", tryOpen);
next.stderr.on("data", (d) => { process.stderr.write(d); tryOpen(d); });

next.on("exit", (code) => process.exit(code ?? 0));
process.on("SIGINT", () => next.kill("SIGINT"));
process.on("SIGTERM", () => next.kill("SIGTERM"));
