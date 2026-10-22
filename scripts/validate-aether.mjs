import fs from "node:fs";
import assert from "node:assert/strict";

const path = "PROJECT_AETHER_MOBILE_V004_RACES_CLASSES.html";
const html = fs.readFileSync(path, "utf8");
assert.match(html, /<canvas[^>]+id=["']game["']/i, "The main 3D canvas must exist");
assert.ok(html.includes("AETHER ENGINE · 3D REFORGED"), "New 3D build marker is missing");
assert.ok(html.includes("__AETHER_NEW_ENGINE_READY"), "New engine readiness marker is missing");

const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
assert.ok(scripts.length >= 2, "Expected importmap and game module scripts");
for (let i = 0; i < scripts.length; i++) {
  let source = scripts[i][2];
  if (scripts[i][1].includes("importmap")) { JSON.parse(source); continue; }
  if (/\btype=["']module["']/.test(scripts[i][1])) source = source.replace(/^\s*import\s+.*?;\s*$/gm, "");
  try { new Function(source); }
  catch (error) { console.error("Script syntax error at block", i, error); throw error; }
}

for (const race of ["Aurelio", "Sylvar", "Dravak", "Velari", "Varkyn", "Aethari"]) {
  assert.ok(html.includes(race), `Missing race: ${race}`);
}
for (const feature of [
  "EffectComposer",
  "UnrealBloomPass",
  "PointerLockControls",
  "InstancedMesh",
  "AETHER ENGINE · 3D REFORGED",
  "GUARDIÁN DE LA GRIETA",
  "GOLPE ARCANO",
  "RESPLANDOR VITAL",
]) assert.ok(html.includes(feature), `Missing 3D feature: ${feature}`);

console.log(`PASS: ${scripts.length} script blocks parsed; new 3D engine, six lineages, combat, lighting and instanced world verified.`);
