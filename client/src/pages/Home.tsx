/* Design philosophy: Editorial Utility — warm architectural paper, graphite ink, Jodu Clay annotations, asymmetric proof-led layout, and quiet document-like interactions. */
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Menu, MoveUpRight, X } from "lucide-react";

const assets = {
  mark: "/manus-storage/jodu-mark_e1a9a90b.png",
  hero: "/manus-storage/jodu-hero_0488b9e8.jpg",
  blueprint: "/manus-storage/jodu-blueprint-detail_6e6b65f6.jpg",
  canvas: "/manus-storage/ui-plan-canvas_e42e0b5d.png",
  preview: "/manus-storage/ui-3d-preview_0da860f2.png",
  quantities: "/manus-storage/ui-quantities_eda7282d.png",
  schedules: "/manus-storage/ui-schedules_b3214fc1.png",
  sheet: "/manus-storage/plan-sheet_7f378607.png",
};

const faqs = [
  ["Who is Jodu for?", "Jodu is built for Indian civil engineers, draftspersons, and contractors working on G+1 and G+2 residential projects."],
  ["Does Jodu replace AutoCAD?", "No. Jodu is a focused authoring tool for composing a residential house and generating the documents that follow. It is designed to sit beside your existing tools, not compete with them."],
  ["What can I export?", "Jodu is designed to turn one coordinated plan into floor-plan sheets, quantities, schedules, and a clear 3D view for review."],
  ["Can I see the product before joining?", "Yes. The product walkthrough below shows the core flow from a plan canvas to the practical documents a project team needs."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const submitWaitlist = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };

  return (
    <div className="site-shell">
      <header className="site-nav" data-testid="site-navigation">
        <a className="brand" href="#top" aria-label="Jodu home" data-testid="brand-link"><span className="brand-mark"><img src={assets.mark} alt="" /></span><span>jodu</span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#product" data-testid="nav-product">Product</a><a href="#workflow" data-testid="nav-workflow">Workflow</a><a href="#outputs" data-testid="nav-outputs">Outputs</a><a href="#faq" data-testid="nav-faq">FAQ</a><a className="nav-utility" href="mailto:hello@jodulabs.com" data-testid="nav-contact">Contact <ArrowUpRight size={13} /></a>
        </nav>
        <a className="nav-cta" href="#waitlist" data-testid="nav-waitlist">Join the pilot <MoveUpRight size={14} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} data-testid="mobile-menu-toggle">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main id="top">
        <section className="hero-section"><div className="hero-grid container"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-mark" /> Residential planning, without the repetition</p><h1>One house.<br /><em>One canvas.</em><br />Every document downstream.</h1><p className="hero-lede">Jodu is the focused authoring tool for Indian residential plans — compose a G+1 or G+2 home once, then move from layout to quantities, schedules, and a review-ready plan sheet.</p><div className="hero-actions"><a className="button button-dark" href="#waitlist" data-testid="hero-primary-cta">Get pilot access <ArrowUpRight size={16} /></a><a className="text-link" href="#workflow" data-testid="hero-secondary-cta">See the workflow <span>↘</span></a></div><p className="micro-note"><span className="status-dot" /> Currently opening a small group of pilot seats</p></div><div className="hero-visual-wrap"><div className="hero-visual-label label-top">JODU / 01 — PLAN TO PAPER</div><div className="hero-visual"><img src={assets.hero} alt="Draftsperson reviewing a residential plan beside a laptop" /></div><div className="hero-caption"><span>Built for the way residential work actually moves.</span><span>01 / 04</span></div></div></div><div className="hero-rule container"><span>JODU LABS</span><span>INDIA / RESIDENTIAL / 2026</span></div></section>

        <section className="intro-section section" id="product"><div className="container split-grid"><div className="section-index">01 <span /></div><div className="section-heading"><p className="eyebrow">The product</p><h2>Less redraw.<br /><em>More clarity.</em></h2></div><div className="section-body"><p>Residential planning is full of small, expensive repetitions: a room moves, a quantity changes, a sheet needs rebuilding. Jodu keeps the house and its downstream documents connected from the start.</p><p>It is not another general-purpose CAD environment. It is a calm, opinionated surface for getting a real home from idea to a coordinated set.</p><a className="text-link" href="#outputs" data-testid="product-proof-link">See the outputs <span>↘</span></a></div></div></section>

        <section className="proof-section section" id="workflow"><div className="container"><div className="section-topline"><p className="eyebrow">A single source of truth</p><span className="section-note">30 × 40 plot / G+1 example</span></div><div className="proof-intro"><h2>From rough direction<br />to <em>buildable clarity.</em></h2><p>Jodu turns the plan into a sequence your team can check, discuss, and use — without losing the thread between decisions.</p></div><div className="canvas-feature"><div className="canvas-image"><img src={assets.canvas} alt="Jodu plan canvas interface" /></div><div className="canvas-copy"><span className="feature-number">01</span><h3>Compose the house on one canvas.</h3><p>Lay out rooms, circulation, and levels in a spatial view that keeps the whole home visible. Make the decision once; let the rest of the set follow.</p><a className="text-link" href="#outputs">Explore the canvas <span>↗</span></a></div></div><div className="workflow-list">{["Set the plot", "Shape the rooms", "Review the 3D", "Read the quantities", "Issue the sheet"].map((item, index) => <div className="workflow-row" key={item}><span>0{index + 2}</span><strong>{item}</strong><span className="workflow-arrow">↗</span></div>)}</div></div></section>

        <section className="outputs-section section" id="outputs"><div className="container"><div className="section-topline"><p className="eyebrow">The proof</p><span className="section-note">What leaves the canvas</span></div><div className="outputs-heading"><h2>One model.<br /><em>Five deliverables.</em></h2><p>Keep the coordination work close to the design. Give the next person a document they can actually use.</p></div><div className="output-grid"><article className="output-card output-card-wide"><div className="output-image"><img src={assets.preview} alt="Jodu 3D residential preview" /></div><div className="output-meta"><span>02 / Review</span><h3>A 3D view that makes the idea legible.</h3></div></article><article className="output-card"><div className="output-image"><img src={assets.quantities} alt="Jodu quantities view" /></div><div className="output-meta"><span>03 / Quantities</span><h3>Quantities you can discuss.</h3></div></article><article className="output-card"><div className="output-image"><img src={assets.schedules} alt="Jodu schedules view" /></div><div className="output-meta"><span>04 / Schedules</span><h3>Schedules that keep the team moving.</h3></div></article><article className="output-card output-card-sheet"><div className="output-image"><img src={assets.sheet} alt="Jodu plan sheet output" /></div><div className="output-meta"><span>05 / Issue</span><h3>A clean sheet for the next conversation.</h3></div></article></div></div></section>

        <section className="audience-section section"><div className="container audience-grid"><div className="audience-copy"><p className="eyebrow">Made for the people in the middle</p><h2>For the work between the brief and the <em>brick.</em></h2><p>Jodu is for teams who translate a family’s needs into a home that can be priced, reviewed, and built with confidence.</p><div className="audience-list">{["Civil engineers", "Draftspersons", "Residential contractors"].map((item) => <div key={item}><Check size={16} />{item}</div>)}</div></div><div className="audience-visual"><img src={assets.blueprint} alt="Detailed architectural drawing detail" /><span className="drawing-label">FIELD NOTE / 30 × 40</span></div></div></section>

        <section className="faq-section section" id="faq"><div className="container faq-grid"><div><p className="eyebrow">Questions, answered</p><h2>The short version.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} data-testid={`faq-trigger-${index}`}><span>{question}</span><ChevronDown size={17} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="waitlist-section section" id="waitlist"><div className="waitlist-texture" /><div className="container waitlist-inner"><p className="eyebrow">Jodu / Pilot access</p><h2>Bring a real project.<br /><em>We’ll bring the canvas.</em></h2><p>Join the early group shaping how Jodu works in the field. Tell us where you work and what you draw.</p>{submitted ? <div className="success-state"><Check size={18} /> You’re on the list. We’ll be in touch at <strong>{email}</strong>.</div> : <form className="waitlist-form" onSubmit={submitWaitlist}><label className="sr-only" htmlFor="email">Work email</label><input id="email" type="email" placeholder="Your work email" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="waitlist-email" /><button className="button button-clay" type="submit" data-testid="waitlist-submit">Request pilot access <ArrowUpRight size={16} /></button></form>}<p className="micro-note">No noisy newsletters. Just a useful conversation about the work.</p></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><a className="brand" href="#top"><span className="brand-mark"><img src={assets.mark} alt="" /></span><span>jodu</span></a><p>Residential planning, made coherent.</p></div><div className="footer-links"><a href="#product">Product</a><a href="#workflow">Workflow</a><a href="#outputs">Outputs</a><a href="mailto:hello@jodulabs.com">Email us</a></div><div className="footer-meta"><span>Jodu Labs / India</span><span>© 2026</span></div></div></footer>
    </div>
  );
}
