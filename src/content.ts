// Gemeinsame Textquelle für Landingpage und A4-PDF.
// Textgrundlage: Anleitung Testset 604, Version 1.5, gültig ab 09/2026.
// Kapitelnummern: wie im Erklärvideo (1, 2, 3.1, 3.2, 3.3, 4).
// **fett** wird von <Rich> ausgezeichnet.

export type Lang = "de" | "en";
export type Step = { text: string; img: string; alt: string };
export type Chapter = { id: string; no: string; title: string; hint?: string; steps: Step[] };

/** Minuten nach dem Trinken der Testlösung, Proben 2 bis 7 */
export const SAMPLE_MINUTES = [30, 50, 70, 90, 120, 150];
/** Beispielzeiten aus Testprotokoll und Video, Proben 1 bis 7 */
export const EXAMPLE_TIMES = ["8.00", "8.30", "8.50", "9.10", "9.30", "10.00", "10.30"];

const de = {
  title: "Lactulose-Atemgastest",
  set: "Testset 604",
  lead: "Anleitung für die Entnahme Ihrer Atemgasproben zu Hause.",
  pdfCta: "Anleitung als PDF",
  timerCta: "Timer öffnen",
  startCta: "Test starten",
  videoLabel: "Erklärvideo zum Lactulose-Atemgastest",
  skip: "Zum Inhalt",
  scrollHint: "Nach unten zum Testkit",
  important: {
    title: "Wichtig vor dem Start",
    items: [
      "Führen Sie die Probengewinnung **am Morgen nüchtern** durch, 1\u00a0bis\u00a02 Stunden nach dem Aufstehen.",
      "Die Testlösung kann **abführend** wirken. Der Test kann die Wirkung von vorab eingenommenen Medikamenten mindern.",
      "Entfernen Sie den **Verschluss-Stopfen** der Probenröhrchen nicht (Vakuum).",
      "Probengewinnung und Versand **nicht vor Feiertagen**. Den Versandbeutel **zwingend am Postschalter** abgeben.",
      "Bei Kindern unter **25\u00a0kg** Körpergewicht raten wir von dieser Analyse ab.",
      "Testset **nicht nach Ablauf des Verfalldatums** verwenden. Fehlt ein Teil, rufen Sie uns an: +41\u00a055\u00a0210\u00a090\u00a016.",
    ],
  },
  contra: {
    title: "Kontraindikationen", points: "Punkte",
    items: [
      "**Galactosämie**",
      "**Gastrointestinale Obstruktion, Perforation** oder Risiko einer Perforation des Verdauungstraktes",
      "Bekannte **Allergien oder Überempfindlichkeit** gegenüber Laktulose oder anderen Inhaltsstoffen der beigelegten Laktuloselösung",
    ],
    pregnancy: "Während der **Schwangerschaft und Stillzeit** sollte der Test nur in Rücksprache mit Ihrem/Ihrer Arzt/Ärztin angewendet werden.",
    composition: "Zusammensetzung der Laktuloselösung: Laktulose, Pflaumenaroma: Pflaumenextrakt, Ethanol, Propylenglycol, Aroma und einfaches Zuckerkulör. Es kann kleine Mengen von Zuckern, wie Milch- oder Fruchtzucker, Galactose, Tagatose oder Epilactose enthalten.",
  },
  prep: {
    id: "k1", no: "1.", title: "Test vorbereiten",
    note: "Die Medikation sollte nur in Rücksprache mit der verschreibenden Person verändert werden.",
    items: [
      { img: "prep-antibiotics", alt: "Durchgestrichene Medikamente", when: "4 Wochen", title: "Antibiotika", text: "Die letzte Einnahme sollte mindestens 4 Wochen zurückliegen." },
      { img: "prep-stomach", alt: "Magen mit Magensäure", when: "1 Woche", title: "Probiotika, Medikamente gegen Magenbrennen, Abführmittel", text: "Mindestens 1 Woche vorher nicht einnehmen." },
      { img: "prep-gut", alt: "Gereizter Verdauungstrakt", when: "3 Tage", title: "Andere Medikamente mit Einfluss auf die Darm-Motilität", text: "Mindestens 3 Tage vorher meiden." },
      { img: "prep-food", alt: "Durchgestrichenes schweres Essen", when: "24 Stunden", title: "Nur leichte Speisen", text: "Zum Beispiel Fisch, Poulet oder Reis. Meiden Sie Ballast­stoffreiches und Blähendes: Vollkornprodukte, Nüsse, Obst, Bohnen, Linsen, Kraut, Lauch, Kohl, Erbsen. Kein Alkohol." },
      { img: "prep-drink", alt: "Durchgestrichene Tasse", when: "12 Stunden", title: "Nichts essen, keinen Kaugummi kauen", text: "Auch während des ganzen Tests. Verzichten Sie ebenso auf zuckerhaltige Getränke und Light-Getränke." },
      { img: "prep-smoke", alt: "Uhr", when: "6 Stunden", title: "Nicht rauchen", text: "Auch nicht passiv, und auch nicht während des Tests." },
      { img: "rinse", alt: "Mann am Waschbecken", when: "Testtag", title: "Zähneputzen ist erlaubt", text: "Verwenden Sie kein Prothesenhaftmittel." },
    ],
    before: "vorher",
  },
  kit: {
    title: "Ihr Testkit enthält",
    items: [
      { img: "kit-protocol", name: "1 Testprotokoll", desc: "zum Ausfüllen" },
      { img: "kit-tubes", name: "7 Probenröhrchen", desc: "mit Verschluss-Stopfen" },
      { img: "kit-mouthpiece", name: "1 Mundstück mit Atembeutel", desc: "und seitlich aufgesteckter Entnahmevorrichtung" },
      { img: "kit-sachet", name: "10 g / 15 ml Lactulose", desc: "für die Testlösung" },
      { img: "kit-sleeves", name: "7 Versandhülsen", desc: "für die Röhrchen" },
      { img: "kit-bag", name: "1 Versandbeutel", desc: "für den Rückversand" },
    ],
  },
  guide: { title: "Der Testablauf", sub: "Folgen Sie den Schritten in der richtigen Reihenfolge.", steps: "Schritte" },
  chapters: [
    { id: "k2", no: "2.", title: "Testlösung zubereiten", hint: "**Zusätzlich brauchen Sie:** ein Glas, einen Löffel, eine Uhr und einen Stift.", steps: [
      { img: "kit", alt: "Der Inhalt des Testkits liegt auf einem Tisch", text: "Legen Sie alles bereit: Testprotokoll, **7 Röhrchen**, Mundstück mit Beutel, Lactulose, 7 Versandhülsen, Versandbeutel." },
      { img: "stir", alt: "Der Inhalt des Sachets wird ins Glas gegeben und umgerührt", text: "Reissen Sie das Sachet an der Einkerbung ein. Geben Sie den Inhalt vollständig in **200 ml warmes Wasser** und rühren Sie gut um." },
      { img: "notyet", alt: "Glas mit Testlösung, Trinken ist durchgestrichen", text: "**Noch nicht trinken.** Zuerst entnehmen Sie Probe 1." },
    ] },
    { id: "k31", no: "3.1", title: "Probe 1 entnehmen", hint: "**Vor dem Trinken der Testlösung.** Nicht in die Entnahmevorrichtung greifen: Verletzungsgefahr.", steps: [
      { img: "rinse", alt: "Mann spült den Mund mit kaltem Wasser", text: "Spülen Sie den Mund gründlich mit **kaltem Wasser** aus." },
      { img: "rest", alt: "Das Röhrchen liegt auf der Nadel auf, der Mund umschliesst das Mundstück", text: "Mundstück mit Beutel in die eine Hand, Röhrchen Nr. 1 in die andere. Der Stopfen liegt auf der Nadel auf. **Noch nicht durchstechen.**" },
      { img: "blow", alt: "Mann bläst durch das Mundstück in den Beutel", text: "Atmen Sie **normal** ein, nicht tief. Pusten Sie in den Beutel, bis er sich langsam füllt und Luft durch das Loch am Ende ausströmt." },
      { img: "insert", alt: "Pfeil: Das Röhrchen wird auf die Nadel gedrückt", text: "Atmen Sie weiter aus und stecken Sie das Röhrchen kräftig ein, sodass die Nadel den Stopfen durchsticht. **3 Sekunden** auf der Nadel lassen." },
      { img: "pull", alt: "Pfeil: Das Röhrchen wird herausgezogen", text: "Ziehen Sie das Röhrchen heraus, **noch bevor Sie ganz ausgeatmet haben**. Der Mund bleibt die ganze Zeit am Mundstück." },
      { img: "label", alt: "Das Röhrchen wird mit einem Stift beschriftet", text: "Uhrzeit ins Protokoll eintragen. Etikette: Name, Vorname, Geburtsdatum, **Entnahmedatum und Entnahmezeit**. Röhrchen in die Versandhülse legen." },
    ] },
    { id: "k32", no: "3.2", title: "Testlösung trinken", steps: [
      { img: "drink", alt: "Mann trinkt die Testlösung", text: "Trinken Sie die Testlösung **zügig** und notieren Sie die Uhrzeit im Testprotokoll." },
      { img: "nowater", alt: "Uhr und durchgestrichenes Wasserglas", text: "Ab jetzt mindestens **1 Stunde kein Wasser** trinken. Danach ist eine mässige Menge stilles Mineralwasser möglich." },
      { img: "symptoms", alt: "Mann mit Bauchbeschwerden", text: "Notieren Sie allfällige **Beschwerden** im Testprotokoll." },
    ] },
    { id: "k33", no: "3.3", title: "Proben 2 bis 7 entnehmen", steps: [
      { img: "times", alt: "Sieben Röhrchen mit den Zeiten 0, 30, 50, 70, 90, 120 und 150 Minuten", text: "Entnehmen Sie nach **30, 50, 70, 90, 120 und 150 Minuten** je eine Probe." },
      { img: "again", alt: "Mann bläst in den Beutel, das Röhrchen steckt auf der Nadel", text: "Gehen Sie gleich vor wie bei Probe 1. Nehmen Sie immer das Röhrchen mit der **passenden Nummer**." },
      { img: "record", alt: "Die Uhrzeit wird im Testprotokoll notiert", text: "Beschriften Sie jedes Röhrchen und notieren Sie die **Uhrzeit** im Testprotokoll." },
    ] },
    { id: "k4", no: "4.", title: "Proben versenden", hint: "**Testprotokoll:** Bitte zu Ihrer nächsten Konsultation zur Besprechung der Resultate mitnehmen.", steps: [
      { img: "sleeve", alt: "Ein Röhrchen wird in die Versandhülse gesteckt", text: "Alle **7 Probenröhrchen** sind in den Versandhülsen." },
      { img: "form", alt: "Das Laborformular wird in den Versandbeutel gesteckt", text: "In den Versandbeutel: die 7 Röhrchen und der **von Ihnen unterschriebene Laborauftrag**." },
      { img: "counter", alt: "Abgabe am Postschalter, Briefkasten ist durchgestrichen", text: "Geben Sie den Beutel noch am **gleichen Tag** am **Postschalter** ab, nicht im Briefkasten." },
    ] },
  ] as Chapter[],
  table: { min: "Min.", clock: "Uhr" },
  timer: {
    title: "Proben-Timer",
    hint: "Starten, sobald Sie die Testlösung getrunken haben.",
    start: "Timer starten", reset: "Zurücksetzen", confirm: "Zurücksetzen?", yes: "Ja", no: "Nein",
    next: "Nächste Probe", at: "um", due: "Jetzt entnehmen", done: "Alle Entnahmezeiten sind vorbei. Weiter mit dem Versand.",
    sample: "Probe", samples: "Proben", in: "in", close: "Timer schliessen", short: "Timer",
  },
  protocol: {
    title: "Testprotokoll", fields: ["Name, Vorname", "Geburtsdatum", "Körpergewicht", "Datum der Testdurchführung"],
    step: "Schritt", what: "Testablauf", time: "Uhrzeit",
    first: "**Probe Nr. 1** (Basalwert Atemluft) entnehmen", drink: "**Lactulose-Lösung** zügig trinken",
    next: (m: number, n: number) => `**Nach ${m} Minuten** Probe Nr. ${n} entnehmen`, eg: "z. B.", complaints: "Traten während des Testablaufes Beschwerden wie Blähungen, Durchfälle, Aufstossen u. Ä. auf? Notieren Sie bitte hier Ihre Beschwerden:", bring: "Bitte dieses Protokoll zu Ihrer nächsten Konsultation zur Besprechung der Resultate mitnehmen.",
  },
  footer: { thanks: "Vielen Dank für Ihre Mithilfe.", team: "Ihr Ortho-Analytic Team", copy: "© 2026 Ortho-Analytic AG, Sonic Suisse Netzwerk", address: "Hertistrasse 1, 8304 Wallisellen", phone: "+41 55 210 90 16", mail: "info@orthoanalytic.ch", basis: "Anleitung Testset 604, Version 1.5, gültig ab 09/2026" },
  pdf: { sub: "Anleitung für die Entnahme zu Hause", page: "Seite", draft: "Entwurf", medication: "Medikamente" },
};

