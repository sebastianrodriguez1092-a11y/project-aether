import fs from "node:fs";
import http from "node:http";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const html = fs.readFileSync("PROJECT_AETHER_MOBILE_V004_RACES_CLASSES.html", "utf8");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(html);
});
await new Promise(resolve => server.listen(4173, "127.0.0.1", resolve));

let browser;
try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("console", msg => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("requestfailed", req => failedRequests.push({url:req.url(),error:req.failure()?.errorText}));
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => window.__AETHER_3D_READY === true, undefined, { timeout: 30000 });
  await page.waitForFunction(() => window.__AETHER_TEXTURE_STATUS && window.__AETHER_TEXTURE_STATUS !== "loading", undefined, { timeout: 20000 });
  assert.equal(await page.evaluate(() => window.__AETHER_TEXTURE_STATUS), "loaded", "Real terrain image did not load");
  assert.ok(await page.locator("#game").count(), "3D canvas missing");
  assert.ok(await page.locator("#game").evaluate(c => c.width > 0 && c.height > 0), "3D canvas has no dimensions");

  await page.locator("#startBtn").click();
  await page.locator(".raceCard").first().click();
  await page.locator("#raceContinue").click();
  await page.waitForFunction(() => getComputedStyle(document.querySelector("#classSelect")).display !== "none");
  await page.locator(".classCard").first().click();
  await page.locator("#classContinue").click();
  await page.waitForFunction(() => window.__AETHER_CHARACTER && document.querySelector("#aetherMapButton") && getComputedStyle(document.querySelector("#aetherMapButton")).display !== "none", undefined, { timeout: 10000 });
  await page.waitForTimeout(900);
  await page.locator("#aetherMapButton").click();
  await page.waitForFunction(() => document.querySelector("#aetherMapButton").textContent.includes("VOLVER"));
  await page.screenshot({ path: "project-aether-smoke.png", fullPage: false });
  await page.locator("#aetherMapButton").click();
  await page.waitForFunction(() => document.querySelector("#aetherMapButton").textContent.includes("VER MAPA"));

  const visibleError = await page.locator("#aetherErrorPanel").count()
    ? await page.locator("#aetherErrorPanel").innerText()
    : "";
  assert.equal(visibleError, "", "Runtime error panel appeared: " + visibleError);
  assert.deepEqual(pageErrors, [], "Uncaught browser exceptions occurred");
  console.log("PASS: WebGL module loaded, race/class selection advanced, map opened/closed, no uncaught browser errors.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
