import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, FileDown, Info, ListChecks, Mail, MapPin, Phone, TriangleAlert, Timer as TimerIcon } from "lucide-react";
import { content, type Lang } from "./content";
import { Rich } from "./Rich";
import { hms, TimerBar, useSampleTimer } from "./Timer";
import { revealPanel, ScrollTrigger, setupPageMotion, useGSAP } from "./motion";

const asset = (path: string) => import.meta.env.BASE_URL + path;

/** Liste mit Chevron-Markern, für «Wichtig» und «Kontraindikationen». */
function Points({ items, cols }: { items: ReactNode[]; cols?: boolean }) {
  return (
    <ul className={`points${cols ? " cols" : ""}`}>
      {items.map((t, i) => (
        <li key={i}><span className="point-mark" aria-hidden="true"><ChevronRight size={14} strokeWidth={2.5} /></span><div>{t}</div></li>
      ))}
    </ul>
  );
}

function Hint({ children }: { children: string }) {
  return <p className="hint"><Info size={20} aria-hidden="true" /><span><Rich>{children}</Rich></span></p>;
}

/** Gleiches Modul wie im PDF: Bild mit Marke in der Ecke, Text in voller Breite. */
function Module({ img, alt, mark, children }: { img: string; alt: string; mark: ReactNode; children: ReactNode }) {
  return (
    <li className="module">
      <div className="module-img"><img src={asset(`scenes/${img}.jpg`)} alt={alt} width={1100} height={600} loading="lazy" /><b>{mark}</b></div>
      {children}
    </li>
  );
}

