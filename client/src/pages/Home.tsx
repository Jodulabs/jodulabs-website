import { lazy, Suspense, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, Box } from "lucide-react";
import AIShowcase from "../components/AIShowcase";
import InlineClip from "../components/InlineClip";
import JoduMark from "../components/brand/JoduMark";
import SiteFooter from "../components/SiteFooter";
import { company } from "../company";
const HouseShowcase = lazy(() => import("../components/HouseShowcase"));
const appUrl = "https://jodu.io/";
const playUrl = "https://play.google.com/store/apps/details?id=com.jodulabs.jodu";
const phones = [
  { src: "/company/showcase/mobile-1.png", alt: "The Jodu Android app for the Sharma Residence project, offering a site visit and a house brief" },
  { src: "/company/showcase/mobile-2.png", alt: "A house brief in the Jodu Android app: a family of five, three bedrooms, a pooja room and a home office" },
];
const views = [
  { name: "Plan", image: "/company/showcase/plan.png", title: "Draw with intent. Edit with precision.", copy: "Work floor by floor with exact dimensions, snaps and editable properties.", alt: "The Gable House ground-floor plan in Jodu’s authoring workspace" },
  { name: "3D", image: "/company/showcase/exterior.png", title: "See what you are building.", copy: "Review the roof, openings and materials in the same model.", alt: "The Gable House in Jodu’s 3D review workspace" },
  { name: "Sheets", image: "/company/showcase/sheets.png", title: "Drawing sets for the next step.", copy: "Compose plans and elevations into sheets for site, approval or client review, and export the PDF set.", alt: "A client review drawing sheet for The Gable House with floor plans and elevations in Jodu" },
  { name: "Schedules", image: "/company/showcase/schedules.png", title: "The details stay with the house.", copy: "Door, window, room and finish schedules read straight from the model.", alt: "Model-derived schedules for The Gable House" },
  { name: "Quantities", image: "/company/showcase/estimate.png", title: "Understand the work behind the design.", copy: "Measured quantities, your own rates and a priced bill of quantities.", alt: "The Gable House bill of quantities in Jodu" },
];
const roles = [
  { id: "for-designers", name: "House designers & civil engineers", line: "Develop the design. Keep the details connected.", copy: "Turn requirements into detailed plans. Explore design options and prepare drawings, quantities and schedules that stay connected.", link: "Explore the workflow", href: "#workflow" },
  { id: "for-contractors", name: "Contractors & builders", line: "Understand the work before taking it to site.", copy: "Understand the design in 3D and review measured quantities. Estimating tools turn quantities and editable rates into a priced bill of quantities (BOQ).", link: "See quantities", href: "#product-views" },
  { id: "for-homeowners", name: "Homeowners", line: "Make your needs part of the design.", copy: "Capture your requirements and site details, explore the design in 3D and leave feedback your designer can see in context.", link: "See how to take part", href: "#feedback" },
];
const quantitiesView = views.findIndex(item => item.name === "Quantities");
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [view, setView] = useState(0);
  return <div className="site-shell">
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="Jodu home"><JoduMark /><span className="brand-word">jodu</span></a>
      <nav id="main-navigation" className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        <a href="#who-its-for">Platform</a><a href="#workflow">Design tools</a><a href="#ai">AI assistance</a><a href="/company/about">About</a>
      </nav>
      <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main id="top">
      <section className="showcase-hero container" id="product">
        <div className="hero-heading"><p className="eyebrow">A platform for housing</p><h1>Imagine. Design.<br /><span>Agree on a home.</span></h1></div>
        <div className="hero-intro"><p>Jodu brings homeowners, designers and builders around the same house. Explore ideas, develop the design, understand the costs and make decisions together.</p><div className="hero-actions"><a className="button button-dark" href="#who-its-for">Explore Jodu <ArrowRight size={17} /></a><a className="button button-outline" href="#ai">See AI in action</a></div></div>
        <div className="hero-model" id="showcase">
          {interactive ? <Suspense fallback={<p className="model-status" role="status">Opening the 3D viewer…</p>}><HouseShowcase /></Suspense> : <>
            <img className="hero-poster" src="/company/showcase/hero.png" alt="The Gable House, authored in Jodu: a two-storey home with a pitched roof, timber gable and covered entrance" fetchPriority="high" />
            <button className="explore-button" onClick={() => setInteractive(true)}><Box size={18} /> Explore the house in 3D <ArrowRight size={17} /></button>
          </>}
          <div className="house-label"><span className="eyebrow">01 / The Gable House</span><span>40 × 60 ft plot · Ground + first floor</span></div>
        </div>
      </section>
      <section className="section container who-section" id="who-its-for">
        <div className="section-heading"><p className="eyebrow">Built around the house</p><h2>One home.<br />Everyone involved.</h2><p>Jodu Labs is building a platform for housing in India, connecting the people, design information and decisions that shape a home.</p></div>
        <div className="role-grid">{roles.map(role => <article className="role" id={role.id} key={role.id}>
          <h3 className="role-name">{role.name}</h3><p className="role-line">{role.line}</p><p>{role.copy}</p>
          <a className="text-link" href={role.href} onClick={role.href === "#product-views" ? () => setView(quantitiesView) : undefined}>{role.link} <ArrowRight size={16} /></a>
        </article>)}</div>
      </section>
      <AIShowcase />
      <section className="feedback-section container" id="feedback">
        <div className="feedback-copy"><p className="eyebrow">Decisions together</p><h2>Discuss changes<br />where they matter.</h2><p>Share a 3D view with your client. They capture a view, mark a spot and leave a note you can review in the project.</p><p className="feedback-quote">A window position, a room layout, a finish: give each conversation a clear place to start.</p></div>
        <InlineClip id="website-project-feedback" label="A client marks a spot on a captured view of the house and adds a note; the designer opens that note in the project" />
      </section>
      <section className="mobile-section container" id="mobile">
        <div className="mobile-copy"><p className="eyebrow">Jodu on mobile</p><h2>Start the project<br />from your phone.</h2><p>Homeowners and site visitors capture the house brief and site details on their phone. They arrive in the Jodu project for the designer to review.</p><a className="play-badge" href={playUrl} target="_blank" rel="noreferrer"><img src="/company/showcase/google-play-badge.png" alt="Get it on Google Play" width="564" height="168" /></a><div className="app-soon"><h3>In development: home concepts</h3><p>Arrange rooms, explore a layout in 3D and refine ideas with AI. We’re building a concept experience for your phone, with continuation on the web.</p><a className="text-link" href="#next">Explore the direction <ArrowRight size={16} /></a></div></div>
        <div className="phone-row">{phones.map(phone => <img className="phone" src={phone.src} alt={phone.alt} width={720} height={1416} loading="lazy" key={phone.src} />)}</div>
      </section>
      <section className="section container product-section" id="workflow">
        <div className="section-heading"><p className="eyebrow">Professional design tools</p><h2>Turn the design<br />into the details.</h2><p>For Indian G+1 and G+2 homes: connected plans, 3D views, schedules and estimates, with the designer in control.</p></div>
        <div className="view-tabs" id="product-views" role="tablist" aria-label="House product views">{views.map((item,index) => <button id={`view-tab-${index}`} role="tab" aria-selected={index===view} aria-controls="house-view" tabIndex={index===view?0:-1} key={item.name} onClick={() => setView(index)} onKeyDown={event => {if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(view+(event.key==='ArrowRight'?1:-1)+views.length)%views.length;setView(next);document.getElementById(`view-tab-${next}`)?.focus();}}}>{item.name}</button>)}</div>
        <div className="view-panel" id="house-view" role="tabpanel" aria-labelledby={`view-tab-${view}`}>
          <a className="media-frame media-product" href={views[view].image} target="_blank" rel="noreferrer" aria-label={`Open full ${views[view].name.toLowerCase()} image`}><img src={views[view].image} alt={views[view].alt} loading="lazy" width="1600" height="1000" /></a>
          <div className="view-copy">{view === quantitiesView && <div className="estimate-example"><strong>₹45.65 lakh</strong><span>Illustrative estimate</span></div>}<h3>{views[view].title}</h3><p>{views[view].copy}</p></div>
        </div>
        <div className="deliverables"><h3>What you can hand over</h3><ul>
          <li><strong>Drawing sheets</strong><span>PDF</span></li>
          <li><strong>Plans</strong><span>DXF for CAD</span></li>
          <li><strong>Schedules</strong><span>On PDF drawing sheets</span></li>
          <li><strong>Bill of quantities &amp; estimate</strong><span>PDF</span></li>
          <li><strong>3D model</strong><span>IFC</span></li>
        </ul></div>
      </section>
      <section className="section container platform-next" id="next" aria-labelledby="next-title">
        <div className="section-heading"><p className="eyebrow">The platform is growing</p><h2 id="next-title">From an idea of home<br />to a shared decision.</h2><p>In development: two new ways to bring more of the housing journey into Jodu.</p></div>
        <div className="next-features">
          <article><span className="status-pill">In development</span><h3>Imagine your home.</h3><p>Start with the rooms and spaces you need. Move and resize them, explore an illustrative 3D view and refine the sketch with AI. Take a reviewed sketch into a new professional design project when you’re ready.</p><p className="next-detail">Designed for phones, with continuation on the web. Detailed construction design stays with the professional workflow.</p></article>
          <article><span className="status-pill">In development</span><h3>Know what everyone is reviewing.</h3><p>Bring the homeowner, design team, contractor and reviewers into one house project. Share a fixed revision, compare design and quantity changes, and keep notes and homeowner approvals attached to that version.</p><p className="next-detail">The working design can keep moving while the shared revision stays intact. Price visibility follows each person’s access.</p></article>
        </div>
      </section>
      <section className="access-section" id="access"><div className="container access-inner"><div><h2>Bring your next house project into Jodu.</h2><p>Designing, planning your own home or preparing to build? Tell us where you are in the journey.</p><div className="hero-actions"><a className="button button-dark" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={17} /></a><a className="text-link" href={`mailto:${company.email}?subject=Jodu%20housing%20project`}>Email Jodu Labs <ArrowUpRight size={16} /></a></div></div><div className="product-notes"><details><summary>What is Jodu?</summary><p>Jodu is a platform for housing, bringing design tools, project information and the people around a home together. Today you can develop a house design, prepare documents and estimates, and collect feedback. Home concepts and revision-based collaboration are in development.</p></details><details><summary>Can I work without AI?</summary><p>Yes. Draw and edit the house directly; AI assistance is optional.</p></details><details><summary>Can I explore my own home ideas?</summary><p>The homeowner concept experience is in development: arrange rooms, explore in 3D and refine a sketch with AI. Creating a professional project from a sketch is an explicit next step. A concept is not a construction-ready design.</p></details><details><summary>Does Jodu do structural design?</summary><p>No. Jodu does not replace structural calculations or professional engineering review.</p></details><details><summary>Where can I use Jodu?</summary><p>In the browser at jodu.io. See <a href="/company/downloads">platform status</a> for release information.</p></details></div></div></section>
    </main>
    <SiteFooter />
  </div>;
}
