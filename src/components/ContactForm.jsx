import { useState } from "react";

const contactEmail = "info@extem.de";

export default function ContactForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notice, setNotice] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function submitMailto(event) {
    event.preventDefault();

    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();

    if (!name || !email || !message) {
      setNotice("Bitte fülle Name, E-Mail und Nachricht aus.");
      return;
    }

    const subject = encodeURIComponent(`Kontakt über ExTeM DevHub von ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    );

    setNotice(
      "Es wird dein E-Mail-Programm geöffnet. Die Website speichert keine Formulardaten.",
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submitMailto}>
      <div className="contact-form-heading">
        <span>Kontaktformular</span>
        <p>
          Frontend-only per E-Mail. Zieladresse:{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </div>

      <label>
        <span>Name</span>
        <input
          autoComplete="name"
          name="name"
          onChange={updateField}
          required
          type="text"
          value={formValues.name}
        />
      </label>

      <label>
        <span>E-Mail</span>
        <input
          autoComplete="email"
          name="email"
          onChange={updateField}
          required
          type="email"
          value={formValues.email}
        />
      </label>

      <label>
        <span>Nachricht</span>
        <textarea
          name="message"
          onChange={updateField}
          required
          rows="6"
          value={formValues.message}
        />
      </label>

      {notice && <p className="form-notice">{notice}</p>}

      <button className="button button-primary" type="submit">
        E-Mail vorbereiten
      </button>
    </form>
  );
}
