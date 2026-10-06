window.SDLZT_SUBSTANZEN = [
  { id: "alkohol", label: "Alkohol" },
  { id: "cannabis", label: "Cannabis" },
  { id: "heroin", label: "Heroin" },
  { id: "kokain", label: "Kokain / Crack" },
  { id: "amphetamine", label: "Amphetamine / Speed" },
  { id: "crystal", label: "Crystal Meth" },
  { id: "benzodiazepine", label: "Benzodiazepine" },
  { id: "opioide", label: "Opioid-Schmerzmittel" },
  { id: "substitution", label: "Substitutionsmittel" },
  { id: "gluecksspiel", label: "Glücksspiel" },
  { id: "sonstige", label: "Sonstige / pathologisches Verhalten" }
];

window.SDLZT_ENTZUG = [
  { id: "zittern", label: "Zittern" },
  { id: "schwitzen", label: "Schwitzen" },
  { id: "unruhe", label: "Unruhe / innere Anspannung" },
  { id: "herzrasen", label: "Herzrasen" },
  { id: "uebelkeit", label: "Übelkeit" },
  { id: "erbrechen", label: "Erbrechen" },
  { id: "magenschmerzen", label: "Magenschmerzen" },
  { id: "schlaf", label: "Schlafstörungen" },
  { id: "angst", label: "Angst" },
  { id: "reizbarkeit", label: "Reizbarkeit / Aggressivität" },
  { id: "halluzinationen", label: "Halluzinationen" },
  { id: "kreislauf", label: "Kreislaufprobleme" },
  { id: "kopfschmerzen", label: "Kopfschmerzen" },
  { id: "frieren", label: "Frieren" },
  { id: "krampfanfall", label: "Krampfanfall vorbekannt", kind: "vorbekannt" },
  { id: "delirium", label: "Delirium vorbekannt", kind: "vorbekannt" }
];

