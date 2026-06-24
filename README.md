# ExTeM - DevHub

Persoenliche Website fuer Sebastian "ExTeM" Kozur. Die Seite dient als Landingpage, Portfolio, Projekt-Hub und vorbereiteter Devlog fuer spaetere lokale Automatisierung.

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
  "links": [
    {
      "label": "Repo",
      "href": "https://example.com"
    }
  ]
}
```

Regeln fuer spaetere Automatisierung:

- `id` bleibt stabil und wird nicht aus dem Namen neu generiert.
- `lastUpdate` nutzt ISO-Datum im Format `YYYY-MM-DD`.
- `stack` bleibt ein Array aus kurzen Tags.
- `links` darf leer sein, muss aber ein Array bleiben.
- Ein Bot sollte bestehende Eintraege anhand von `id` aktualisieren.

## Projektfilter

Der Projektbereich bietet:

- Suche ueber Name, Status, Kategorie, Beschreibung und Stack.
- Kategorie-Filter aus `projects.json`.
- Status-Filter aus `projects.json`.
- Sichtbaren Ergebniszaehler.

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
  "description": "Code, Experimente und Projekt-Repositories.",
  "href": "https://github.com/",
  "type": "profile",
  "placeholder": true
}
```

Regeln:

- `placeholder: true` kennzeichnet Links, die vor Veroeffentlichung ersetzt werden muessen.
- Fuer echte Links `placeholder` auf `false` setzen.
- `href` muss ein gueltiger `https://`-, `mailto:`- oder spaeter bewusst freigegebener Community-Link sein.
- Keine privaten Telefonnummern, Adressen oder Accounts automatisch durch Bots eintragen.

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

`src/pages/Impressum.jsx` und `src/pages/Datenschutz.jsx` sind bewusst Platzhalter. Vor einer echten Veroeffentlichung muessen die finalen Angaben ergaenzt und fachlich geprueft werden. Es wurden keine Rechtsangaben erfunden.

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

Es wurde kein externes Deployment ausgefuehrt und es wurden keine Tokens oder Secrets eingetragen.

Vor einem echten Deployment muessen GitHub Pages im Repository auf "GitHub Actions" gestellt und echte Social-/Projektlinks sowie rechtliche Pflichtangaben geprueft werden.

## Qualitaetscheck

Vor einem Commit oder Release ausfuehren:

```powershell
npm.cmd install
npm.cmd run validate:content
npm.cmd run build
npm.cmd audit --audit-level=low
```

Optional lokal pruefen:

```powershell
npm.cmd run dev
```