export type Content = typeof de;

// Arbeitsübersetzung, noch nicht von Ortho-Analytic geprüft.
const en: Content = {
  title: "Lactulose breath test",
  set: "Test set 604",
  lead: "Instructions for collecting your breath samples at home.",
  pdfCta: "Instructions as PDF (German)",
  timerCta: "Open timer",
  startCta: "Start test",
  videoLabel: "Explainer video for the lactulose breath test",
  skip: "Skip to content",
  scrollHint: "Scroll down to the test kit",
  important: {
    title: "Important before you start",
    items: [
      "Collect the samples **in the morning on an empty stomach**, 1\u00a0to\u00a02 hours after getting up.",
      "The test solution may have a **laxative effect**. The test may reduce the effectiveness of previously taken medication.",
      "Do not remove the **stopper** from the sample tubes (vacuum).",
      "Do not collect or ship samples **before public holidays**. The shipping bag **must be handed in at the post office counter**.",
      "We do not recommend this test for children weighing less than **25\u00a0kg**.",
      "Do **not use the test kit after the expiry date**. If a component is missing, please call us: +41\u00a055\u00a0210\u00a090\u00a016.",
    ],
  },
  contra: {
    title: "Contraindications", points: "points",
    items: [
      "**Galactosemia**",
      "**Gastrointestinal obstruction, perforation** or risk of perforation of the digestive tract",
      "Known **allergies or hypersensitivity** to lactulose or other ingredients of the enclosed lactulose solution",
    ],
    pregnancy: "During **pregnancy and breastfeeding**, the test should only be used after consulting your doctor.",
    composition: "Composition of the lactulose solution: lactulose, plum flavouring: plum extract, ethanol, propylene glycol, flavouring and simple caramel colouring. It may contain small amounts of sugars, such as lactose or fructose, galactose, tagatose or epilactose.",
  },
  prep: {
    id: "k1", no: "1.", title: "Prepare for the test",
    note: "Medication should only be changed in consultation with the person who prescribed it.",
    items: [
      { img: "prep-antibiotics", alt: "Crossed-out medication", when: "4 weeks", title: "Antibiotics", text: "The last dose should be at least 4 weeks ago." },
      { img: "prep-stomach", alt: "Stomach with acid", when: "1 week", title: "Probiotics, heartburn medication, laxatives", text: "Do not take for at least 1 week before." },
      { img: "prep-gut", alt: "Irritated digestive tract", when: "3 days", title: "Other medication that affects bowel motility", text: "Avoid for at least 3 days before." },
      { img: "prep-food", alt: "Crossed-out heavy food", when: "24 hours", title: "Light meals only", text: "For example fish, chicken or rice. Avoid high-fibre and gas-producing foods: whole grains, nuts, fruit, beans, lentils, cabbage, leek, peas. No alcohol." },
      { img: "prep-drink", alt: "Crossed-out cup", when: "12 hours", title: "Do not eat or chew gum", text: "Also during the entire test. Avoid sugary and diet drinks as well." },
      { img: "prep-smoke", alt: "Clock", when: "6 hours", title: "No smoking", text: "This includes passive smoking, and applies during the test too." },
      { img: "rinse", alt: "Man at the sink", when: "Test day", title: "Brushing your teeth is allowed", text: "Do not use denture adhesive." },
    ],
    before: "before",
  },
  kit: {
    title: "Your test kit contains",
    items: [
      { img: "kit-protocol", name: "1 test protocol", desc: "to fill out" },
      { img: "kit-tubes", name: "7 sample tubes", desc: "with stopper closures" },
      { img: "kit-mouthpiece", name: "1 mouthpiece with breath bag", desc: "and sampling device attached to the side" },
      { img: "kit-sachet", name: "10 g / 15 ml lactulose", desc: "for the test solution" },
      { img: "kit-sleeves", name: "7 shipping sleeves", desc: "for the tubes" },
      { img: "kit-bag", name: "1 shipping bag", desc: "for return shipping" },
    ],
  },
  guide: { title: "The test procedure", sub: "Follow the steps in the correct order.", steps: "steps" },
  chapters: [
    { id: "k2", no: "2.", title: "Prepare the test solution", hint: "**You also need:** a glass, a spoon, a clock and a pen.", steps: [
      { img: "kit", alt: "The contents of the test kit on a table", text: "Lay everything out: test protocol, **7 tubes**, mouthpiece with bag, lactulose, 7 shipping sleeves, shipping bag." },
      { img: "stir", alt: "The sachet is emptied into the glass and stirred", text: "Tear the sachet at the notch. Empty it completely into **200 ml of warm water** and stir well." },
      { img: "notyet", alt: "Glass with test solution, drinking is crossed out", text: "**Do not drink yet.** Collect sample 1 first." },
    ] },
    { id: "k31", no: "3.1", title: "Collect sample 1", hint: "**Before drinking the test solution.** Do not reach into the collection device: risk of injury.", steps: [
      { img: "rinse", alt: "Man rinsing his mouth with cold water", text: "Rinse your mouth thoroughly with **cold water**." },
      { img: "rest", alt: "The tube rests on the needle, lips closed around the mouthpiece", text: "Hold the mouthpiece with the breath bag in one hand and tube no. 1 in the other. The stopper rests on the needle. **Do not pierce it yet.**" },
      { img: "blow", alt: "Man blowing through the mouthpiece into the bag", text: "Breathe in **normally**, not deeply. Blow into the bag until it slowly fills and air flows out of the hole at the end." },
      { img: "insert", alt: "Arrow: the tube is pushed onto the needle", text: "Keep breathing out and push the tube in firmly so that the needle pierces the stopper. Leave it on the needle for **3 seconds**." },
      { img: "pull", alt: "Arrow: the tube is pulled out", text: "Pull the tube out **before you have fully breathed out**. Keep your mouth on the mouthpiece the whole time." },
      { img: "label", alt: "The tube is labelled with a pen", text: "Note the time in the test protocol. Label the tube: surname, first name, date of birth, **collection date and time**. Put the tube into its shipping sleeve." },
    ] },
    { id: "k32", no: "3.2", title: "Drink the test solution", steps: [
      { img: "drink", alt: "Man drinking the test solution", text: "Drink the test solution **without delay** and note the time in the test protocol." },
      { img: "nowater", alt: "Clock and crossed-out glass of water", text: "From now on, drink **no water for at least 1 hour**. After that, still mineral water in moderation is fine." },
      { img: "symptoms", alt: "Man with abdominal discomfort", text: "Note any **symptoms** in the test protocol." },
    ] },
    { id: "k33", no: "3.3", title: "Collect samples 2 to 7", steps: [
      { img: "times", alt: "Seven tubes with the times 0, 30, 50, 70, 90, 120 and 150 minutes", text: "Collect one sample each after **30, 50, 70, 90, 120 and 150 minutes**." },
      { img: "again", alt: "Man blowing into the bag with the tube on the needle", text: "Proceed exactly as for sample 1. Always use the tube with the **matching number**." },
      { img: "record", alt: "The time is noted in the test protocol", text: "Label each tube and note the **time** in the test protocol." },
    ] },
    { id: "k4", no: "4.", title: "Send the samples", hint: "**Test protocol:** Please take it with you to your next consultation to discuss the results.", steps: [
      { img: "sleeve", alt: "A tube is put into its shipping sleeve", text: "All **7 sample tubes** are in their shipping sleeves." },
      { img: "form", alt: "The lab form is put into the shipping bag", text: "Into the shipping bag: the 7 tubes and the **lab order signed by you**." },
      { img: "counter", alt: "Handing over at the post office counter, letterbox is crossed out", text: "Hand in the bag on the **same day** at the **post office counter**, not in a letterbox." },
    ] },
  ],
  table: { min: "min", clock: "" },
  timer: {
    title: "Sample timer",
    hint: "Start as soon as you have drunk the test solution.",
    start: "Start timer", reset: "Reset", confirm: "Reset?", yes: "Yes", no: "No",
    next: "Next sample", at: "at", due: "Collect now", done: "All collection times have passed. Continue with shipping.",
    sample: "Sample", samples: "Samples", in: "in", close: "Close timer", short: "Timer",
  },
  protocol: {
    title: "Test protocol", fields: ["Surname, first name", "Date of birth", "Body weight", "Date of test"],
    step: "Step", what: "Procedure", time: "Time",
    first: "Collect **sample no. 1** (baseline)", drink: "Drink the **lactulose solution** without delay",
    next: (m: number, n: number) => `**After ${m} minutes** collect sample no. ${n}`, eg: "e.g.", complaints: "Did any problems occur during the test procedure, such as flatulence, diarrhoea, belching etc.? Please note your symptoms here:", bring: "Please take this protocol with you to your next consultation to discuss the results.",
  },
  footer: { thanks: "Thank you for your cooperation.", team: "Your Ortho-Analytic team", copy: "© 2026 Ortho-Analytic AG, Sonic Suisse network", address: "Hertistrasse 1, 8304 Wallisellen", phone: "+41 55 210 90 16", mail: "info@orthoanalytic.ch", basis: "Instructions test set 604, version 1.5, valid from 09/2026" },
  pdf: { sub: "Instructions for collection at home", page: "Page", draft: "Draft", medication: "Medication" },
};

export const content: Record<Lang, Content> = { de, en };
