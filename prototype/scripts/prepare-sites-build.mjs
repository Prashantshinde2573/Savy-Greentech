#!/usr/bin/env node
import { copyFileSync, cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const dist = path.join(root, "dist");
const clientDist = path.join(dist, "client");
const index = path.join(clientDist, "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

// Ensure Netlify _redirects file exists with SPA rule
const redirectContent = "/*    /index.html   200\n";
writeFileSync(path.join(clientDist, "_redirects"), redirectContent);

// Mirror build output to root dist directory as well (for Netlify default root builds)
try {
  const rootDist = path.join(repoRoot, "dist");
  mkdirSync(rootDist, { recursive: true });
  cpSync(clientDist, rootDist, { recursive: true });
  writeFileSync(path.join(rootDist, "_redirects"), redirectContent);
} catch (e) {
  console.warn("Notice: Could not copy to root dist:", e.message);
}

console.log("Prepared Sites build: dist/server/index.js, dist/.openai/hosting.json, and Netlify _redirects");
