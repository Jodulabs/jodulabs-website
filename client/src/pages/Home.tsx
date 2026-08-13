/* Design philosophy: Sober Product Site — explain the instrument plainly, show the working surface, and keep every commercial statement honest while the product is still taking shape. */
/* Design philosophy: Quiet Confidence — the approved Infinite Dwellings mark is the primary brand signal, used with restraint beside precise product typography. */
import { type FormEvent, useState } from "react";
import { ArrowRight, Check, ChevronDown, Menu, MoveUpRight, Play, X } from "lucide-react";

const assets = {
  canvas: "/manus-storage/ui-plan-canvas_1f67ce2a.png",
  preview: "/manus-storage/ui-3d-preview_4c1994bd.png",
  quantities: "/manus-storage/ui-quantities_f41ebe94.png",
  schedules: "/manus-storage/ui-schedules_9f680bdf.png",
  sheet: "/manus-storage/ui-sheet-composer_a3b3f7c7.png",
};

const architecturalMark = <><span className="mark-frame mark-frame-a" /><span className="mark-frame mark-frame-b" /></>;

const faqs = [
  ["What is Jodu?", "Jodu is a focused authoring tool for Indian residential plans. It helps you compose a home on one plan canvas and keep the related review and document work connected."],
  ["Who is it for?", "Jodu is being made for civil engineers, draftspersons, and residential contractors working on G+1 and G+2 projects."],
  ["Where is Jodu available?", "The desktop release is in preparation. An Android companion app is also in development. Platform status and download links are kept current on the Downloads page."],
  ["Does Jodu replace existing CAD tools?", "No. Jodu is a focused surface for residential planning and downstream coordination. It is intended to work alongside the tools you already use."],
];