window.SDLZT_BAUSTEINE = {
  schaedigungen: [
    { id: "psychose", label: "Drogeninduzierte Psychose", text: "Drogeninduzierte Psychose bekannt seit … Während des Konsums Veränderungen: Antriebslosigkeit, Gleichgültigkeit, Einsamkeit, Schlaflosigkeit." },
    { id: "wesensaenderung", label: "Wesensänderung", text: "Wesens- und Verhaltensänderungen unter Konsum: …" },
    { id: "suizid", label: "Suizidversuch", text: "Suizidversuch am … (z. B. Tabletten und Alkohol)." }
  ],
  abstinenz: [
    { id: "nach-entgiftung", label: "Nach Entgiftung", text: "Nach einer … absolvierten Entgiftung habe {{pronomen}} eine Abstinenzphase von … gehabt." },
    { id: "mehrere-jahre", label: "Mehrere Phasen", text: "Mehrere Abstinenzphasen, auch über Jahre (z. B. …)." },
    { id: "nicht-eruiert", label: "Nicht im Einzelnen eruierbar", text: "Teilweise mehrere Jahre. Kann im Einzelnen nicht eruiert werden." },
    { id: "akt-aufnahme", label: "Abstinent seit Aufnahme", text: "Aktuell abstinent seit Aufnahme am {{aufnahme}}." }
  ],
  sozial: [
    { id: "bezug", label: "Bezugspersonen", text: "{{anrede}} benennt als Bezugspersonen: … Die Beziehungen werden als … beschrieben." },
    { id: "wohnung", label: "Wohnsituation", text: "{{anrede}} lebe in … (eigene Wohnung / WG / obdachlos / bei Angehörigen) in …" },
    { id: "schulden", label: "Schulden / Schufa", text: "Es bestehen finanzielle Belastungen (Kredite / Schufa-Einträge). Die Schuldensituation belaste zusätzlich." },
    { id: "konsumumfeld", label: "Konsumierendes Umfeld", text: "Es bestehe ein konsumierendes soziales Umfeld." },
    { id: "kein-umfeld", label: "Kein soziales Umfeld", text: "Es bestehe aktuell kein belastbares soziales Umfeld. Bezugspersonen: …" }
  ],
  person: [
    { id: "eigenmotiviert", label: "Eigenmotivierte Aufnahme", text: "{{anrede}} kam eigenmotiviert in die hiesige Klinik, um eine Entgiftung zu absolvieren. {{pronomenCap}} zeigt Krankheitseinsicht und Behandlungsbereitschaft." },
    { id: "freiwillig-suizid", label: "Freiwillig nach Krise", text: "Freiwillige Aufnahme in der hiesigen Klinik. Krankheits- und Behandlungseinsicht deutlich erkennbar. {{anrede}} möchte therapeutische Hilfe in Anspruch nehmen." },
    { id: "zuverlaessig", label: "Zuverlässige Therapie", text: "{{anrede}} geht zuverlässig zu den Therapien. Krankheitseinsicht und Bereitschaft zur Veränderung sind vorhanden." },
    { id: "ueberfordert", label: "Aktuell überfordert", text: "{{anrede}} ist grundsätzlich eigenständig, aktuell seien die Probleme „über den Kopf gewachsen“; Unterstützung wird benötigt." },
    { id: "stationsalltag", label: "Stationsalltag", text: "{{anrede}} beteiligt sich am Stationsalltag, nimmt Kontakt zu Mitarbeitenden und Mitpatientinnen/Mitpatienten auf und zeigt Redebedarf." }
  ],
  vorbetreuung: [
    { id: "konstruktiv", label: "Konstruktive Beteiligung", text: "Konstruktive Beteiligung im Rahmen der stationären Entgiftungsbehandlung, mehrere Einzelgespräche zum therapeutischen Team sowie weitere therapeutische Gruppenangebote." },
    { id: "gruppen-einzel", label: "Gruppen und Einzel", text: "Teilnahme an stattfindenden Gruppentherapien und Einzelgesprächen." },
    { id: "entgiftung-therapien", label: "Entgiftung inkl. weiterer Therapien", text: "Im Rahmen der stationären Entgiftungsbehandlung stattfindende Einzelgespräche, Gruppengespräche sowie weitere Therapien." }
  ],
  ziele: [
    { id: "standard", label: "Standardziele", text: "Psychische Stabilisierung und Erlangen von Abstinenzfähigkeit, psychotherapeutische Behandlung im Kontext der Abhängigkeitserkrankung, gesünder leben, stabile Abstinenz erreichen, Tagesstruktur aufbauen, Eigenfürsorge und Eigenverantwortung erlernen, Abgrenzungsfähigkeit entwickeln, neue Lebensinhalte entdecken und ein positives Lebensgefühl erlangen." },
    { id: "arbeit-adaption", label: "Arbeit / Adaption", text: "Wiederaufnahme einer Erwerbstätigkeit (Adaption sollte in Erwägung gezogen werden)" },
    { id: "beruf-orient", label: "Berufliche Orientierung", text: "Lebensweg finden, berufliche Orientierung (Adaption sollte in Erwägung gezogen werden)" },
    { id: "trauer", label: "Trauer / Trauma", text: "Trauerbewältigung/Traumaverarbeitung, Lebensweg finden" },
    { id: "fitness", label: "Körperliche Fitness", text: "körperliche Fitness steigern" }
  ],
  schwerpunkt: [
    { id: "stat", label: "Stationär", text: "Stationäre Leistungsform für Abhängigkeiten" },
    { id: "nahtlos", label: "Nahtlos + Adaption", text: "Stationäre Leistungsform für Abhängigkeiten im Nahtlosverfahren sowie Adaption im Anschluss" },
    { id: "tagesklinik", label: "Tagesklinisch", text: "Ganztägig ambulante / tagesklinische Leistungsform für Abhängigkeiten" },
    { id: "ambulant", label: "Ambulant", text: "Ambulante Leistungsform für Abhängigkeiten" },
    { id: "teilhabe", label: "Teilhabe", text: "- therapeutische Hilfen zur beruflichen Wiedereingliederung\n- Wiedereingliederung in die Gesellschaft\n- körperlich und seelisch fit werden\n- Nachsorge anbinden" }
  ],
  zusammen: [
    { id: "rahmen", label: "Rahmentext erzeugen", generate: "zusammenfassung" },
    { id: "motivation-gross", label: "Motivation groß", text: "Die Motivation von {{anrede}} wird als groß eingeschätzt.\nWir bitten um die Genehmigung der beantragten Maßnahme." },
    { id: "motivation-sehr", label: "Motivation sehr groß + Teilhabe", text: "Wir halten eine {{leistungsformAdj}} Rehabilitation für dringend erforderlich, um die soziale und berufliche Teilhabe langfristig wiederherzustellen. Die Motivation von {{anrede}} wird als sehr groß eingeschätzt. Wir bitten um die Genehmigung der beantragten Maßnahme." }
  ],
  hinder: [
    { id: "keine", label: "Keine Hinderungsgründe", text: "Keine." },
    { id: "bewaehrung", label: "Bewährung", text: "Aktuell Bewährung … Monate. Kontakt zur Bewährungshilfe. Auflage: kein Konsum." }
  ]
};

