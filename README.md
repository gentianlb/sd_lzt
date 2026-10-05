# Therapieantrag Sucht (Sozialdienst)

Lokale HTML-Anwendung für den Sozialdienst: Antrag auf medizinische Rehabilitation bei Abhängigkeitserkrankungen (ambulant, tagesklinisch/ganztägig ambulant, stationär) inklusive Sozialbericht.

Daten bleiben im Browser (`localStorage`). Es gibt keine Serveranbindung.

## Start

Im Ordner die Datei `index.html` im Browser öffnen **oder** lokal ausliefern:

```bash
python3 -m http.server 8080
```

Dann [http://localhost:8080](http://localhost:8080) öffnen. Ein lokaler Server ist nützlich, damit die Original-PDFs unter `forms/` direkt verlinkt werden können.

## Ablauf

1. **Einrichtung** – Klinik / Sozialdienst einmal hinterlegen (wird in jeden Sozialbericht übernommen).
2. **Stammdaten** – Name, Geburtstag, VSNR, Krankenkasse, Suchtform, Leistungsform, Aufnahme. Diese Felder füllen G0100, G0110, G0450 und G0452 automatisch.
3. **G0100** – Rehabilitationsantrag (Wunschkliniken, Beiträge, Vertretung).
4. **G0110** – Anlage (AU, Gesundheit, Arbeitsplatz), soweit erforderlich.
5. **G0450 Sozialbericht** – Freitexte mit Textbausteinen aus anonymisierten Beispielberichten; Rahmentext der Zusammenfassung per Knopf aus Stammdaten erzeugen.
6. **G0452** – Einwilligung zur Weiterleitung des Sozialberichts.
7. **Drucken** – Browserdialog „Als PDF speichern“. Zusätzlich liegen die leeren DRV-Formulare in `forms/`.

Fälle können als JSON exportiert und wieder importiert werden (Übergabe zwischen Rechnern ohne Cloud).

## Formulare

| Datei | Inhalt |
| --- | --- |
| `forms/G0100.pdf` | Antrag auf Leistungen zur Teilhabe |
| `forms/G0110.pdf` | Anlage zum Rehabilitationsantrag |
| `forms/G0450.pdf` | Sozialbericht – Psychosoziale Grunddaten |
| `forms/G0452.pdf` | Information und Einwilligungserklärung |

Die Druckfassung der App ist eine ausgefüllte Arbeitskopie für die Akte. Für den Versand an die DRV können die Originale parallel genutzt werden.

Weitere Textbausteine lassen sich in `js/bausteine.js` ergänzen. Platzhalter: `{{anrede}}`, `{{pronomen}}`, `{{aufnahme}}`, `{{diagnose}}`, `{{leistungsformAdj}}`.
