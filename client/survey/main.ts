// The Jodu home survey: one question per screen, branching by role, ending with an optional give-back.
// Every visible string comes from locales/<code>.json; questions.json is identical to the API's copy.
import survey from "./questions.json";
import markUrl from "../public/brand/jodu-icon.svg";

declare const __SURVEY_LANGUAGES__: Record<string, string>;

type Question = {
  type: "single" | "multi" | "text" | "dual";
  options?: string[];
  max?: number;
  exclusive?: string[];
  optional?: boolean;
  other_text?: boolean;
  groups?: { key: string; options: string[] }[];
};
type Answer = string | string[] | Record<string, string>;
type Contact = { wants: string[]; name: string; phone: string; email: string; town: string };
type Locale = Record<string, unknown>;

const QUESTIONS = survey.questions as Record<string, Question>;
const PATHS = survey.paths as Record<string, string[]>;
const ROLE_PATHS = survey.role_paths as Record<string, string>;
const WANTS = survey.wants as string[];
const GIVEBACK = "giveback";
const API = (import.meta.env.VITE_API_URL || "https://api.jodu.io").replace(/\/$/, "");
const DRAFT_KEY = "jodu-survey-draft";
const SUBMIT_TIMEOUT_MS = 20000;
const OTHER = "other";
const otherKey = (id: string) => `${id}_other`;

const LANGS = __SURVEY_LANGUAGES__;
const CODES = Object.keys(LANGS).sort((a, b) => (a === "en" ? -1 : b === "en" ? 1 : a.localeCompare(b)));
const loaders = import.meta.glob<Locale>("./locales/*.json", { import: "default" });
const loaded: Record<string, Locale> = {};

const params = new URLSearchParams(location.search);
const src = (params.get("src") || "").trim().slice(0, 200) || null;

const emptyContact = (): Contact => ({ wants: [], name: "", phone: "", email: "", town: "" });
const state = {
  lang: "en",
  step: -1,
  a: {} as Record<string, Answer>,
  contact: emptyContact(),
  submissionId: uuid4(),
  sending: false,
  failed: false,
  done: false,
};

const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

function uuid4(): string {
  // crypto.randomUUID is missing from older Android WebViews.
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function lookup(locale: Locale | undefined, path: string[]): string | undefined {
  let node: unknown = locale;
  for (const key of path) node = node && typeof node === "object" ? (node as Locale)[key] : undefined;
  return typeof node === "string" ? node : undefined;
}

/** A string from the current language, falling back to English for keys a newer language file lacks. */
function t(...path: string[]): string {
  return esc(lookup(loaded[state.lang], path) ?? lookup(loaded.en, path) ?? "");
}

async function loadLocale(code: string): Promise<void> {
  if (!loaded[code]) loaded[code] = await loaders[`./locales/${code}.json`]();
}

function initialLang(): string {
  const asked = params.get("lang");
  if (asked && LANGS[asked]) return asked;
  const draftLang = readDraft()?.lang;
  if (draftLang && LANGS[draftLang]) return draftLang;
  for (const tag of navigator.languages || [navigator.language]) {
    const code = (tag || "").toLowerCase().split("-")[0];
    if (LANGS[code]) return code;
  }
  return "en";
}

function readDraft(): (Partial<typeof state> & { lang?: string }) | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(): void {
  try {
    const { lang, step, a, contact, submissionId } = state;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ lang, step, a, contact, submissionId }));
  } catch {
    /* private mode or full storage: answers stay in memory */
  }
}

function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* nothing to clear */
  }
}

function path(): string[] {
  const role = state.a.role as string | undefined;
  return PATHS[(role && ROLE_PATHS[role]) || "owner"];
}
const steps = () => [...path(), GIVEBACK];

function answered(id: string): boolean {
  const q = QUESTIONS[id];
  const v = state.a[id];
  if (q.optional) return true;
  if (q.type === "single") return typeof v === "string";
  if (q.type === "multi") return Array.isArray(v) && v.length > 0;
  if (q.type === "dual") return !!v && (q.groups || []).every(g => (v as Record<string, string>)[g.key]);
  return true;
}

function needsContact(): boolean {
  const c = state.contact;
  return c.wants.length > 0 && !c.phone.trim() && !c.email.trim();
}

const bar = (html: string) => ($("#bar").innerHTML = html);

