/* Design philosophy: Sober Product Site — clear platform status, concrete utility, quiet confidence, and no unsupported availability claims. */
import { ArrowDownToLine, ArrowUpRight, Check, Smartphone, Monitor } from "lucide-react";


export default function Downloads() {
  return (
    <div className="utility-page">
      <header className="site-nav" data-testid="downloads-navigation">
        <a className="brand" href="/" aria-label="Jodu home"><span className="brand-mark" aria-hidden="true"><span className="mark-frame mark-frame-a" /><span className="mark-frame mark-frame-b" /></span><span>jodu</span></a>
        <nav className="desktop-nav"><a href="/">Product</a><a href="/#demo">Demo</a><a className="is-active" href="/downloads">Downloads</a><a href="mailto:hello@jodulabs.com">Contact <ArrowUpRight size={13} /></a></nav>
        <a className="nav-cta" href="/#waitlist">Join the pilot <ArrowUpRight size={14} /></a>
      </header>
      <main className="downloads-main container">
        <div className="downloads-kicker"><span className="eyebrow-mark" /> JODU / DOWNLOADS</div>
        <div className="downloads-header"><div><h1>Use Jodu<br /><em>where you work.</em></h1></div><p>Jodu is being released across desktop and mobile in stages. This page will always show the current status for each platform.</p></div>
        <div className="platform-list">
          <article className="platform-card platform-card-primary"><div className="platform-icon"><Monitor size={24} /></div><div className="platform-copy"><div className="platform-label"><span>Desktop</span><strong className="status-pill">Releasing soon</strong></div><h2>The main Jodu workspace.</h2><p>Compose residential plans, review the model, and work through the documents that follow from the plan. The desktop build is the first release surface for the full workflow.</p><div className="platform-actions"><button className="button button-dark" disabled data-testid="desktop-download-disabled"><ArrowDownToLine size={16} /> Download coming soon</button><span className="platform-note">Windows and macOS details will be posted here when the release is ready.</span></div></div></article>
          <article className="platform-card"><div className="platform-icon"><Smartphone size={24} /></div><div className="platform-copy"><div className="platform-label"><span>Android</span><strong className="status-pill status-pill-muted">In development</strong></div><h2>A companion for the field.</h2><p>The Android app is planned as a practical companion for reviewing project information away from the desk. It is not publicly available yet.</p><div className="platform-actions"><button className="button button-outline" disabled data-testid="android-download-disabled"><Smartphone size={16} /> Android app not available yet</button><span className="platform-note">Join the pilot list to hear when the first test build is ready.</span></div></div></article>
        </div>
        <section className="download-notes"><div><span className="eyebrow">Release notes</span><h2>Clear status.<br /><em>No guesswork.</em></h2></div><div className="download-note-list"><div><Check size={16} /><p>Downloads will be linked directly to the official Jodu release.</p></div><div><Check size={16} /><p>Platform status will be updated as builds move from development to testing and release.</p></div><div><Check size={16} /><p>For early access, use the pilot request on the product page.</p></div></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-grid"><div><a className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span className="mark-frame mark-frame-a" /><span className="mark-frame mark-frame-b" /></span><span>jodu</span></a><p>Residential planning, made coherent.</p></div><div className="footer-links"><a href="/">Product</a><a href="/#demo">Demo</a><a href="/downloads">Downloads</a><a href="mailto:hello@jodulabs.com">Email us</a></div><div className="footer-meta"><span>Jodu Labs / India</span><span>© 2026</span></div></div></footer>
    </div>
  );
}
