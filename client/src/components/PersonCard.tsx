import { ArrowUpRight } from "lucide-react";
import type { Person } from "../company";

export default function PersonCard({ person }: { person: Person }) {
  const initials = person.name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return <article className="person">
    {person.photo ? <img className="person-photo" src={person.photo} alt={person.name} width={140} height={140} loading="lazy" /> : <span className="person-photo person-initials" aria-hidden="true">{initials}</span>}
    <div>
      <h3>{person.name}</h3><p className="person-role">{person.role}</p>
      <p className="person-bio">{person.bio}</p>
      {person.links.length > 0 && <ul className="person-links" aria-label={`${person.name} elsewhere`}>{person.links.map(link => <li key={link.href}><a className="text-link" href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14} /></a></li>)}</ul>}
    </div>
  </article>;
}
