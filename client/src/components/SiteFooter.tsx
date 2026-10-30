import { company, privacyUrl } from "../company";
import JoduMark from "./brand/JoduMark";

export default function SiteFooter() {
  return <footer className="site-footer container">
    <div><a className="brand" href="/company/"><JoduMark /><span className="brand-word">jodu</span></a><p>A platform for housing.</p></div>
    <div className="footer-links"><a href="/company/#workflow">Product</a><a href="https://help.jodulabs.com/">Guides</a><a href="/company/downloads">Platform status</a><a href="/company/about">About</a><a href={privacyUrl}>Privacy</a><a href={`mailto:${company.email}`}>Contact</a></div>
    <div className="footer-meta"><span>© 2026 {company.legalName}</span><span>CIN {company.cin} · {company.location}</span></div>
  </footer>;
}
