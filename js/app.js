(function () {
  const STORAGE_CASES = "sdlzt.cases.v1";
  const STORAGE_SETTINGS = "sdlzt.settings.v1";
  const STORAGE_CURRENT = "sdlzt.current.v1";

  const defaultSettings = () => ({
    einrichtung: "AWO Psychiatriezentrum Königslutter",
    strasse: "Vor dem Kaiserdom 10",
    plz: "38154",
    ort: "Königslutter",
    telefon: "05353-901472",
    telefax: "05353-901095",
    email: "malin.langer@awo-apz.de",
    berufAufnehmend: "Sozialarbeiterin (B.A.)",
    nameAufnehmend: "M. Langer",
    station: "",
  });

  const emptyCase = () => ({
    id: uid(),
    titel: "Neuer Antrag",
    titelCustom: false,
    erstellt: new Date().toISOString(),
    geaendert: new Date().toISOString(),
    stammdaten: {
      nachname: "",
      vorname: "",
      geburtsname: "",
      geburtsdatum: "",
      geburtsort: "",
      geburtsland: "",
      staatsangehoerigkeit: "deutsch",
      geschlecht: "",
      strasse: "",
      adresszusatz: "",
      plz: "",
      ort: "",
      land: "Deutschland",
      telefon: "",
      telefax: "",
      familienstand: "",
      vsnr: "",
      kennzeichen: "",
      msatMsnr: "",
      kkName: "",
      kkVsnr: "",
      kkStrasse: "",
      kkAdresszusatz: "",
      kkPlz: "",
      kkOrt: "",
      kkTelefon: "",
      kkArt: "gesetzlich",
      kkIk: "",
      aufnahmeDatum: "",
      entlassungDatum: "",
      aufenthaltsort: "s.o.",
      aufenthaltserlaubnis: false,
      behandelnde: "",
      arztName: "",
      arztVorname: "",
      arztStrasse: "",
      arztPlz: "",
      arztOrt: "",
      arztTelefon: "",
      suchtAlkohol: false,
      suchtMedikamente: false,
      suchtDrogen: false,
      suchtNichtStoff: false,
      suchtSonstiges: false,
      suchtSonstigesText: "",
      diagnose: "",
      diagnosen: [],
      leistungsform: "stationaer",
      nahtlos: false,
      adaption: false,
      antragArt: "Erstantrag",
      erwerbstaetigkeit: "",
      berufsstellung: "",
      arbeitVorAntrag: "",
      arbeitslosSeit: "",
    },
    g0100: {
      aufforderung: "nein",
      leistungMedReha: false,
      leistungMedRehaForm: "",
      leistungAbhaengig: true,
      mitnahmePflege: "nein",
      wunsch1: "",
      wunsch2: "",
      wunsch3: "",
      beitragDRV: "ja",
      auslandsbeitrag: "nein",
      auslandsbeitragAktuell: "nein",
      auslandStaat: "",
      auslandVom: "",
      auslandBis: "",
      jobcenter: "nein",
      jobcenterName: "",
      beamter: "nein",
      rente: "nein",
      renteTraeger: "",
      leistungBisAltersrente: "nein",
      leistungArt: "",
      gesundheitAnerkannt: "nein",
      gesundheitStelle: "",
      gesundheitAktenz: "",
      gesundheitStoerung: "",
      gesundheitAntrag: "nein",
      gesundheitAntragStelle: "",
      regress: "nein",
      schaden: "nein",
      schadenAm: "",
      schadenStelle: "",
      schadenAktenz: "",
      reha4Jahre: "nein",
      rehaStelle: "",
      rehaAktenz: "",
      rehaVom: "",
      rehaBis: "",
      mutterVater: "nein",
      mutterVaterAm: "",
      mutterVaterKk: "",
      mutterVaterAktenz: "",
      vertretung: "nein",
      vertretungArt: "",
      vertretungName: "",
      vertretungStrasse: "",
      vertretungPlz: "",
      vertretungOrt: "",
      vertretungTelefon: "",
      kommunikation: "nein",
      kommunikationHilfe: "",
      dokuGrossdruck: false,
      dokuKurzschrift: false,
      dokuVollschrift: false,
      dokuCd: false,
      dokuDaisy: false,
      kkUebernehmen: false,
      kkName18: "",
      kkIk: "",
      nachweis: "",
      ortDatum: "",
      unterschrift: "",
    },
    g0110: {
      auDauer: "",
      auRowCount: 1,
      au1Zeit: "",
      au1Wegen: "",
      au2Zeit: "",
      au2Wegen: "",
      au3Zeit: "",
      au3Wegen: "",
      au4Zeit: "",
      au4Wegen: "",
      probleme: "",
      andereStoerungen: "nein",
      andereStoerungenArt: "",
      andereZeit: "",
      schwerbehinderung: "nein",
      behinderungArt: "",
      gdb: "",
      merkzeichen: "",
      behindSeit: "",
      zukunftBerufJa: false,
      zukunftBerufNein: false,
      zukunftAndere: false,
      zukunftKeine: false,
      agName: "",
      beschSeit: "",
      mitarbeiter: "",
      taetigkeit: "",
      stehend: "",
      gehend: "",
      sitzend: "",
      gebueckt: "",
      arme: "",
      kniend: "",
      geruest: "",
      lastenArt: "",
      gewichtHaeufig: "",
      gewichtGelegentlich: "",
      hebehilfe: "nein",
      hebehilfeWelche: "",
      bemerkArbeit: "",
      stdWoche: "",
      ganztags: false,
      teilzeit: false,
      azModelle: false,
      azModell: "",
      fruehspaet: false,
      dreischicht: false,
      nachtschicht: false,
      starrerTakt: false,
      einzelakkord: false,
      gruppenakkord: false,
      kaelte: false,
      hitze: false,
      staub: false,
      rauch: false,
      laerm: false,
      laermschutz: false,
      erschuetterung: false,
      gerueche: false,
      geruecheWelche: "",
      hautreiz: false,
      hautreizWelche: "",
      atemreiz: false,
      atemreizWelche: "",
      freien: false,
      rohbau: false,
      witterung: false,
      pkw: false,
      lkw: false,
      baumasch: false,
      personenbef: false,
      gefahrgut: false,
      publikum: false,
      reise: false,
      auswaerts: false,
      fuehrung: false,
      unfall: false,
      konzent: false,
      anfahrt: false,
      anfahrtMin: "",
      keinePausen: false,
      bildschirm: false,
      sehvermoegen: false,
      einschraenkungen: "",
      arbeitsplatzBem: "",
      arzt1: "",
      fach1: "",
      erk1: "",
      arzt2: "",
      fach2: "",
      erk2: "",
      arzt3: "",
      fach3: "",
      erk3: "",
      begutachtung: "nein",
      begutWann: "",
      begutStelle: "",
      vorsorge: "nein",
      vorsorgeWegen: "",
      betriebsarzt: "nein",
      betriebsarztName: "",
      betriebsarztTel: "",
      betriebsarztAnschr: "",
      einwillBetrieb: "",
      ortDatum: "",
      unterschrift: "",
    },
    g0450: {
      entgiftZahl: "",
      letzteKlinik: "",
      letzteVon: "",
      letzteBis: "",
      reha1Name: "",
      reha1Art: "",
      reha1Jahr: "",
      reha1Regulaer: "",
      reha2Name: "",
      reha2Art: "",
      reha2Jahr: "",
      reha2Regulaer: "",
      reha3Name: "",
      reha3Art: "",
      reha3Jahr: "",
      reha3Regulaer: "",
      reha4Name: "",
      reha4Art: "",
      reha4Jahr: "",
      reha4Regulaer: "",
      anamnese: "",
      substanzen: {},
      schaedigungen: "",
      entzugSymptome: {},
      abstinenz: "",
      aktuellAbstinent: "ja",
      abstinentSeit: "",
      substitution: "",
      rehaUnterSubstitution: "nein",
      entwicklung: "",
      umwelt: "",
      personbezogen: "",
      kinderAnzahl: "",
      kinderAlter: "",
      kinderHaushalt: "",
      Werdegang: "",
      letzteTaetigkeit: "",
      letzteTaetigkeitCustom: false,
      arbeitslosSeit: "",
      hinderung: "",
      beratungAm: "",
      beratungEinr: "",
      beratungArt: "",
      letzterKontakt: "",
      rehaZiele: "",
      erneuteBeantragung: "",
      schwerpunkt: "",
      wunschLeistform: "",
      zusammenfassung: "",
      ortDatum: "",
    },
    g0452: {
      traegerDRV: true,
      traegerKK: false,
      traegerEingliederung: false,
      traegerEinrichtung: true,
      ortDatum1: "",
      unterschrift1: "",
      ortDatum2: "",
      unterschrift2: "",
    },
  });

  const HALTUNG = [
    ["stehend", "stehend"],
    ["gehend", "gehend"],
    ["sitzend", "sitzend"],
    ["gebueckt", "gebückt"],
    ["arme", "Arme über Brusthöhe"],
    ["kniend", "kniend / hockend"],
    ["geruest", "auf Gerüsten / Leitern"],
  ];

  // Some browsers restrict localStorage for file:// documents. Keep the UI usable
  // even then; users can explicitly export/import local JSON backups.
  let persistenceUnavailable = false;
  function storedGet(key) {
    try { return window.localStorage.getItem(key); }
    catch (_) { persistenceUnavailable = true; return null; }
  }
  function storedSet(key, value) {
    try { window.localStorage.setItem(key, value); }
    catch (_) { persistenceUnavailable = true; }
  }

  let settings = loadJson(STORAGE_SETTINGS, defaultSettings());
  let cases = loadJson(STORAGE_CASES, []);
  let currentId = storedGet(STORAGE_CURRENT);
  let current = cases.find((c) => c.id === currentId) || cases[0] || null;
  let lastFocus = null;
  let statusTimer = null;

  function mergeMissing(target, source) {
    if (!target || typeof target !== "object" || Array.isArray(target)) return;
    Object.keys(source).forEach((k) => {
      const src = source[k];
      if (src && typeof src === "object" && !Array.isArray(src)) {
        if (target[k] == null || typeof target[k] !== "object" || Array.isArray(target[k])) target[k] = {};
        mergeMissing(target[k], src);
      } else if (target[k] === undefined) {
        target[k] = src;
      }
    });
  }
  function migrateCase(c) {
    if (!c) return;
    const blank = emptyCase();
    ["stammdaten", "g0100", "g0110", "g0450", "g0452"].forEach((k) => {
      if (!c[k] || typeof c[k] !== "object") c[k] = blank[k];
      else mergeMissing(c[k], blank[k]);
    });
    const n = c.g0110;
    ["gebueckt", "arme", "kniend", "geruest"].forEach((k) => {
      if (n[k] === true) n[k] = "zeitweise";
      if (n[k] === false) n[k] = "";
    });
    let rows = Number(n.auRowCount) || 1;
    for (let i = 4; i >= 1; i--) {
      if (n["au" + i + "Zeit"] || n["au" + i + "Wegen"]) {
        rows = Math.max(rows, i);
        break;
      }
    }
    n.auRowCount = Math.min(4, Math.max(1, rows));
    if (!c.g0450.substanzen || typeof c.g0450.substanzen !== "object") c.g0450.substanzen = {};
    if (!c.g0450.entzugSymptome || typeof c.g0450.entzugSymptome !== "object") c.g0450.entzugSymptome = {};
    if (!Array.isArray(c.stammdaten.diagnosen)) c.stammdaten.diagnosen = [];
    if (
      c.g0450.letzteTaetigkeit &&
      c.g0450.letzteTaetigkeit !== (c.g0110.taetigkeit || "")
    ) {
      c.g0450.letzteTaetigkeitCustom = true;
    }
  }

  function uid() {
    return "c-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }
  function loadJson(key, fallback) {
    try {
      const raw = storedGet(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function saveAll() {
    if (current) current.geaendert = new Date().toISOString();
    storedSet(STORAGE_SETTINGS, JSON.stringify(settings));
    storedSet(STORAGE_CASES, JSON.stringify(cases));
    if (current) storedSet(STORAGE_CURRENT, current.id);
  }
  function setStatus(msg, ok) {
    document.querySelectorAll("[data-status]").forEach((el) => {
      el.textContent = msg;
      el.classList.toggle("ok", !!ok);
    });
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      document.querySelectorAll("[data-status]").forEach((el) => (el.textContent = ""));
    }, 2500);
  }

  function get(obj, path) {
    return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
  }
  function set(obj, path, value) {
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function anredeParts() {
    const s = current.stammdaten;
    const female = s.geschlecht === "weiblich";
    const diverse = s.geschlecht === "divers" || s.geschlecht === "ohne";
    const anrede = female ? "Frau" : diverse ? (s.vorname || s.nachname || "die Person") : "Herr";
    const name = [s.nachname, s.vorname].filter(Boolean).join(", ") || "—";
    const kurz = s.nachname ? `${anrede} ${s.nachname}` : anrede;
    return {
      anrede: kurz,
      anredeWort: female ? "Frau" : diverse ? "" : "Herr",
      name: s.nachname || "",
      vorname: s.vorname || "",
      vollname: [s.vorname, s.nachname].filter(Boolean).join(" "),
      nameKomma: name,
      pronomen: female ? "sie" : diverse ? "die Person" : "er",
      pronomenCap: female ? "Sie" : diverse ? "Die Person" : "Er",
      poss: female ? "ihre" : diverse ? "deren" : "seine",
      aufnahme: formatDate(s.aufnahmeDatum) || "…",
      diagnose: formatDiagnose(s),
      leistungsform: leistungsformLabel(s.leistungsform),
      leistungsformAdj: leistungsformAdj(s.leistungsform),
      antragArt: s.antragArt || "Erstantrag",
      einrichtung: settings.einrichtung,
      ort: settings.ort,
      heute: formatDate(new Date()),
      behandlung: "qualifizierter Entgiftung",
    };
  }

  function f1Catalog() {
    return window.SDLZT_F1 || [];
  }
  function f1ByCode(code) {
    for (const cat of f1Catalog()) {
      const item = cat.items.find((it) => it.code === code);
      if (item) return item;
    }
    return null;
  }
  function selectedDiagnosen(s) {
    const src = s || (current && current.stammdaten) || {};
    return (Array.isArray(src.diagnosen) ? src.diagnosen : [])
      .slice()
      .sort((a, b) => String(a).localeCompare(String(b), "de", { numeric: true }));
  }
  function diagnoseLabels(s) {
    return selectedDiagnosen(s)
      .map((code) => {
        const it = f1ByCode(code);
        return it ? it.label : code;
      })
      .filter(Boolean);
  }
  function formatDiagnose(s) {
    const labels = diagnoseLabels(s);
    if (labels.length === 1) return labels[0];
    if (labels.length > 1) return labels.slice(0, -1).join(", ") + " sowie " + labels[labels.length - 1];
    return (s && s.diagnose) || diagnoseFromSucht(s);
  }
  function syncDiagnoseText() {
    const s = current.stammdaten;
    const labels = diagnoseLabels(s);
    s.diagnose = labels.length ? formatDiagnose(s) : "";
  }
  function diagnoseFromSucht(s) {
    const parts = [];
    if (s.suchtAlkohol) parts.push("Alkoholabhängigkeit");
    if (s.suchtMedikamente) parts.push("Medikamentenabhängigkeit");
    if (s.suchtDrogen) parts.push("Drogenabhängigkeit");
    if (s.suchtNichtStoff) parts.push("nicht stoffgebundene Abhängigkeit");
    if (s.suchtSonstiges && s.suchtSonstigesText) parts.push(s.suchtSonstigesText);
    return parts.join(", ") || "Abhängigkeitserkrankung";
  }
  function leistungsformLabel(v) {
    return {
      stationaer: "stationär",
      tagesklinisch: "ganztägig ambulant / tagesklinisch",
      ambulant: "ambulant",
      kombination: "Kombinationsbehandlung",
    }[v] || v || "stationär";
  }
  function leistungsformAdj(v) {
    return {
      stationaer: "stationäre",
      tagesklinisch: "ganztägig ambulante / tagesklinische",
      ambulant: "ambulante",
      kombination: "kombinierte",
    }[v] || "stationäre";
  }
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  function formatDate(v) {
    if (!v) return "";
    if (v instanceof Date && !isNaN(v.getTime())) {
      return `${pad2(v.getDate())}.${pad2(v.getMonth() + 1)}.${v.getFullYear()}`;
    }
    const s = String(v).trim();
    let m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[3]}.${m[2]}.${m[1]}`;
    m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (m) return `${pad2(m[1])}.${pad2(m[2])}.${m[3]}`;
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (a > 12) return `${pad2(a)}.${pad2(b)}.${m[3]}`;
      if (b > 12) return `${pad2(b)}.${pad2(a)}.${m[3]}`;
      return `${pad2(a)}.${pad2(b)}.${m[3]}`;
    }
    m = s.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (m) return `${m[1]}.${m[2]}.${m[3]}`;
    return s;
  }
  function isoToInput(v) {
    return formatDate(v);
  }

  function applyTokens(text) {
    const p = anredeParts();
    return String(text || "").replace(/\{\{(\w+)\}\}/g, (_, k) => (p[k] != null ? p[k] : ""));
  }

  function zusammenfassungText() {
    const p = anredeParts();
    const s = current.stammdaten;
    const extra = [];
    if (s.nahtlos) extra.push("Die Maßnahme soll im Nahtlosverfahren erfolgen.");
    if (s.adaption) extra.push("Im Anschluss sollte eine Adaption in Erwägung gezogen werden.");
    const n = diagnoseLabels(s).length;
    const intro =
      n > 1
        ? `Bei ${p.anrede} bestehen die behandlungsbedürftigen Diagnosen ${p.diagnose}, gegenüber denen ${p.pronomen} sich krankheitseinsichtig und veränderungsbereit zeigt.`
        : n === 1
          ? `Bei ${p.anrede} besteht die behandlungsbedürftige Diagnose ${p.diagnose}, gegenüber dieser ${p.pronomen} sich krankheitseinsichtig und veränderungsbereit zeigt.`
          : `Bei ${p.anrede} besteht eine behandlungsbedürftige ${p.diagnose}, gegenüber dieser ${p.pronomen} sich krankheitseinsichtig und veränderungsbereit zeigt.`;
    return [
      `${intro} ${p.anrede} befindet sich seit dem ${p.aufnahme} in stationärer Behandlung zwecks ${p.behandlung}.`,
      `Es handelt sich hierbei um einen ${p.antragArt} für eine ${p.leistungsformAdj} Leistung zur medizinischen Rehabilitation für Abhängigkeitserkrankte für ${p.anrede}. Die Indikation für eine medizinische Rehabilitation für Abhängigkeitskranke (siehe Arztbericht) besteht.`,
      extra.join(" "),
      `Die Motivation von ${p.anrede} wird als groß eingeschätzt.\nWir bitten um die Genehmigung der beantragten Maßnahme.`,
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  function ensureCase() {
    if (!current) {
      current = emptyCase();
      cases.unshift(current);
      saveAll();
    }
  }

  function renderAuRows() {
    const host = document.getElementById("au-periods");
    if (!host) return;
    const n = current.g0110;
    let count = Number(n.auRowCount) || 1;
    for (let i = 4; i >= 1; i--) {
      if (n["au" + i + "Zeit"] || n["au" + i + "Wegen"]) {
        count = Math.max(count, i);
        break;
      }
    }
    count = Math.min(4, Math.max(1, count));
    n.auRowCount = count;
    const rows = [];
    for (let i = 1; i <= count; i++) {
      const actions =
        i === count
          ? `<div class="au-actions">${
              count < 4
                ? `<button type="button" class="btn icon" data-au-add title="Zeitraum hinzufügen">+</button>`
                : ""
            }${
              count > 1
                ? `<button type="button" class="btn icon" data-au-remove title="Zeitraum entfernen">−</button>`
                : ""
            }</div>`
          : `<div class="au-actions"></div>`;
      rows.push(
        `<div class="au-row">
          <label class="field">Zeitraum ${i} (von – bis)<input type="text" data-bind="g0110.au${i}Zeit" placeholder="z. B. 01.01.2026 – 20.01.2026" /></label>
          <label class="field">wegen<input type="text" data-bind="g0110.au${i}Wegen" /></label>
          ${actions}
        </div>`
      );
    }
    host.innerHTML = rows.join("");
  }

  function renderHaltung() {
    const host = document.getElementById("haltung-grid");
    if (!host) return;
    if (host.dataset.ready === "1") return;
    const opts = ["ständig", "überwiegend", "zeitweise"];
    host.innerHTML =
      `<div></div><div class="h-head">ständig</div><div class="h-head">überwiegend</div><div class="h-head">zeitweise</div>` +
      HALTUNG.map(([key, label]) => {
        return (
          `<div class="h-label">${escapeHtml(label)}</div>` +
          opts
            .map(
              (o) =>
                `<label><input type="radio" name="halt-${key}" value="${o}" data-bind="g0110.${key}" /></label>`
            )
            .join("")
        );
      }).join("");
    host.dataset.ready = "1";
  }

  function renderSubstanzBuilder() {
    const checks = document.getElementById("substanz-checks");
    const details = document.getElementById("substanz-details");
    if (!checks || !details) return;
    const list = window.SDLZT_SUBSTANZEN || [];
    if (checks.dataset.ready !== "1") {
      checks.innerHTML = list
        .map(
          (s) =>
            `<label><input type="checkbox" data-bind="g0450.substanzen.${s.id}.on" /> ${escapeHtml(s.label)}</label>`
        )
        .join("");
      details.innerHTML = list
        .map(
          (s) =>
            `<div class="substanz-card" data-substanz-panel="${s.id}" hidden>
              <strong>${escapeHtml(s.label)}</strong>
              <div class="grid cols-3">
                <label class="field">Beginn des Konsums<input type="text" data-bind="g0450.substanzen.${s.id}.beginn" placeholder="Jahr oder Alter" /></label>
                <label class="field">Aktuelle Dosis<input type="text" data-bind="g0450.substanzen.${s.id}.dosis" /></label>
                <label class="field">Verlauf über die letzten Jahre<input type="text" data-bind="g0450.substanzen.${s.id}.verlauf" /></label>
              </div>
            </div>`
        )
        .join("");
      checks.dataset.ready = "1";
    }
    updateSubstanzPanels();
  }

  function updateSubstanzPanels() {
    const map = (current.g0450 && current.g0450.substanzen) || {};
    document.querySelectorAll("[data-substanz-panel]").forEach((el) => {
      const d = map[el.getAttribute("data-substanz-panel")];
      el.hidden = !(d && d.on);
    });
  }

  function renderEntzugBuilder() {
    const host = document.getElementById("entzug-checks");
    if (!host) return;
    const list = window.SDLZT_ENTZUG || [];
    if (host.dataset.ready !== "1") {
      host.innerHTML = list
        .map(
          (s) =>
            `<label><input type="checkbox" data-bind="g0450.entzugSymptome.${s.id}" /> ${escapeHtml(s.label)}</label>`
        )
        .join("");
      host.dataset.ready = "1";
    }
  }

  function renderDiagnosePicker() {
    const host = document.getElementById("diagnose-tree");
    if (!host) return;
    if (host.dataset.ready !== "1") {
      host.innerHTML = f1Catalog()
        .map(
          (cat) =>
            `<div class="diag-cat" data-diag-group="${cat.code}">
              <button type="button" class="diag-cat-btn" data-diag-cat="${cat.code}" aria-expanded="false">
                <span class="diag-chevron">▸</span>
                <span class="diag-cat-title">${escapeHtml(cat.code)} ${escapeHtml(cat.kurz)}</span>
                <span class="diag-cat-count" data-diag-count="${cat.code}"></span>
              </button>
              <div class="diag-items">
                ${cat.items
                  .map(
                    (it) =>
                      `<label><input type="checkbox" data-diag-code="${it.code}" /> <span><strong>${escapeHtml(it.code)}</strong> ${escapeHtml(it.name)}</span></label>`
                  )
                  .join("")}
              </div>
            </div>`
        )
        .join("");
      host.dataset.ready = "1";
    }
    updateDiagnoseUi();
  }

  function updateDiagnoseUi() {
    const selected = selectedDiagnosen();
    const set = new Set(selected);
    document.querySelectorAll("[data-diag-code]").forEach((el) => {
      el.checked = set.has(el.getAttribute("data-diag-code"));
    });
    f1Catalog().forEach((cat) => {
      const n = cat.items.filter((it) => set.has(it.code)).length;
      const badge = document.querySelector(`[data-diag-count="${cat.code}"]`);
      if (badge) badge.textContent = n ? String(n) : "";
    });
    const btn = document.getElementById("btn-diagnose-toggle");
    if (btn) {
      btn.textContent = selected.length
        ? selected.length + (selected.length === 1 ? " F1-Diagnose ausgewählt ▾" : " F1-Diagnosen ausgewählt ▾")
        : "F1-Diagnosen auswählen ▾";
    }
    const pills = document.getElementById("diagnose-pills");
    if (pills) {
      pills.innerHTML = diagnoseLabels()
        .map((label, i) => {
          const code = selected[i];
          return `<span class="diag-pill">${escapeHtml(label)} <button type="button" data-diag-remove="${escapeHtml(code)}" aria-label="Entfernen">×</button></span>`;
        })
        .join("");
    }
  }

  function setDiagnoseChecked(code, on) {
    const s = current.stammdaten;
    if (!Array.isArray(s.diagnosen)) s.diagnosen = [];
    const i = s.diagnosen.indexOf(code);
    if (on && i < 0) s.diagnosen.push(code);
    if (!on && i >= 0) s.diagnosen.splice(i, 1);
    syncDiagnoseText();
    updateDiagnoseUi();
  }

  function updateEntzugChecks() {}

  function substanzSatz() {
    const p = anredeParts();
    const list = window.SDLZT_SUBSTANZEN || [];
    const parts = [];
    list.forEach((s) => {
      const d = (current.g0450.substanzen || {})[s.id];
      if (!d || !d.on) return;
      const bits = [];
      if (d.beginn) bits.push("Beginn des Konsums " + d.beginn);
      if (d.dosis) bits.push("aktuelle Dosis " + d.dosis);
      if (d.verlauf) bits.push("Verlauf über die letzten Jahre: " + d.verlauf);
      parts.push(s.label + (bits.length ? ": " + bits.join("; ") : "") + ".");
    });
    if (!parts.length) return "";
    return p.anrede + " berichtet über folgenden Substanzgebrauch:\n\n" + parts.join("\n");
  }

  function entzugSatz() {
    const list = window.SDLZT_ENTZUG || [];
    const sel = current.g0450.entzugSymptome || {};
    const symptome = [];
    const vorbekannt = [];
    list.forEach((s) => {
      if (!sel[s.id]) return;
      if (s.kind === "vorbekannt") {
        vorbekannt.push(s.id === "delirium" ? "Delirium" : "Krampfanfall");
      } else {
        symptome.push(s.label);
      }
    });
    const chunks = [];
    if (symptome.length === 1) {
      chunks.push("Es bestehen folgende Entzugssymptome: " + symptome[0] + ".");
    } else if (symptome.length > 1) {
      const last = symptome.pop();
      chunks.push("Es bestehen folgende Entzugssymptome: " + symptome.join(", ") + " und " + last + ".");
    }
    if (vorbekannt.length === 1) chunks.push(vorbekannt[0] + " ist vorbekannt.");
    else if (vorbekannt.length > 1) chunks.push(vorbekannt.join(" und ") + " sind vorbekannt.");
    return chunks.join(" ");
  }

  function insertGeneratedText(selector, text, replace) {
    const ta = document.querySelector(selector);
    if (!ta || !text) {
      setStatus(text ? "Kein Zieltextfeld gefunden" : "Bitte zuerst Angaben auswählen", false);
      return;
    }
    if (replace || !ta.value.trim()) {
      ta.value = text;
    } else {
      const sep = ta.value.endsWith("\n") ? "" : "\n";
      ta.value = ta.value + sep + text;
    }
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    ta.classList.add("flash-target");
    setTimeout(() => ta.classList.remove("flash-target"), 700);
  }

  function bindAll() {
    migrateCase(current);
    if (!current.g0450.letzteTaetigkeitCustom && current.g0110.taetigkeit) {
      current.g0450.letzteTaetigkeit = current.g0110.taetigkeit;
    }
    renderAuRows();
    renderHaltung();
    renderSubstanzBuilder();
    renderEntzugBuilder();
    renderDiagnosePicker();
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const path = el.getAttribute("data-bind");
      const from = el.getAttribute("data-from") || "case";
      const src = from === "settings" ? settings : current;
      let val = get(src, path);
      if (el.type === "checkbox") {
        if (el.value && el.value !== "on") el.checked = val === el.value || val === true;
        else el.checked = !!val;
      } else if (el.type === "radio") {
        el.checked = String(val) === el.value;
      } else if (el.type === "date" || el.hasAttribute("data-date")) {
        el.value = isoToInput(val || "");
      } else {
        el.value = val == null ? "" : val;
      }
    });
    document.querySelectorAll("[data-fill]").forEach((el) => {
      el.textContent = displayValue(el.getAttribute("data-fill"));
    });
    if (!current.titelCustom) {
      const n = [current.stammdaten.nachname, current.stammdaten.vorname].filter(Boolean).join(", ");
      if (n) current.titel = n;
    }
    renderCaseList();
    renderPrint();
    updateDerivedHints();
    updateAnfahrtMin();
  }

  function displayValue(key) {
    const s = current.stammdaten;
    const map = {
      name: [s.nachname, s.vorname].filter(Boolean).join(", ") || "—",
      geburtsdatum: formatDate(s.geburtsdatum) || "—",
      vsnr: s.vsnr || "—",
      kk: s.kkName || "—",
      kkVsnr: s.kkVsnr || "—",
      adresse: [s.strasse, [s.plz, s.ort].filter(Boolean).join(" ")].filter(Boolean).join(", ") || "—",
      einrichtung: settings.einrichtung,
      einrichtungAdresse: `${settings.strasse}, ${settings.plz} ${settings.ort}`,
      aufnehmend: `${settings.nameAufnehmend}, ${settings.berufAufnehmend}`,
      leistungsform: leistungsformLabel(s.leistungsform),
      diagnose: formatDiagnose(s),
      sucht: suchtLabels(s).join(", ") || "—",
      aufnahme: formatDate(s.aufnahmeDatum) || "—",
      entlassung: formatDate(s.entlassungDatum) || "—",
      beruf: [s.erwerbstaetigkeit, s.berufsstellung].filter(Boolean).join(" · ") || "—",
      arzt: [s.arztVorname, s.arztName].filter(Boolean).join(" ") || "—",
    };
    return map[key] ?? "";
  }
  function suchtLabels(s) {
    const out = [];
    if (s.suchtAlkohol) out.push("Alkohol");
    if (s.suchtMedikamente) out.push("Medikamente");
    if (s.suchtDrogen) out.push("Drogen");
    if (s.suchtNichtStoff) out.push("nicht stoffgebunden");
    if (s.suchtSonstiges) out.push(s.suchtSonstigesText || "Sonstiges");
    return out;
  }

  function onInput(e) {
    const el = e.target;
    if (el.hasAttribute("data-diag-code")) {
      setDiagnoseChecked(el.getAttribute("data-diag-code"), el.checked);
      saveAll();
      document.querySelectorAll("[data-fill]").forEach((n) => (n.textContent = displayValue(n.getAttribute("data-fill"))));
      renderPrint();
      updateDerivedHints();
      return;
    }
    if (!el.hasAttribute("data-bind")) return;
    const path = el.getAttribute("data-bind");
    const from = el.getAttribute("data-from") || "case";
    const src = from === "settings" ? settings : current;
    let value;
    if (el.type === "checkbox" && el.dataset.group) {
      value = el.checked;
      set(src, path, value);
    } else if (el.type === "checkbox") {
      value = el.checked;
      set(src, path, value);
    } else {
      value = el.hasAttribute("data-date") ? formatDate(el.value) || el.value : el.value;
      set(src, path, value);
      if (el.hasAttribute("data-date") && value && value !== el.value) el.value = value;
    }
    if (path === "stammdaten.leistungsform") applyLeistungsformDefaults();
    if (path === "g0110.taetigkeit" && !current.g0450.letzteTaetigkeitCustom) {
      current.g0450.letzteTaetigkeit = current.g0110.taetigkeit || "";
      const el = document.querySelector('[data-bind="g0450.letzteTaetigkeit"]');
      if (el) el.value = current.g0450.letzteTaetigkeit;
    }
    if (path === "g0450.letzteTaetigkeit") current.g0450.letzteTaetigkeitCustom = true;
    if (path === "g0110.anfahrt") updateAnfahrtMin();
    if (path === "stammdaten.arbeitslosSeit" && !current.g0450.arbeitslosSeit) {
      current.g0450.arbeitslosSeit = current.stammdaten.arbeitslosSeit;
    }
    if (path === "stammdaten.nachname" || path === "stammdaten.vorname") {
      const n = [current.stammdaten.nachname, current.stammdaten.vorname].filter(Boolean).join(", ");
      if (!current.titelCustom) current.titel = n || "Neuer Antrag";
    }
    if (path === "g0100.kkUebernehmen") {
      if (value) {
        current.g0100.kkName18 = current.stammdaten.kkName || "";
        current.g0100.kkIk = current.stammdaten.kkIk || "";
        const nameEl = document.querySelector('[data-bind="g0100.kkName18"]');
        const ikEl = document.querySelector('[data-bind="g0100.kkIk"]');
        if (nameEl) nameEl.value = current.g0100.kkName18;
        if (ikEl) ikEl.value = current.g0100.kkIk;
      } else {
        current.g0100.kkName18 = "";
        current.g0100.kkIk = "";
        const nameEl = document.querySelector('[data-bind="g0100.kkName18"]');
        const ikEl = document.querySelector('[data-bind="g0100.kkIk"]');
        if (nameEl) nameEl.value = "";
        if (ikEl) ikEl.value = "";
      }
    }
    if (current.g0100.kkUebernehmen && (path === "stammdaten.kkName" || path === "stammdaten.kkIk")) {
      current.g0100.kkName18 = current.stammdaten.kkName || "";
      current.g0100.kkIk = current.stammdaten.kkIk || "";
    }
    if (path === "stammdaten.aufnahmeDatum") {
      const formatted = formatDate(current.stammdaten.aufnahmeDatum);
      const complete = /^\d{2}\.\d{2}\.\d{4}$/.test(formatted);
      if (complete) {
        if (!current.g0450.abstinentSeit || !/^\d{2}\.\d{2}\.\d{4}$/.test(String(current.g0450.abstinentSeit))) {
          current.g0450.abstinentSeit = formatted;
        }
        if (!current.g0450.letzteVon || !/^\d{2}\.\d{2}\.\d{4}$/.test(String(current.g0450.letzteVon))) {
          current.g0450.letzteVon = formatted;
        }
        if (!current.g0450.letzteKlinik) current.g0450.letzteKlinik = settings.einrichtung;
      }
    }
    saveAll();
    renderCaseList();
    document.querySelectorAll(`[data-fill]`).forEach((n) => (n.textContent = displayValue(n.getAttribute("data-fill"))));
    renderPrint();
    updateDerivedHints();
  }

  function heuteOrtDatum() {
    return `${settings.ort}, ${formatDate(new Date())}`;
  }

  function applyHeutigeUnterschriften() {
    const v = heuteOrtDatum();
    current.g0100.ortDatum = v;
    current.g0110.ortDatum = v;
    current.g0450.ortDatum = v;
    current.g0452.ortDatum1 = v;
    current.g0452.ortDatum2 = v;
  }

  function updateAnfahrtMin() {
    const box = document.getElementById("anfahrt-min");
    if (!box) return;
    box.classList.toggle("open", !!current.g0110.anfahrt);
  }

  function applyLeistungsformDefaults() {
    const lf = current.stammdaten.leistungsform;
    current.g0100.leistungAbhaengig = true;
    if (!current.g0450.schwerpunkt) {
      const map = {
        stationaer: "Stationäre Leistungsform für Abhängigkeiten",
        tagesklinisch: "Ganztägig ambulante / tagesklinische Leistungsform für Abhängigkeiten",
        ambulant: "Ambulante Leistungsform für Abhängigkeiten",
        kombination: "Kombinationsbehandlung für Abhängigkeiten",
      };
      current.g0450.schwerpunkt = map[lf] || map.stationaer;
      const el = document.querySelector('[data-bind="g0450.schwerpunkt"]');
      if (el) el.value = current.g0450.schwerpunkt;
    }
  }

  function updateDerivedHints() {
    const n = document.getElementById("hint-shared");
    if (!n) return;
    const s = current.stammdaten;
    n.innerHTML = `<b>${[s.nachname, s.vorname].filter(Boolean).join(", ") || "noch ohne Namen"}</b>
      · geb. ${formatDate(s.geburtsdatum) || "—"}
      · VSNR ${s.vsnr || "—"}
      · ${leistungsformLabel(s.leistungsform)}
      · ${suchtLabels(s).join(", ") || "Suchtform offen"}`;
  }

  function showView(id) {
    document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + id));
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === id));
    window.scrollTo(0, 0);
  }

  function renderCaseList() {
    const box = document.getElementById("case-list");
    if (!box) return;
    box.innerHTML = cases
      .map((c) => {
        const s = c.stammdaten || {};
        const label = [s.nachname, s.vorname].filter(Boolean).join(", ") || c.titel || "Ohne Namen";
        const sub = `${leistungsformLabel(s.leistungsform)} · ${formatDate(s.aufnahmeDatum) || "ohne Aufnahmedatum"}`;
        return `<button class="case-item ${c.id === current.id ? "active" : ""}" data-open="${c.id}"><b>${escapeHtml(label)}</b><small>${escapeHtml(sub)}</small></button>`;
      })
      .join("");
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function isBlankCase(c) {
    if (!c) return false;
    const s = c.stammdaten || {};
    return !s.nachname && !s.vorname && !s.vsnr && (c.titel === "Neuer Antrag" || !c.titel);
  }

  function newCase() {
    if (isBlankCase(current)) {
      bindAll();
      showView("stammdaten");
      setStatus("Leerer Antrag ist bereits geöffnet", true);
      return;
    }
    current = emptyCase();
    current.g0450.letzteKlinik = settings.einrichtung;
    applyLeistungsformDefaults();
    cases.unshift(current);
    saveAll();
    bindAll();
    showView("stammdaten");
    setStatus("Neuer Antrag angelegt", true);
  }

  function openCase(id) {
    const found = cases.find((c) => c.id === id);
    if (!found) return;
    current = found;
    saveAll();
    bindAll();
  }

  function deleteCurrent() {
    if (!confirm("Diesen Antrag unwiderruflich aus dem Browser löschen?")) return;
    cases = cases.filter((c) => c.id !== current.id);
    current = cases[0] || null;
    if (!current) newCase();
    else {
      saveAll();
      bindAll();
    }
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ settings, fall: current }, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    const name = [current.stammdaten.nachname, current.stammdaten.vorname].filter(Boolean).join("_") || "antrag";
    a.href = URL.createObjectURL(blob);
    a.download = `Therapieantrag_${name}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("JSON gespeichert", true);
  }

  function exportAllJson() {
    const blob = new Blob(
      [JSON.stringify({ format: "sdlzt-backup-v1", exportedAt: new Date().toISOString(), settings, cases }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SD_LZT_Gesamtsicherung_" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setStatus("Gesamtsicherung erstellt", true);
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.format === "sdlzt-backup-v1" && Array.isArray(data.cases)) {
          if (!confirm("Gesamtsicherung importieren? Die Fälle werden zusätzlich zu vorhandenen Fällen eingefügt.")) return;
          if (data.settings) settings = { ...defaultSettings(), ...data.settings };
          const incoming = data.cases.filter((c) => c && c.stammdaten).map((c) => {
            c.id = uid();
            migrateCase(c);
            return c;
          });
          if (!incoming.length) throw new Error("Keine gültigen Fälle in der Sicherung");
          cases = incoming.concat(cases);
          current = incoming[0];
          saveAll();
          bindAll();
          setStatus(incoming.length + " Fälle importiert", true);
          return;
        }
        if (data.settings) settings = { ...defaultSettings(), ...data.settings };
        const fall = data.fall || data;
        if (!fall.stammdaten) throw new Error("Keine Stammdaten");
        fall.id = uid();
        fall.geaendert = new Date().toISOString();
        current = fall;
        cases.unshift(current);
        saveAll();
        bindAll();
        setStatus("Antrag importiert", true);
      } catch (err) {
        alert("Datei konnte nicht gelesen werden: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resolveBausteinTarget(btn) {
    const host = btn.closest("[data-bausteine]");
    if (host) {
      const sel = host.getAttribute("data-target");
      if (sel) {
        const el = document.querySelector(sel);
        if (el) return el;
      }
      const nearby = host.parentElement && host.parentElement.querySelector("textarea, input[type='text']");
      if (nearby) return nearby;
    }
    if (lastFocus && (lastFocus.tagName === "TEXTAREA" || lastFocus.tagName === "INPUT")) return lastFocus;
    return document.querySelector(".view.active textarea");
  }

  function insertBaustein(btn, text, generate) {
    const value = generate === "zusammenfassung" ? zusammenfassungText() : applyTokens(text);
    const ta = resolveBausteinTarget(btn);
    if (!ta) {
      setStatus("Kein Zieltextfeld gefunden", false);
      return;
    }
    const replace = generate === "zusammenfassung" || btn.dataset.replace === "1";
    if (replace) {
      ta.value = value;
    } else {
      const hasSelection =
        typeof ta.selectionStart === "number" &&
        typeof ta.selectionEnd === "number" &&
        document.activeElement === ta &&
        ta.selectionStart !== ta.selectionEnd;
      const start = hasSelection ? ta.selectionStart : ta.value.length;
      const end = hasSelection ? ta.selectionEnd : start;
      const sep = ta.value && start === ta.value.length && !ta.value.endsWith("\n") ? "\n" : "";
      ta.value = ta.value.slice(0, start) + sep + value + ta.value.slice(end);
      const pos = start + sep.length + value.length;
      ta.focus();
      if (typeof ta.setSelectionRange === "function") ta.setSelectionRange(pos, pos);
    }
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    lastFocus = ta;
    ta.classList.add("flash-target");
    setTimeout(() => ta.classList.remove("flash-target"), 700);
  }

  function renderBausteine() {
    document.querySelectorAll("[data-bausteine]").forEach((host) => {
      const group = host.getAttribute("data-bausteine");
      const items = (window.SDLZT_BAUSTEINE || {})[group] || [];
      host.innerHTML = items
        .map(
          (it) =>
            `<button type="button" class="btn chip" data-baustein="${it.id}" data-group="${group}">${escapeHtml(it.label)}</button>`
        )
        .join("");
    });
  }

  function kv(label, value) {
    return `<div>${escapeHtml(label)}</div><div>${escapeHtml(value || "—")}</div>`;
  }
  function box(title, inner) {
    return `<div class="print-box"><h3>${escapeHtml(title)}</h3>${inner}</div>`;
  }

  function renderPrint() {
    const s = current.stammdaten;
    const g = current.g0450;
    const a = current.g0100;
    const n = current.g0110;
    const e = current.g0452;
    const name = [s.nachname, s.vorname].filter(Boolean).join(", ");
    const header = (nr, titel, seite) =>
      `<div class="print-head"><div><b>${nr}</b><div>${titel}</div></div><div>${settings.einrichtung}<br>VSNR ${escapeHtml(s.vsnr || "—")}<br>${seite}</div></div>`;

    document.getElementById("print-g0450").innerHTML = `
      <section class="print-page">${header("G0450", "Sozialbericht – Psychosoziale Grunddaten", "Seite 1 von 5")}
        ${box("Beratungsstelle / Einrichtung", `<div class="print-kv">${kv("Name", settings.einrichtung)}${kv("Anschrift", settings.strasse)}${kv("PLZ / Ort", settings.plz + " " + settings.ort)}${kv("Telefon / Fax", settings.telefon + " / " + settings.telefax)}${kv("E-Mail", settings.email)}${kv("Aufnehmende Person", settings.nameAufnehmend + ", " + settings.berufAufnehmend)}</div>`)}
        ${box("1 Angaben zur Person", `<div class="print-kv">${kv("Name, Vorname", name)}${kv("Geburtsdatum", formatDate(s.geburtsdatum))}${kv("Versicherungsnummer", s.vsnr)}${kv("Krankenkasse", s.kkName)}${kv("Versicherten-Nr. KK", s.kkVsnr)}${kv("Suchtform", suchtLabels(s).join(", "))}${kv("Sonstiges", s.suchtSonstigesText)}${kv("Aufenthaltsort", s.aufenthaltsort)}${kv("Behandelnde", s.behandelnde)}</div>`)}
      </section>
      <section class="print-page">${header("G0450", "Sozialbericht – Psychosoziale Grunddaten", "Seite 2 von 5")}
        ${box("2 Vorbehandlung", `<div class="print-kv">${kv("Entgiftungen gesamt", g.entgiftZahl)}${kv("Letzte Klinik", g.letzteKlinik)}${kv("von / bis", (g.letzteVon || "") + " – " + (g.letzteBis || ""))}${kv("Reha 1", [g.reha1Name, g.reha1Art, g.reha1Jahr, g.reha1Regulaer].filter(Boolean).join(" · "))}${kv("Reha 2", [g.reha2Name, g.reha2Art, g.reha2Jahr].filter(Boolean).join(" · "))}${kv("Reha 3", [g.reha3Name, g.reha3Art, g.reha3Jahr].filter(Boolean).join(" · "))}${kv("Reha 4", [g.reha4Name, g.reha4Art, g.reha4Jahr].filter(Boolean).join(" · "))}</div>`)}
        ${box("3 Anamnese der Abhängigkeitserkrankung", `<p class="muted">3.1 Anamnesedaten</p><div class="keep">${escapeHtml(g.anamnese)}</div><p class="muted">3.2 Körperliche Schädigungen und psychische Störungen</p><div class="keep">${escapeHtml(g.schaedigungen)}</div><p class="muted">3.3 Abstinenzphasen</p><div class="keep">${escapeHtml(g.abstinenz)}</div><div class="print-kv">${kv("aktuell abstinent", g.aktuellAbstinent)}${kv("abstinent seit", g.abstinentSeit)}${kv("Substitution", g.substitution)}${kv("Reha unter Substitution", g.rehaUnterSubstitution)}</div>`)}
      </section>
      <section class="print-page">${header("G0450", "Sozialbericht – Psychosoziale Grunddaten", "Seite 3 von 5")}
        ${box("4 Sozialanamnese", `<p class="muted">4.1 Biographische und familiäre Ereignisse</p><div class="keep">${escapeHtml(g.entwicklung)}</div><p class="muted">4.2 Umweltfaktoren</p><div class="keep">${escapeHtml(g.umwelt)}</div><p class="muted">Personbezogene Faktoren</p><div class="keep">${escapeHtml(g.personbezogen)}</div><div class="print-kv">${kv("Kinder Anzahl / Alter", (g.kinderAnzahl || "—") + " / " + (g.kinderAlter || "—"))}${kv("davon im Haushalt", g.kinderHaushalt)}</div><p class="muted">4.4 Schulischer und beruflicher Werdegang</p><div class="keep">${escapeHtml(g.Werdegang)}</div><div class="print-kv">${kv("letzte Tätigkeit", g.letzteTaetigkeit)}${kv("arbeitslos seit", g.arbeitslosSeit)}</div>`)}
      </section>
      <section class="print-page">${header("G0450", "Sozialbericht – Psychosoziale Grunddaten", "Seite 4 von 5")}
        ${box("4.5 Hinderungsgründe", `<div class="keep">${escapeHtml(g.hinderung)}</div>`)}
        ${box("5 Vorbetreuung / Beratung", `<div class="print-kv">${kv("Beginn am", g.beratungAm)}${kv("Einrichtung", g.beratungEinr)}${kv("letzter Kontakt", g.letzterKontakt)}</div><p class="muted">Art und Umfang</p><div class="keep">${escapeHtml(g.beratungArt)}</div>`)}
        ${box("6 Rehabilitationsziele und Behandlungsbereitschaft", `<div class="keep">${escapeHtml(g.rehaZiele)}</div><p class="muted">Bei erneuter Beantragung</p><div class="keep">${escapeHtml(g.erneuteBeantragung)}</div>`)}
      </section>
      <section class="print-page">${header("G0450", "Sozialbericht – Psychosoziale Grunddaten", "Seite 5 von 5")}
        ${box("7 Leistungsform / Einrichtung", `<p class="muted">7.1 Schwerpunktsetzung</p><div class="keep">${escapeHtml(g.schwerpunkt)}</div><p class="muted">7.2 Wünsche</p><div class="keep">${escapeHtml(g.wunschLeistform)}</div>`)}
        ${box("8 Zusammenfassung", `<div class="keep">${escapeHtml(g.zusammenfassung)}</div><p>Das Formular G0452 liegt vor.</p><div class="print-kv">${kv("Ort, Datum", g.ortDatum)}${kv("Aufnehmende Person", settings.nameAufnehmend)}</div>`)}
      </section>`;

    document.getElementById("print-g0100").innerHTML = `
      <section class="print-page">${header("G0100", "Antrag auf Leistungen zur Teilhabe – Rehabilitationsantrag", "Seite 1")}
        ${box("1 Beantragte Leistung", `<div class="print-kv">${kv("Aufforderung zur Antragstellung", a.aufforderung)}${kv("Leistung Abhängigkeitserkrankungen", a.leistungAbhaengig ? "ja" : "nein")}${kv("Leistungsform", leistungsformLabel(s.leistungsform))}${kv("allg. med. Reha", a.leistungMedReha ? "ja, " + (a.leistungMedRehaForm || "") : "nein")}${kv("Nahtlosverfahren", s.nahtlos ? "ja" : "nein")}${kv("Adaption", s.adaption ? "ja" : "nein")}</div>`)}
        ${box("2 / 3 Mitnahme und Wunschkliniken", `<div class="print-kv">${kv("Mitnahme pflegebedürftige Person", a.mitnahmePflege)}${kv("Wunsch 1", a.wunsch1)}${kv("Wunsch 2", a.wunsch2)}${kv("Wunsch 3", a.wunsch3)}</div>`)}
      </section>
      <section class="print-page">${header("G0100", "Angaben zur Person", "Seite 2")}
        ${box("4 Person", `<div class="print-kv">${kv("Name", s.nachname)}${kv("Vorname", s.vorname)}${kv("Geburtsname", s.geburtsname)}${kv("Geburtsdatum", formatDate(s.geburtsdatum))}${kv("Geschlecht", s.geschlecht)}${kv("Geburtsort / -land", [s.geburtsort, s.geburtsland].filter(Boolean).join(", "))}${kv("Staatsangehörigkeit", s.staatsangehoerigkeit)}${kv("Straße", s.strasse)}${kv("PLZ / Ort", s.plz + " " + s.ort)}${kv("Telefon", s.telefon)}${kv("Familienstand", s.familienstand)}</div>`)}
        ${box("5–7 Beruf", `<div class="print-kv">${kv("letzte Erwerbstätigkeit", s.erwerbstaetigkeit)}${kv("Stellung im Beruf", s.berufsstellung)}${kv("Arbeit vor Antrag", s.arbeitVorAntrag)}</div>`)}
        ${box("8–9 Krankenkasse / Arzt", `<div class="print-kv">${kv("Krankenkasse", s.kkName)}${kv("KK-Art", s.kkArt)}${kv("KK-Anschrift", [s.kkStrasse, s.kkPlz, s.kkOrt].filter(Boolean).join(", "))}${kv("Behandelnde/r Arzt/Ärztin", [s.arztName, s.arztVorname].filter(Boolean).join(", "))}${kv("Arzt-Anschrift", [s.arztStrasse, s.arztPlz, s.arztOrt].filter(Boolean).join(", "))}${kv("Arzt-Telefon", s.arztTelefon)}</div>`)}
      </section>
      <section class="print-page">${header("G0100", "Sozialversicherung und sonstige Angaben", "Seite 3")}
        ${box("10–12 Beiträge und sonstige Angaben", `<div class="print-kv">${kv("10.1 Beiträge DRV", a.beitragDRV)}${kv("10.2 Auslandsbeiträge", a.auslandsbeitrag)}${kv("Staat / vom / bis", [a.auslandStaat, a.auslandVom, a.auslandBis].filter(Boolean).join(" · "))}${kv("10.3 aktuell Ausland", a.auslandsbeitragAktuell)}${kv("11 Jobcenter", a.jobcenter + (a.jobcenterName ? " · " + a.jobcenterName : ""))}${kv("12.1 Beamtenversorgung", a.beamter)}${kv("12.2 Rente / Antrag", a.rente)}${kv("RV-Träger", a.renteTraeger)}${kv("12.4 anerkannte Gesundheitsstörungen", a.gesundheitAnerkannt)}${kv("Stelle / Aktenzeichen", [a.gesundheitStelle, a.gesundheitAktenz].filter(Boolean).join(" · "))}${kv("12.5 Regress / Unfall", a.regress)}${kv("Schadensersatz", a.schaden)}${kv("12.6 Reha letzte 4 Jahre", a.reha4Jahre)}${kv("Stelle zuletzt", a.rehaStelle)}${kv("Aktenzeichen", a.rehaAktenz)}${kv("vom / bis", [a.rehaVom, a.rehaBis].filter(Boolean).join(" – "))}${kv("12.7 Mutter-/Vater-Kind", a.mutterVater)}${kv("13 Vertretung", a.vertretung)}${kv("14 Kommunikationshilfe", a.kommunikation)}</div>`)}
        ${box("17 Unterschrift", `<div class="print-kv">${kv("Ort, Datum", a.ortDatum)}${kv("Unterschrift", a.unterschrift || name)}</div>`)}
        ${box("18 Angabe der gesetzlichen Krankenkasse", `<div class="print-kv">${kv("übernommen", a.kkUebernehmen ? "ja" : "nein")}${kv("Name der Krankenkasse", a.kkUebernehmen ? a.kkName18 : "")}${kv("Institutionskennzeichen", a.kkUebernehmen ? a.kkIk : "")}</div>`)}
      </section>`;

    document.getElementById("print-g0110").innerHTML = `
      <section class="print-page">${header("G0110", "Anlage zum Antrag auf Leistungen zur medizinischen Rehabilitation", "Seite 1")}
        ${box("Person", `<div class="print-kv">${kv("Name, Vorname", name)}${kv("Geburtsdatum", formatDate(s.geburtsdatum))}${kv("VSNR", s.vsnr)}</div>`)}
        ${box("1 Arbeitsunfähigkeit und gesundheitliche Probleme", `<div class="print-kv">${kv("1.1 AU letzte 12 Monate", n.auDauer)}${kv("Zeitraum 1", [n.au1Zeit, n.au1Wegen].filter(Boolean).join(" · "))}${kv("Zeitraum 2", [n.au2Zeit, n.au2Wegen].filter(Boolean).join(" · "))}${kv("Zeitraum 3", [n.au3Zeit, n.au3Wegen].filter(Boolean).join(" · "))}${kv("Zeitraum 4", [n.au4Zeit, n.au4Wegen].filter(Boolean).join(" · "))}${kv("Probleme im Vordergrund", n.probleme)}${kv("1.2 andere Gesundheitsstörungen", n.andereStoerungen)}${kv("1.3 Schwerbehinderung", n.schwerbehinderung)}${kv("GdB / Merkzeichen", [n.gdb, n.merkzeichen].filter(Boolean).join(" / "))}</div>`)}
        ${box("2 Berufliche Zukunft", `<div>${[["im Beruf weiter", n.zukunftBerufJa], ["im Beruf nicht mehr", n.zukunftBerufNein], ["andere Arbeit", n.zukunftAndere], ["überhaupt nicht mehr", n.zukunftKeine]].filter((x) => x[1]).map((x) => "☐ " + x[0]).join("<br>") || "—"}</div>`)}
      </section>
      <section class="print-page">${header("G0110", "Arbeitsplatzbeschreibung", "Seite 2")}
        ${box("3 Arbeitsplatz", `<div class="print-kv">${kv("Arbeitgeber", n.agName)}${kv("beschäftigt seit", n.beschSeit)}${kv("Mitarbeiter", n.mitarbeiter)}${kv("Tätigkeit", n.taetigkeit)}${kv("Arbeitshaltung", ["stehend " + (n.stehend || ""), "gehend " + (n.gehend || ""), "sitzend " + (n.sitzend || "")].join(" · "))}${kv("Std./Woche", n.stdWoche)}${kv("Äußere Einflüsse", [["Kälte", n.kaelte], ["Hitze", n.hitze], ["Staub", n.staub], ["Rauch", n.rauch], ["Lärm", n.laerm], ["Lärmschutz", n.laermschutz], ["Erschütterung", n.erschuetterung], ["Gerüche", n.gerueche], ["Hautreiz", n.hautreiz], ["Atemreiz", n.atemreiz], ["im Freien", n.freien], ["Rohbau", n.rohbau], ["witterungsgeschützt", n.witterung]].filter((x) => x[1]).map((x) => x[0]).join(", "))}${kv("Einschränkungen", n.einschraenkungen)}</div><div class="keep">${escapeHtml(n.arbeitsplatzBem)}</div>`)}
        ${box("4–6 Ärzte / Begutachtung / Betriebsarzt", `<div class="print-kv">${kv("Arzt 1", [n.arzt1, n.fach1, n.erk1].filter(Boolean).join(" · "))}${kv("Arzt 2", [n.arzt2, n.fach2, n.erk2].filter(Boolean).join(" · "))}${kv("Begutachtung", n.begutachtung)}${kv("Betriebsarzt", n.betriebsarzt)}${kv("Einwilligung Betrieb", n.einwillBetrieb)}</div>`)}
        ${box("Unterschrift", `<div class="print-kv">${kv("Ort, Datum", n.ortDatum)}${kv("Unterschrift", n.unterschrift || name)}</div>`)}
      </section>`;

    document.getElementById("print-g0452").innerHTML = `
      <section class="print-page">${header("G0452", "Information und Einwilligungserklärung zum Sozialbericht", "Seite 1 von 3")}
        ${box("Person", `<div class="print-kv">${kv("Name, Vorname", name)}${kv("Geburtsdatum", formatDate(s.geburtsdatum))}${kv("VSNR", s.vsnr)}${kv("Krankenkasse", s.kkName)}${kv("Versicherten-Nr. KK", s.kkVsnr)}</div>`)}
        ${box("1 Information", `<p>Der Sozialbericht enthält persönliche Daten, Angaben zu behandelnden Ärzten und Erkrankung, zur persönlichen Situation, zum Verlauf der Beratung, zur Behandlungsbereitschaft, zu Rehabilitationszielen sowie zur gewünschten Durchführung.</p>`)}
        ${box("2 Einwilligung – Weiterleitung an", `<ul>
          <li>${e.traegerDRV ? "☒" : "☐"} dem Rentenversicherungsträger</li>
          <li>${e.traegerKK ? "☒" : "☐"} der Krankenkasse (MD)</li>
          <li>${e.traegerEingliederung ? "☒" : "☐"} dem Träger der Eingliederungshilfe</li>
          <li>${e.traegerEinrichtung ? "☒" : "☐"} der Rehabilitationseinrichtung</li>
        </ul>
        <div class="print-kv">${kv("Ort, Datum", e.ortDatum1)}${kv("Unterschrift Antragsteller/in", e.unterschrift1 || name)}${kv("Ort, Datum (2)", e.ortDatum2)}${kv("Unterschrift (2)", e.unterschrift2 || name)}</div>`)}
        <p class="muted">Seiten 2–3 des Originals enthalten die gesetzlichen Mitwirkungspflichten nach SGB I. Bitte das Original-PDF G0452 beilegen oder mit ausdrucken.</p>
      </section>`;
  }

  function printDoc(which) {
    document.body.classList.remove("print-g0100", "print-g0110", "print-g0450", "print-g0452", "print-all");
    document.body.classList.add("print-" + which);
    renderPrint();
    window.print();
  }

  function initEvents() {
    document.body.addEventListener("input", onInput);
    document.body.addEventListener("change", onInput);
    document.body.addEventListener("focusin", (e) => {
      if (e.target.tagName === "TEXTAREA") lastFocus = e.target;
    });
    document.body.addEventListener("blur", (e) => {
      if (e.target.hasAttribute && e.target.hasAttribute("data-date") && e.target.value) {
        const n = formatDate(e.target.value);
        if (n && n !== e.target.value) {
          e.target.value = n;
          e.target.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }, true);
    document.body.addEventListener("click", (e) => {
      const nav = e.target.closest(".nav-btn");
      if (nav) showView(nav.dataset.view);
      const open = e.target.closest("[data-open]");
      if (open) openCase(open.dataset.open);
      const viewBtn = e.target.closest("[data-go]");
      if (viewBtn) showView(viewBtn.dataset.go);
      const printBtn = e.target.closest("[data-print]");
      if (printBtn) printDoc(printBtn.dataset.print);
      const pdfBtn = e.target.closest("[data-pdf]");
      if (pdfBtn) {
        if (!window.SDLZT_PDF) {
          alert("PDF-Bibliothek konnte nicht geladen werden.");
          return;
        }
        pdfBtn.disabled = true;
        window.SDLZT_PDF.download(pdfBtn.dataset.pdf, current, settings)
          .then(() => setStatus("Originalformular gespeichert", true))
          .catch((err) => {
            console.error(err);
            alert(err.message || String(err));
          })
          .finally(() => {
            pdfBtn.disabled = false;
          });
      }
      const b = e.target.closest("[data-baustein]");
      if (b) {
        const items = window.SDLZT_BAUSTEINE[b.dataset.group] || [];
        const it = items.find((x) => x.id === b.dataset.baustein);
        if (it) insertBaustein(b, it.text, it.generate);
      }
      if (e.target.closest("[data-au-add]")) {
        const n = current.g0110;
        n.auRowCount = Math.min(4, (Number(n.auRowCount) || 1) + 1);
        bindAll();
        return;
      }
      if (e.target.closest("[data-au-remove]")) {
        const n = current.g0110;
        const i = Number(n.auRowCount) || 1;
        if (i > 1) {
          n["au" + i + "Zeit"] = "";
          n["au" + i + "Wegen"] = "";
          n.auRowCount = i - 1;
          bindAll();
        }
        return;
      }
      if (e.target.closest("#btn-substanz-satz")) {
        insertGeneratedText('[data-bind="g0450.anamnese"]', substanzSatz());
        return;
      }
      if (e.target.closest("#btn-entzug-toggle")) {
        const panel = document.getElementById("entzug-panel");
        if (panel) panel.classList.toggle("open");
        return;
      }
      if (e.target.closest("#btn-diagnose-toggle")) {
        const panel = document.getElementById("diagnose-panel");
        const btn = document.getElementById("btn-diagnose-toggle");
        if (panel) {
          const open = !panel.classList.contains("open");
          panel.classList.toggle("open", open);
          if (btn) btn.classList.toggle("open", open);
          if (open) {
            const set = new Set(selectedDiagnosen());
            document.querySelectorAll("[data-diag-group]").forEach((box) => {
              const cat = f1Catalog().find((c) => c.code === box.getAttribute("data-diag-group"));
              const has = !!(cat && cat.items.some((it) => set.has(it.code)));
              box.classList.toggle("open", has);
              const catBtn = box.querySelector("[data-diag-cat]");
              if (catBtn) catBtn.setAttribute("aria-expanded", has ? "true" : "false");
            });
          }
        }
        return;
      }
      const catBtn = e.target.closest("[data-diag-cat]");
      if (catBtn) {
        const box = catBtn.closest(".diag-cat");
        if (box) {
          const open = !box.classList.contains("open");
          box.classList.toggle("open", open);
          catBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }
        return;
      }
      const remove = e.target.closest("[data-diag-remove]");
      if (remove) {
        setDiagnoseChecked(remove.getAttribute("data-diag-remove"), false);
        saveAll();
        document.querySelectorAll("[data-fill]").forEach((n) => (n.textContent = displayValue(n.getAttribute("data-fill"))));
        renderPrint();
        updateDerivedHints();
        return;
      }
      if (!e.target.closest("#diagnose-panel")) {
        const panel = document.getElementById("diagnose-panel");
        const btn = document.getElementById("btn-diagnose-toggle");
        if (panel) panel.classList.remove("open");
        if (btn) btn.classList.remove("open");
      }
      if (e.target.closest("#btn-entzug-satz")) {
        insertGeneratedText('[data-bind="g0450.schaedigungen"]', entzugSatz());
        return;
      }
    });
    document.getElementById("btn-new").addEventListener("click", newCase);
    document.getElementById("btn-delete").addEventListener("click", deleteCurrent);
    document.getElementById("btn-export").addEventListener("click", exportJson);
    const exportAllButton = document.getElementById("btn-export-all");
    if (exportAllButton) exportAllButton.addEventListener("click", exportAllJson);
    document.getElementById("btn-import").addEventListener("change", (e) => {
      if (e.target.files[0]) importJson(e.target.files[0]);
      e.target.value = "";
    });
    document.getElementById("btn-save").addEventListener("click", () => {
      saveAll();
      setStatus("Lokal gespeichert", true);
    });
    document.querySelectorAll("[data-generate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const kind = btn.dataset.generate;
        const target = document.querySelector(btn.dataset.target);
        if (kind === "zusammenfassung") {
          current.g0450.zusammenfassung = zusammenfassungText();
          if (target) target.value = current.g0450.zusammenfassung;
        } else if (kind === "ziele") {
          current.g0450.rehaZiele = window.SDLZT_STANDARD_ZIELE;
          if (target) target.value = current.g0450.rehaZiele;
        } else if (kind === "ortdatum") {
          const val = heuteOrtDatum();
          if (target) {
            target.value = val;
            target.dispatchEvent(new Event("input", { bubbles: true }));
            setStatus("Ort und Datum eingefügt", true);
            return;
          }
        } else if (kind === "ortdatum-beide") {
          const val = heuteOrtDatum();
          current.g0452.ortDatum1 = val;
          current.g0452.ortDatum2 = val;
          const a = document.querySelector('[data-bind="g0452.ortDatum1"]');
          const b = document.querySelector('[data-bind="g0452.ortDatum2"]');
          if (a) a.value = val;
          if (b) b.value = val;
          saveAll();
          setStatus("Ort und Datum eingefügt", true);
          return;
        }
        saveAll();
        bindAll();
      });
    });
  }

  function boot() {
    if (!cases.length) {
      current = emptyCase();
      current.g0450.letzteKlinik = settings.einrichtung;
      applyLeistungsformDefaults();
      cases = [current];
      saveAll();
    } else {
      cases.forEach(migrateCase);
      ensureCase();
      migrateCase(current);
    }
    renderBausteine();
    initEvents();
    bindAll();
    showView("start");
    if (persistenceUnavailable) {
      alert("Der Browser erlaubt für diese lokale HTML-Datei keine dauerhafte Speicherung. Bitte Fälle und Gesamtsicherung regelmäßig als JSON exportieren. PDF-Export funktioniert trotzdem.");
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
