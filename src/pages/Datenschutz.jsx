import { sitePath } from "../utils/sitePaths.js";

export default function Datenschutz() {
  return (
    <section className="section-band legal-page">
      <div className="content-wrap legal-panel">
        <p className="eyebrow">Rechtliches</p>
        <h1>Datenschutz</h1>
        <p>
          Platzhalterseite. Es werden keine echten Datenschutzangaben behauptet.
          Die finale Datenschutzerklärung muss vor Veröffentlichung fachlich geprüft
          und mit den tatsächlich eingesetzten Diensten abgeglichen werden.
        </p>
        <a className="button button-secondary" href={sitePath()}>
          Zurück zur Startseite
        </a>
      </div>
    </section>
  );
}
