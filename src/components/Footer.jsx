import { sitePath } from "../utils/sitePaths.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-wrap footer-inner">
        <div>
          <p>© 2026 Sebastian “ExTeM” Kozur. Website & Design by ExTeM.</p>
          <p>Textassistenz und Konzeptunterstützung teilweise mit KI-Tools erstellt.</p>
        </div>
        <div className="footer-links">
          <a href={sitePath("impressum")}>Impressum</a>
          <a href={sitePath("datenschutz")}>Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
