import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function InlineClip({ id, label }: { id: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.5) element.pause();
      else if (!reduceMotion.matches && !userPaused.current) element.play().catch(() => {});
    }, { threshold: [0, 0.5] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    userPaused.current = !element.paused;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  };

  return <div className="media-frame inline-clip">
    <video ref={video} muted loop playsInline preload="metadata" poster={`/showcase/${id}.png`} aria-label={label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src={`/showcase/${id}.mp4`} type="video/mp4" />
      <source src={`/showcase/${id}.webm`} type="video/webm" />
    </video>
    <button className="clip-toggle" type="button" aria-label={playing ? `Pause: ${label}` : `Play: ${label}`} onClick={toggle}>{playing ? <Pause size={13} /> : <Play size={13} />}</button>
  </div>;
}