function renderLanguages(): void {
  const group = $("#langs");
  group.setAttribute("aria-label", lookup(loaded[state.lang], ["ui", "languageLabel"]) || "Language");
  group.innerHTML = CODES.map(
    code =>
      `<button type="button" lang="${code}" data-lang="${code}" aria-pressed="${code === state.lang}">${esc(LANGS[code])}</button>`,
  ).join("");
  group.querySelectorAll<HTMLButtonElement>("button").forEach(b => (b.onclick = () => void setLang(b.dataset.lang!)));
}

async function setLang(code: string): Promise<void> {
  await loadLocale(code);
  state.lang = code;
  document.documentElement.lang = code;
  document.title = lookup(loaded[code], ["ui", "title"]) || document.title;
  $("#brand").setAttribute("aria-label", lookup(loaded[code], ["ui", "about"]) || "About Jodu");
  saveDraft();
  renderLanguages();
  render();
}

function advance(): void {
  state.step++;
  saveDraft();
  render();
  window.scrollTo(0, 0);
}

function render(): void {
  const main = $("#main");
  const all = steps();
  if (state.done) return renderThanks();
  if (state.step < 0) {
    $("#prog").style.width = "0%";
    $("#count").textContent = "";
    main.innerHTML = `<section class="intro">
      <p class="eyebrow">${t("ui", "eyebrow")}</p>
      <h1>${t("ui", "introTitle")}</h1>
      <p>${t("ui", "introP1")}</p><p>${t("ui", "introP2")}</p><p>${t("ui", "introAnon")}</p>
    </section>`;
    bar(`<button class="btn primary" id="go" type="button">${t("ui", "start")}</button>`);
    $("#go").onclick = () => advance();
    return;
  }
  state.step = Math.min(state.step, all.length - 1);
  const id = all[state.step];
  $("#prog").style.width = (state.step / all.length) * 100 + "%";
  $("#count").textContent = state.a.role ? `${state.step + 1} ${lookup(loaded[state.lang], ["ui", "of"]) ?? "of"} ${all.length}` : "";
  if (id === GIVEBACK) return renderGiveback();

  const q = QUESTIONS[id];
  let hint = t("questions", id, "hint");
  if (q.type === "single") hint = hint || t("ui", "pickOne");
  if (q.type === "multi") hint = (hint ? hint + " " : "") + (q.max ? t("ui", "pickUpTo").replace("{n}", String(q.max)) : t("ui", "pickAll"));
  if (q.optional) hint = (hint ? hint + " " : "") + `(${t("ui", "optional")})`;

  let body = "";
  if (q.type === "single" || q.type === "multi") {
    const v = state.a[id];
    const sel = q.type === "multi" ? ((v as string[]) || []) : [v];
    const full = !!q.max && sel.length >= q.max;
    body =
      `<div class="opts" role="${q.type === "single" ? "radiogroup" : "group"}" aria-labelledby="qt">` +
      (q.options || [])
        .map(o => {
          const on = sel.includes(o);
          return `<button type="button" class="opt ${q.type}" role="${q.type === "single" ? "radio" : "checkbox"}" id="o-${id}-${o}" data-v="${o}" aria-checked="${on}" aria-disabled="${full && !on}"><span class="box"></span><span>${t("questions", id, "options", o)}</span></button>`;
        })
        .join("") +
      `</div>` +
      (q.other_text && sel.includes(OTHER)
        ? `<input type="text" class="other-text" id="x-${id}" maxlength="300" aria-label="${t("questions", id, "options", OTHER)}" placeholder="${t("ui", "otherPlaceholder")}" value="${esc((state.a[otherKey(id)] as string) || "")}">`
        : "");
  } else if (q.type === "dual") {
    const v = (state.a[id] as Record<string, string>) || {};
    body = (q.groups || [])
      .map(
        g =>
          `<div class="group"><h3 id="g-${g.key}">${t("questions", id, "groups", g.key, "title")}</h3><div class="chips opts" role="radiogroup" aria-labelledby="g-${g.key}">` +
          g.options
            .map(
              o =>
                `<button type="button" class="opt single" role="radio" id="o-${id}-${g.key}-${o}" data-g="${g.key}" data-v="${o}" aria-checked="${v[g.key] === o}"><span class="box"></span><span>${t("questions", id, "groups", g.key, "options", o)}</span></button>`,
            )
            .join("") +
          `</div></div>`,
      )
      .join("");
  } else if (q.type === "text") {
    body = `<textarea id="t-${id}" aria-labelledby="qt" maxlength="2000" placeholder="${t("ui", "typeHere")}">${esc((state.a[id] as string) || "")}</textarea>`;
  }

  main.innerHTML = `<section><h2 id="qt">${t("questions", id, "title")}</h2>${hint ? `<p class="hint">${hint}</p>` : ""}${body}</section>`;

  const showSkip = q.type === "text" && q.optional;
  bar(`<button class="btn" id="back" type="button">${t("ui", "back")}</button>
       ${showSkip ? `<button class="btn" id="skip" type="button">${t("ui", "skip")}</button>` : ""}
       <button class="btn primary" id="next" type="button" ${answered(id) ? "" : "disabled"}>${t("ui", "next")}</button>`);

  $("#back").onclick = () => {
    saveText(id);
    state.step--;
    saveDraft();
    render();
  };
  $("#next").onclick = () => {
    saveText(id);
    if (answered(id)) advance();
  };
  if (showSkip)
    $("#skip").onclick = () => {
      delete state.a[id];
      advance();
    };
  main.querySelectorAll<HTMLButtonElement>(".opt").forEach(b => b.addEventListener("click", () => choose(id, b)));
  document.getElementById("x-" + id)?.addEventListener("input", event => {
    state.a[otherKey(id)] = (event.target as HTMLInputElement).value;
    saveDraft();
  });
}

