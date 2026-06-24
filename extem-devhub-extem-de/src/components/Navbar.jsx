import { sectionPath } from "../utils/sitePaths.js";

const navItems = [
  { label: "Home", href: sectionPath("home") },
  { label: "Über mich", href: sectionPath("about") },
  { label: "Projekte", href: sectionPath("projects") },
  { label: "Updates", href: sectionPath("updates") },
  { label: "Socials", href: sectionPath("socials") },
  { label: "Kontakt", href: sectionPath("contact") },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Hauptnavigation">
        <a className="brand" href={sectionPath("home")} aria-label="ExTeM - DevHub Startseite">
          <span className="brand-mark">EX</span>
          <span>ExTeM - DevHub</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
