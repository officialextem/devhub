import { sitePath } from "../utils/sitePaths.js";

export default function Datenschutz() {
  return (
    <section className="section-band legal-page">
      <div className="content-wrap legal-panel">
        <p className="eyebrow">Rechtliches</p>
        <h1>Datenschutz</h1>

        <div className="legal-notice">
          <strong>Hinweis:</strong> Diese Datenschutzerklaerung ist fuer eine
          statische Portfolio- und Projektwebsite vorbereitet. Sie ersetzt keine
          rechtliche Pruefung und muss vor finaler produktiver Nutzung manuell
          geprueft werden.
        </div>

        <section className="legal-section">
          <h2>Verantwortlicher</h2>
          <p>
            Sebastian “ExTeM” Kozur
            <br />
            Website: <a href="https://extem.de">extem.de</a>
            <br />
            E-Mail: <a href="mailto:info@extem.de">info@extem.de</a>
          </p>
          <p>Vollstaendige ladungsfaehige Anschrift: manuell ergaenzen.</p>
        </section>

        <section className="legal-section">
          <h2>Kontakt per E-Mail</h2>
          <p>
            Wenn du per E-Mail Kontakt aufnimmst, werden die von dir uebermittelten
            Angaben zur Bearbeitung der Anfrage verwendet. Dazu koennen Name,
            E-Mail-Adresse und Inhalt der Nachricht gehoeren. Die Website selbst
            speichert diese Formulardaten nicht auf einem eigenen Server.
          </p>
        </section>

        <section className="legal-section">
          <h2>Hosting ueber GitHub Pages</h2>
          <p>
            Diese Website wird ueber GitHub Pages bereitgestellt. Beim Aufruf der
            Website koennen durch den Hostinganbieter technische Server-Logs
            verarbeitet werden, zum Beispiel IP-Adresse, Zeitpunkt des Zugriffs,
            aufgerufene Ressourcen und technische Browserdaten. Diese Verarbeitung
            dient insbesondere dem Betrieb, der Sicherheit und der Auslieferung der
            Website.
          </p>
          <p>
            Weitere Informationen stellt GitHub in den eigenen Datenschutz- und
            GitHub-Pages-Hinweisen bereit.
          </p>
        </section>

        <section className="legal-section">
          <h2>Cookies, Tracking und Analyse</h2>
          <ul>
            <li>Es werden keine bewusst eingesetzten Tracking- oder Marketing-Cookies verwendet.</li>
            <li>Es ist keine Newsletter-Funktion eingebunden.</li>
            <li>Es sind keine Analyse-Tools wie Google Analytics, Matomo oder vergleichbare Dienste im Code eingebunden.</li>
            <li>Es werden keine externen Formular-Dienste verwendet.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Kontaktformular</h2>
          <p>
            Das Kontaktformular arbeitet frontend-only und oeffnet ein E-Mail-Programm
            per <code>mailto:</code>. Die eingegebenen Daten werden nicht in dieser
            Website gespeichert und nicht an einen eigenen Server uebertragen.
          </p>
        </section>

        <section className="legal-section">
          <h2>Interne technische Zaehldaten</h2>
          <p>
            Beim Aufruf der Impressumsseite wird ein internes, cookiefreies
            technisches Zaehlereignis vorbereitet. Erfasst werden nur Datum, Route
            und aggregierte Anzahl der Aufrufe. Es werden keine Cookies gesetzt,
            keine vollstaendigen IP-Adressen gespeichert und keine Besucherprofile
            erstellt.
          </p>
        </section>

        <section className="legal-section">
          <h2>Betroffenenrechte</h2>
          <p>
            Soweit personenbezogene Daten verarbeitet werden, koennen betroffene
            Personen je nach gesetzlicher Grundlage insbesondere Auskunft,
            Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Widerspruch
            sowie Datenuebertragbarkeit verlangen. Ausserdem kann ein Beschwerderecht
            bei einer zustaendigen Datenschutzaufsichtsbehoerde bestehen.
          </p>
        </section>

        <section className="legal-section">
          <h2>Manuell zu pruefen</h2>
          <ul>
            <li>Vollstaendige Kontaktdaten des Verantwortlichen: manuell ergaenzen.</li>
            <li>Zustaendige Datenschutzaufsichtsbehoerde: manuell pruefen und ergaenzen.</li>
            <li>Rechtsgrundlagen und Aufbewahrungsfristen: manuell pruefen.</li>
            <li>Alle Angaben mit dem tatsaechlichen produktiven Stand der Website abgleichen.</li>
          </ul>
        </section>

        <a className="button button-secondary" href={sitePath()}>
          Zurueck zur Startseite
        </a>
      </div>
    </section>
  );
}
