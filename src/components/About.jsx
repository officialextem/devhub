const paragraphs = [
  "Willkommen im ExTeM - DevHub.",
  "Ich bin Sebastian \"ExTeM\" Kozur und beschäftige mich seit vielen Jahren leidenschaftlich mit Gaming, PCs, digitalen Medien und Softwareentwicklung.",
  "Mit 14 Jahren bekam ich meinen ersten eigenen PC - und ab diesem Moment war klar: Technik, Games und digitale Welten lassen mich nicht mehr los. Seitdem habe ich mir viel Wissen rund um Computer, Systeme, Tools, Games und Webprojekte angeeignet.",
  "Ob ich mit einer WoW-Gilde am nächsten First-Kill arbeite, auf Dust_2 zum gefühlt 20.000. Mal die Bombe entschärfe oder an einem neuen Softwareprojekt tüftle: Ich bin ehrgeizig, teamorientiert und gebe mein Bestes, um Ziele wirklich umzusetzen.",
  "Neben Gaming ist Programmieren für mich ein immer größerer Teil meines Lebens geworden. Ich liebe es, neue Dinge zu lernen, kreative Ideen technisch umzusetzen und aus Konzepten funktionierende Projekte zu bauen. Dazu gehören unter anderem Webprojekte, kleinere Tools, Chat-Anwendungen, Automatisierungen und aktuell mehrere DevHub-/KI-orientierte Projekte.",
  "Seit Mitte 2023 verfolge ich ernsthaft das Ziel, mich in Richtung Softwareentwicklung weiterzuentwickeln. Der Weg ist noch nicht fertig, aber genau darum geht es hier: lernen, bauen, verbessern, veröffentlichen.",
  "Im DevHub findest du meine aktuellen Projekte, Experimente, Ziele und Updates. Wenn du als einer der Ersten von neuen Ideen und Releases erfahren möchtest, schau gerne auf meinen Social-Media-Kanälen vorbei.",
  "Danke für deinen Besuch.",
];

export default function About() {
  return (
    <section id="about" className="section-band about-section">
      <div className="content-wrap split-layout">
        <div>
          <p className="eyebrow">Über mich</p>
          <h2>Sebastian „ExTeM“ Kozur</h2>
        </div>
        <div className="text-panel">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
