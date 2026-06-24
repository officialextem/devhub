# Admin- und Bot-Update-System

Dieses Dokument beschreibt die vorbereitete, lokale Update-Architektur fuer ExTeM - DevHub. Es aktiviert keine Remote-Admin-Funktion und enthaelt keine Tokens.

## Ziel

Ein spaeterer `website_announcer-bot` soll Inhalte strukturiert aktualisieren koennen, ohne React-Komponenten oder Styling-Dateien anzufassen.

## Schreibbare Datenquellen

- `src/data/projects.json`
- `src/data/updates.json`
- `src/data/socials.json`

Alle anderen Dateien gelten fuer den Bot standardmaessig als read-only.

## Sicherheitsmodell

Vor jeder Aenderung:

1. JSON laden und validieren.
2. Geplante Aenderung als Preview ausgeben.
3. Risiko einstufen.
4. Bei Social-/Kontakt- und Rechtsdaten keine automatische Vervollstaendigung.
5. Erst nach Freigabe schreiben.
6. Danach `npm.cmd run build` ausfuehren.

## Risiko-Level

- `low`: Neuer Devlog-Eintrag, Projektbeschreibung, Stack-Tag.
- `medium`: Sichtbare Kontaktlinks, Projektlinks, Statuswechsel auf "Aktiv".
- `high`: Rechtliche Angaben, externe Tracking-/Analytics-Dienste, Deploy-Secrets.

High-Risk-Aenderungen werden nicht automatisch ausgefuehrt.

## Validierung

Die lokale Validierung liegt in:

```text
scripts/validate-content.mjs
```

Ausfuehren:

```powershell
npm.cmd run validate:content
```

Der Produktionsbuild fuehrt diese Validierung automatisch vor Vite aus.

## Empfohlenes Bot-Protokoll

```json
{
  "action": "append_update",
  "target": "src/data/updates.json",
  "risk": "low",
  "preview": "Fuegt einen neuen Devlog-Eintrag hinzu.",
  "requiresConfirmation": true
}
```

## GitHub-Integration

Der Bot darf ohne explizite Freigabe keine GitHub-Tokens lesen, speichern oder ausgeben. Fuer GitHub-Aktionen ist ein spaeterer Adapter sinnvoll:

- `GitHubReleaseAdapter`
- `GitHubPagesDeployAdapter`
- `GitHubIssueDevlogAdapter`

Diese Adapter sollen Tokens nur ueber Umgebungsvariablen oder GitHub Actions Secrets erhalten.
