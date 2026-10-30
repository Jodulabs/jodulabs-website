/* Design philosophy: Plain record — who builds Jodu, in facts a visitor can check. */
import { ArrowUpRight } from "lucide-react";
import JoduMark from "../components/brand/JoduMark";
import PersonCard from "../components/PersonCard";
import SiteFooter from "../components/SiteFooter";
import { company, team } from "../company";

const appUrl = "https://jodu.io/";

export default function About() {
  return (
    <div className="utility-page">
      <header className="site-nav">
        <a className="brand" href="/company/" aria-label="Jodu home"><JoduMark /><span className="brand-word">jodu</span></a>
        <nav className="desktop-nav">
          <a href="/company/">Product</a>
          <a href="/company/downloads">Platform status</a>
          <a className="is-active" href="/company/about">About</a>
          <a href={`mailto:${company.email}`}>Contact <ArrowUpRight size={13} /></a>
        </nav>
        <a className="nav-cta" href={appUrl} target="_blank" rel="noreferrer">Open Jodu <ArrowUpRight size={14} /></a>
      </header>

      <main className="about-main">
        <h1 className="about-title">About</h1>

        <div className="about-grid">
          <section className="about-card" aria-labelledby="about-team">
            <h2 className="about-label" id="about-team">Team</h2>
            {team.map(person => <PersonCard person={person} key={person.name} />)}
          </section>
          <section className="about-card about-recognition" aria-labelledby="about-recognition">
            <h2 className="about-label" id="about-recognition">Recognition</h2>
            <img className="recognition-badge" src="/company/recognition/nvidia-inception-program-badge.svg" alt="Member of NVIDIA Inception" width={200} height={87} />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