function Accordion({ id, no, title, meta, open, onToggle, children }: { id: string; no: ReactNode; title: string; meta: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useGSAP(() => {
    if (first.current) { first.current = false; return; }
    if (open && body.current) revealPanel(body.current);
  }, { dependencies: [open], scope: body });
  return (
    <section className={`acc${open ? " open" : ""}`} id={id}>
      <h3>
        <button aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
          <span className="acc-no">{no}</span>
          <span className="acc-title">{title}</span>
          <span className="acc-meta">{meta}</span>
          <ChevronDown className="acc-chevron" size={22} aria-hidden="true" />
        </button>
      </h3>
      <div className="acc-body" id={`${id}-panel`} ref={body}><div className="acc-in">{children}</div></div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("de");
  const c = content[lang];
  const timer = useSampleTimer();
  const [contraOpen, setContraOpen] = useState(() => location.hash === "#kontra");
  const [timerOpen, setTimerOpen] = useState(() => timer.start !== null);
  const ids = [c.prep.id, ...c.chapters.map((x) => x.id)];
  // Standardmässig alle zu; ein Link mit #k1 usw. öffnet das passende Kapitel
  const [openId, setOpenId] = useState(() => (ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : ""));
  const topRef = useRef<HTMLDivElement>(null);
  const pinned = useRef<{ id: string; y: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = setupPageMotion();
    return () => mm.revert();
  }, { scope: root });

  // Akkordeons ändern die Seitenhöhe: Scroll-Positionen neu berechnen
  useEffect(() => { requestAnimationFrame(() => ScrollTrigger.refresh()); }, [openId, contraOpen, timerOpen]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Höhe von Header und Timer-Leiste für Sprungziele
  useEffect(() => {
    const el = topRef.current!;
    const nav = el.querySelector(".nav") as HTMLElement;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--top", `${el.offsetHeight}px`);
      document.documentElement.style.setProperty("--nav", `${nav.offsetHeight}px`);
    });
    ro.observe(el);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // Direktlink beim Laden: erst nach dem Aufklappen zum Kapitel springen
  useEffect(() => {
    const h = location.hash.slice(1);
    if (!ids.includes(h)) return;
    // Nach dem Laden und der ersten ScrollTrigger-Berechnung, sonst setzt diese die Position zurück
    const go = () => setTimeout(() => document.getElementById(h)?.scrollIntoView({ block: "start", behavior: "instant" }), 150);
    if (document.readyState === "complete") go(); else addEventListener("load", go, { once: true });
  }, []);

  useEffect(() => {
    const onHash = () => { const h = location.hash.slice(1); if (ids.includes(h)) setOpenId(h); };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  function toggle(id: string) {
    const next = openId === id ? "" : id;
    pinned.current = { id, y: document.getElementById(id)!.getBoundingClientRect().top };
    setOpenId(next);
    history.replaceState(null, "", next ? `#${next}` : location.pathname + location.search);
  }

  // Klappt darüber ein Schritt zu, bleibt der angeklickte Kopf trotzdem an Ort und Stelle.
  useLayoutEffect(() => {
    const p = pinned.current;
    if (!p) return;
    pinned.current = null;
    const dy = document.getElementById(p.id)!.getBoundingClientRect().top - p.y;
    if (dy) window.scrollBy({ top: dy, behavior: "instant" });
  }, [openId]);

  const acc = (id: string) => ({ id, open: openId === id, onToggle: () => toggle(id) });

  return (
    <div ref={root}>
      <a className="skip" href="#inhalt">{c.skip}</a>
      <div className="top" ref={topRef}>
        <nav className="nav">
          <img src={asset("logo.png")} alt="Ortho-Analytic, Labor für integrative Medizin" width={689} height={129} />
          <div className="nav-right">
            <button className="nav-timer" aria-expanded={timerOpen} onClick={() => setTimerOpen(!timerOpen)}>
              <TimerIcon size={18} aria-hidden="true" /> {timer.start !== null && !timerOpen ? hms(timer.elapsed) : c.timer.short}
            </button>
            <div className="lang" role="group" aria-label="Sprache / Language">
              {(["de", "en"] as Lang[]).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </nav>
        <TimerBar t={timer} c={c} open={timerOpen} onClose={() => setTimerOpen(false)} />
      </div>

      <header className="hero">
        <div className="hero-in wrap">
          <div>
            <h1>{c.title}</h1>
            <p className="hero-set">{c.set}</p>
            <p className="hero-lead">{c.lead}</p>
            <div className="hero-cta">
              <a className="btn btn-light" href={`#${c.prep.id}`} onClick={() => setOpenId(c.prep.id)}><ListChecks size={18} aria-hidden="true" /> {c.startCta}</a>
              <a className="hero-pdf" href={asset("anleitung-testset-604.pdf")} target="_blank" rel="noreferrer"><FileDown size={18} aria-hidden="true" /> {c.pdfCta}</a>
            </div>
          </div>
          <video src={asset("video.mp4")} poster={asset("thumbnail.jpg")} controls playsInline preload="none" aria-label={c.videoLabel} width={1920} height={1080} />
        </div>
        <a className="hero-scroll" href="#inhalt" aria-label={c.scrollHint}><ChevronDown size={28} strokeWidth={1.75} aria-hidden="true" /></a>
      </header>

      <main id="inhalt" className="wrap">
        <section className="kit" aria-labelledby="testkit">
          <h2 id="testkit">{c.kit.title}</h2>
          <ul>
            {c.kit.items.map((k) => (
              <li key={k.img}>
                <img src={asset(`scenes/${k.img}.jpg`)} alt="" width={720} height={480} />
                <h3>{k.name}</h3>
                <p>{k.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="important" aria-labelledby="wichtig">
          <h2 id="wichtig"><Info size={24} aria-hidden="true" /> {c.important.title}</h2>
          <Points cols items={c.important.items.map((t) => <Rich>{t}</Rich>)} />
        </section>

        <div className="contra">
          <Accordion id="kontra" no={<TriangleAlert size={22} aria-hidden="true" />} title={c.contra.title} meta={`${c.contra.items.length} ${c.contra.points}`} open={contraOpen} onToggle={() => setContraOpen(!contraOpen)}>
            <Points items={c.contra.items.map((t, i) => (
              <>
                <Rich>{t}</Rich>
                {i === c.contra.items.length - 1 && <p className="composition">{c.contra.composition}</p>}
              </>
            ))} />
            <Hint>{c.contra.pregnancy}</Hint>
          </Accordion>
        </div>

        <section className="guide" aria-labelledby="ablauf">
          <div className="guide-head">
            <div><h2 id="ablauf">{c.guide.title}</h2><p>{c.guide.sub}</p></div>
            <button className="btn btn-primary" onClick={() => setTimerOpen(true)}><TimerIcon size={18} aria-hidden="true" /> {c.timerCta}</button>
          </div>

          <Accordion {...acc(c.prep.id)} no={c.prep.no.replace(".", "")} title={c.prep.title} meta={`${c.prep.items.length} ${c.guide.steps}`}>
            <Hint>{c.prep.note}</Hint>
            <ol className="modules">
              {c.prep.items.map((x, i) => (
                <Module key={x.when} img={x.img} alt={x.alt} mark={i < c.prep.items.length - 1 ? `${x.when} ${c.prep.before}` : x.when}><h4>{x.title}</h4><p>{x.text}</p></Module>
              ))}
            </ol>
          </Accordion>

          {c.chapters.map((ch) => (
            <Accordion key={ch.id} {...acc(ch.id)} no={ch.no.replace(/\.$/, "")} title={ch.title} meta={`${ch.steps.length} ${c.guide.steps}`}>
              {ch.hint && <Hint>{ch.hint}</Hint>}
              <ol className="modules">
                {ch.steps.map((s, i) => <Module key={s.img} img={s.img} alt={s.alt} mark={i + 1}><p><Rich>{s.text}</Rich></p></Module>)}
              </ol>
            </Accordion>
          ))}
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <img className="foot-logo" src={asset("logo-white.png")} alt="Ortho-Analytic, Labor für integrative Medizin" width={1080} height={202} loading="lazy" />
          <p className="foot-thanks">{c.footer.thanks}</p>
          <p className="foot-team">{c.footer.team}</p>
          <p className="foot-address"><MapPin size={18} aria-hidden="true" /> Ortho-Analytic AG, {c.footer.address}</p>
          <div className="foot-contact">
            <a className="btn btn-ghost" href={`tel:${c.footer.phone.replace(/ /g, "")}`}><Phone size={18} aria-hidden="true" /> {c.footer.phone}</a>
            <a className="btn btn-ghost" href={`mailto:${c.footer.mail}`}><Mail size={18} aria-hidden="true" /> {c.footer.mail}</a>
          </div>
          <div className="foot-meta">
            <p>{c.footer.basis}</p>
            <p>{c.footer.copy}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
