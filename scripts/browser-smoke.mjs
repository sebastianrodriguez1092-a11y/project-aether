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
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(15000);
  const pageErrors = [], consoleErrors = [], failedRequests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("console", msg => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("requestfailed", req => failedRequests.push({ url: req.url(), error: req.failure()?.errorText }));
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => window.__AETHER_NEW_ENGINE_READY === true, undefined, { timeout: 20000 });
  assert.ok(await page.locator("#game").count(), "3D canvas missing");
  await page.locator("#enter").click();
  await page.waitForSelector(".race");
  assert.equal(await page.locator(".race").count(), 6, "Six lineage cards are required");
  await page.locator(".race").first().click();
  await page.locator("#continue").click();
  await page.waitForTimeout(1200);
  assert.equal(await page.locator("#select").evaluate(el => getComputedStyle(el).display), "none", "Selection screen did not close");
  await page.waitForFunction(() => window.__AETHER_PROLOGUE_READY === true, undefined, { timeout: 15000 });
  assert.ok(await page.locator("#aetherPrologue").count(), "3D cinematic prologue did not appear");
  assert.ok(await page.locator("#aetherPrologue canvas").count(), "Prologue 3D canvas missing");
  await page.screenshot({ path: "project-aether-smoke.png", fullPage: false, animations: "disabled" });
  await page.locator("#aetherBeginStory").click();
  await page.locator("#aetherBeginStory").click();
  await page.locator("#aetherBeginStory").click();
  await page.locator("#aetherBeginStory").click();
  await page.waitForFunction(() => window.__AETHER_PROLOGUE_COMPLETE === true, undefined, { timeout: 5000 });
  assert.equal(await page.locator("#hud").evaluate(el => getComputedStyle(el).display), "block", "HUD did not activate after prologue");
  const visibleErrors = await page.locator("#aetherErrorPanel").count() ? await page.locator("#aetherErrorPanel").innerText() : "";
  assert.equal(visibleErrors, "", "Runtime error panel appeared: " + visibleErrors);
  assert.deepEqual(pageErrors, [], "Uncaught browser exceptions occurred: " + JSON.stringify({ pageErrors, consoleErrors, failedRequests }));
  console.log("PASS: Aether 3D engine loaded, lineage selection worked, cinematic 3D prologue rendered and completed, HUD activated, no uncaught exceptions.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