window.SDLZT_STANDARD_ZIELE = `Psychische Stabilisierung und Erlangen von Abstinenzfähigkeit, psychotherapeutische Behandlung im Kontext der Abhängigkeitserkrankung, gesünder leben, stabile Abstinenz erreichen, Tagesstruktur aufbauen, Eigenfürsorge und Eigenverantwortung erlernen, Abgrenzungsfähigkeit entwickeln, neue Lebensinhalte entdecken und ein positives Lebensgefühl erlangen.`;

window.SDLZT_F1 = (function () {
  const kategorien = [
    ["F10", "Alkohol", "Psychische und Verhaltensstörungen durch Alkohol"],
    ["F11", "Opioide", "Psychische und Verhaltensstörungen durch Opioide"],
    ["F12", "Cannabinoide", "Psychische und Verhaltensstörungen durch Cannabinoide"],
    ["F13", "Sedativa / Hypnotika", "Psychische und Verhaltensstörungen durch Sedativa oder Hypnotika"],
    ["F14", "Kokain", "Psychische und Verhaltensstörungen durch Kokain"],
    ["F15", "andere Stimulanzien", "Psychische und Verhaltensstörungen durch andere Stimulanzien, einschließlich Koffein"],
    ["F16", "Halluzinogene", "Psychische und Verhaltensstörungen durch Halluzinogene"],
    ["F17", "Tabak", "Psychische und Verhaltensstörungen durch Tabak"],
    ["F18", "flüchtige Lösungsmittel", "Psychische und Verhaltensstörungen durch flüchtige Lösungsmittel"],
    ["F19", "multipler Substanzgebrauch", "Psychische und Verhaltensstörungen durch multiplen Substanzgebrauch und Konsum anderer psychotroper Substanzen"],
  ];
  const specifiers = [
    ["0", "Akute Intoxikation"],
    ["1", "Schädlicher Gebrauch"],
    ["2", "Abhängigkeitssyndrom"],
    ["3", "Entzugssyndrom"],
    ["4", "Entzugssyndrom mit Delir"],
    ["5", "Psychotische Störung"],
    ["6", "Amnesiesyndrom"],
    ["7", "Restzustand und verzögert auftretende psychotische Störung"],
    ["8", "Sonstige psychische und Verhaltensstörungen"],
    ["9", "Nicht näher bezeichnete psychische und Verhaltensstörung"],
  ];
  return kategorien.map(([code, kurz, full]) => ({
    code,
    kurz,
    full,
    title: code + " " + kurz,
    items: specifiers.map(([n, name]) => {
      const icd = code + "." + n;
      return {
        code: icd,
        name,
        kurz,
        label: icd + " " + name + " (" + kurz + ")",
      };
    }),
  }));
})();
