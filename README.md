# ExTeM - DevHub

Persoenliche Website fuer Sebastian "ExTeM" Kozur. Die Seite dient als Landingpage, Portfolio, Projekt-Hub und vorbereiteter Devlog fuer spaetere lokale Automatisierung.

Live-Domain:

```text
https://extem.de
```

Repository:

```text
https://github.com/officialextem/devhub
```

## Tech-Stack

- Vite
- React
- JSON-Datenquellen fuer Projekte, Updates und Social-/Kontaktlinks
- Lokale Content-Validierung vor Builds
- Zentrales CSS-Theme in `src/styles/main.css`
- Keine Router- oder UI-Library als Pflichtabhaengigkeit

## Setup

PowerShell kann `npm.ps1` durch die lokale Execution Policy blockieren. Auf Windows deshalb direkt `npm.cmd` nutzen:

```powershell
npm.cmd install
npm.cmd run dev
```

Lokale Standard-URL:

```text
http://127.0.0.1:5173/
```

Produktionsbuild:

```powershell
npm.cmd run build
```

Content-Daten separat pruefen:

```powershell
npm.cmd run validate:content
```

Vorschau des Produktionsbuilds:

```powershell
npm.cmd run preview
```

GitHub-Pages-Build mit SPA-Fallback:

```powershell
npm.cmd run build:pages
```

## Projektstruktur

```text
src/
  App.jsx
  main.jsx
  components/
    BackToTop.jsx
    CookieBanner.jsx
    ContactForm.jsx
    Navbar.jsx
    Hero.jsx
    About.jsx
    Projects.jsx
    ProjectCard.jsx
    Updates.jsx
    Socials.jsx
    Footer.jsx
  data/
    projects.json
    updates.json
    socials.json
  pages/
    Impressum.jsx
    Datenschutz.jsx
  styles/
    main.css
```

## Datenstruktur fuer Projekte

Datei: `src/data/projects.json`

Jeder Eintrag beschreibt eine Projektkarte:

```json
{
  "id": "devhub-tuningforge",
  "name": "DEVHub TuningForge",
  "status": "Aktiv",
  "category": "Windows / Desktop / Safety",
  "description": "Kurze Projektbeschreibung.",
  "stack": ["Python", "CustomTkinter", "Windows"],
  "lastUpdate": "2026-06-24",
  "links": [{ "label": "GitHub", "href": "https://github.com/officialextem/devhub_tuningforge" }]
}
```

Regeln fuer spaetere Automatisierung:

- `id` bleibt stabil und wird nicht aus dem Namen neu generiert.
- `lastUpdate` nutzt ISO-Datum im Format `YYYY-MM-DD`.
- `stack` bleibt ein Array aus kurzen Tags.
- `links` darf leer sein, muss aber ein Array bleiben.
- Ein Bot sollte bestehende Eintraege anhand von `id` aktualisieren.
- Aktuelle Projektkarten werden ausschliesslich aus `src/data/projects.json` geladen.

## Projektfilter

Der Projektbereich bietet:

- Suche ueber Name, Status, Kategorie, Beschreibung und Stack.
- Kategorie-Filter aus `projects.json`.
- Status-Filter aus `projects.json`.
- Sichtbaren Ergebniszaehler.
- Die Projektsuche ist standardmaessig eingeklappt und per Button oeffenbar.

Die Filter arbeiten rein im Frontend und schreiben keine Daten.

## Datenstruktur fuer Updates / Devlog

Datei: `src/data/updates.json`

Jeder Eintrag beschreibt einen chronologischen Devlog-Eintrag:

```json
{
  "date": "2026-06-24",
  "title": "ExTeM - DevHub Website gestartet",
  "category": "Website",
  "description": "Kurze, nutzerverstaendliche Beschreibung."
}
```

Regeln fuer spaetere Automatisierung:

- `date` nutzt ISO-Datum im Format `YYYY-MM-DD`.
- Neue Eintraege werden oben eingefuegt, damit die Liste chronologisch aktuell bleibt.
- `title` bleibt kurz und sprechend.
- `description` erklaert konkret, was sich geaendert hat.
- Keine Build-Logs, Secrets, Tokens oder privaten Pfade in Updates schreiben.

## Datenstruktur fuer Socials / Kontakt

Datei: `src/data/socials.json`

Jeder Eintrag beschreibt eine sichtbare Kontakt- oder Social-Karte:

```json
{
  "id": "github",
  "label": "GitHub",
  "description": "GitHub-Profil mit oeffentlichen ExTeM-Projekten und Repositories.",
  "href": "https://github.com/officialextem",
  "type": "profile",
  "placeholder": false
}
```

Regeln:

- Social- und Kontaktkarten werden aus `src/data/socials.json` geladen.
- `placeholder: true` kennzeichnet Links, die vor Veroeffentlichung ersetzt werden muessen.
- Fuer echte Links `placeholder` auf `false` setzen.
- `href` muss ein gueltiger `https://`-, `mailto:`- oder spaeter bewusst freigegebener Community-Link sein.
- Keine privaten Telefonnummern, Adressen oder Accounts automatisch durch Bots eintragen.

## Kontaktformular

Das Kontaktformular ist frontend-only und nutzt einen `mailto:`-Workflow zu `info@extem.de`. Es speichert keine Formulardaten, nutzt keinen externen Formular-Dienst und taeuscht keine Server-Uebermittlung vor.

## Cookie-Hinweis

