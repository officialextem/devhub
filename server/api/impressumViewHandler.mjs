import {
  getUnsentDailySummaries,
  markSummarySent,
  recordImpressumPageView,
} from "../metrics/impressumMetrics.mjs";
import { sendMail } from "../mail/smtpMailer.mjs";

const expectedEventType = "impressum_page_view";
const expectedRoute = "/impressum";

function summaryText(day) {
  return [
    `Datum: ${day.date}`,
    `Anzahl der Impressumsseiten-Aufrufe: ${day.impressumPageViews}`,
    `Erster Aufruf: ${day.firstViewAt || "nicht vorhanden"}`,
    `Letzter Aufruf: ${day.lastViewAt || "nicht vorhanden"}`,
    "",
    "Es wurden keine Cookies, keine vollstaendigen IP-Adressen und keine Besucherprofile gespeichert.",
  ].join("\n");
}

async function sendPendingSummaries() {
  const summaries = await getUnsentDailySummaries();

  for (const day of summaries) {
    const sent = await sendMail({
      subject: "DEVHub Tageszusammenfassung: Impressum-Aufrufe",
      text: summaryText(day),
    });

    if (sent) {
      await markSummarySent(day.date);
    }
  }
}

function parsePayload(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

export async function handleImpressumView(request, response) {
  if (request.method !== "POST") {
    response.statusCode = 405;
    response.setHeader("Allow", "POST");
    response.end();
    return;
  }

  try {
    const payload = parsePayload(request.body);

    if (payload.event_type !== expectedEventType || payload.route !== expectedRoute) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ ok: false }));
      return;
    }

    await sendPendingSummaries();
    await recordImpressumPageView();

    response.statusCode = 204;
    response.end();
  } catch (error) {
    console.warn(`Impressum metrics failed: ${error.message}`);
    response.statusCode = 204;
    response.end();
  }
}
