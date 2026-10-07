import { lazy, Suspense, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, Box } from "lucide-react";
import AIShowcase from "../components/AIShowcase";
import JoduMark from "../components/brand/JoduMark";
const HouseShowcase = lazy(() => import("../components/HouseShowcase"));
const appUrl = "https://app.jodulabs.com/";
const views = [
  { name: "Plan", image: "/showcase/plan.png", title: "Draw with intent. Edit with precision.", copy: "Set out the plot, walls, rooms, openings and stairs. Work floor by floor with dimensions, snaps and editable properties.", alt: "The Gable House ground-floor plan in Jodu’s authoring workspace" },
  { name: "3D", image: "/showcase/exterior.png", title: "See what you are building.", copy: "Review the roof, openings, materials and structure in the same house model. Explore inside before issuing the drawings.", alt: "The Gable House in Jodu’s 3D review workspace" },
  { name: "Schedules", image: "/showcase/schedules.png", title: "The details stay with the house.", copy: "Read door, window, room and finish schedules from the model. Keep the specification connected to the design.", alt: "Model-derived schedules for The Gable House" },
  { name: "Quantities", image: "/showcase/estimate.png", title: "Understand the work behind the design.", copy: "Review measured quantities, editable rates and a priced bill of quantities. Material statements carry cement, sand and other purchases into the estimate. The example uses representative rates for illustration.", alt: "The Gable House quantity take-off and estimate in Jodu" },
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [view, setView] = useState(0);
  return <div className="site-shell">
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="Jodu home"><JoduMark /><span className="brand-word">jodu</span></a>
      <nav id="main-navigation" className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        <a href="#showcase">The house</a><a href="#workflow">Workflow</a><a href="#ai">AI assistance</a><a href="#access">Access</a>
      </nav>
      <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main id="top">
      <section className="showcase-hero container" id="product">
        <div className="hero-heading"><p className="eyebrow">Building modelling for housing</p><h1>Design the house.<br /><span>Keep every detail connected.</span></h1></div>
        <div className="hero-intro"><p>Precise modelling tools, useful AI assistance, and a house you can inspect in 3D. Plans, quantities, schedules and PDFs follow the same model.</p><a className="button button-dark" href={appUrl} target="_blank" rel="noreferrer">Open the workspace <ArrowUpRight size={17} /></a></div>
        <div className="hero-model" id="showcase">
          {interactive ? <Suspense fallback={<p className="model-status" role="status">Opening the 3D viewer…</p>}><HouseShowcase /></Suspense> : <>
            <img className="hero-poster" src="/showcase/hero.png" alt="The Gable House, authored in Jodu: a two-storey home with a pitched roof, timber gable and covered entrance" fetchPriority="high" />
            <button className="explore-button" onClick={() => setInteractive(true)}><Box size={18} /> Explore the actual model <ArrowRight size={17} /></button>
          </>}
          <div className="house-label"><span className="eyebrow">01 / The Gable House</span><span>40 × 60 ft plot · Ground + first floor</span></div>
        </div>
        <div className="hero-footnote"><span>A house designed in Jodu. The 3D model shown here is exported from the product.</span><a href="#workflow">See the working model <ArrowRight size={15} /></a></div>
      </section>
      <section className="section container" id="workflow">
        <div className="section-heading"><div><p className="eyebrow">See the platform at work</p><h2>From the first wall<br />to the drawing set.</h2></div><p>Make the design yours. Author the house manually, check it in 3D, and review the documents that come from it.</p></div>
        <div className="view-tabs" role="tablist" aria-label="House product views">{views.map((item,index) => <button id={`view-tab-${index}`} role="tab" aria-selected={index===view} aria-controls="house-view" tabIndex={index===view?0:-1} key={item.name} onClick={() => setView(index)} onKeyDown={event => {if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(view+(event.key==='ArrowRight'?1:-1)+views.length)%views.length;setView(next);document.getElementById(`view-tab-${next}`)?.focus();}}}>{String(index+1).padStart(2,'0')} <span>{item.name}</span></button>)}</div>
        <div className="view-panel" id="house-view" role="tabpanel" aria-labelledby={`view-tab-${view}`}><a className="product-capture" href={views[view].image} target="_blank" rel="noreferrer" aria-label={`Open full ${views[view].name.toLowerCase()} screenshot`}><img src={views[view].image} alt={views[view].alt} loading="lazy" width="1600" height="1000" /></a><div className="view-copy">{view === 3 && <div className="estimate-example"><strong>₹45.65 lakh</strong><span>Illustrative estimate · including GST</span></div>}<h3>{views[view].title}</h3><p>{views[view].copy}</p><span className="capture-note">Actual product capture / The Gable House</span></div></div>
        <div className="manual-demo"><div><p className="eyebrow">The manual foundation</p><h3>Start with a wall.<br />Keep control of every edit.</h3><p>Watch the actual authoring workflow: set out walls with precision, then continue building the house. This short product guide uses a separate demonstration project.</p></div><video controls muted playsInline preload="none" poster="/showcase/wall-draw.png" aria-label="Product guide: drawing walls in Jodu"><source src="/showcase/wall-draw.webm" type="video/webm" /><source src="/showcase/wall-draw.mp4" type="video/mp4" /><a href="/showcase/wall-draw.mp4">Watch the wall authoring guide</a></video></div>
        <div className="drawing-proof"><div><p className="eyebrow">Ready for the next review</p><h3>The model becomes a document.</h3><p>Compose plans, sections, elevations and schedules into drawing sheets. Export PDF drawings and a priced estimate for review and issue. The sheet shown here is from the separate 30 × 40 ft reference house.</p><a className="text-link" href="/product/plan-sheet-30x40-g1-1.png" target="_blank" rel="noreferrer">Inspect the example drawing sheet <ArrowUpRight size={16} /></a></div><a href="/product/plan-sheet-30x40-g1-1.png" target="_blank" rel="noreferrer" aria-label="Open the reference 30 by 40 foot house drawing sheet"><img src="/showcase/drawing.png" alt="Jodu drawing sheet exported from the reference 30 by 40 foot G+1 model" loading="lazy" /></a></div>
      </section>
      <AIShowcase />
      <section className="access-section" id="access"><div className="container access-inner"><div><p className="eyebrow">Start with a real project</p><h2>Bring your next house<br />into Jodu.</h2><p>For engineers, designers and practitioners working on housing. Open the browser workspace, or email us to discuss access and your project.</p><div className="hero-actions"><a className="button button-dark" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={17} /></a><a className="text-link" href="mailto:hello@jodulabs.com?subject=Jodu%20housing%20project">Email Jodu Labs <ArrowUpRight size={16} /></a></div></div><div className="product-notes"><details><summary>Can I work without AI?</summary><p>Yes. Author and edit the building manually with the plan workspace, properties and modelling tools. AI assistance is optional.</p></details><details><summary>Is this a completed building?</summary><p>The Gable House is an authored showcase project. It demonstrates the model and its outputs; it is not presented as a built client project.</p></details><details><summary>Does Jodu do structural design?</summary><p>The modelling and quantity workflow does not replace structural calculations or professional engineering review.</p></details><details><summary>Where can I use Jodu?</summary><p>The browser workspace is available at app.jodulabs.com. See <a href="/downloads">platform status</a> for packaging and release information.</p></details></div></div></section>
    </main>
    <footer className="site-footer container"><div><a className="brand" href="#top"><JoduMark /><span className="brand-word">jodu</span></a><p>Housing, modelled together.</p></div><div className="footer-links"><a href="#workflow">Product</a><a href="https://help.jodulabs.com/">Guides</a><a href="/downloads">Platform status</a><a href="mailto:hello@jodulabs.com">Contact</a></div><span>Jodu Labs / India · © 2026</span></footer>
  </div>;
}
