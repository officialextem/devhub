const endpoint = "/api/impressum-view";

export function recordImpressumPageView() {
  const payload = {
    event_type: "impressum_page_view",
    route: "/impressum",
    timestamp: new Date().toISOString(),
  };

  try {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Metrics are optional; the static website must never fail because of them.
    });
  } catch {
    // Some browsers or privacy settings can block requests. Ignore safely.
  }
}
