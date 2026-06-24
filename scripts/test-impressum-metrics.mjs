import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "extem-impressum-metrics-"));
process.env.IMPRESSUM_METRICS_FILE = path.join(tempDir, "metrics.json");

const {
  getUnsentDailySummaries,
  recordImpressumPageView,
} = await import("../server/metrics/impressumMetrics.mjs");

await recordImpressumPageView(new Date("2026-06-23T10:00:00.000Z"));
await recordImpressumPageView(new Date("2026-06-23T11:30:00.000Z"));

const summaries = await getUnsentDailySummaries(new Date("2026-06-24T08:00:00.000Z"));
assert.equal(summaries.length, 1);
assert.equal(summaries[0].date, "2026-06-23");
assert.equal(summaries[0].impressumPageViews, 2);
assert.equal(summaries[0].firstViewAt, "2026-06-23T10:00:00.000Z");
assert.equal(summaries[0].lastViewAt, "2026-06-23T11:30:00.000Z");
assert.equal(Object.hasOwn(summaries[0], "ipAddress"), false);
assert.equal(Object.hasOwn(summaries[0], "userAgent"), false);
assert.equal(Object.hasOwn(summaries[0], "referrer"), false);

await fs.rm(tempDir, { force: true, recursive: true });
console.log("Impressum metrics test passed.");
