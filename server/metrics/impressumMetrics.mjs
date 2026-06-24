import fs from "node:fs/promises";
import path from "node:path";

const defaultMetricsPath = path.join(process.cwd(), ".local", "impressum-metrics.json");

function metricsPath() {
  return process.env.IMPRESSUM_METRICS_FILE || defaultMetricsPath;
}

function emptyStore() {
  return {
    days: {},
  };
}

function todayKey(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

async function readStore() {
  try {
    const content = await fs.readFile(metricsPath(), "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return emptyStore();
    }

    throw error;
  }
}

async function writeStore(store) {
  const filePath = metricsPath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function ensureDay(store, dateKey) {
  if (!store.days[dateKey]) {
    store.days[dateKey] = {
      date: dateKey,
      impressumPageViews: 0,
      firstViewAt: null,
      lastViewAt: null,
      summarySentAt: null,
    };
  }

  return store.days[dateKey];
}

export async function recordImpressumPageView(now = new Date()) {
  const store = await readStore();
  const dateKey = todayKey(now);
  const day = ensureDay(store, dateKey);
  const timestamp = now.toISOString();

  day.impressumPageViews += 1;
  day.firstViewAt = day.firstViewAt || timestamp;
  day.lastViewAt = timestamp;

  await writeStore(store);
  return day;
}

export async function getUnsentDailySummaries(now = new Date()) {
  const store = await readStore();
  const currentDate = todayKey(now);

  return Object.values(store.days)
    .filter((day) => day.date < currentDate)
    .filter((day) => day.impressumPageViews > 0)
    .filter((day) => !day.summarySentAt)
    .sort((left, right) => left.date.localeCompare(right.date));
}

export async function markSummarySent(date, sentAt = new Date()) {
  const store = await readStore();
  const day = ensureDay(store, date);
  day.summarySentAt = sentAt.toISOString();
  await writeStore(store);
  return day;
}
