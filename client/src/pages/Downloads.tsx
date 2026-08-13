/* Design philosophy: Utility status sheet — make each platform’s role, availability, and next action unambiguous without presenting placeholders as downloads. */
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Monitor,
  Smartphone,
  Globe2,
} from "lucide-react";

const appUrl = "https://app.jodulabs.com/";
const architecturalMark = <><span className="mark-frame mark-frame-a" /><span className="mark-frame mark-frame-b" /></>;

export default function Downloads() {
  return (
    <div className="utility-page">
      <header className="site-nav" data-testid="downloads-navigation">
        <a className="brand" href="/" aria-label="Jodu home">
          <span className="brand-mark" aria-hidden="true">
            {architecturalMark}
          </span>
          <span className="brand-word">jodu</span>
        </a>
        <nav className="desktop-nav">
          <a href="/">Product</a>
          <a href="/#demo">Demo</a>
          <a href="/#plans">Plans</a>
          <a className="is-active" href="/downloads">
            Downloads
          </a>
          <a href="mailto:hello@jodulabs.com">
            Contact <ArrowUpRight size={13} />
          </a>
        </nav>
        <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">
          Open browser app <ArrowUpRight size={14} />
        </a>
      </header>

      <main className="downloads-main container">
        <div className="downloads-kicker">
          <span className="eyebrow-mark" /> JODU / PLATFORM STATUS
        </div>
        <div className="downloads-header">
          <div>
            <h1>
              Current
              <br />
              <em>platform status.</em>
            </h1>
          </div>
          <p>
            Jodu has a live browser workspace, a desktop app in preparation, and
            an Android companion in internal testing. These surfaces have
            different roles and are not feature-equivalent.
          </p>
        </div>

        <div className="platform-list">
          <article className="platform-card platform-card-primary">
            <div className="platform-icon">
              <Globe2 size={24} />
            </div>
            <div className="platform-copy">
              <div className="platform-label">
                <span>Browser app / SaaS</span>
                <strong className="status-pill status-pill-live">Live</strong>
              </div>
              <h2>The current Jodu workspace.</h2>
              <p>
                Use the account-based browser app to author and review building
                projects. The current product surface covers the coordinated
                house model, 3D review, schedules, quantity take-off, priced
                BoQ, drawing sets, and exports.
              </p>
              <div className="platform-actions">
                <a
                  className="button button-dark"
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="browser-app-link"
                >
                  Open browser app <ArrowUpRight size={15} />
                </a>
                <span className="platform-note">
                  Sign-in and account flows are available at the app address.
                </span>
              </div>
            </div>
          </article>

          <article className="platform-card">
            <div className="platform-icon">
              <Monitor size={24} />
            </div>
            <div className="platform-copy">
              <div className="platform-label">
                <span>Desktop app</span>
                <strong className="status-pill">In preparation</strong>
              </div>
              <h2>A packaged workspace for the full workflow.</h2>
              <p>
                The desktop app is being prepared around the full authoring and
                document workflow. The public release is not available yet, so
                there are no installer links or public version numbers to share.
              </p>
              <div className="installer-placeholder-grid">
                <div className="installer-placeholder">
                  <div>
                    <strong>Windows</strong>
                    <span>Public installer not available</span>
                  </div>
                  <button
                    className="button button-outline"
                    disabled
                    data-testid="windows-download-disabled"
                  >
                    <ArrowDownToLine size={15} /> Coming soon
                  </button>
                </div>
                <div className="installer-placeholder">
                  <div>
                    <strong>macOS</strong>
                    <span>Public installer not available</span>
                  </div>
                  <button
                    className="button button-outline"
                    disabled
                    data-testid="macos-download-disabled"
                  >
                    <ArrowDownToLine size={15} /> Coming soon
                  </button>
                </div>
              </div>
              <span className="platform-note">
                These are status markers, not download links. Official
                installers will be linked here when the public release is ready.
              </span>
            </div>
          </article>

          <article className="platform-card">
            <div className="platform-icon">
              <Smartphone size={24} />
            </div>
            <div className="platform-copy">
              <div className="platform-label">
                <span>Android companion</span>
                <strong className="status-pill status-pill-muted">
                  Internal testing
                </strong>
              </div>
              <h2>Capture information away from the desk.</h2>
              <p>
                The Android app is an offline-first field companion for house
                briefs, site measurements and observations, photos, voice notes,
                location and orientation, and 3D project review. Information
                captured on the phone is reviewed and applied by a professional;
                the phone does not author the building model directly.
              </p>
              <div className="platform-actions">
                <button
                  className="button button-outline"
                  disabled
                  data-testid="android-download-disabled"
                >
                  <Smartphone size={16} /> No public download
                </button>
                <span className="platform-note">
                  The app is on the Google Play internal testing track and is
                  not publicly listed.
                </span>
              </div>
            </div>
          </article>
        </div>

        <section className="download-notes">
          <div>
            <span className="eyebrow">Release information</span>
            <h2>
              Status is part of
              <br />
              <em>the product information.</em>
            </h2>
          </div>
          <div className="download-note-list">
            <div>
              <Check size={16} />
              <p>
                The browser app is the current live surface for the Jodu
                workspace.
              </p>
            </div>
            <div>
              <Check size={16} />
              <p>
                Desktop installers will be linked here only when they are ready
                for public release.
              </p>
            </div>
            <div>
              <Check size={16} />
              <p>
                Android is a companion for collecting and reviewing field
                information, not a mobile version of the desktop authoring tool.
              </p>
            </div>
            <div>
              <Check size={16} />
              <p>
                For access questions or early testing, contact Jodu Labs or use
                the access form on the product page.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">
                {architecturalMark}
              </span>
              <span className="brand-word">jodu</span>
            </a>
            <p>A building modeller for the Indian house.</p>
          </div>
          <div className="footer-links">
            <a href="/">Product</a>
            <a href="/#demo">Demo</a>
            <a href="/#plans">Plans</a>
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
