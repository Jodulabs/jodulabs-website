/* Design philosophy: Sober Product Site — explain the current product surface, show real outputs, and use platform status as information rather than persuasion. */
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";

const appUrl = "https://app.jodulabs.com/";
const assets = {
  canvas: "/product/ui-plan-canvas.png",
  preview: "/product/ui-3d-preview.png",
  quantities: "/product/ui-quantities.png",
  schedules: "/product/ui-schedules.png",
  sheet: "/product/plan-sheet-30x40-g1-1.png",
};
const brandIcon = "/jodulabs-infinite-mark.png";

const workflow = [
  [
    "01",
    "Set out",
    "Define the plot, road side, setbacks, and buildable envelope.",
  ],
  [
    "02",
    "Author",
    "Place walls, typed rooms, openings, stairs, dimensions, materials, and finishes on one model.",
  ],
  [
    "03",
    "Review",
    "Use the 3D view, House Overview, and Explore mode to inspect the same model.",
  ],
  [
    "04",
    "Issue",
    "Prepare drawing sets, schedules, quantities, and a priced bill of quantities.",
  ],
];

const featureGroups = [
  [
    "Author the house",
    "Plot and setback controls, typed rooms with live areas, doors, windows, stairs, dimensions, and precision tools including Offset, Trim, Extend, Mirror, Match-properties, and Array.",
  ],
  [
    "Use regional materials",
    "India-first wall and foundation profiles for laterite, rubble stone, concrete block, fly-ash brick, clay brick, and AAC, with material-aware quantities and take-off.",
  ],
  [
    "Carry finishes through",
    "Specify materials and use a finish cascade from project to room type, space, and surface so finishes remain part of the model and its deliverables.",
  ],
  [
    "Read schedules and quantities",
    "Live door, window, room, wall, stair, finish, envelope, and fixture schedules, plus take-off for masonry, concrete, steel, foundations, finishes, and openings.",
  ],
  [
    "Price the work",
    "An editable rate book, GST-inclusive costs, a material statement in bags and brass, and CSV export for estimating. Rates and assumptions remain visible and changeable.",
  ],
  [
    "Prepare the drawing set",
    "A3, A2, or A1 sheets containing plans, sections, elevations, schedules, and BoQ, exported as an IS-962-style PDF with a title block.",
  ],
  [
    "Exchange and trace",
    "Export layered DXF and DWG through the server converter. Existing DWG/DXF files can be used as a reference for user-confirmed wall tracing; they are not automatically converted into a model.",
  ],
  [
    "Review in 3D",
    "Massing and coordination views, including House Overview and Explore mode. The 3D view is for verification and exploration, not photorealistic rendering.",
  ],
];