function saveText(id: string): void {
  if (QUESTIONS[id]?.type !== "text") return;
  const v = $<HTMLTextAreaElement>("#t-" + id).value.trim();
  if (v) state.a[id] = v;
  else delete state.a[id];
}

let advanceTimer: ReturnType<typeof setTimeout> | undefined;
function choose(id: string, b: HTMLButtonElement): void {
  if (b.getAttribute("aria-disabled") === "true") return;
  const q = QUESTIONS[id];
  const v = b.dataset.v!;
  if (q.type === "single") {
    const prevRole = state.a.role;
    state.a[id] = v;
    if (id === "role" && prevRole && prevRole !== v) {
      const keep: Record<string, Answer> = { role: v };
      if (state.a.talk) keep.talk = state.a.talk;
      state.a = keep;
    }
    clearTimeout(advanceTimer);
    if (v !== OTHER) delete state.a[otherKey(id)];
    saveDraft();
    render();
    // Choosing "Other" waits so they can type before pressing Next.
    if (v === OTHER && q.other_text) return void document.getElementById("x-" + id)?.focus();
    const at = state.step;
    advanceTimer = setTimeout(() => {
      if (state.step === at) advance();
    }, 260);
    return;
  }
  if (q.type === "multi") {
    const exclusive = q.exclusive || [];
    let arr = ((state.a[id] as string[]) || []).slice();
    if (arr.includes(v)) arr = arr.filter(x => x !== v);
    else if (exclusive.includes(v)) arr = [v];
    else {
      arr = arr.filter(x => !exclusive.includes(x));
      if (!q.max || arr.length < q.max) arr.push(v);
    }
    state.a[id] = arr;
    if (!arr.includes(OTHER)) delete state.a[otherKey(id)];
  } else if (q.type === "dual") {
    state.a[id] = { ...((state.a[id] as Record<string, string>) || {}), [b.dataset.g!]: v };
  }
  saveDraft();
  render();
  const typing = v === OTHER && document.getElementById("x-" + id);
  (typing || document.getElementById(b.id))?.focus();
}

