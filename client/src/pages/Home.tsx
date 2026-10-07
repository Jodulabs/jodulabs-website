import { lazy, Suspense, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, Box } from "lucide-react";
import AIShowcase from "../components/AIShowcase";
import InlineClip from "../components/InlineClip";
import JoduMark from "../components/brand/JoduMark";
const HouseShowcase = lazy(() => import("../components/HouseShowcase"));
const appUrl = "https://app.jodulabs.com/";
const views = [
  { name: "Plan", image: "/showcase/plan.png", title: "Draw with intent. Edit with precision.", copy: "Work floor by floor with exact dimensions, snaps and editable properties.", alt: "The Gable House ground-floor plan in Jodu’s authoring workspace" },
  { name: "3D", image: "/showcase/exterior.png", title: "See what you are building.", copy: "Review the roof, openings and materials in the same model.", alt: "The Gable House in Jodu’s 3D review workspace" },
  { name: "Schedules", image: "/showcase/schedules.png", title: "The details stay with the house.", copy: "Door, window, room and finish schedules read straight from the model.", alt: "Model-derived schedules for The Gable House" },
  { name: "Quantities", image: "/showcase/estimate.png", title: "Understand the work behind the design.", copy: "Measured quantities, your own rates and a priced bill of quantities.", alt: "The Gable House bill of quantities in Jodu" },
];
const roles = [
  { id: "for-designers", name: "House designers & civil engineers", line: "Develop the design. Keep the details connected.", copy: "Draw and edit plans, explore ideas with AI, and prepare drawings, quantities and schedules from one project.", link: "Explore the workflow", href: "#workflow" },
  { id: "for-contractors", name: "Contractors & builders", line: "Understand the work before taking it to site.", copy: "Review the house in 3D, inspect the bill of quantities (BOQ) and price it with your own rates.", link: "See quantities", href: "#product-views" },
  { id: "for-homeowners", name: "Homeowners", line: "See your home. Make your feedback clear.", copy: "Explore the rooms in 3D and mark feedback on a captured view for your designer.", link: "See how feedback works", href: "#feedback" },
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [view, setView] = useState(0);
  return <div className="site-shell">
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="Jodu home"><JoduMark /><span className="brand-word">jodu</span></a>
      <nav id="main-navigation" className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        <a href="#workflow">Product</a><a href="#who-its-for">Who it’s for</a><a href="#ai">AI assistance</a>
      </nav>
      <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main id="top">
      <section className="showcase-hero container" id="product">
        <div className="hero-heading"><p className="eyebrow">AI-assisted house design and building modelling</p><h1>Design the house.<br /><span>Bring everyone into the picture.</span></h1></div>
        <div className="hero-intro"><p>AI-assisted house design for designers, civil engineers, contractors and homeowners — plans, 3D, quantities and feedback in one project.</p><div className="hero-actions"><a className="button button-dark" href="#who-its-for">Explore Jodu <ArrowRight size={17} /></a><a className="button button-outline" href="#ai">See AI in action</a></div></div>
        <div className="hero-model" id="showcase">
          {interactive ? <Suspense fallback={<p className="model-status" role="status">Opening the 3D viewer…</p>}><HouseShowcase /></Suspense> : <>
            <img className="hero-poster" src="/showcase/hero.png" alt="The Gable House, authored in Jodu: a two-storey home with a pitched roof, timber gable and covered entrance" fetchPriority="high" />
            <button className="explore-button" onClick={() => setInteractive(true)}><Box size={18} /> Explore the actual model <ArrowRight size={17} /></button>
          </>}
          <div className="house-label"><span className="eyebrow">01 / The Gable House</span><span>40 × 60 ft plot · Ground + first floor</span></div>
        </div>
      </section>
      <section className="section container who-section" id="who-its-for">
        <div className="section-heading"><p className="eyebrow">Who it’s for</p><h2>Where Jodu fits<br />into your work</h2></div>
        <div className="role-grid">{roles.map(role => <article className="role" id={role.id} key={role.id}>
          <h3 className="role-name">{role.name}</h3><p className="role-line">{role.line}</p><p>{role.copy}</p>
          <a className="text-link" href={role.href} onClick={role.href === "#product-views" ? () => setView(3) : undefined}>{role.link} <ArrowRight size={16} /></a>
        </article>)}</div>
      </section>
      <AIShowcase />
      <section className="feedback-section container" id="feedback">
        <div className="feedback-copy"><p className="eyebrow">Client feedback</p><h2>Discuss changes<br />where they matter.</h2><p>Share a 3D view with your client. They capture a view, mark a spot and leave a note you can review in the project.</p><blockquote className="feedback-quote">“Can we shift this window to the right? We want to keep the middle of this wall free for the TV unit.”</blockquote></div>
        <InlineClip id="website-project-feedback" label="A client marks a spot on a captured view of the house and adds a note; the designer opens that note in the project" />
      </section>
      <section className="section container product-section" id="workflow">
        <div className="section-heading"><p className="eyebrow">The product</p><h2>From the first wall<br />to the drawing set.</h2></div>
        <div className="view-tabs" id="product-views" role="tablist" aria-label="House product views">{views.map((item,index) => <button id={`view-tab-${index}`} role="tab" aria-selected={index===view} aria-controls="house-view" tabIndex={index===view?0:-1} key={item.name} onClick={() => setView(index)} onKeyDown={event => {if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(view+(event.key==='ArrowRight'?1:-1)+views.length)%views.length;setView(next);document.getElementById(`view-tab-${next}`)?.focus();}}}>{item.name}</button>)}</div>
        <div className="view-panel" id="house-view" role="tabpanel" aria-labelledby={`view-tab-${view}`}>
          <a className="media-frame media-product" href={views[view].image} target="_blank" rel="noreferrer" aria-label={`Open full ${views[view].name.toLowerCase()} image`}><img src={views[view].image} alt={views[view].alt} loading="lazy" width="1600" height="1000" /></a>
          <div className="view-copy">{view === 3 && <div className="estimate-example"><strong>₹45.65 lakh</strong><span>Illustrative estimate</span></div>}<h3>{views[view].title}</h3><p>{views[view].copy}</p></div>
        </div>
        <div className="deliverables"><h3>What you can hand over</h3><ul>
          <li><strong>Drawing sheets</strong><span>PDF</span></li>
          <li><strong>Plans</strong><span>DXF for CAD</span></li>
          <li><strong>Schedules</strong><span>PDF / CSV</span></li>
          <li><strong>Bill of quantities &amp; estimate</strong><span>PDF</span></li>
          <li><strong>3D model</strong><span>IFC, for any IFC-compatible BIM tool</span></li>
        </ul></div>
      </section>
      <section className="access-section" id="access"><div className="container access-inner"><div><h2>Bring your next house project into Jodu.</h2><p>Explore Jodu, or tell us about your project.</p><div className="hero-actions"><a className="button button-dark" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={17} /></a><a className="text-link" href="mailto:hello@jodulabs.com?subject=Jodu%20housing%20project">Email Jodu Labs <ArrowUpRight size={16} /></a></div></div><div className="product-notes"><details><summary>Can I work without AI?</summary><p>Yes. Model and edit the house manually; AI assistance is optional.</p></details><details><summary>Can Jodu generate a complete floor plan with AI?</summary><p>Not yet. Full floor-plan generation is still in development.</p></details><details><summary>Does Jodu do structural design?</summary><p>No. Jodu does not replace structural calculations or professional engineering review.</p></details><details><summary>Where can I use Jodu?</summary><p>In the browser at app.jodulabs.com. See <a href="/downloads">platform status</a> for release information.</p></details></div></div></section>
    </main>
    <footer className="site-footer container"><div><a className="brand" href="#top"><JoduMark /><span className="brand-word">jodu</span></a><p>Housing, modelled together.</p></div><div className="footer-links"><a href="#workflow">Product</a><a href="https://help.jodulabs.com/">Guides</a><a href="/downloads">Platform status</a><a href="mailto:hello@jodulabs.com">Contact</a></div><span>Jodu Labs / India · © 2026</span></footer>
  </div>;
}