const faqs = [
  [
    "What is Jodu?",
    "Jodu is a building modeller for the Indian house. It holds the plot, geometry, rooms, openings, stairs, finishes, envelope, and materials as one coordinated model. Plans, schedules, quantities, the priced bill of quantities, and the 3D view are views of that model.",
  ],
  [
    "Who is it for?",
    "Jodu is intended for Indian civil engineers, structural draftspersons, and technically-literate contractors working on G+1 and G+2 residential houses.",
  ],
  [
    "Which surface should I use?",
    "The browser app is the live account-based workspace. The desktop app is in preparation for the full workflow. The Android app is an offline-first field companion for briefs, site observations, photos, voice notes, location and orientation, and project review; it does not author the building model directly.",
  ],
  [
    "What is outside the current scope?",
    "Jodu does not provide black-box AI layout generation, structural calculations, MEP drawings, real-time multi-user collaboration, photorealistic rendering, or automatic conversion of an existing drawing into a model. The current scope is G+1 and G+2 rectilinear residential houses.",
  ],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="site-nav" data-testid="site-navigation">
        <a className="brand" href="#top" aria-label="Jodu home">
          <span className="brand-mark" aria-hidden="true">
            <img src={brandIcon} alt="" />
          </span>
          <span>jodu</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <a className="is-active" href="#product">
            Product
          </a>
          <a href="#demo">Demo</a>
          <a href="/downloads">Downloads</a>
          <a href="mailto:hello@jodulabs.com">
            Contact <MoveUpRight size={13} />
          </a>
        </nav>
        <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">
          Open browser app <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          data-testid="mobile-menu-toggle"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="product-hero" id="product">
          <div className="container product-hero-inner">
            <div className="product-hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-mark" /> JODU / BUILDING MODELLER
              </p>
              <h1>
                A building modeller for the <em>Indian house.</em>
              </h1>
              <p className="product-hero-lede">
                Compose a G+1 or G+2 house as one coordinated model. From that
                model, Jodu produces plans, schedules, quantities, a priced BoQ,
                and the drawing set that follows.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-dark"
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open browser app <ArrowUpRight size={14} />
                </a>
                <a className="text-link" href="#demo">
                  Read the workflow <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className="product-hero-proof">
              <div className="proof-head">
                <span>JODU / PLAN CANVAS</span>
                <span>01</span>
              </div>
              <div className="product-canvas">
                <img src={assets.canvas} alt="Jodu plan canvas interface" />
              </div>
              <p>Plot, rooms, openings, stairs, and dimensions on one model.</p>
            </div>
          </div>
          <div className="container hero-rule">
            <span>BROWSER APP / LIVE</span>
            <span>DESKTOP / IN PREPARATION</span>
            <span>ANDROID / INTERNAL TESTING</span>
          </div>
        </section>

        <section className="definition-section section" id="demo">
          <div className="container definition-grid">
            <div>
              <p className="eyebrow">Product definition</p>
              <h2>
                One model.
                <br />
                <em>Every deliverable, in step.</em>
              </h2>
            </div>
            <div className="definition-copy">
              <p>
                Jodu is a building modeller for Indian G+1 and G+2 residential
                houses. The plot, walls, rooms, openings, stairs, finishes,
                envelope, and materials stay together in one coordinated model.
              </p>
              <p>
                Plans, schedules, quantities, the priced bill of quantities, and
                the 3D view are views of that model. Change the model and review
                the related outputs from the same source.
              </p>
              <a
                className="button button-outline"
                href={appUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open the live workspace <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="video-section section">
          <div className="container">
            <div className="section-topline">
              <p className="eyebrow">Current product surface</p>
              <span className="section-note">
                Recorded walkthrough not available
              </span>
            </div>
            <div className="video-demo-grid">
              <div className="video-frame">
                <div className="video-poster">
                  <img src={assets.preview} alt="Jodu 3D verification view" />
                  <div className="video-scrim" />
                  <span className="video-status">3D / VERIFICATION VIEW</span>
                </div>
              </div>
              <div className="video-copy">
                <span className="feature-number">01</span>
                <h2>The current build, shown in product views.</h2>
                <p>
                  A recorded walkthrough will be added when it is ready. For
                  now, the screenshots on this page show the plan canvas, 3D
                  review, quantities, schedules, and drawing output.
                </p>
                <span className="video-note">
                  The 3D view supports massing and coordination; it is not a
                  photorealistic renderer.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="container">
            <div className="section-topline">
              <p className="eyebrow">Workflow</p>
              <span className="section-note">One model / multiple views</span>
            </div>
            <div className="workflow-list">
              {workflow.map(([number, title, description]) => (
                <div className="workflow-item" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ArrowRight size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-reference-section section">
          <div className="container">
            <div className="section-topline">
              <p className="eyebrow">Feature reference</p>
              <span className="section-note">
                Implemented product capabilities
              </span>
            </div>
            <div className="feature-reference-intro">
              <h2>
                What the current product
                <br />
                <em>can produce.</em>
              </h2>
              <p>
                These are the working capabilities behind the reference 30 × 40
                ft G+1 project shown in the product images.
              </p>
            </div>
            <div className="feature-list">
              {featureGroups.map(([title, description]) => (
                <div className="feature-row" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="outputs-section section">
          <div className="container">
            <div className="section-topline">
              <p className="eyebrow">Product views</p>
              <span className="section-note">
                Screenshots and real product output
              </span>
            </div>
            <div className="output-strip">
              <article>
                <img
                  src={assets.quantities}
                  alt="Jodu quantities and BoQ view"
                />
                <span>Quantities / priced BoQ</span>
              </article>
              <article>
                <img src={assets.schedules} alt="Jodu schedules view" />
                <span>Schedules</span>
              </article>
              <article>
                <img src={assets.sheet} alt="Jodu IS-962-style drawing sheet" />
                <span>Drawing set sheet</span>
              </article>
            </div>
            <div className="outputs-footer">
              <p>
                The plan sheet shown here is real product output from the
                canonical 30 × 40 ft G+1 model, rendered by Jodu’s own exporter.
              </p>
              <a className="text-link" href="/downloads">
                See platform status <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="platform-section section">
          <div className="container platform-section-grid">
            <div>
              <p className="eyebrow">Platforms</p>
              <h2>
                Three surfaces.
                <br />
                <em>Different roles.</em>
              </h2>
              <p className="platform-intro">
                The browser app, desktop app, and Android companion are not
                feature-equivalent versions of the same client.
              </p>
            </div>
            <div className="platform-summary">
              <div>
                <span className="platform-state">BROWSER APP / LIVE</span>
                <h3>Jodu in the browser</h3>
                <p>
                  The current account-based workspace for authoring and
                  reviewing building projects, from the model through the
                  drawing set and priced BoQ.
                </p>
                <a
                  className="text-link platform-inline-link"
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open app <ArrowUpRight size={14} />
                </a>
              </div>
              <div>
                <span className="platform-state">DESKTOP / IN PREPARATION</span>
                <h3>Jodu desktop</h3>
                <p>
                  The desktop app is being prepared as a packaged workspace for
                  the full authoring and document workflow. No public installer
                  is available yet.
                </p>
              </div>
              <div>
                <span className="platform-state">
                  ANDROID / INTERNAL TESTING
                </span>
                <h3>Jodu field companion</h3>
                <p>
                  An offline-first companion for site visits, briefs,
                  measurements, photos, voice notes, location and orientation,
                  and 3D project review. It records information for later
                  review; it does not author the building model directly.
                </p>
              </div>
              <a className="button button-outline" href="/downloads">
                View platform details <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="faq-section section" id="faq">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">Questions</p>
              <h2>Product notes.</h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div
                  className={`faq-item ${openFaq === index ? "is-open" : ""}`}
                  key={question}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    data-testid={`faq-trigger-${index}`}
                  >
                    <span>{question}</span>
                    <ChevronDown size={17} />
                  </button>
                  {openFaq === index && <p>{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pilot-section section" id="pilot">
          <div className="container pilot-inner">
            <div>
              <p className="eyebrow">Access</p>
              <h2>
                Request access to
                <br />
                <em>the current workspace.</em>
              </h2>
            </div>
            <div>
              <p>
                If you work on Indian G+1 or G+2 residential houses, use the
                form to ask about access to the current Jodu workspace. We will
                reply with the availability and next steps.
              </p>
              {submitted ? (
                <div className="success-state">
                  <Check size={17} /> Request received for{" "}
                  <strong>{email}</strong>.
                </div>
              ) : (
                <form className="waitlist-form" onSubmit={submit}>
                  <label className="sr-only" htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                    data-testid="waitlist-email"
                  />
                  <button
                    className="button button-dark"
                    type="submit"
                    data-testid="waitlist-submit"
                  >
                    Request access <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">
                <img src={brandIcon} alt="" />
              </span>
              <span>jodu</span>
            </a>
            <p>A building modeller for the Indian house.</p>
          </div>
          <div className="footer-links">
            <a href="#product">Product</a>
            <a href="#demo">Demo</a>
            <a href="/downloads">Downloads</a>
            <a href="mailto:hello@jodulabs.com">Email us</a>
          </div>
          <div className="footer-meta">
            <span>Jodu Labs / India</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
