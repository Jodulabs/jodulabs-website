import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ideas = [
  { tier: "Economy", title: "Ivory Jaali Calm", image: "/showcase/exterior-idea-economy.png" },
  { tier: "Standard", title: "Timber-Grid Warmth", image: "/showcase/exterior-idea-standard.png" },
  { tier: "Premium", title: "Sandstone Teak Finesse", image: "/showcase/exterior-idea-premium.png" },
];

export default function AIShowcase() {
  const [idea, setIdea] = useState(1);
  return (
    <section className="ai-section" id="ai">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">AI, with your judgement in the loop</p><h2>Small briefs.<br />Useful possibilities.</h2></div>
          <p>Explore a direction, choose the details, or ask about your project. AI assistance sits alongside a complete manual modelling workflow. Full floor-plan generation is still in development.</p>
        </div>
        <article className="ai-scenario">
          <div className="scenario-heading"><span className="scenario-index">01</span><div><h3>From exterior brief to inspiration.</h3><p>Use the current house view as the starting point. Compare ideas before deciding what to model.</p></div></div>
          <div className="scenario-brief"><span>Your brief</span><blockquote>“Keep the pitched terracotta roof and all openings. Explore a warm contemporary exterior with ivory plaster, natural timber accents and sandstone at the entrance.”</blockquote><a href="/showcase/exterior-brief.png" target="_blank" rel="noreferrer">See the brief in Jodu <ArrowUpRight size={14} /></a></div>
          <div className="idea-selector" role="group" aria-label="Generated exterior inspiration">{ideas.map((item, index) => <button key={item.tier} aria-pressed={index === idea} onClick={() => setIdea(index)}>{item.tier}<span>{item.title}</span></button>)}</div>
          <a href={ideas[idea].image} target="_blank" rel="noreferrer" aria-label={`Open ${ideas[idea].title} inspiration image`}><img className="idea-result" src={ideas[idea].image} alt={`${ideas[idea].title}: exterior inspiration generated through Jodu’s Exterior Ideas workflow`} loading="lazy" /></a>
          <p className="scenario-caption">Generated inside Jodu / inspiration image. Review the idea, then author the details; this image does not change the building model.</p>
          <ScenarioDemo id="website-exterior-ideas" label="Watch the brief and inspiration demo" />
        </article>
        <article className="ai-scenario">
          <div className="scenario-heading"><span className="scenario-index">02</span><div><h3>Give the house a finish direction.</h3><p>Describe the feel in ordinary language. Review catalogue choices for walls, floors and ceilings, with manual control over the details.</p></div></div>
          <blockquote className="finish-quote">“Warm neutral interiors, ivory walls, natural wood floors in bedrooms and a light stone exterior.”</blockquote>
          <div className="finish-evidence">
            <figure><a href="/showcase/finish-brief.png" target="_blank" rel="noreferrer" aria-label="Open finish brief workspace capture"><img src="/showcase/finish-brief.png" alt="A natural-language finish brief entered in Jodu’s finish workbench" loading="lazy" /></a><figcaption>01 / The brief in the finish workbench</figcaption></figure>
            <figure><a href="/showcase/interior.png" target="_blank" rel="noreferrer" aria-label="Inspect the authored living-room finishes"><img src="/showcase/interior.png" alt="An authored interior in Jodu with continuous ivory wall finishes, a warm floor and two-leaf casement windows" loading="lazy" /></a><figcaption>02 / Authored finishes, inspected in 3D</figcaption></figure>
          </div>
          <p className="scenario-caption">Two real platform examples: brief entry and a manually finished interior. The interior is a finish reference; a completed AI brief run is not shown here.</p>
          <ScenarioDemo id="website-finish-direction" label="Watch brief entry and the finish reference" />
        </article>
        <article className="ai-scenario scenario-split ask-scenario">
          <div><div className="scenario-heading"><span className="scenario-index">03</span><h3>Ask the model a question.</h3></div><p>“How many rooms are on each storey?” Ask Jodu reads the project and answers with a source you can inspect.</p><dl className="answer-facts"><div><dt>Ground</dt><dd>10 rooms</dd></div><div><dt>First</dt><dd>11 rooms</dd></div></dl><p className="scenario-caption">Actual response / The Gable House. The assistant reads the project; you remain in charge of its design.</p><a className="text-link" href="https://help.jodulabs.com/" target="_blank" rel="noreferrer">Explore the product guides <ArrowUpRight size={16} /></a></div>
          <a className="ask-capture" href="/showcase/ask-panel.png" target="_blank" rel="noreferrer" aria-label="Inspect the actual Ask Jodu response"><img src="/showcase/ask-panel.png" alt="Ask Jodu’s actual answer: Ground has 10 rooms, First has 11 rooms, with a project source citation" loading="lazy" /></a>
        </article>
        <ScenarioDemo id="website-ask-jodu" label="Watch the question and its source" />
      </div>
    </section>
  );
}

function ScenarioDemo({ id, label }: { id: string; label: string }) {
  return <details className="scenario-demo">
    <summary>{label}<span>Real captures · edited in Remotion</span></summary>
    <video controls muted playsInline preload="none" poster={`/showcase/${id}.png`} aria-label={label}>
      <source src={`/showcase/${id}.webm`} type="video/webm" />
      <source src={`/showcase/${id}.mp4`} type="video/mp4" />
      <a href={`/showcase/${id}.mp4`}>Watch the demo</a>
    </video>
  </details>;
}
