import { useState, useEffect, useCallback, useRef } from "react";
import { Ban, Check, Pill, Droplets, Coffee, Wind, Timer, RefreshCw, Package, FileText, Send, RotateCcw, X, Play, Pause, ChevronDown, FlaskConical, Stethoscope, Truck, ClipboardList, Hash } from "lucide-react";

var PRIMARY = "#11316E";
var PRIMARY_DARK = "#0D2659";
var PRIMARY_MID = "#1A4A9E";
var PROBE_INTERVALS = [30, 50, 70, 90, 110, 120, 130, 140, 150];

var translations = {
  de: {
    nav: { home: "Startseite", services: "Dienstleistungen", contact: "Kontakt" },
    hero: {
      badge: "Testanleitung", title: "Lactulose-Atemgastest",
      desc: "Diese Anleitung führt Sie sicher durch den gesamten Testablauf — von der Vorbereitung bis zum Versand.",
      cta: "Zum Testablauf", ctaTimer: "Timer starten",
    },
    kit: {
      title: "Ihr Testkit enthält",
      items: [
        { name: "10 Probenröhrchen", desc: "mit Verschlussstopfen" },
        { name: "Mundstück mit Atembeutel", desc: "und Nadelaufsatz" },
        { name: "Lactulose-Dosis", desc: "1 Päckchen" },
        { name: "Versandbeutel", desc: "für den Rückversand" },
        { name: "Testprotokoll", desc: "zum Ausfüllen" },
      ],
    },
    phases: { title: "Der Testablauf", subtitle: "Folgen Sie den Schritten in der richtigen Reihenfolge" },
    phase1: { title: "48 Stunden vorher", tag: "Ernährung", steps: [{ text: "Vermeiden Sie ballaststoffreiche Lebensmittel: Vollkornprodukte, Hülsenfrüchte, Nüsse und Obst.", Icon: Ban }, { text: "Essen Sie leicht verdauliche Speisen: gekochter Reis, Kartoffeln, Geflügel oder Fisch.", Icon: Check }] },
    phase2: { title: "Medikamente", tag: "Vorab klären", steps: [{ text: "Antibiotika mindestens 4 Wochen vor dem Test absetzen (sofern ärztlich möglich).", Icon: Pill }, { text: "Säurehemmende Medikamente mindestens 1 Woche vorher absetzen.", Icon: Pill }, { text: "Am Testtag keine Vitaminpräparate oder Nahrungsergänzungsmittel einnehmen.", Icon: Ban }] },
    phase3: { title: "12 Stunden vorher", tag: "Nüchternphase", steps: [{ text: "Nichts essen oder trinken — ausser klarem Wasser.", Icon: Droplets }, { text: "Nicht rauchen und keinen Kaugummi kauen.", Icon: Ban }] },
    phase4: { title: "Am Testmorgen", tag: "Vorbereitung", steps: [{ text: "Mund gründlich mit Wasser ausspülen.", Icon: Droplets }, { text: "Ein Glas warmes Wasser trinken.", Icon: Coffee }, { text: "Zähneputzen ist erlaubt.", Icon: Check }] },
    phase5: { title: "Erste Atemprobe", tag: "Nüchternwert · Probe 1", steps: [{ text: "Erstes Probenröhrchen zur Hand nehmen.", Icon: FlaskConical }, { text: "Normal einatmen, dann ruhig ausatmen. Nach 1–2 Sek. Röhrchen auf die Nadel setzen und weiter gleichmässig ausatmen.", Icon: Wind }, { text: "Das Röhrchen füllt sich automatisch durch den Luftdruck. Noch einige Sekunden weiteratmen.", Icon: Timer }, { text: "Erst nach vollständigem Ausatmen das Röhrchen entfernen — es verschliesst sich automatisch.", Icon: Check }, { text: "Uhrzeit im Testprotokoll notieren.", Icon: FileText }] },
    phase6: { title: "Testlösung trinken", tag: "Nach Probe 1", steps: [{ text: "Lactulose mit ca. 200 ml Wasser mischen und vollständig trinken.", Icon: Droplets }, { text: "Uhrzeit im Protokoll eintragen.", Icon: FileText }, { text: "Danach mindestens 1 Stunde kein Wasser trinken.", Icon: Timer }] },
    phase7: { title: "Proben 2–10", tag: "Weitere Atemproben", steps: [{ text: "9 weitere Proben zu den vorgegebenen Zeitpunkten entnehmen.", Icon: RefreshCw }, { text: "Zeitpunkte: z.B. nach 30, 50, 70, 90, 120 und 150 Minuten.", Icon: Timer }, { text: "Jedes Mal Uhrzeit im Testprotokoll notieren.", Icon: FileText }, { text: "Immer ruhig und gleichmässig in das Röhrchen blasen.", Icon: Wind }] },
    phase8: { title: "Verpackung & Versand", tag: "Abschluss", steps: [{ text: "Prüfen: Jede Probe der richtigen Nummer zugeordnet? Uhrzeiten korrekt?", Icon: Check }, { text: "Proben in den vorgesehenen Beutel legen, dann in den Versandbeutel.", Icon: Package }, { text: "Ausgefülltes Testprotokoll und unterschriebenes Laborformular hinzufügen.", Icon: ClipboardList }, { text: "Beutel verschliessen, zur Post bringen und am Schalter aufgeben.", Icon: Send }] },
    timer: {
      title: "Proben-Timer", start: "Timer starten", stop: "Stopp", reset: "Reset", close: "Schliessen",
      next: "Nächste Probe in", collected: "entnommen", pending: "ausstehend",
      allDone: "Alle Proben entnommen!", minutes: "Min",
      probeLabels: ["Probe 2","Probe 3","Probe 4","Probe 5","Probe 6","Probe 7","Probe 8","Probe 9","Probe 10"],
    },
    footer: { thanks: "Vielen Dank für Ihre Mithilfe!", team: "Ihr Ortho-Analytic Team", results: "Das ausgefüllte Testprotokoll bringen Sie bitte zu Ihrer nächsten Konsultation mit. So können die Resultate gemeinsam besprochen werden." },
  },
  en: {
    nav: { home: "Home", services: "Services", contact: "Contact" },
    hero: {
      badge: "Test Instructions", title: "Lactulose Breath Test",
      desc: "This guide walks you safely through the entire test procedure — from preparation to shipping.",
      cta: "To the Test Procedure", ctaTimer: "Start Timer",
    },
    kit: {
      title: "Your test kit contains",
      items: [
        { name: "10 sample tubes", desc: "with sealing stoppers" },
        { name: "Mouthpiece with breath bag", desc: "and needle attachment" },
        { name: "Lactulose dose", desc: "1 sachet" },
        { name: "Shipping bag", desc: "for return shipping" },
        { name: "Test protocol", desc: "to fill out" },
      ],
    },
    phases: { title: "The Test Procedure", subtitle: "Follow the steps in the correct order" },
    phase1: { title: "48 hours before", tag: "Diet", steps: [{ text: "Avoid high-fiber foods: whole grains, legumes, nuts, and fruit.", Icon: Ban }, { text: "Eat easily digestible foods: cooked rice, potatoes, poultry, or fish.", Icon: Check }] },
    phase2: { title: "Medication", tag: "Clarify in advance", steps: [{ text: "Stop antibiotics at least 4 weeks before the test (if medically possible).", Icon: Pill }, { text: "Stop acid-blocking medication at least 1 week before.", Icon: Pill }, { text: "Do not take vitamin supplements on test day.", Icon: Ban }] },
    phase3: { title: "12 hours before", tag: "Fasting phase", steps: [{ text: "Do not eat or drink — except plain water.", Icon: Droplets }, { text: "No smoking and no chewing gum.", Icon: Ban }] },
    phase4: { title: "On test morning", tag: "Preparation", steps: [{ text: "Rinse mouth thoroughly with water.", Icon: Droplets }, { text: "Drink a glass of warm water.", Icon: Coffee }, { text: "Brushing teeth is allowed.", Icon: Check }] },
    phase5: { title: "First breath sample", tag: "Fasting value · Sample 1", steps: [{ text: "Take the first sample tube.", Icon: FlaskConical }, { text: "Breathe in normally, then exhale calmly. After 1–2 sec, place tube on needle and continue exhaling steadily.", Icon: Wind }, { text: "The tube fills automatically through air pressure. Continue breathing a few more seconds.", Icon: Timer }, { text: "Only remove the tube after fully exhaling — it seals automatically.", Icon: Check }, { text: "Note the time in the test protocol.", Icon: FileText }] },
    phase6: { title: "Drink test solution", tag: "After Sample 1", steps: [{ text: "Mix lactulose with approx. 200 ml water and drink completely.", Icon: Droplets }, { text: "Record the time in the protocol.", Icon: FileText }, { text: "Do not drink water for at least 1 hour after.", Icon: Timer }] },
    phase7: { title: "Samples 2–10", tag: "Further breath samples", steps: [{ text: "Collect 9 more samples at the specified times.", Icon: RefreshCw }, { text: "Time points: e.g. after 30, 50, 70, 90, 120, and 150 minutes.", Icon: Timer }, { text: "Record the time in the test protocol each time.", Icon: FileText }, { text: "Always blow calmly and steadily into the tube.", Icon: Wind }] },
    phase8: { title: "Packaging & Shipping", tag: "Completion", steps: [{ text: "Check: Is each sample assigned to the correct number? Times correct?", Icon: Check }, { text: "Place samples in the provided bag, then in the shipping bag.", Icon: Package }, { text: "Add the completed test protocol and signed lab form.", Icon: ClipboardList }, { text: "Seal the bag, bring to the post office, and hand it in at the counter.", Icon: Send }] },
    timer: {
      title: "Sample Timer", start: "Start Timer", stop: "Stop", reset: "Reset", close: "Close",
      next: "Next sample in", collected: "collected", pending: "pending",
      allDone: "All samples collected!", minutes: "min",
      probeLabels: ["Sample 2","Sample 3","Sample 4","Sample 5","Sample 6","Sample 7","Sample 8","Sample 9","Sample 10"],
    },
    footer: { thanks: "Thank you for your cooperation!", team: "Your Ortho-Analytic Team", results: "Please bring the completed test protocol to your next consultation. The results can then be discussed together." },
  },
};

