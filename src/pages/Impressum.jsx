import { sitePath } from "../utils/sitePaths.js";

export default function Impressum() {
  return (
    <section className="section-band legal-page">
      <div className="content-wrap legal-panel">
        <p className="eyebrow">Rechtliches</p>
        <h1>Impressum</h1>
        <p>
          Platzhalterseite. Hier wurden bewusst keine echten Rechtsangaben erfunden.
          Die finalen Angaben müssen vor Veröffentlichung durch Sebastian „ExTeM“
          Kozur ergänzt und geprüft werden.
        </p>
        <a className="button button-secondary" href={sitePath()}>
          Zurück zur Startseite
        </a>
      </div>
    </section>
  );
}
