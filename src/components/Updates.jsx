import updates from "../data/updates.json";

export default function Updates() {
  return (
    <section id="updates" className="section-band updates-section">
      <div className="content-wrap">
        <div className="section-heading">
          <p className="eyebrow">Updates / Devlog</p>
          <h2>Chronologische Fortschritte</h2>
          <p>
            Updates liegen strukturiert in JSON und können später von einem lokalen
            Bot ergänzt werden.
          </p>
        </div>

        <div className="timeline">
          {updates.map((update) => (
            <article className="timeline-item" key={`${update.date}-${update.title}`}>
              <time dateTime={update.date}>{update.date}</time>
              <div>
                <span className="category">{update.category}</span>
                <h3>{update.title}</h3>
                <p>{update.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
