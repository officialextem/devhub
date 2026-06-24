# Deployment

ExTeM - DevHub ist als statische Vite-App vorbereitet. Aktuell sind GitHub Pages, Netlify und Vercel vorbereitet, aber kein externes Deployment wurde ausgefuehrt.

## Custom Domain

Final geplante Domain:

```text
extem.de
```

Geplante www-Subdomain:

```text
www.extem.de
```

Die Datei `public/CNAME` sorgt dafuer, dass GitHub Pages beim Build die Custom Domain `extem.de` erhaelt. Vite nutzt `base: "/"`, weil die Website direkt unter der Root-Domain ausgeliefert werden soll.

DNS wird ausserhalb des Repositories beim Domainanbieter gesetzt. Keine DNS-Secrets, Tokens oder Zugangsdaten im Repo speichern.

## GitHub Pages

Vorbereitet ueber:

```text
.github/workflows/deploy-github-pages.yml
```

Voraussetzungen:

- Repository auf GitHub.
- GitHub Pages Source auf "GitHub Actions" stellen.
- Push auf `main` oder manueller Workflow-Start.

Der Workflow nutzt keine eigenen Tokens. `GITHUB_TOKEN` kommt sicher aus GitHub Actions.

## Netlify

Vorbereitet ueber:

```text
netlify.toml
```

Build command:

```text
npm run build
```

Publish directory:

```text
dist
```

## Vercel

Vorbereitet ueber:

```text
vercel.json
```

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

## Wichtige Hinweise

- Keine Tokens in Dateien eintragen.
- Keine echten Rechtsangaben automatisch generieren.
- Vor Deployment `src/data/socials.json` auf echte Links pruefen.
- Vor Deployment Impressum und Datenschutz finalisieren.