const workflow = [
  ["01", "Compose", "Lay out the rooms, levels, and circulation on one canvas."],
  ["02", "Review", "Use the model view to discuss the spatial result."],
  ["03", "Quantify", "Read the quantities and schedules that follow from the plan."],
  ["04", "Issue", "Prepare a clear plan sheet for the next conversation."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="site-nav" data-testid="site-navigation">
        <a className="brand" href="#top" aria-label="Jodu home">
          <span className="brand-mark" aria-hidden="true">{architecturalMark}</span>
          <span className="brand-word">jodu</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <a className="is-active" href="#product">Product</a>
          <a href="#demo">Demo</a>
          <a href="#plans">Plans</a>
          <a href="/downloads">Downloads</a>
          <a href="mailto:hello@jodulabs.com">Contact <MoveUpRight size={13} /></a>
        </nav>
        <a className="nav-cta" href="#pilot">Request access <ArrowRight size={14} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-toggle">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="product-hero" id="product">
          <div className="container product-hero-inner">
            <div className="product-hero-copy">
              <p className="eyebrow"><span className="eyebrow-mark" /> JODU / RESIDENTIAL PLANNING</p>
              <h1>Plan the house.<br /><em>Keep the work together.</em></h1>
              <p className="product-hero-lede">Jodu is a focused planning tool for residential construction. Lay out the house, inspect the result, and carry the same model into quantities, schedules, and plan sheets.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#demo">See how it works <Play size={14} fill="currentColor" /></a>
                <a className="text-link" href="#plans">Check access <span>↘</span></a>
              </div>
            </div>
            <div className="product-hero-proof">
              <div className="proof-head"><span>JODU / WORKSPACE</span><span>01</span></div>
              <div className="product-canvas"><img src={assets.canvas} alt="Jodu plan canvas interface" /></div>
              <p>The plan is the source. The views follow.</p>
            </div>
          </div>
          <div className="container hero-rule"><span>DESKTOP / FIRST RELEASE SURFACE</span><span>ANDROID / COMPANION IN DEVELOPMENT</span></div>
        </section>

        <section className="definition-section section" id="demo">
          <div className="container definition-grid">
            <div><p className="eyebrow">What Jodu does</p><h2>Compose once.<br /><em>Carry it forward.</em></h2></div>
            <div className="definition-copy">
              <p>Jodu gives residential planning work a single place to begin. Compose the house, review the spatial result, and keep the information needed for the next document close to the plan.</p>
              <p>It is not a promise to replace every tool around the work. It is a more focused surface for the part where the house takes shape.</p>
              <a className="button button-outline" href="#workflow" data-testid="demo-cta">Walk through the workflow <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="video-section section">
          <div className="container">
            <div className="section-topline"><p className="eyebrow">Product demo</p><span className="section-note">A clean look at the current build</span></div>
            <div className="video-demo-grid">
              <div className="video-frame"><div className="video-poster"><img src={assets.preview} alt="Jodu 3D preview interface used as the demo poster" /><div className="video-scrim" /><button className="demo-play" aria-label="Product demo video placeholder" disabled data-testid="demo-video-play"><Play size={18} fill="currentColor" /></button><span className="video-status">VIDEO SOURCE / TO BE CONNECTED</span></div></div>
              <div className="video-copy"><span className="feature-number">01</span><h2>See the product before you read about it.</h2><p>A short walkthrough of the Jodu workspace will live here: compose the house, move through the review views, and see what leaves the canvas.</p><span className="video-note">The demo video will be added when the final recording is ready.</span></div>
            </div>
          </div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="container">
            <div className="section-topline"><p className="eyebrow">The workflow</p><span className="section-note">One model / multiple views</span></div>
            <div className="workflow-list">{workflow.map(([number, title, description]) => <div className="workflow-item" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowRight size={17} /></div>)}</div>
          </div>
        </section>

        <section className="outputs-section section">
          <div className="container">
            <div className="section-topline"><p className="eyebrow">Product views</p><span className="section-note">Examples from the current build</span></div>
            <div className="output-strip">
              <article><div className="sheet-head"><span>02 / QUANTITIES</span><span>JODU / OUTPUT</span></div><img src={assets.quantities} alt="Jodu quantities view" /><span>Quantities</span><small>Read quantities from the current plan.</small></article>
              <article><div className="sheet-head"><span>03 / SCHEDULES</span><span>JODU / OUTPUT</span></div><img src={assets.schedules} alt="Jodu schedules view" /><span>Schedules</span><small>Keep the schedule view near the model.</small></article>
              <article><div className="sheet-head"><span>04 / PLAN SHEET</span><span>JODU / OUTPUT</span></div><img src={assets.sheet} alt="Jodu plan sheet" /><span>Plan sheet</span><small>Prepare a sheet for the next review.</small></article>
            </div>
            <div className="outputs-footer"><p>These views stay close to the plan instead of becoming separate pieces of work.</p><a className="text-link" href="/downloads">See release status <span>↗</span></a></div>
          </div>
        </section>

        <section className="platform-section section">
          <div className="container platform-section-grid">
            <div><p className="eyebrow">Platforms</p><h2>Start on the desktop.<br /><em>Carry the work further.</em></h2></div>
            <div className="platform-summary">
              <div><span className="platform-state">DESKTOP / RELEASING SOON</span><h3>Jodu desktop</h3><p>The full planning workspace is being prepared for release.</p></div>
              <div><span className="platform-state">ANDROID / IN DEVELOPMENT</span><h3>Jodu mobile</h3><p>A companion app for reviewing project information away from the desk.</p></div>
              <a className="button button-outline" href="/downloads">Open downloads <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="plans-section section" id="plans">
          <div className="container">
            <div className="section-topline"><p className="eyebrow">Access / plans</p><span className="section-note">Terms are still being worked out</span></div>
            <div className="plans-intro"><div><h2>Start with the work.<br /><em>Choose the right access.</em></h2></div><p>We are not publishing final subscription prices yet. This is the honest shape of the product today: a pilot first, with self-serve plans to define once the workflow is ready.</p></div>
            <div className="plans-grid">
              <article className="plan-card plan-card-featured"><div className="plan-card-top"><span className="plan-status">AVAILABLE NOW</span><span className="plan-index">01</span></div><h3>Pilot</h3><p className="plan-audience">For a real residential project.</p><p>Work through a current project with the team, test the fit, and tell us what the product needs to do next.</p><a className="button button-dark" href="#pilot">Request pilot access <ArrowRight size={15} /></a></article>
              <article className="plan-card"><div className="plan-card-top"><span className="plan-status plan-status-muted">PLANNED</span><span className="plan-index">02</span></div><h3>Individual</h3><p className="plan-audience">For one practitioner.</p><p>A future self-serve plan for people who want to work through projects independently. Price and limits will follow the first release.</p><span className="plan-note">Pricing to be announced</span></article>
              <article className="plan-card"><div className="plan-card-top"><span className="plan-status plan-status-muted">PLANNED</span><span className="plan-index">03</span></div><h3>Team</h3><p className="plan-audience">For a studio or site team.</p><p>A future plan for shared project work across the people who review, quantify, and issue the set.</p><span className="plan-note">Pricing to be announced</span></article>
            </div>
          </div>
        </section>

        <section className="faq-section section" id="faq">
          <div className="container faq-grid">
            <div><p className="eyebrow">Questions</p><h2>The useful version.</h2></div>
            <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} data-testid={`faq-trigger-${index}`}><span>{question}</span><ChevronDown size={17} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
          </div>
        </section>

        <section className="pilot-section section" id="pilot">
          <div className="container pilot-inner">
            <div><p className="eyebrow">Early access</p><h2>Bring a real project.<br /><em>See if Jodu fits.</em></h2></div>
            <div><p>We are opening access for people working on residential plans. No claims, no noise — just a chance to use the product and tell us what is missing.</p>{submitted ? <div className="success-state"><Check size={17} /> Request received for <strong>{email}</strong>.</div> : <form className="waitlist-form" onSubmit={submit}><label className="sr-only" htmlFor="email">Work email</label><input id="email" type="email" placeholder="Your work email" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="waitlist-email" /><button className="button button-dark" type="submit" data-testid="waitlist-submit">Request access <ArrowRight size={15} /></button></form>}</div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">{architecturalMark}</span><span className="brand-word">jodu</span></a><p>Residential planning, made coherent.</p></div><div className="footer-links"><a href="#product">Product</a><a href="#demo">Demo</a><a href="#plans">Plans</a><a href="/downloads">Downloads</a><a href="mailto:hello@jodulabs.com">Email us</a></div><div className="footer-meta"><span>Jodu Labs / India</span><span>© 2026</span></div></div></footer>
    </div>
  );
}
