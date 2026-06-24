import { sitePath } from "../utils/sitePaths.js";
import { recordImpressumPageView } from "../services/impressumMetricsClient.js";
import { useEffect } from "react";

export default function Impressum() {
  useEffect(() => {
    recordImpressumPageView();
  }, []);

  return (
    <section className="section-band legal-page">
      <div className="content-wrap legal-panel">
        <p className="eyebrow">Rechtliches</p>
        <h1>Impressum</h1>

        <div className="legal-notice">
          <strong>Hinweis:</strong> Diese Angaben sind fuer die statische Website
          extem.de vorbereitet. Fehlende gesetzlich erforderliche Angaben sind klar
          markiert und muessen vor finaler produktiver Nutzung manuell geprueft und
          ergaenzt werden.
        </div>

        <section className="legal-section">
          <h2>Angaben gemaess Impressumspflicht</h2>
          <p>
            Sebastian “ExTeM” Kozur
            <br />
            Website: <a href="https://extem.de">extem.de</a>
            <br />
            E-Mail: <a href="mailto:info@extem.de">info@extem.de</a>
          </p>
        </section>

        <section className="legal-section">
          <h2>Manuell zu ergaenzende Pflichtangaben</h2>
          <ul>
            <li>Vollstaendige ladungsfaehige Anschrift: manuell ergaenzen.</li>
            <li>Telefonnummer, falls rechtlich erforderlich: manuell ergaenzen.</li>
            <li>Umsatzsteuer-ID, falls vorhanden: manuell ergaenzen.</li>
            <li>Aufsichtsbehoerde, falls einschlaegig: manuell ergaenzen.</li>
            <li>Weitere berufsspezifische Angaben, falls einschlaegig: manuell ergaenzen.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Verantwortlich fuer den Inhalt</h2>
          <p>
            Sebastian “ExTeM” Kozur
            <br />
            Kontakt: <a href="mailto:info@extem.de">info@extem.de</a>
          </p>
        </section>

        <section className="legal-section">
          <h2>Haftungshinweis</h2>
          <p>
            Diese Website ist eine persoenliche Portfolio- und Projektwebsite.
            Externe Links werden sorgfaeltig geprueft, fuer Inhalte externer Seiten
            sind jedoch deren jeweilige Betreiber verantwortlich.
          </p>
        </section>

        <a className="button button-secondary" href={sitePath()}>
          Zurueck zur Startseite
        </a>
      </div>
    </section>
  );
}
