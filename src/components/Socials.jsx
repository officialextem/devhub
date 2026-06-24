import socials from "../data/socials.json";
import ContactForm from "./ContactForm.jsx";

export default function Socials() {
  return (
    <section id="socials" className="section-band">
      <div id="contact" className="content-wrap">
        <div className="section-heading">
          <p className="eyebrow">Socials / Kontakt</p>
          <h2>Verbinden und verfolgen</h2>
          <p>
            Diese Links sind bewusst als leicht austauschbare Platzhalter angelegt.
          </p>
        </div>

        <div className="social-grid">
          {socials.map((social) => (
            <a className="social-card" key={social.label} href={social.href}>
              <span>{social.label}</span>
              {social.placeholder && <strong className="placeholder-label">Platzhalter</strong>}
              <p>{social.description}</p>
            </a>
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
