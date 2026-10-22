import fs from "node:fs";
import assert from "node:assert/strict";

const path = "PROJECT_AETHER_MOBILE_V004_RACES_CLASSES.html";
const html = fs.readFileSync(path, "utf8");
assert.match(html, /<canvas[^>]+id=["']game["']/i, "The 3D canvas must exist");

const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
assert.ok(scripts.length >= 3, "Expected the 3D module and independent UI/diagnostic scripts");
for (let i = 0; i < scripts.length; i++) {
  let source = scripts[i][2];
  if (/\btype=["']module["']/.test(scripts[i][1])) {
    source = source.replace(/^\s*import\s+.*?;\s*$/gm, "");
  }
  try {
    new Function(source);
  } catch (error) {
    console.error("Script syntax error at block", i, error);
    process.exitCode = 1;
    throw error;
  }
}

for (const race of ["Aurelio", "Sylvar", "Dravak", "Velari", "Varkyn", "Aethari"]) {
  assert.ok(html.includes(race), `Missing race: ${race}`);
}
for (const cls of ["Arcane Knight", "Shadow Hunter", "Veil Disciple", "Grave Warden"]) {
  assert.ok(html.includes(cls), `Missing class: ${cls}`);
}
for (const marker of [
  "AETHER_FANTASY_FOREST_V1",
  "AETHER_GRASS_TEXTURE_V1",
  "AETHER_FACTION_BANNERS_V1",
  "AETHER_CLOUDSCAPE_V1",
  "AETHER_MAP_UI_V2",
  "AETHER_ADAPTIVE_QUALITY_V1",
  "AETHER_COMBAT_MODEL_V1",
]) {
  assert.ok(html.includes(marker), `Missing expected feature marker: ${marker}`);
}
assert.ok(html.includes("grasslight-big.jpg"), "Real terrain image texture loader is missing");
console.log(`PASS: ${scripts.length} script blocks parsed; 6 races, 4 classes, map controls, art and performance markers verified.`);
