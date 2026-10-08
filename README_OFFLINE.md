# SD_LZT – portable Offline-Version (Windows / Edge / Chrome)

Diese Variante läuft vollständig lokal über **START.html**. Administratorrechte, Konsole, Python, Node.js, Webserver und Internetzugang sind für die Benutzung nicht erforderlich.

## Inbetriebnahme auf einem Arbeitsplatz-PC

1. Auf GitHub den Branch **offline-portable-html** auswählen und **Code → Download ZIP** anklicken.
2. Das ZIP in einen erlaubten lokalen oder von der Einrichtung freigegebenen Ordner **vollständig entpacken**. Nicht direkt in der ZIP-Vorschau starten.
3. Die Datei **START.html** doppelt anklicken; sie muss in Microsoft Edge oder Chrome geöffnet werden. Falls gefragt: **Öffnen mit → Microsoft Edge**.
4. Einrichtung und Stammdaten eintragen, Formulare vervollständigen.
5. **Originalformulare ausfüllen** bzw. die einzelnen Schaltflächen G0100, G0110, G0450 und G0452 verwenden. Die ausgefüllten Original-PDFs werden über den Browser heruntergeladen. Bei „Alle vier“ muss der Browser ggf. mehrere Downloads zulassen.
6. Über **Alle Fälle als JSON sichern** regelmäßig eine Gesamtsicherung exportieren. Über **JSON importieren** kann sie später wieder eingelesen werden; importierte Fälle werden ergänzt, nicht überschrieben.

**Immer START.html öffnen**, nicht `index.html`: `index.html` ist die Webserver-Variante.

## Funktionsprinzip

* `vendor/offline-G0100.js`, `offline-G0110.js`, `offline-G0450.js` und `offline-G0452.js` enthalten die vier originalen Formularvorlagen als Base64-Daten. Sie werden von `START.html` als lokale Skripte geladen.
* `js/pdf-fill.js` verwendet diese eingebetteten Vorlagen zuerst. Der ursprüngliche `fetch("forms/...")`-Zweig bleibt für `index.html` mit lokalem Server erhalten.
* `vendor/pdf-lib.min.js` verarbeitet die AcroForm-PDFs direkt im Browser. Die Original-PDFs unter `forms/` bleiben unverändert.
* `js/app.js` verwaltet Fälle und Einstellungen. Browser-`localStorage` kann bei `file://` je nach Browser/Firmenrichtlinie variieren oder gesperrt sein; die Anwendung bleibt dann benutzbar, doch ohne verlässliche automatische Persistenz. **JSON-Sicherungen sind daher zwingend empfohlen.**
* Die PDFs werden mit `Blob`/Browser-Downloads gespeichert. Ein automatisches direktes Schreiben in einen Ordner ist aus Sicherheitsgründen nicht möglich. Den Speicherort im Browser/Download-Dialog wählen.

## Datenschutz / Sicherheit

**Achtung: PDF-Ausgaben und JSON-Sicherungen enthalten potenziell sensible personenbezogene Gesundheitsdaten.** Browser-`localStorage` und JSON-Dateien sind nicht durch die Anwendung verschlüsselt. Nur auf einem von der IT zugelassenen Gerät und in freigegebenen, geschützten Verzeichnissen einsetzen. Keine nicht freigegebenen Cloud-Synchronisierungen oder privaten USB-Speicher verwenden. Bei gemeinsam genutzten PC-/Browser-Profilen sind zusätzliche organisatorische und technische Schutzmaßnahmen notwendig.

Der Betrieb erfordert keine externen Serverzugriffe. Je nach Unternehmensrichtlinie können lokale JavaScript-Dateien oder Browserdownloads trotzdem blockiert werden.

## Optional: Browser-Daten auf einen anderen PC übertragen

In der alten Instanz den betroffenen Fall via **JSON exportieren** sichern; in der Offline-Version via **JSON importieren** laden. Für alle Fälle steht in der Offline-Version **Alle Fälle als JSON sichern** zur Verfügung. Der Import einer Gesamtsicherung ergänzt die enthaltenen Fälle.

## Entwicklung

Ausgangspunkt: `cursor/sozialdienst-antrag-5db7`. Die Änderungen liegen ausschließlich in `offline-portable-html`. Der Entwicklungsbranch und `main` wurden nicht verändert.

Für eine browserseitige Smoke-Prüfung: `START.html` öffnen, Musterdaten eingeben, die vier PDFs herunterladen, PDF-Felder optisch auf Vollständigkeit prüfen sowie Gesamtsicherung exportieren/importieren. Für einen produktiven Einsatz ist zusätzlich eine Prüfung der ausgefüllten DRV-Formblätter durch fachkundige Anwender erforderlich.
