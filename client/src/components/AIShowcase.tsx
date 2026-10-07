import { useEffect, useState } from "react";
import InlineClip from "./InlineClip";

const features = [
  { id: "exterior-ideas", name: "Exterior ideas", copy: "Describe the look; compare generated exterior options.", clip: "website-exterior-ideas", label: "Writing an exterior brief in Jodu and reviewing the generated inspiration" },
  { id: "finishes", name: "Finishes", copy: "Describe a finish direction, save alternatives and compare them.", clip: "website-finish-alternatives", label: "Describing finish directions in Jodu, saving them as alternatives and comparing them" },
  { id: "ask-jodu", name: "Ask Jodu", copy: "Ask about your project and inspect the source of the answer.", clip: "website-ask-jodu", label: "Asking Jodu how many rooms are on each storey and opening the source" },
];

const liveAI = ["Brief to house programme", "Exterior ideas", "Facade design", "Finish alternatives", "Expert design review", "Project Q&A"];
const soonAI = ["Floor plans from a brief", "Facade Studio", "Asset workbench"];

export default function AIShowcase() {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const sync = () => {
      const index = features.findIndex(feature => `#${feature.id}` === window.location.hash);
      if (index >= 0) setSelected(index);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const feature = features[selected];
  return (
    <section className="ai-section" id="ai">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">AI assistance</p>
          <h2>AI-powered, from brief to finish.</h2>
          <p>Explore exteriors, compare finishes and ask about your project. You stay in control of the design.</p>
        </div>
        <div className="ai-switcher">
          <div className="ai-list" role="group" aria-label="AI features">
            {features.map((item, index) => <button key={item.id} id={item.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}><strong>{item.name}</strong><span>{item.copy}</span></button>)}
          </div>
          <InlineClip key={feature.clip} id={feature.clip} label={feature.label} />
        </div>
        <div className="ai-also">
          <div><h3>Available now</h3><ul>{liveAI.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>In development</h3><ul className="is-soon">{soonAI.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}
