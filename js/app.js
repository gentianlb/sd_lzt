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
      regress: "nein",
      schaden: "nein",
      schadenAm: "",
      schadenStelle: "",
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
      nachweis: "",
      ortDatum: "",
      unterschrift: "",
    },
    g0110: {
      auDauer: "",
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
      gebueckt: false,
      arme: false,
      kniend: false,
      geruest: false,
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
      schaedigungen: "",
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

  let settings = loadJson(STORAGE_SETTINGS, defaultSettings());
  let cases = loadJson(STORAGE_CASES, []);
  let currentId = localStorage.getItem(STORAGE_CURRENT);
  let current = cases.find((c) => c.id === currentId) || cases[0] || null;
  let lastFocus = null;
  let statusTimer = null;

  function uid() {
    return "c-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }
  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function saveAll() {
    if (current) current.geaendert = new Date().toISOString();
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    localStorage.setItem(STORAGE_CASES, JSON.stringify(cases));
    if (current) localStorage.setItem(STORAGE_CURRENT, current.id);
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
      diagnose: s.diagnose || diagnoseFromSucht(s),
      leistungsform: leistungsformLabel(s.leistungsform),
      leistungsformAdj: leistungsformAdj(s.leistungsform),
      antragArt: s.antragArt || "Erstantrag",
      einrichtung: settings.einrichtung,
      ort: settings.ort,
      heute: formatDate(new Date()),
      behandlung: "qualifizierter Entgiftung",
    };
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
  function formatDate(v) {
    if (!v) return "";
    if (v instanceof Date) {
      const d = v;
      return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const [y, m, d] = v.split("-");
      return `${d}.${m}.${y}`;
    }
    return v;
  }
  function isoToInput(v) {
    if (!v) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    const m = String(v).match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : v;
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
    return [
      `Bei ${p.anrede} besteht eine behandlungsbedürftige ${p.diagnose}, gegenüber dieser ${p.pronomen} sich krankheitseinsichtig und veränderungsbereit zeigt. ${p.anrede} befindet sich seit dem ${p.aufnahme} in stationärer Behandlung zwecks ${p.behandlung}.`,
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

  function bindAll() {
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
      } else if (el.type === "date") {
        el.value = isoToInput(val || "");
      } else {
        el.value = val == null ? "" : val;
      }
    });
    document.querySelectorAll("[data-fill]").forEach((el) => {
      el.textContent = displayValue(el.getAttribute("data-fill"));
    });
    const title = document.getElementById("case-title");
    if (title) title.value = current.titel || "";
    renderCaseList();
    renderPrint();
    updateDerivedHints();
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
      diagnose: s.diagnose || diagnoseFromSucht(s),
      sucht: suchtLabels(s).join(", ") || "—",
      aufnahme: formatDate(s.aufnahmeDatum) || "—",
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
    if (el.id === "case-title") {
      current.titel = el.value;
      saveAll();
      renderCaseList();
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
      value = el.value;
      set(src, path, value);
    }
    if (path === "stammdaten.leistungsform") applyLeistungsformDefaults();
    if (path === "stammdaten.erwerbstaetigkeit" && !current.g0450.letzteTaetigkeit) {
      current.g0450.letzteTaetigkeit = current.stammdaten.erwerbstaetigkeit;
    }
    if (path === "stammdaten.arbeitslosSeit" && !current.g0450.arbeitslosSeit) {
      current.g0450.arbeitslosSeit = current.stammdaten.arbeitslosSeit;
    }
    if ((path === "stammdaten.nachname" || path === "stammdaten.vorname") && (!current.titel || current.titel === "Neuer Antrag")) {
      const n = [current.stammdaten.nachname, current.stammdaten.vorname].filter(Boolean).join(", ");
      if (n) current.titel = n;
      const title = document.getElementById("case-title");
      if (title && n) title.value = n;
    }
    if (path === "stammdaten.aufnahmeDatum") {
      if (!current.g0450.abstinentSeit) current.g0450.abstinentSeit = formatDate(current.stammdaten.aufnahmeDatum);
      if (!current.g0450.letzteVon) current.g0450.letzteVon = formatDate(current.stammdaten.aufnahmeDatum);
      if (!current.g0450.letzteKlinik) current.g0450.letzteKlinik = settings.einrichtung;
    }
    saveAll();
    document.querySelectorAll(`[data-fill]`).forEach((n) => (n.textContent = displayValue(n.getAttribute("data-fill"))));
    renderPrint();
    updateDerivedHints();
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

  function newCase() {
    current = emptyCase();
    current.g0450.letzteKlinik = settings.einrichtung;
    current.g0450.beratungEinr = settings.station
      ? `${settings.einrichtung} ${settings.station}`
      : settings.einrichtung;
    current.g0450.rehaZiele = window.SDLZT_STANDARD_ZIELE;
    current.g0450.ortDatum = `${settings.ort}, ${formatDate(new Date())}`;
    current.g0100.ortDatum = `${settings.ort}, ${formatDate(new Date())}`;
    current.g0452.ortDatum1 = `${settings.ort}, ${formatDate(new Date())}`;
    current.g0452.ortDatum2 = `${settings.ort}, ${formatDate(new Date())}`;
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

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
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

  function insertBaustein(text, generate) {
    const value = generate === "zusammenfassung" ? zusammenfassungText() : applyTokens(text);
    const ta = lastFocus && lastFocus.tagName === "TEXTAREA" ? lastFocus : document.querySelector(".view.active textarea");
    if (!ta) {
      navigator.clipboard.writeText(value);
      setStatus("In Zwischenablage kopiert", true);
      return;
    }
    const start = ta.selectionStart || ta.value.length;
    const end = ta.selectionEnd || start;
    const sep = ta.value && !ta.value.endsWith("\n") && start === ta.value.length ? "\n" : "";
    ta.value = ta.value.slice(0, start) + sep + value + ta.value.slice(end);
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    ta.focus();
    const pos = start + sep.length + value.length;
    ta.setSelectionRange(pos, pos);
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
        ${box("10–12", `<div class="print-kv">${kv("Beiträge DRV", a.beitragDRV)}${kv("Auslandsbeiträge", a.auslandsbeitrag)}${kv("aktuell Ausland", a.auslandsbeitragAktuell)}${kv("Jobcenter", a.jobcenter + (a.jobcenterName ? " · " + a.jobcenterName : ""))}${kv("Beamtenversorgung", a.beamter)}${kv("Rente / Antrag", a.rente)}${kv("RV-Träger", a.renteTraeger)}${kv("anerkannte Gesundheitsstörungen", a.gesundheitAnerkannt)}${kv("Regress / Unfall", a.regress)}${kv("Schadensersatz", a.schaden)}${kv("Reha letzte 4 Jahre", a.reha4Jahre)}${kv("Mutter-/Vater-Kind", a.mutterVater)}${kv("Vertretung", a.vertretung)}${kv("Kommunikationshilfe", a.kommunikation)}</div>`)}
        ${box("Unterschrift", `<div class="print-kv">${kv("Ort, Datum", a.ortDatum)}${kv("Unterschrift", a.unterschrift || name)}</div>`)}
      </section>`;

    document.getElementById("print-g0110").innerHTML = `
      <section class="print-page">${header("G0110", "Anlage zum Antrag auf Leistungen zur medizinischen Rehabilitation", "Seite 1")}
        ${box("Person", `<div class="print-kv">${kv("Name, Vorname", name)}${kv("Geburtsdatum", formatDate(s.geburtsdatum))}${kv("VSNR", s.vsnr)}</div>`)}
        ${box("1 Arbeitsunfähigkeit und gesundheitliche Probleme", `<div class="print-kv">${kv("AU letzte 12 Monate", n.auDauer)}${kv("Zeiten / wegen", [n.au1Zeit, n.au1Wegen].filter(Boolean).join(" · "))}${kv("Probleme im Vordergrund", n.probleme)}${kv("andere Gesundheitsstörungen", n.andereStoerungen)}${kv("Schwerbehinderung", n.schwerbehinderung)}${kv("GdB / Merkzeichen", [n.gdb, n.merkzeichen].filter(Boolean).join(" / "))}</div>`)}
        ${box("2 Berufliche Zukunft", `<div>${[["im Beruf weiter", n.zukunftBerufJa], ["im Beruf nicht mehr", n.zukunftBerufNein], ["andere Arbeit", n.zukunftAndere], ["überhaupt nicht mehr", n.zukunftKeine]].filter((x) => x[1]).map((x) => "☐ " + x[0]).join("<br>") || "—"}</div>`)}
      </section>
      <section class="print-page">${header("G0110", "Arbeitsplatzbeschreibung", "Seite 2")}
        ${box("3 Arbeitsplatz", `<div class="print-kv">${kv("Arbeitgeber", n.agName)}${kv("beschäftigt seit", n.beschSeit)}${kv("Mitarbeiter", n.mitarbeiter)}${kv("Tätigkeit", n.taetigkeit)}${kv("Std./Woche", n.stdWoche)}${kv("Einschränkungen", n.einschraenkungen)}</div><div class="keep">${escapeHtml(n.arbeitsplatzBem)}</div>`)}
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
    document.body.addEventListener("click", (e) => {
      const nav = e.target.closest(".nav-btn");
      if (nav) showView(nav.dataset.view);
      const open = e.target.closest("[data-open]");
      if (open) openCase(open.dataset.open);
      const viewBtn = e.target.closest("[data-go]");
      if (viewBtn) showView(viewBtn.dataset.go);
      const printBtn = e.target.closest("[data-print]");
      if (printBtn) printDoc(printBtn.dataset.print);
      const b = e.target.closest("[data-baustein]");
      if (b) {
        const items = window.SDLZT_BAUSTEINE[b.dataset.group] || [];
        const it = items.find((x) => x.id === b.dataset.baustein);
        if (it) insertBaustein(it.text, it.generate);
      }
    });
    document.getElementById("btn-new").addEventListener("click", newCase);
    document.getElementById("btn-delete").addEventListener("click", deleteCurrent);
    document.getElementById("btn-export").addEventListener("click", exportJson);
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
          const val = `${settings.ort}, ${formatDate(new Date())}`;
          if (target) {
            target.value = val;
            target.dispatchEvent(new Event("input", { bubbles: true }));
            return;
          }
        } else if (kind === "beratung-einr") {
          current.g0450.beratungEinr = settings.station
            ? `${settings.einrichtung} ${settings.station}`
            : settings.einrichtung;
          if (target) target.value = current.g0450.beratungEinr;
        }
        saveAll();
        bindAll();
      });
    });
  }

  function boot() {
    if (!cases.length) {
      current = emptyCase();
      current.g0450.rehaZiele = window.SDLZT_STANDARD_ZIELE;
      current.g0450.letzteKlinik = settings.einrichtung;
      current.g0450.beratungEinr = settings.einrichtung;
      current.g0450.ortDatum = `${settings.ort}, ${formatDate(new Date())}`;
      applyLeistungsformDefaults();
      cases = [current];
      saveAll();
    } else {
      ensureCase();
    }
    renderBausteine();
    initEvents();
    bindAll();
    showView("start");
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
