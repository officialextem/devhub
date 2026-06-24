export default function Hero() {
  return (
    <section id="home" className="hero section-band">
      <div className="hero-grid content-wrap">
        <div className="hero-copy">
          <p className="eyebrow">Personal DevHub / Portfolio / Devlog</p>
          <h1>ExTeM - DevHub</h1>
          <p className="hero-subtitle">Gaming. Code. Automation. Future Systems.</p>
          <p className="hero-text">
            Willkommen in meinem persönlichen Hub für Projekte, Experimente, Gaming,
            Softwareentwicklung und digitale Systeme. Hier entsteht Schritt für Schritt
            ein öffentliches Portfolio mit Devlog-Struktur.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Projekte ansehen
            </a>
            <a className="button button-secondary" href="#about">
              Über mich
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="DevHub Status">
          <div className="orbital-ring" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="status-stack">
            <div>
              <span className="status-label">Focus</span>
              <strong>DEVHub Systems</strong>
            </div>
            <div>
              <span className="status-label">Mode</span>
              <strong>Build. Learn. Release.</strong>
            </div>
            <div>
              <span className="status-label">Identity</span>
              <strong>Gamer / Developer / Automation</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
