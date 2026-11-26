import { useEffect, useRef, useState } from "react";
import { Check, Info, Play, RotateCcw, TestTube, Timer as TimerIcon, X } from "lucide-react";
import { SAMPLE_MINUTES, type Content } from "./content";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

const KEY = "ortho-604-timer-start";

/** Startzeit liegt im localStorage: Neuladen oder Bildschirmsperre bricht den Test nicht ab. */
export function useSampleTimer() {
  const [start, setStart] = useState<number | null>(() => {
    const v = Number(localStorage.getItem(KEY));
    return v && Date.now() - v < 6 * 3600_000 ? v : null;
  });
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (start === null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [start]);

  const elapsed = start === null ? 0 : Math.max(0, Math.floor((now - start) / 1000));
  // Eine Probe gilt 2 Minuten lang als «jetzt fällig», danach zählt die nächste.
  const nextIndex = start === null ? 0 : SAMPLE_MINUTES.findIndex((m) => elapsed < m * 60 + 120);
  const done = start !== null && nextIndex === -1;
  const left = done ? 0 : SAMPLE_MINUTES[nextIndex] * 60 - elapsed;

  return {
    start, elapsed, nextIndex, done, left,
    begin: () => { const t = Date.now(); localStorage.setItem(KEY, String(t)); setNow(t); setStart(t); },
    reset: () => { localStorage.removeItem(KEY); setStart(null); },
  };
}
export type SampleTimer = ReturnType<typeof useSampleTimer>;

const two = (n: number) => String(n).padStart(2, "0");
export const hms = (s: number) => `${two(Math.floor(s / 3600))}:${two(Math.floor((s % 3600) / 60))}:${two(s % 60)}`;
const ms = (s: number) => `${Math.floor(s / 60)}:${two(s % 60)}`;
const clock = (start: number, min: number) => { const d = new Date(start + min * 60_000); return `${d.getHours()}.${two(d.getMinutes())}`; };

/** Leiste direkt unter dem Header, bleibt beim Scrollen sichtbar. */
export function TimerBar({ t, c, open, onClose }: { t: SampleTimer; c: Content; open: boolean; onClose: () => void }) {
  const bar = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Weich auf- und zuziehen: Höhe und Deckkraft zusammen, Inhalt folgt leicht versetzt.
  useGSAP(() => {
    const el = bar.current!;
    const inner = el.firstElementChild as HTMLElement;
    el.inert = !open;
    const quick = first.current || prefersReducedMotion();
    first.current = false;
    gsap.killTweensOf([el, inner]);
    if (open) {
      gsap.fromTo(el, { height: el.offsetHeight, autoAlpha: quick ? 1 : 0 }, { height: "auto", autoAlpha: 1, duration: quick ? 0 : 0.55, ease: "power3.out" });
      if (!quick) gsap.fromTo(inner, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power2.out", clearProps: "transform,opacity" });
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, duration: quick ? 0 : 0.4, ease: "power2.inOut" });
    }
  }, { dependencies: [open] });

  const [asking, setAsking] = useState(false);
  const s = c.timer;
  const running = t.start !== null;
  const due = running && !t.done && t.left <= 0;
  const list = useRef<HTMLOListElement>(null);
  // Auf schmalen Schirmen die nächste Probe in den sichtbaren Bereich holen
  useEffect(() => {
    const el = list.current?.children[Math.max(0, t.nextIndex)] as HTMLElement | undefined;
    if (el && list.current) list.current.scrollLeft = el.offsetLeft - list.current.offsetLeft;
  }, [t.nextIndex, running]);
  const progress = Math.min(1, t.elapsed / (SAMPLE_MINUTES[SAMPLE_MINUTES.length - 1] * 60));

  return (
    <section ref={bar} className={`timerbar${open ? " is-open" : ""}${running && !t.done && t.left <= 60 ? " is-due" : ""}`} aria-label={s.title}>
      <div className="timerbar-in">
        <div className="timer-row">
          <div className="timer-clock">
            <p className="timer-name"><TimerIcon size={16} aria-hidden="true" /> {s.title}</p>
            <p className="timer-time">{hms(t.elapsed)}</p>
          </div>
          <p className="timer-next">
            {!running ? <><Info size={18} aria-hidden="true" /> <span>{s.hint}</span></>
              : t.done ? <span>{s.done}</span>
              : due ? <strong>{s.due}: {s.sample} {t.nextIndex + 2}</strong>
              : <span>{s.next}: {s.sample} {t.nextIndex + 2} {s.in} <strong>{ms(t.left)}</strong></span>}
          </p>
          <span className="sr" role="status">{due ? `${s.due}: ${s.sample} ${t.nextIndex + 2}` : ""}</span>
          <div className="timer-actions">
            {!running && <button className="btn btn-primary btn-s" onClick={t.begin}><Play size={16} aria-hidden="true" /> {s.start}</button>}
            {running && !asking && <button className="btn btn-quiet btn-s" onClick={() => setAsking(true)} aria-label={s.reset}><RotateCcw size={16} aria-hidden="true" /> <span className="wide">{s.reset}</span></button>}
            {running && asking && (
              <>
                <span>{s.confirm}</span>
                <button className="btn btn-primary btn-s" onClick={() => { t.reset(); setAsking(false); }}>{s.yes}</button>
                <button className="btn btn-quiet btn-s" onClick={() => setAsking(false)}>{s.no}</button>
              </>
            )}
            <button className="btn btn-quiet btn-s btn-icon" onClick={onClose} aria-label={s.close}><X size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="timer-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="timer-samples">
          <p className="timer-samples-label"><TestTube size={16} aria-hidden="true" /> <span>{s.samples}</span></p>
          <ol className="timer-list" ref={list}>
            {SAMPLE_MINUTES.map((m, i) => {
              const state = !running ? "" : t.done || i < t.nextIndex ? "past" : i === t.nextIndex ? "next" : "";
              const when = running ? clock(t.start!, m) : `${m} ${c.table.min}`;
              return (
                <li key={m} className={state} aria-current={state === "next" ? "step" : undefined} aria-label={`${s.sample} ${i + 2}: ${when}`}>
                  <b aria-hidden="true">{state === "past" ? <Check size={13} strokeWidth={3} /> : i + 2}</b>
                  <span aria-hidden="true">{when}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
