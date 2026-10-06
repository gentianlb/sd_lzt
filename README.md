# Antrag auf Therapieleistung (Sozialdienst)

Lokale HTML-Anwendung für den Sozialdienst: Antrag auf medizinische Rehabilitation bei Abhängigkeitserkrankungen (ambulant, tagesklinisch/ganztägig ambulant, stationär) inklusive Sozialbericht.

Die Inhalte werden in die **originalen DRV-Formblätter** geschrieben (G0100, G0110, G0450, G0452). Es entsteht keine neue Layout-PDF, sondern eine ausgefüllte Kopie der Vorlage.

Daten bleiben im Browser (`localStorage`). Es gibt keine Serveranbindung.

## Start

Die Vorlagen liegen unter `forms/` und werden vom Browser geladen. Deshalb die App über einen lokalen Server öffnen:

```bash
./start.sh
```

oder

```bash
python3 -m http.server 8080
```

Dann [http://localhost:8080](http://localhost:8080) öffnen.

## Ablauf

1. **Einrichtung** – Klinik / Sozialdienst einmal hinterlegen.
2. **Stammdaten** – Name, Geburtstag, VSNR, Krankenkasse, Suchtform, Leistungsform, Aufnahme. Diese Felder füllen alle Formblätter.
3. **G0100 / G0110 / G0450 / G0452** – restliche Angaben und Sozialbericht (Textbausteine).
4. **Originalformulare ausfüllen** – speichert die echten DRV-PDFs mit eingetragenen Feldern (Kreuze, Texte, Kopfdaten).

Fälle können als JSON exportiert und wieder importiert werden.

## Formulare (Vorlagen)

| Datei | Inhalt |
| --- | --- |
| `forms/G0100.pdf` | Antrag auf Leistungen zur Teilhabe |
| `forms/G0110.pdf` | Anlage zum Rehabilitationsantrag |
| `forms/G0450.pdf` | Sozialbericht – Psychosoziale Grunddaten |
| `forms/G0452.pdf` | Information und Einwilligungserklärung |

Weitere Textbausteine: `js/bausteine.js`. Platzhalter: `{{anrede}}`, `{{pronomen}}`, `{{aufnahme}}`, `{{diagnose}}`, `{{leistungsformAdj}}`.