function renderGiveback(): void {
  const c = state.contact;
  const field = (key: "name" | "phone" | "email" | "town", type: string, auto: string, extra = "") =>
    `<label class="f" for="c-${key}">${t("ui", key)}</label><input type="${type}" id="c-${key}" data-k="${key}" autocomplete="${auto}" ${extra} value="${esc(c[key])}">`;
  $("#main").innerHTML = `<section>
    <h2 id="qt">${t("ui", "givebackTitle")}</h2>
    <p class="hint">${t("ui", "givebackP")} (${t("ui", "optional")})</p>
    <div class="opts" role="group" aria-labelledby="qt">${WANTS.map(
      w =>
        `<button type="button" class="opt multi" role="checkbox" id="o-giveback-${w}" data-v="${w}" aria-checked="${c.wants.includes(w)}"><span class="box"></span><span>${t("wants", w)}</span></button>`,
    ).join("")}</div>
    <div class="fields" ${c.wants.length ? "" : "hidden"}>
      ${field("name", "text", "name", 'maxlength="100"')}
      ${field("phone", "tel", "tel", 'inputmode="tel" maxlength="30"')}
      ${field("email", "email", "email", 'maxlength="254"')}
      ${field("town", "text", "address-level2", 'maxlength="100"')}
    </div>
    <div class="trap" aria-hidden="true"><label>Website <input type="text" id="website" name="website" tabindex="-1" autocomplete="off"></label></div>
    <p class="status" id="status" role="status"></p>
  </section>`;
  bar(`<button class="btn" id="back" type="button">${t("ui", "back")}</button>
       <button class="btn primary" id="submit" type="button"></button>`);
  $("#back").onclick = () => {
    state.step--;
    state.failed = false;
    saveDraft();
    render();
  };
  $("#submit").onclick = () => void submit();
  $("#main")
    .querySelectorAll<HTMLButtonElement>(".opt")
    .forEach(b =>
      b.addEventListener("click", () => {
        const w = b.dataset.v!;
        c.wants = c.wants.includes(w) ? c.wants.filter(x => x !== w) : WANTS.filter(x => x === w || c.wants.includes(x));
        saveDraft();
        renderGiveback();
        document.getElementById(b.id)?.focus();
      }),
    );
  $("#main")
    .querySelectorAll<HTMLInputElement>("input[data-k]")
    .forEach(input =>
      input.addEventListener("input", () => {
        c[input.dataset.k as "name" | "phone" | "email" | "town"] = input.value;
        saveDraft();
        updateSubmit();
      }),
    );
  updateSubmit();
}

function updateSubmit(): void {
  const button = $<HTMLButtonElement>("#submit");
  const status = $("#status");
  button.disabled = state.sending || needsContact();
  button.innerHTML = state.sending ? t("ui", "sending") : state.failed ? t("ui", "retry") : t("ui", "submit");
  status.innerHTML = state.failed ? t("ui", "failed") : needsContact() ? t("ui", "needContact") : "";
}

async function submit(): Promise<void> {
  if (state.sending || needsContact()) return;
  const onPath = new Set(path());
  const c = state.contact;
  const body = {
    submission_id: state.submissionId,
    lang: state.lang,
    src,
    answers: Object.fromEntries(
      Object.entries(state.a)
        .map(([id, value]): [string, Answer] => [id, typeof value === "string" ? value.trim() : value])
        .filter(([id, value]) => onPath.has(id.replace(/_other$/, "")) && value !== ""),
    ),
    contact: c.wants.length
      ? { wants: c.wants, name: c.name.trim(), phone: c.phone.trim(), email: c.email.trim(), town: c.town.trim() }
      : null,
    website: $<HTMLInputElement>("#website").value,
  };
  state.sending = true;
  state.failed = false;
  updateSubmit();
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const response = await fetch(`${API}/api/survey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: abort.signal,
    });
    if (!response.ok) throw new Error(`survey submit ${response.status}`);
    state.done = true;
    clearDraft();
  } catch {
    state.failed = true;
  } finally {
    clearTimeout(timer);
    state.sending = false;
  }
  if (state.done) render();
  else updateSubmit();
}

function renderThanks(): void {
  $("#prog").style.width = "100%";
  $("#count").textContent = "";
  $("#main").innerHTML = `<section><h1>${t("ui", "thanksTitle")}</h1><p>${t("ui", "thanksP")}</p></section>`;
  bar("");
  window.scrollTo(0, 0);
}

async function start(): Promise<void> {
  $<HTMLImageElement>("#mark").src = markUrl;
  const draft = readDraft();
  if (draft) {
    state.a = draft.a || {};
    state.contact = { ...emptyContact(), ...(draft.contact || {}) };
    state.step = typeof draft.step === "number" ? draft.step : -1;
    state.submissionId = draft.submissionId || state.submissionId;
  }
  const lang = initialLang();
  await Promise.all([loadLocale("en"), loadLocale(lang)]);
  await setLang(lang);
}

void start();