Die Website enthaelt einen einfachen lokalen Hinweisbanner. Er informiert, dass derzeit keine Tracking- oder Marketing-Cookies verwendet werden. Die Bestaetigung wird lokal im Browser gespeichert; es werden keine externen Consent-, Tracking- oder Analyse-Dienste eingebunden.

## Impressum-Zaehldaten

Beim Aufruf der Impressumsseite wird optional ein internes technisches Event an `/api/impressum-view` gesendet. Die statische GitHub-Pages-Website funktioniert auch ohne diese API. Wenn eine passende Node/API-Umgebung aktiv ist, werden nur aggregierte Tagesdaten gespeichert:

- Datum
- Anzahl der Impressumsseiten-Aufrufe
- erster Aufruf
- letzter Aufruf

Nicht gespeichert werden vollstaendige IP-Adressen, Namen, E-Mail-Adressen, Cookies, User-Agent, Referrer, Fingerprints, Session-IDs oder Besucherprofile.

Eine Tageszusammenfassung kann an `info@extem.de` gesendet werden, wenn SMTP per Umgebungsvariablen konfiguriert ist:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
MAIL_FROM
IMPRESSUM_METRICS_FILE
```

Fehlt die Mail-Konfiguration, stuerzt die Website nicht ab; die API protokolliert nur technisch knapp, dass keine Zusammenfassung gesendet wurde.

## website_announcer-bot Konzept

Der spaetere Bot sollte lokal und vorsichtig arbeiten:

1. JSON-Datei laden und gegen die erwartete Struktur pruefen.
2. Aenderungen nur an `src/data/projects.json`, `src/data/updates.json` oder `src/data/socials.json` schreiben.
3. Vor dem Schreiben ein Preview erzeugen.
4. Keine Secrets, Tokens, lokalen Systempfade oder privaten Daten uebernehmen.
5. Nach dem Schreiben `npm.cmd run build` ausfuehren.
6. Bei Build-Fehlern die Aenderung nicht als erfolgreich melden.

Detailkonzept:

```text
docs/admin-bot-update-system.md
```

Empfohlene Bot-Ausgabe:

```json
{
  "changedFiles": ["src/data/updates.json"],
  "preview": "Neuer Devlog-Eintrag fuer Website-Release.",
  "risk": "low",
  "buildStatus": "passed"
}
```

## Rechtliche Seiten

`src/pages/Impressum.jsx` und `src/pages/Datenschutz.jsx` enthalten vorbereitete Angaben fuer `extem.de`, `info@extem.de` und GitHub Pages Hosting. Fehlende rechtliche Pflichtangaben sind sichtbar als manuell zu pruefen oder zu ergaenzen markiert. Es wurden keine privaten Adressen, Telefonnummern, Umsatzsteuer-IDs oder Aufsichtsbehoerden erfunden.

## Theme

Das Theme ist zentral in `src/styles/main.css` ueber CSS-Variablen definiert:

- `--bg-main`
- `--bg-panel`
- `--accent-purple`
- `--accent-cyan`
- `--text-main`
- `--text-muted`
- `--border-soft`
- `--glow-purple`
- `--glow-cyan`

Neue Farben sollten nur als zentrale Tokens ergaenzt werden.

## Deployment

Vorbereitete Deploy-Ziele:

- GitHub Pages: `.github/workflows/deploy-github-pages.yml`
- Netlify: `netlify.toml`
- Vercel: `vercel.json`

Der GitHub-Pages-Workflow laeuft bei Push auf `main` oder `master` und nutzt `npm ci` sowie `npm run build:pages`. Dabei wird zusaetzlich `dist/404.html` erzeugt, damit direkte Routen wie `/impressum` und `/datenschutz` auf GitHub Pages funktionieren.

### Custom Domain

Final geplante Domain:

```text
extem.de
```

Geplante www-Subdomain:

```text
www.extem.de
```

GitHub Pages bekommt die Custom Domain ueber `public/CNAME`. Vite ist fuer Root-Auslieferung mit `base: "/"` konfiguriert, weil die Website direkt unter `https://extem.de/` laufen soll.

DNS-Eintraege fuer `extem.de` und `www.extem.de` werden nicht im Repository gepflegt. Sie muessen ausserhalb des Repos beim Domainanbieter gesetzt werden. Keine DNS-Secrets, Tokens oder Zugangsdaten in dieses Projekt eintragen.

Details:

```text
docs/deployment.md
```

Es werden keine Tokens oder Secrets im Repository dokumentiert oder benoetigt.

Rechtliche Pflichtangaben muessen vor produktiver Nutzung manuell geprueft werden.

## Qualitaetscheck

Vor einem Commit oder Release ausfuehren:

```powershell
npm.cmd install
npm.cmd run validate:content
npm.cmd run test:impressum-metrics
npm.cmd run build
npm.cmd audit --audit-level=low
```

Optional lokal pruefen:

```powershell
npm.cmd run dev
```

## Manuelle Browser-Tests

- Startseite unter `http://127.0.0.1:5173/` oeffnen.
- Projektkarten und einklappbare Projektsuche pruefen.
- Kontaktformular ausfuellen und sicherstellen, dass ein E-Mail-Programm vorbereitet wird.
- Cookie-Hinweis mit `Verstanden` bestaetigen und Reload pruefen.
- Impressum und Datenschutz ueber Footer-Links oeffnen.
- Mobile Breite pruefen: Navigation, Projektkarten, Kontaktformular, Cookie-Hinweis und Back-to-top Button.
