(function (root) {
  const { PDFDocument, PDFName, StandardFonts } = root.PDFLib;

  function decodePdfName(name) {
    if (!name) return "";
    const enc = name.encodedName || String(name);
    const body = enc.startsWith("/") ? enc.slice(1) : enc;
    return body.replace(/#([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  }
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/ß/g, "ss")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/\s+/g, " ")
      .trim();
  }
  function winAnsi(s) {
    return String(s || "")
      .replace(/[–—]/g, "-")
      .replace(/[„“”«»]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/…/g, "...")
      .replace(/€/g, "EUR");
  }
  function compactDate(v) {
    const s = String(v || "").trim();
    const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (m) return m[1].padStart(2, "0") + m[2].padStart(2, "0") + m[3];
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return iso[3] + iso[2] + iso[1];
    return s.replace(/\D/g, "").slice(0, 8);
  }
  function germanDate(v) {
    if (!v) return "";
    if (v instanceof Date && !isNaN(v)) {
      const d = v;
      return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
    }
    const s = String(v).trim();
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return iso[3] + "." + iso[2] + "." + iso[1];
    const g = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (g) return g[1].padStart(2, "0") + "." + g[2].padStart(2, "0") + "." + g[3];
    return s;
  }
  function digits(s, n) {
    const d = String(s || "").replace(/\s+/g, "");
    return n ? d.slice(0, n) : d;
  }
  function vollname(s) {
    return [s.nachname, s.vorname].filter(Boolean).join(", ");
  }
  function heuteOrtDatum(settings) {
    const ort = settings && settings.ort ? settings.ort : "";
    const d = germanDate(new Date());
    return [ort, d].filter(Boolean).join(", ");
  }

  function setText(form, name, value) {
    if (value == null || value === "") return;
    let field;
    try {
      field = form.getTextField(name);
    } catch {
      return;
    }
    let v = winAnsi(String(value)).replace(/\r\n/g, "\r").replace(/\n/g, "\r");
    const max = field.getMaxLength();
    const low = name.toLowerCase();
    if (max === 8 && /\d/.test(v) && (low.includes("dat") || low.includes("geb") || /vom|bis|_trim/i.test(name))) {
      v = compactDate(v);
    }
    if (max && max <= 12 && (low.includes("vsnr") || low.includes("versnr"))) {
      v = digits(v, max);
    }
    if (max && v.length > max) v = v.slice(0, max);
    try {
      if (v.length > 80) field.setFontSize(8);
      else if (v.length > 40) field.setFontSize(9);
      field.setText(v);
    } catch {
      try {
        field.setText(v.replace(/[^\x20-\x7EÄÖÜäöüß.,;:!?()\/+\-]/g, " "));
      } catch (_) {}
    }
  }

  function setCheck(form, name, wanted) {
    let field;
    try {
      field = form.getField(name);
    } catch {
      return;
    }
    const acro = field.acroField;
    const widgets = acro.getWidgets();
    if (wanted === true) {
      try {
        field.check();
      } catch (_) {
        const on = widgets[0] && widgets[0].getOnValue();
        if (on) {
          acro.dict.set(PDFName.of("V"), on);
          widgets.forEach((w) => w.setAppearanceState(w.getOnValue() && w.getOnValue().toString() === on.toString() ? on : PDFName.of("Off")));
        }
      }
      return;
    }
    if (wanted === false || wanted == null || wanted === "") {
      try {
        field.uncheck();
      } catch (_) {}
      acro.dict.set(PDFName.of("V"), PDFName.of("Off"));
      widgets.forEach((w) => w.setAppearanceState(PDFName.of("Off")));
      return;
    }
    const wantedNorm = norm(wanted);
    let selected = null;
    for (const w of widgets) {
      const on = w.getOnValue();
      const d = norm(decodePdfName(on));
      if (d === wantedNorm) {
        selected = on;
        break;
      }
    }
    if (!selected) {
      for (const w of widgets) {
        const on = w.getOnValue();
        const d = norm(decodePdfName(on));
        if (d.includes(wantedNorm) || wantedNorm.length > 3 && wantedNorm.includes(d)) {
          selected = on;
          break;
        }
      }
    }
    if (!selected) return;
    acro.dict.set(PDFName.of("V"), selected);
    for (const w of widgets) {
      const on = w.getOnValue();
      w.setAppearanceState(on && on.toString() === selected.toString() ? on : PDFName.of("Off"));
    }
  }

  function jaNein(form, name, val) {
    const v = String(val == null ? "" : val).toLowerCase();
    if (v === "ja" || val === true) setCheck(form, name, "ja");
    else if (v === "nein" || val === false) setCheck(form, name, "nein");
  }

  const templates = {};
  async function templateBytes(code) {
    if (!templates[code]) {
      const res = await fetch("forms/" + code + ".pdf");
      if (!res.ok) {
        throw new Error(
          "Die Formularvorlage forms/" +
            code +
            ".pdf konnte nicht geladen werden. Bitte die App über einen lokalen Server öffnen (start.sh bzw. python3 -m http.server 8080)."
        );
      }
      templates[code] = new Uint8Array(await res.arrayBuffer());
    }
    return templates[code].slice();
  }

  async function openForm(code) {
    const pdf = await PDFDocument.load(await templateBytes(code), { updateMetadata: false });
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    return { pdf, form: pdf.getForm(), font };
  }

  async function saveForm(pdf, form, font) {
    form.updateFieldAppearances(font);
    return pdf.save({ updateFieldAppearances: false });
  }

  function fillG0450(form, data, settings) {
    const s = data.stammdaten;
    const g = data.g0450;
    setText(form, "PAF_VSNR_trim", s.vsnr);
    setText(form, "PAF_AIGR", s.kennzeichen);
    setText(form, "VERS_VSNR1_2", s.kkVsnr);
    setText(form, "NAME_KK_1", s.kkName);
    setText(form, "NAME_EINR_1", settings.einrichtung);
    setText(form, "ANSCHR_1", settings.strasse);
    setText(form, "PLZ_VERS", settings.plz);
    setText(form, "ORT_VERS", settings.ort);
    setText(form, "TELEFON_1", settings.telefon);
    setText(form, "TELEFAX_1", settings.telefax);
    setText(form, "EMAIL_1", settings.email);
    setText(form, "BERUF_Aufnehmende Stelle", settings.berufAufnehmend);
    setText(form, "NAME_Aufnehmende Stelle", settings.nameAufnehmend);
    setCheck(form, "SUCHT_1", !!s.suchtAlkohol);
    setCheck(form, "SUCHT_2", !!s.suchtMedikamente);
    setCheck(form, "SUCHT_3", !!s.suchtDrogen);
    setCheck(form, "SUCHT_4", !!s.suchtNichtStoff);
    setCheck(form, "SUCHT_5", !!s.suchtSonstiges);
    setText(form, "SONSTIGES_1", s.suchtSonstigesText);
    setText(form, "PAF_Ber_NN_VN", vollname(s));
    setText(form, "PAF_Ber_GebDat_trim", s.geburtsdatum);
    setText(form, "Vers_derzeitiger_Aufenthaltsort", s.aufenthaltsort);
    setCheck(form, "AUFENTHALTSERL", !!s.aufenthaltserlaubnis);
    setText(form, "BEHANDELNDE", s.behandelnde);
    setText(form, "GESAMTANZAHL_1", g.entgiftZahl);
    setText(form, "EINRICH_1", g.letzteKlinik);
    setText(form, "VON_1", g.letzteVon);
    setText(form, "BIS_1", g.letzteBis);
    setText(form, "EINRICH_2", g.reha1Name);
    setText(form, "ART_1", g.reha1Art);
    setText(form, "JAHR_1", g.reha1Jahr);
    jaNein(form, "AW_1", g.reha1Regulaer);
    setText(form, "EINRICH_3", g.reha2Name);
    setText(form, "ART_2", g.reha2Art);
    setText(form, "JAHR_2", g.reha2Jahr);
    jaNein(form, "AW_2", g.reha2Regulaer);
    setText(form, "EINRICH_4", g.reha3Name);
    setText(form, "ART_3", g.reha3Art);
    setText(form, "JAHR_3", g.reha3Jahr);
    jaNein(form, "AW_3", g.reha3Regulaer);
    setText(form, "EINRICH_5", g.reha4Name);
    setText(form, "ART_4", g.reha4Art);
    setText(form, "JAHR_4", g.reha4Jahr);
    jaNein(form, "AW_4", g.reha4Regulaer);
    setText(form, "ANAMNESE_1", g.anamnese);
    setText(form, "WESEN_1", g.schaedigungen);
    setText(form, "ABSTINENZ_1", g.abstinenz);
    jaNein(form, "AW_5", g.aktuellAbstinent);
    setText(form, "ABST_DAT_1", g.abstinentSeit);
    setText(form, "MITTEL_DAT_1", g.substitution);
    jaNein(form, "AW_6", g.rehaUnterSubstitution);
    setText(form, "ENTWICK_1", g.entwicklung);
    setText(form, "UMWELT_1", g.umwelt);
    setText(form, "PERSONBEZOG_1", g.personbezogen);
    setText(form, "ANZAHL_1", g.kinderAnzahl);
    setText(form, "ALTER_1", g.kinderAlter);
    setText(form, "ANZAHL_2", g.kinderHaushalt);
    setText(form, "WERDEGANG_1", g.Werdegang);
    setText(form, "TAETIG_1", g.letzteTaetigkeit || s.erwerbstaetigkeit);
    setText(form, "DATUM_1", g.arbeitslosSeit || s.arbeitslosSeit);
    setText(form, "HINDER_1", g.hinderung);
    setText(form, "AM_1", g.beratungAm);
    setText(form, "EINRICH_6", g.beratungEinr);
    setText(form, "ART_UM_1", g.beratungArt);
    setText(form, "DATUM_2", g.letzterKontakt);
    setText(form, "INDIVID_REHAZIELE", g.rehaZiele);
    setText(form, "ERNEUTE_BEANTR", g.erneuteBeantragung);
    setText(form, "SCHWERPUNKT", g.schwerpunkt);
    setText(form, "LEISTFORM_1", g.wunschLeistform);
    setText(form, "ZUSAMMEN_1", g.zusammenfassung);
    setText(form, "ORT_DATUM_1", g.ortDatum || heuteOrtDatum(settings));
  }

  function fillG0452(form, data, settings) {
    const s = data.stammdaten;
    const e = data.g0452;
    setText(form, "PAF_VSNR_trim", s.vsnr);
    setText(form, "PAF_AIGR", s.kennzeichen);
    setText(form, "DRV_Kopf_PAF_Reha_MSAT_MSNR", s.msatMsnr);
    setText(form, "T_VERSNR_KK", s.kkVsnr);
    setText(form, "T_Name_der_KK", s.kkName);
    setText(form, "Vers_Nachname_Vorname", vollname(s));
    setText(form, "Vers_Geburtsdatum_trim", s.geburtsdatum);
    setCheck(form, "AW_1", !!e.traegerDRV);
    setCheck(form, "AW_1_1", !!e.traegerKK);
    setCheck(form, "AW_1_2", !!e.traegerEingliederung);
    setCheck(form, "AW_1_3", !!e.traegerEinrichtung);
    setText(form, "Ort_Datum", e.ortDatum1 || heuteOrtDatum(settings));
    setText(form, "ANTRAGST_UNTERS", e.unterschrift1 || vollname(s));
    setText(form, "Ort_Datum_2", e.ortDatum2 || heuteOrtDatum(settings));
    setText(form, "ANTRAGST_UNTERS_2", e.unterschrift2 || vollname(s));
  }

  function fillG0100(form, data, settings) {
    const s = data.stammdaten;
    const a = data.g0100;
    setText(form, "PAF_VSNR_trim", s.vsnr);
    const auff = {
      nein: "nein",
      Krankenkasse: "ja, die Krankenkasse",
      "Agentur für Arbeit": "ja, die Agentur für Arbeit",
      Jobcenter: "ja, das Jobcenter",
    };
    setCheck(form, "AW_KRANKEN", auff[a.aufforderung] || a.aufforderung);
    setCheck(form, "AW_LEISTUNGEN", !!a.leistungMedReha);
    if (a.leistungMedReha) setCheck(form, "AW_LEISTUNG", a.leistungMedRehaForm || "stationär");
    setCheck(form, "AW_LEISTUNGEN2", a.leistungAbhaengig !== false);
    const lf = {
      stationaer: "stationär",
      tagesklinisch: "ganztägig ambulant",
      ambulant: "ambulant",
      kombination: "Kombinationsbehandlungen",
    };
    setCheck(form, "AW_ABHAENGIG3", lf[s.leistungsform] || "stationär");
    setCheck(form, "AW_Mitnahme", a.mitnahmePflege && String(a.mitnahmePflege).toLowerCase().startsWith("ja") ? "ja" : "nein");
    setText(form, "NAME_REHA_1", a.wunsch1);
    setText(form, "NAME_REHA_2", a.wunsch2);
    setText(form, "NAME_REHA_3", a.wunsch3);
    setText(form, "Vers_Name", s.nachname);
    setText(form, "Vers_Vorname", s.vorname);
    setText(form, "Vers_Geburtsname", s.geburtsname);
    setText(form, "Vers_Geburtsdatum_trim", s.geburtsdatum);
    const gesch = { maennlich: "männlich", weiblich: "weiblich", divers: "divers", ohne: "ohne Eintrag" };
    setCheck(form, "AW_GESCHLECHT", gesch[s.geschlecht] || s.geschlecht);
    setText(form, "VERS_GebOrt", s.geburtsort);
    setText(form, "VERS_GebLand", s.geburtsland);
    setText(form, "VERS_STAATSANGEHOERIGKEIT", s.staatsangehoerigkeit);
    setText(form, "Vers_Straße_Hausnummer", s.strasse);
    setText(form, "VERS_ADRESSZUSATZ", s.adresszusatz);
    setText(form, "VERS_PLZ", s.plz);
    setText(form, "Vers_Wohnort", s.ort);
    setText(form, "VERS_Land", s.land);
    setText(form, "VERS_TELEFON", s.telefon);
    setText(form, "VERS_TELEFAX", s.telefax);
    setCheck(form, "AW_FAMILIENSTAND", s.familienstand);
    setText(form, "VERS_ERWERB", s.erwerbstaetigkeit);
    setCheck(form, "AW_BERUF", s.berufsstellung);
    setCheck(form, "AW_ANTRAG_AU", s.arbeitVorAntrag);
    setText(form, "KK_NAME", s.kkName);
    setText(form, "KK_STRASSE_HAUSNUMMER", s.kkStrasse);
    setText(form, "KK_ADRESSZUSATZ", s.kkAdresszusatz);
    setText(form, "KK_PLZ", s.kkPlz);
    setText(form, "KK_ORT", s.kkOrt);
    setText(form, "KK_TELEFON", s.kkTelefon);
    setCheck(form, "AW_KK", s.kkArt === "privat" ? "Private Krankenversicherung" : "Gesetzliche Krankenkasse");
    setText(form, "ARZT_NAME", s.arztName);
    setText(form, "ARZT_VORNAME", s.arztVorname);
    setText(form, "ARZT_STRASSE_HAUSNUMMER", s.arztStrasse);
    setText(form, "ARZT_PLZ", s.arztPlz);
    setText(form, "ARZT_ORT", s.arztOrt);
    setText(form, "ARZT_TELEFON", s.arztTelefon);
    jaNein(form, "AW_Beitrag", a.beitragDRV);
    jaNein(form, "AW_AUSLANDSBEITRAG", a.auslandsbeitrag);
    jaNein(form, "AW_AKT_AUSLANDSBEITR", a.auslandsbeitragAktuell);
    setText(form, "VERS_STAAT1", a.auslandStaat);
    setText(form, "VERS_AUSLANDS_BEITR_VOM", a.auslandVom);
    setText(form, "VERS_AUSLANDS_BEITR_BIS", a.auslandBis);
    jaNein(form, "AW_ALOGELDII", a.jobcenter);
    setText(form, "NAME_JOBCENTERS", a.jobcenterName);
    jaNein(form, "AW_BEAMTER", a.beamter);
    jaNein(form, "AW_RENTE", a.rente);
    setText(form, "VERS_NAME_RVTRAEGER", a.renteTraeger);
    jaNein(form, "AW_RENTE_BEGINN", a.leistungBisAltersrente);
    setText(form, "VERS_ART", a.leistungArt);
    jaNein(form, "AW_GESUND", a.gesundheitAnerkannt);
    setText(form, "VERS_STELLE_1", a.gesundheitStelle);
    setText(form, "VERS_AKTENZ", a.gesundheitAktenz);
    setText(form, "VERS_GESSTOERUNG", a.gesundheitStoerung);
    jaNein(form, "AW_AKTUELL_AN", a.gesundheitAntrag);
    setText(form, "VERS_STELLE_2", a.gesundheitAntragStelle);
    jaNein(form, "AW_REGRESS", a.regress);
    jaNein(form, "AW_SCHADEN", a.schaden);
    setText(form, "VERS_DAT_2", a.schadenAm);
    setText(form, "VERS_WELCHE_STELLE_1", a.schadenStelle);
    setText(form, "VERS_AKTENZ_SCHAD", a.schadenAktenz);
    jaNein(form, "AW_JAHRE", a.reha4Jahre);
    setText(form, "VERS_STELLE_ZULETZT", a.rehaStelle);
    setText(form, "VERS_AKTENZ_LEIST", a.rehaAktenz);
    setText(form, "VERS_VIER_JAHRESZEITR_VOM", a.rehaVom);
    setText(form, "VERS_VIER_JAHRESZEITR_BIS", a.rehaBis);
    jaNein(form, "AW_MUTTER_VATER", a.mutterVater);
    setText(form, "VERS_REHA_KK", a.mutterVaterAm);
    setText(form, "VERS_KK_NAME", a.mutterVaterKk);
    setText(form, "VERS_KK_AKTENZ", a.mutterVaterAktenz);
    jaNein(form, "AW_VERTRETUNG_VORHANDEN", a.vertretung === "ja" ? "ja" : "nein");
    setCheck(form, "AW_VERTRETUNG", a.vertretungArt);
    setText(form, "VERTRETUNG_NAME_DIENSTSTELLE", a.vertretungName);
    setText(form, "VERTRETUNG_STRASSE_HAUSNUMMER", a.vertretungStrasse);
    setText(form, "VERTRETUNG_PLZ", a.vertretungPlz);
    setText(form, "VERTRETUNG_WOHNORT", a.vertretungOrt);
    setText(form, "VERTRETUNG_TELEFON", a.vertretungTelefon);
    setCheck(form, "AW_KOMMUNIK", a.kommunikation);
    setText(form, "VERS_KOMMUNIKHILFE", a.kommunikationHilfe);
    setCheck(form, "AW_DOKU_ZUG", !!a.dokuGrossdruck);
    setCheck(form, "AW_DOKU_ZUG_2", !!a.dokuKurzschrift);
    setCheck(form, "AW_DOKU_ZUG_3", !!a.dokuVollschrift);
    setCheck(form, "AW_DOKU_ZUG_4", !!a.dokuCd);
    setCheck(form, "AW_DOKU_ZUG_6", !!a.dokuDaisy);
    setText(form, "VERS_ORT_DAT", a.ortDatum || heuteOrtDatum(settings));
    setText(form, "VERS_UNTERSCHRIFT", a.unterschrift || vollname(s));
    if (a.kkUebernehmen) {
      setText(form, "KK_NAME2", a.kkName18 || s.kkName);
      setText(form, "KK_IK", a.kkIk || s.kkIk);
    }
  }

  function fillG0110(form, data, settings) {
    const s = data.stammdaten;
    const n = data.g0110;
    setText(form, "PAF_VSNR_trim", s.vsnr);
    setText(form, "PAF_AIGR", s.kennzeichen);
    setText(form, "DRV_Kopf_PAF_Reha_MSAT_MSNR", s.msatMsnr);
    setText(form, "Vers_Name_Vorname", vollname(s));
    setText(form, "Vers_Geburtsdatum_trim", s.geburtsdatum);
    setCheck(form, "AW_AU", n.auDauer);
    setText(form, "VERS_ARBEITSUN", n.au1Zeit);
    setText(form, "VERS_AU_WEGEN1", n.au1Wegen);
    setText(form, "VERS_ARBEITSUN2", n.au2Zeit);
    setText(form, "VERS_AU_WEGEN2", n.au2Wegen);
    setText(form, "VERS_ZEITRAUM3", n.au3Zeit);
    setText(form, "VERS_AU_WEGEN3", n.au3Wegen);
    setText(form, "VERS_ZEITRAUM4", n.au4Zeit);
    setText(form, "VERS_AU_WEGEN4", n.au4Wegen);
    setText(form, "VERS_PROBLEM", n.probleme);
    jaNein(form, "AW_GESUND_STOER", n.andereStoerungen);
    setText(form, "VERS_ART_GESUND_STOER", n.andereStoerungenArt);
    setText(form, "VERS_ZEITANG", n.andereZeit);
    jaNein(form, "AW_BEHIND", n.schwerbehinderung);
    setText(form, "VERS_ART_BEHIND", n.behinderungArt);
    setText(form, "VERS_GDB", n.gdb);
    setText(form, "VERS_MERKZ", n.merkzeichen);
    setText(form, "VERS_BEHIND_SEIT", n.behindSeit);
    setCheck(form, "AW_BERZUK", !!n.zukunftBerufJa);
    setCheck(form, "AW_BERZUK2", !!n.zukunftBerufNein);
    setCheck(form, "AW_BERZUK3", !!n.zukunftAndere);
    setCheck(form, "AW_BERZUK1", !!n.zukunftKeine);
    setText(form, "AG_NAME_ANSCH", n.agName);
    setText(form, "VERS_BESCH_SEIT", n.beschSeit);
    setText(form, "AG_MITARB", n.mitarbeiter);
    setText(form, "VERS_TAETIG", n.taetigkeit || s.erwerbstaetigkeit);
    setCheck(form, "AW_STEHEND", n.stehend);
    setCheck(form, "AW_GEHEND", n.gehend);
    setCheck(form, "AW_SITZEND", n.sitzend);
    setCheck(form, "AW_GEBUECKT", n.gebueckt);
    setCheck(form, "AW_ARME", n.arme);
    setCheck(form, "AW_KNIEND", n.kniend);
    setCheck(form, "AW_GERUEST", n.geruest);
    setText(form, "VERS_ART_LASTEN", n.lastenArt);
    setText(form, "VERS_GEWICHT1", n.gewichtHaeufig);
    setText(form, "VERS_GEWICHT2", n.gewichtGelegentlich);
    jaNein(form, "AW_HILFSM", n.hebehilfe);
    setText(form, "VERS_FOLGENDE", n.hebehilfeWelche);
    setText(form, "VERS_BERMERK_1", n.bemerkArbeit);
    setText(form, "VERS_STD_W1", n.stdWoche);
    setCheck(form, "AW_ARBEITSZEIT", !!n.ganztags);
    setCheck(form, "AW_TEILZEIT", !!n.teilzeit);
    setCheck(form, "AW_AZMODELLE", !!n.azModelle);
    setText(form, "VERS_AZMODELL", n.azModell);
    setCheck(form, "AW_FRUEHSCH", !!n.fruehspaet);
    setCheck(form, "AW_DREISCHICHT", !!n.dreischicht);
    setCheck(form, "AW_NACHTSCH", !!n.nachtschicht);
    setCheck(form, "AW_STARRER", !!n.starrerTakt);
    setCheck(form, "AW_AKKORD", !!n.einzelakkord);
    setCheck(form, "AW_GRUPPENAK", !!n.gruppenakkord);
    setCheck(form, "AW_KAELE", !!n.kaelte);
    setCheck(form, "AW_HITZE", !!n.hitze);
    setCheck(form, "AW_STAUB", !!n.staub);
    setCheck(form, "AW_RAUCH", !!n.rauch);
    setCheck(form, "AW_LAERM", !!n.laerm);
    setCheck(form, "AW_LAERMSCH", !!n.laermschutz);
    setCheck(form, "AW_ERSCHUET", !!n.erschuetterung);
    setCheck(form, "AW_GERUECHE", !!n.gerueche);
    setText(form, "VERS_GERUECHE", n.geruecheWelche);
    setCheck(form, "AW_HAUTR", !!n.hautreiz);
    setText(form, "VERS_HAUTREIZ", n.hautreizWelche);
    setCheck(form, "AW_ATEMWEGREIZ", !!n.atemreiz);
    setText(form, "VERS_ATEMWEG", n.atemreizWelche);
    setCheck(form, "AW_FREIEN", !!n.freien);
    setCheck(form, "AW_ROHBAUTEN", !!n.rohbau);
    setCheck(form, "AW_WITTER", !!n.witterung);
    setCheck(form, "AW_PKW", !!n.pkw);
    setCheck(form, "AW_LKW", !!n.lkw);
    setCheck(form, "AW_BAUMASCH", !!n.baumasch);
    setCheck(form, "AW_PERSONENBEF", !!n.personenbef);
    setCheck(form, "AW_GEFAHRGUT", !!n.gefahrgut);
    setCheck(form, "AW_PUBLIKUMSV", !!n.publikum);
    setCheck(form, "AW_REISETAET", !!n.reise);
    setCheck(form, "AW_AUSWAERTS", !!n.auswaerts);
    setCheck(form, "AW_Mitarbeiterf", !!n.fuehrung);
    setCheck(form, "AW_UNFALLGEF", !!n.unfall);
    setCheck(form, "AW_KONZENTR", !!n.konzent);
    setCheck(form, "AW_ANFAHRZEIT", !!n.anfahrt);
    setCheck(form, "AW_PAUSEN", !!n.keinePausen);
    setCheck(form, "AW_BILDSCHIRM", !!n.bildschirm);
    setCheck(form, "AW_BESONDERE", !!n.sehvermoegen);
    setText(form, "VERS_AMINUTEN", n.anfahrtMin);
    setText(form, "VERS_EINSCHR", n.einschraenkungen);
    setText(form, "VERS_AR_PLATZ", n.arbeitsplatzBem);
    setText(form, "ARZT_NAME_VORNAME_ANSCH", n.arzt1);
    setText(form, "ARZT_FACH", n.fach1);
    setText(form, "ARZT_ERKRANK", n.erk1);
    setText(form, "ARZT_NAME_VORNAME_ANSCH2", n.arzt2);
    setText(form, "ARZT_FACH2", n.fach2);
    setText(form, "ARZT_ERKRANK2", n.erk2);
    setText(form, "ARZT_NAME_VORNAME_ANSCH3", n.arzt3);
    setText(form, "ARZT_FACH3", n.fach3);
    setText(form, "ARZT_ERKRANK3", n.erk3);
    jaNein(form, "AW_BEGUT", n.begutachtung);
    setText(form, "VERS_WANN1", n.begutWann);
    setText(form, "VERS_BEGUT", n.begutStelle);
    jaNein(form, "AW_VORSOR", n.vorsorge);
    setText(form, "VERS_WEGEN", n.vorsorgeWegen);
    jaNein(form, "AW_BETR_PERS", n.betriebsarzt);
    setText(form, "BETRARZT_NAME", n.betriebsarztName);
    setText(form, "BETRARZT_TELEF", n.betriebsarztTel);
    setText(form, "BETR_ARZT_ANSCHR", n.betriebsarztAnschr);
    jaNein(form, "AW_ERKLAER", n.einwillBetrieb);
    setText(form, "VERS_ORT_DAT", n.ortDatum || heuteOrtDatum(settings));
    setText(form, "VERS_UNTERSCH", n.unterschrift || vollname(data.stammdaten));
  }

  function downloadBytes(bytes, filename) {
    const blob = new Blob([bytes], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  function fileSlug(data) {
    const s = data.stammdaten || {};
    return ([s.nachname, s.vorname].filter(Boolean).join("_") || "Antrag").replace(/[^\wÄÖÜäöüß-]+/g, "_");
  }

  const fillers = {
    G0100: fillG0100,
    G0110: fillG0110,
    G0450: fillG0450,
    G0452: fillG0452,
  };

  async function build(code, data, settings) {
    const { pdf, form, font } = await openForm(code);
    fillers[code](form, data, settings);
    return saveForm(pdf, form, font);
  }

  async function download(which, data, settings) {
    const slug = fileSlug(data);
    const codes = which === "all" ? ["G0100", "G0110", "G0450", "G0452"] : [which.toUpperCase()];
    for (let i = 0; i < codes.length; i++) {
      const bytes = await build(codes[i], data, settings);
      downloadBytes(bytes, codes[i] + "_" + slug + ".pdf");
      if (i < codes.length - 1) await new Promise((r) => setTimeout(r, 400));
    }
  }

  root.SDLZT_PDF = { download, build, germanDate };
})(window);
