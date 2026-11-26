// A4-Anleitung. Vorschau: npm run dev, dann /ortho-landing/print.html (?grid zeigt das Satzraster).
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";
import { ChevronRight, Info, TriangleAlert } from "lucide-react";
// Statische Schnitte: sauber eingebettete Fonts im PDF
import "@fontsource/hanken-grotesk/latin-400.css";
import "@fontsource/hanken-grotesk/latin-700.css";
import "./print.css";
import logo from "./logo-white.png";
import { content, EXAMPLE_TIMES, SAMPLE_MINUTES } from "../src/content";
import { Rich } from "../src/Rich";

const c = content.de;
const asset = (p: string) => `${import.meta.env.BASE_URL}scenes/${p}.jpg`;
const grid = new URLSearchParams(location.search).has("grid");
const PAGES = 5;
const by = (id: string) => c.chapters.find((x) => x.id === id)!;

function Page({ n, cover, children }: { n: number; cover?: boolean; children: ReactNode }) {
  return (
    <section className={`page${cover ? " cover" : ""}`}>
      <header className="band">
        {!cover && <p className="meta">{c.title}, {c.set}</p>}
        {cover && <img className="disc" src={asset("kit")} alt="" />}
        <img src={logo} alt="Ortho-Analytic, Labor für integrative Medizin" />
      </header>
      <div className="body">{children}</div>
      <footer className="meta">
        <span>{c.footer.basis}. {c.pdf.draft}.</span>
        <span>{c.pdf.page} {n} von {PAGES}</span>
      </footer>
      {grid && (
        <div className="grid" aria-hidden="true">
          {[20, 80, 140].map((x) => <i key={x} style={{ left: `${x}mm` }} />)}
          {[20, 80, 140].map((x) => <s key={x} style={{ left: `${x}mm` }} />)}
          {Array.from({ length: 50 }, (_, i) => <u key={i} style={{ top: `${30 + i * 5 + 3.72}mm` }} />)}
        </div>
      )}
    </section>
  );
}

function Head({ no, title }: { no?: string; title: string }) {
  return <h2 className="head">{no && <b>{no}</b>}{title}</h2>;
}

/** Hinweisbox: einzeilig ohne Titel, oder mit Titel und Liste. Mit «marks» wie auf der Website mit Chevron-Markern. */
function Box({ title, items, after, marks, alert, single, wrap }: { title?: string; items: string[]; after?: string; marks?: boolean; alert?: boolean; single?: boolean; wrap?: boolean }) {
  const cls = ["box", title ? "" : wrap ? "plain" : "slim", marks ? "marks" : "", alert ? "alert" : "", single ? "single" : ""].filter(Boolean).join(" ");
  return (
    <aside className={cls}>
      {alert ? <TriangleAlert aria-hidden="true" strokeWidth={2} /> : <Info aria-hidden="true" strokeWidth={2} />}
      {title && <h3>{title}</h3>}
      <ul>
        {items.map((t, i) => (
          <li key={t}>
            {marks && <b className="point" aria-hidden="true"><ChevronRight strokeWidth={3} /></b>}
            <div><Rich>{t}</Rich>{after && i === items.length - 1 && <p className="meta">{after}</p>}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Das Modul: Bild mit Marke in der Ecke, Text in voller Spaltenbreite. */
function Module({ img, alt, mark, children }: { img: string; alt: string; mark: ReactNode; children: ReactNode }) {
  return <li className="module"><img src={asset(img)} alt={alt} /><b className="mark">{mark}</b><div>{children}</div></li>;
}

function ChapterBlock({ id }: { id: string }) {
  const ch = by(id);
  return (
    <section>
      <Head no={ch.no} title={ch.title} />
      {ch.hint && <Box items={[ch.hint]} />}
      <ol className="modules">
        {ch.steps.map((s, i) => <Module key={s.img} img={s.img} alt={s.alt} mark={i + 1}><p><Rich>{s.text}</Rich></p></Module>)}
      </ol>
    </section>
  );
}

function Doc() {
  const last = c.prep.items.length - 1;
  return (
    <>
      <Page n={1} cover>
        <div className="title"><h1>{c.title}</h1><p className="h2">{c.set}</p><p>{c.pdf.sub}</p></div>
        <Box title={c.important.title} items={c.important.items} marks />
        <Box title={c.contra.title} items={c.contra.items} after={c.contra.composition} marks alert single />
        <Box items={[c.contra.pregnancy]} wrap />
      </Page>

      <Page n={2}>
        <Head no={c.prep.no} title={c.prep.title} />
        <ol className="modules time">
          {c.prep.items.map((x, i) => (
            <Module key={x.when} img={x.img} alt={x.alt} mark={i < last ? `${x.when} ${c.prep.before}` : x.when}><h3>{x.title}</h3><p>{x.text}</p></Module>
          ))}
          <li className="boxcell"><Box title={c.pdf.medication} items={[c.prep.note]} /></li>
        </ol>
      </Page>

      <Page n={3}><ChapterBlock id="k2" /><ChapterBlock id="k31" /></Page>
      <Page n={4}><ChapterBlock id="k32" /><ChapterBlock id="k33" /><ChapterBlock id="k4" /></Page>

      <Page n={5}>
        <Head title={c.protocol.title} />
        <div className="fields">{c.protocol.fields.map((f) => <div key={f} className="meta">{f}</div>)}</div>
        <table>
          <colgroup><col style={{ width: "10mm" }} /><col style={{ width: "110mm" }} /><col style={{ width: "55mm" }} /></colgroup>
          <thead className="meta"><tr><th colSpan={2}>{c.protocol.what}</th><th>{c.protocol.time}</th></tr></thead>
          <tbody>
            <tr><th><b className="mark">1</b></th><td><Rich>{c.protocol.first}</Rich> ({c.protocol.eg} {EXAMPLE_TIMES[0]} {c.table.clock})</td><td /></tr>
            <tr><th><b className="mark">2</b></th><td><Rich>{c.protocol.drink}</Rich></td><td /></tr>
            {SAMPLE_MINUTES.map((m, i) => <tr key={m}><th><b className="mark">{i + 3}</b></th><td><Rich>{c.protocol.next(m, i + 2)}</Rich> ({c.protocol.eg} {EXAMPLE_TIMES[i + 1]} {c.table.clock})</td><td /></tr>)}
          </tbody>
        </table>
        <p className="comp">{c.protocol.complaints}</p>
        <div className="lines"><i /><i /></div>
        <p className="bring">{c.protocol.bring}</p>
      </Page>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<Doc />);