var kitIcons = [FlaskConical, Stethoscope, Droplets, Truck, ClipboardList];

function LanguageToggle(props) {
  var lang = props.lang;
  var setLang = props.setLang;
  return (
    <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #d0d5dd" }}>
      {["de", "en"].map(function(l) {
        return (
          <button key={l} onClick={function() { setLang(l); }} style={{ padding: "6px 16px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", border: "none", cursor: "pointer", background: lang === l ? PRIMARY : "#fff", color: lang === l ? "#fff" : "#344054", transition: "all 0.2s" }}>
            {l}
          </button>
        );
      })}
    </div>
  );
}

function Navbar(props) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.93)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8ecf0", padding: "0 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <img src="logo.png" alt="Ortho-Analytic" style={{ height: 40, objectFit: "contain" }} />
        <LanguageToggle lang={props.lang} setLang={props.setLang} />
      </div>
    </nav>
  );
}

function StickyTimer(props) {
  var lang = props.lang;
  var visible = props.visible;
  var onClose = props.onClose;
  var s = translations[lang].timer;
  var runState = useState(false);
  var running = runState[0]; var setRunning = runState[1];
  var elState = useState(0);
  var elapsed = elState[0]; var setElapsed = elState[1];
  var stState = useState(null);
  var startTime = stState[0]; var setStartTime = stState[1];
  var intervalRef = useRef(null);

  var start = useCallback(function() { setStartTime(Date.now() - elapsed * 1000); setRunning(true); }, [elapsed]);
  var stop = useCallback(function() { setRunning(false); }, []);
  var reset = useCallback(function() { setRunning(false); setElapsed(0); setStartTime(null); }, []);

  useEffect(function() {
    if (running) {
      intervalRef.current = setInterval(function() {
        setElapsed(function() { return Math.floor((Date.now() - startTime) / 1000); });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return function() { clearInterval(intervalRef.current); };
  }, [running, startTime]);

  var elapsedMin = elapsed / 60;
  var probeStatus = PROBE_INTERVALS.map(function(m) { return elapsedMin >= m; });
  var nextProbeIndex = probeStatus.findIndex(function(d) { return !d; });
  var allDone = probeStatus.every(function(d) { return d; });
  var nextProbeMinutes = nextProbeIndex >= 0 ? PROBE_INTERVALS[nextProbeIndex] : null;
  var secsUntilNext = nextProbeMinutes != null ? Math.max(0, Math.ceil(nextProbeMinutes * 60 - elapsed)) : 0;
  var nextMins = Math.floor(secsUntilNext / 60);
  var nextSecs = secsUntilNext % 60;
  var progressPct = Math.min(100, (elapsedMin / PROBE_INTERVALS[PROBE_INTERVALS.length - 1]) * 100);
  var urgent = secsUntilNext <= 60 && secsUntilNext > 0 && !allDone;

  return (
    <div style={{ position: "sticky", top: 64, zIndex: 90, width: "100%", maxHeight: visible ? 260 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: visible ? "0 4px 24px rgba(17,49,110,0.15)" : "none" }}>
      <div style={{ background: "#fff", borderBottom: "3px solid " + PRIMARY, padding: "14px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: PRIMARY, whiteSpace: "nowrap" }}>
              <Timer size={15} /> {s.title}
            </span>
            <div style={{ fontSize: 32, fontWeight: 800, color: urgent ? "#D92D20" : PRIMARY, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", animation: urgent ? "pulse 1s infinite" : "none", minWidth: 110 }}>
              {String(Math.floor(elapsed / 3600)).padStart(2,"0") + ":" + String(Math.floor((elapsed % 3600) / 60)).padStart(2,"0") + ":" + String(elapsed % 60).padStart(2,"0")}
            </div>
            {!allDone && nextProbeIndex >= 0 && elapsed > 0 && (
              <div style={{ padding: "6px 14px", borderRadius: 8, background: urgent ? "#FEF3F2" : "#EEF1F8", border: urgent ? "1px solid #FECDCA" : "1px solid " + PRIMARY + "30", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: urgent ? "#B42318" : PRIMARY }}>{s.next + ": " + s.probeLabels[nextProbeIndex]}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: urgent ? "#D92D20" : PRIMARY, fontVariantNumeric: "tabular-nums" }}>{nextMins + ":" + String(nextSecs).padStart(2,"0")}</span>
              </div>
            )}
            {allDone && <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#067647", background: "#ECFDF3", border: "1px solid #ABEFC6", padding: "6px 14px", borderRadius: 8 }}><Check size={14} /> {s.allDone}</span>}
            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
              {!running
                ? <button onClick={start} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 7, border: "none", background: PRIMARY, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}><Play size={13} /> {s.start}</button>
                : <button onClick={stop} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 7, border: "none", background: "#D92D20", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}><Pause size={13} /> {s.stop}</button>
              }
              <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: "1px solid #d0d5dd", background: "#fff", color: "#344054", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><RotateCcw size={13} /> {s.reset}</button>
              <button onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "7px 14px", borderRadius: 7, border: "1px solid #d0d5dd", background: "#fff", color: "#667085", fontSize: 13, cursor: "pointer" }}><X size={14} /></button>
            </div>
          </div>
          <div style={{ height: 5, borderRadius: 4, background: "#E4E7EC", overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: progressPct + "%", background: allDone ? "#12B76A" : "linear-gradient(90deg, " + PRIMARY_DARK + ", " + PRIMARY_MID + ")", borderRadius: 4, transition: "width 1s linear" }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {PROBE_INTERVALS.map(function(mins, i) {
              var isDone = probeStatus[i];
              var isNext = i === nextProbeIndex;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: isDone ? "#ECFDF3" : isNext ? "#EEF1F8" : "#F4F6FB", border: isDone ? "1px solid #ABEFC6" : isNext ? "1.5px solid " + PRIMARY : "1px solid #e8ecf0", color: isDone ? "#067647" : isNext ? PRIMARY : "#98A2B3", whiteSpace: "nowrap" }}>
                  {isDone ? <Check size={11} /> : isNext ? <Wind size={11} /> : <Hash size={11} />}
                  {s.probeLabels[i] + " · " + mins + s.minutes}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{"@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}"}</style>
    </div>
  );
}

function Hero(props) {
  var lang = props.lang;
  var onScrollToGuide = props.onScrollToGuide;
  var onOpenTimer = props.onOpenTimer;
  var s = translations[lang].hero;
  return (
    <section style={{ background: "linear-gradient(135deg, " + PRIMARY_DARK + " 0%, " + PRIMARY + " 45%, " + PRIMARY_MID + " 100%)", minHeight: "100vh", padding: "72px 24px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", boxSizing: "border-box" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ alignSelf: "center", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", borderRadius: 20, padding: "5px 16px", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.03em", marginBottom: 20 }}>{s.badge}</div>
        <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.03em" }}>{s.title}</h1>
        <p style={{ fontSize: "clamp(18px,2.5vw,22px)", color: "rgba(255,255,255,0.85)", margin: "0 0 32px", fontWeight: 500, maxWidth: 560, lineHeight: 1.6 }}>{s.desc}</p>
        <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9", width: "100%", maxWidth: 800, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", marginBottom: 32 }}>
          <video
            controls
            poster="thumbnail.jpg"
            style={{ width: "100%", height: "100%", display: "block", background: "#000" }}
          >
            <source src="video.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
          <button onClick={onScrollToGuide}
            style={{ padding: "14px 28px", borderRadius: 8, border: "none", background: "#fff", color: PRIMARY, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
            onMouseOver={function(e) { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={function(e) { e.currentTarget.style.transform = "translateY(0)"; }}>
            {s.cta}
          </button>
          <button onClick={onOpenTimer}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 8, border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            onMouseOver={function(e) { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseOut={function(e) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}>
            <Timer size={16} /> {s.ctaTimer}
          </button>
        </div>
      </div>
    </section>
  );
}

function KitContents(props) {
  var lang = props.lang;
  var s = translations[lang].kit;
  return (
    <section style={{ padding: "64px 24px", background: "#F4F6FB" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#101828", margin: "0 0 32px", letterSpacing: "-0.02em" }}>{s.title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {s.items.map(function(item, i) {
            var Icon = kitIcons[i];
            return (
              <div key={i}
                style={{ background: "#fff", borderRadius: 12, padding: "24px 20px", border: "1px solid #e8ecf0", transition: "box-shadow 0.2s, transform 0.2s", cursor: "default", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                onMouseOver={function(e) { e.currentTarget.style.boxShadow = "0 4px 16px rgba(17,49,110,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={function(e) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ marginBottom: 12, color: PRIMARY }}><Icon size={28} /></div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#101828", marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: "#667085", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhaseCard(props) {
  var phase = props.phase;
  var index = props.index;
  var isActive = props.isActive;
  var onClick = props.onClick;
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: isActive ? "2px solid " + PRIMARY : "1px solid #e8ecf0", overflow: "hidden", transition: "all 0.3s ease", boxShadow: isActive ? "0 4px 24px rgba(17,49,110,0.09)" : "none" }}>
      <button onClick={onClick} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: isActive ? PRIMARY : "#EEF1F8", color: isActive ? "#fff" : PRIMARY, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0, transition: "all 0.3s" }}>{index + 1}</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#101828" }}>{phase.title}</div>
          <div style={{ padding: "2px 10px", borderRadius: 12, background: PRIMARY + "12", color: PRIMARY, fontSize: 12, fontWeight: 600 }}>{phase.tag}</div>
        </div>
        <div style={{ color: "#667085", transform: isActive ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}><ChevronDown size={20} /></div>
      </button>
      {isActive && (
        <div style={{ padding: "0 40px 32px", borderTop: "1px solid #f0f2f5" }}>
          <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            {phase.steps.map(function(step, si) {
              var Icon = step.Icon;
              return (
                <div key={si} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ flexShrink: 0, color: PRIMARY, display: "flex", alignItems: "center" }}><Icon size={22} /></div>
                  <p style={{ margin: 0, fontSize: "clamp(18px,2.5vw,22px)", lineHeight: 1.6, color: "#344054" }}>{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function GuideSection(props) {
  var lang = props.lang;
  var onOpenTimer = props.onOpenTimer;
  var s = translations[lang].phases;
  var ts = translations[lang].timer;
  var phaseKeys = ["phase1","phase2","phase3","phase4","phase5","phase6","phase7","phase8"];
  var activeState = useState(0);
  var activeIndex = activeState[0];
  var setActiveIndex = activeState[1];
  return (
    <section id="guide-section" style={{ padding: "64px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#101828", margin: 0, letterSpacing: "-0.02em" }}>{s.title}</h2>
          <button onClick={onOpenTimer}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, border: "none", background: PRIMARY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(17,49,110,0.25)", flexShrink: 0 }}
            onMouseOver={function(e) { e.currentTarget.style.background = PRIMARY_MID; }}
            onMouseOut={function(e) { e.currentTarget.style.background = PRIMARY; }}>
            <Timer size={15} /><span style={{ marginLeft: 6 }}>{ts.start}</span>
          </button>
        </div>
        <p style={{ fontSize: 16, color: "#667085", margin: "0 0 40px", lineHeight: 1.6 }}>{s.subtitle}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {phaseKeys.map(function(key, i) {
            return (
              <PhaseCard key={key} phase={translations[lang][key]} index={i} isActive={activeIndex === i} onClick={function() { setActiveIndex(activeIndex === i ? -1 : i); }} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer(props) {
  var lang = props.lang;
  var s = translations[lang].footer;
  return (
    <footer style={{ padding: "96px 24px 48px", background: "linear-gradient(135deg, " + PRIMARY_DARK + " 0%, " + PRIMARY + " 100%)", color: "#fff" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.thanks}</p>
        <p style={{ fontSize: "clamp(18px,2.5vw,22px)", color: "rgba(255,255,255,0.7)", margin: "0 0 24px", fontWeight: 500 }}>{s.team}</p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: "0 auto", maxWidth: 520, lineHeight: 1.7 }}>{s.results}</p>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 Ortho-Analytic AG · Sonic Suisse Netzwerk</div>
      </div>
    </footer>
  );
}

export default function App() {
  var langState = useState("de");
  var lang = langState[0]; var setLang = langState[1];
  var timerState = useState(false);
  var timerVisible = timerState[0]; var setTimerVisible = timerState[1];

  function scrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: "#101828", lineHeight: 1.5, background: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Navbar lang={lang} setLang={setLang} />
      <StickyTimer lang={lang} visible={timerVisible} onClose={function() { setTimerVisible(false); }} />
      <Hero lang={lang} onScrollToGuide={function() { scrollTo("guide-section"); }} onOpenTimer={function() { setTimerVisible(true); }} />
      <KitContents lang={lang} />
      <GuideSection lang={lang} onOpenTimer={function() { setTimerVisible(true); }} />
      <Footer lang={lang} />
    </div>
  );
}
