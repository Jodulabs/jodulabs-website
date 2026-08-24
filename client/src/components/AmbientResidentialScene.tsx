/** Design philosophy: The ambient residential scene establishes Jodu's world—homes being planned, built, and lived in across India—without turning the product homepage into a marketing demo. */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type SceneItem = {
  object: THREE.Object3D;
  base: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  radius: number;
  phase: number;
  opacityBase?: number;
  opacityPulse?: number;
};

// 10 Indian scripts + Latin for Jodu - distributed visibly across open space
const languageMarks = [
  { text: "ಜೋಡು", font: '700 58px "Noto Sans Kannada", "IBM Plex Sans", sans-serif', position: [2.8, 1.9, -0.4], scale: 1.2, phase: 0.1, name: "Kannada" },
  { text: "जोडु", font: '700 58px "Noto Sans Devanagari", "IBM Plex Sans", sans-serif', position: [0.6, 2.3, -0.6], scale: 1.1, phase: 6.2, name: "Devanagari" },
  { text: "ஜோடு", font: '700 56px "Noto Sans Tamil", "IBM Plex Sans", sans-serif', position: [3.4, -1.3, -0.5], scale: 1.1, phase: 2.9, name: "Tamil" },
  { text: "జోడు", font: '700 56px "Noto Sans Telugu", "IBM Plex Sans", sans-serif', position: [4.2, 0.5, -0.7], scale: 1.1, phase: 4.1, name: "Telugu" },
  { text: "ജോഡു", font: '700 54px "Noto Sans Malayalam", "IBM Plex Sans", sans-serif', position: [2.1, -2.2, -0.8], scale: 1.05, phase: 1.2, name: "Malayalam" },
  { text: "জোডু", font: '700 56px "Noto Sans Bengali", "IBM Plex Sans", sans-serif', position: [-2.6, 2.3, -0.8], scale: 1.05, phase: 3.5, name: "Bengali" },
  { text: "જોડુ", font: '700 56px "Noto Sans Gujarati", "IBM Plex Sans", sans-serif', position: [-2.2, -2.3, -0.7], scale: 1.05, phase: 5.7, name: "Gujarati" },
  { text: "ਜੋਡੂ", font: '700 56px "Noto Sans Gurmukhi", "IBM Plex Sans", sans-serif', position: [-0.6, -2.5, -0.9], scale: 1.0, phase: 2.3, name: "Gurmukhi" },
  { text: "ଯୋଡ଼ୁ", font: '700 54px "Noto Sans Oriya", "IBM Plex Sans", sans-serif', position: [-3.4, 0.4, -1.0], scale: 1.0, phase: 4.8, name: "Odia" },
  { text: "جوڈو", font: '700 54px "Noto Nastaliq Urdu", serif', position: [1.6, 1.1, -0.5], scale: 1.05, phase: 5.1, name: "Urdu" },
  { text: "jodu", font: '600 64px "Source Serif 4", serif', position: [4.4, -2.1, -0.6], scale: 1.05, phase: 1.8, name: "Latin" },
];

/** Procedural Canvas: Finished Indian Contemporary Residence */
function createFinishedHomeCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft drafting wash
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 540);
  bgGrad.addColorStop(0, "rgba(240, 244, 241, 0.88)");
  bgGrad.addColorStop(1, "rgba(230, 236, 232, 0.7)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 720, 460);

  // Drafting border
  ctx.strokeStyle = "rgba(80, 95, 100, 0.35)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(40, 40, 720, 460);

  // Corner marks
  ctx.strokeStyle = "rgba(184, 92, 56, 0.75)";
  ctx.lineWidth = 1.8;
  [
    [34, 40, 46, 40], [40, 34, 40, 46],
    [754, 40, 766, 40], [760, 34, 760, 46],
    [34, 500, 46, 500], [40, 494, 40, 506],
    [754, 500, 766, 500], [760, 494, 760, 506],
  ].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Header Title
  ctx.font = '600 12px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(35, 45, 50, 0.85)";
  ctx.fillText("RESIDENTIAL STUDY / G+1 CONTEMPORARY ELEVATION", 60, 70);
  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.9)";
  ctx.fillText("LVL +21'-0\" TERRACE · LVL +10'-6\" FIRST · LVL ±0'-0\" PLINTH", 60, 88);

  // Ground floor mass
  ctx.fillStyle = "rgba(215, 220, 216, 0.85)";
  ctx.fillRect(140, 260, 480, 180);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(140, 260, 480, 180);

  // Laterite stone cladding accent band
  ctx.fillStyle = "rgba(184, 92, 56, 0.35)";
  ctx.fillRect(140, 260, 150, 180);
  ctx.strokeStyle = "rgba(184, 92, 56, 0.6)";
  ctx.lineWidth = 1;
  for (let y = 280; y < 440; y += 18) {
    ctx.beginPath();
    ctx.moveTo(140, y);
    ctx.lineTo(290, y);
    ctx.stroke();
  }

  // Teak Entrance door & window
  ctx.fillStyle = "rgba(70, 45, 30, 0.65)";
  ctx.fillRect(180, 320, 55, 120);
  ctx.fillStyle = "rgba(80, 115, 135, 0.4)";
  ctx.fillRect(320, 310, 120, 80);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.75)";
  ctx.strokeRect(320, 310, 120, 80);

  // First floor cantilevered volume
  ctx.fillStyle = "rgba(228, 232, 226, 0.9)";
  ctx.fillRect(120, 130, 460, 130);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(120, 130, 460, 130);

  // Cantilever Balcony with wood louvers
  ctx.fillStyle = "rgba(184, 92, 56, 0.22)";
  ctx.fillRect(120, 130, 180, 130);
  ctx.strokeStyle = "rgba(184, 92, 56, 0.65)";
  ctx.lineWidth = 1.4;
  for (let x = 135; x < 290; x += 12) {
    ctx.beginPath();
    ctx.moveTo(x, 140);
    ctx.lineTo(x, 250);
    ctx.stroke();
  }

  // Glass sliding fenestration
  ctx.fillStyle = "rgba(120, 165, 185, 0.45)";
  ctx.fillRect(330, 150, 210, 95);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.8)";
  ctx.strokeRect(330, 150, 210, 95);

  // Balcony railing
  ctx.strokeStyle = "rgba(35, 45, 50, 0.85)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(120, 215);
  ctx.lineTo(310, 215);
  ctx.stroke();

  // Terrace Pergola
  ctx.strokeStyle = "rgba(40, 50, 55, 0.75)";
  ctx.lineWidth = 2.2;
  for (let x = 160; x <= 360; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x + 25, 130);
    ctx.stroke();
  }

  // Foliage / Palm silhouette
  ctx.strokeStyle = "rgba(70, 105, 80, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(630, 380, 45, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(655, 340, 35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(630, 440);
  ctx.lineTo(630, 380);
  ctx.moveTo(655, 440);
  ctx.lineTo(655, 340);
  ctx.stroke();

  return canvas;
}

/** Procedural Canvas: House Under Construction */
function createUnderConstructionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 780;
  canvas.height = 520;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash
  const bgGrad = ctx.createLinearGradient(0, 0, 780, 520);
  bgGrad.addColorStop(0, "rgba(238, 242, 239, 0.85)");
  bgGrad.addColorStop(1, "rgba(228, 234, 230, 0.7)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 700, 440);

  // Drafting border
  ctx.strokeStyle = "rgba(80, 95, 100, 0.35)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(40, 40, 700, 440);

  // Header tag
  ctx.font = '600 12px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(35, 45, 50, 0.85)";
  ctx.fillText("STRUCTURAL EXECUTION / RCC SKELETON + MASONRY", 60, 70);
  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.9)";
  ctx.fillText("M25 RCC COLUMNS 9\"×15\" · CLAY BRICK INFILL · STEEL SCAFFOLD", 60, 88);

  // Concrete Columns
  const columnsX = [130, 250, 380, 510, 620];
  ctx.fillStyle = "rgba(160, 170, 172, 0.8)";
  columnsX.forEach((x) => {
    ctx.fillRect(x, 130, 24, 310);
    ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, 130, 24, 310);

    // Rebar starter dowels
    ctx.strokeStyle = "rgba(184, 92, 56, 0.85)";
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 4; r++) {
      ctx.beginPath();
      ctx.moveTo(x + 4 + r * 5, 130);
      ctx.lineTo(x + 4 + r * 5, 95 + (r % 2) * 10);
      ctx.stroke();
    }
  });

  // RCC Slabs
  ctx.fillStyle = "rgba(145, 155, 158, 0.88)";
  ctx.fillRect(110, 420, 550, 22);
  ctx.fillRect(110, 270, 550, 18);
  ctx.fillRect(110, 130, 550, 18);

  // Brick Infill Masonry
  ctx.fillStyle = "rgba(188, 92, 58, 0.8)";
  ctx.fillRect(154, 290, 96, 130);
  ctx.strokeStyle = "rgba(245, 245, 240, 0.85)";
  ctx.lineWidth = 1;
  for (let y = 300; y < 420; y += 12) {
    ctx.beginPath();
    ctx.moveTo(154, y);
    ctx.lineTo(250, y);
    ctx.stroke();
  }

  // AAC Block Infill
  ctx.fillStyle = "rgba(195, 204, 202, 0.85)";
  ctx.fillRect(404, 290, 106, 130);
  ctx.strokeStyle = "rgba(120, 130, 130, 0.65)";
  for (let y = 305; y < 420; y += 22) {
    ctx.beginPath();
    ctx.moveTo(404, y);
    ctx.lineTo(510, y);
    ctx.stroke();
  }

  // Scaffolding Lattice
  ctx.strokeStyle = "rgba(40, 75, 95, 0.6)";
  ctx.lineWidth = 1.4;
  for (let x = 90; x <= 670; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 110);
    ctx.lineTo(x, 445);
    ctx.stroke();
  }
  for (let y = 145; y <= 445; y += 55) {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(680, y);
    ctx.stroke();
  }
  for (let x = 90; x < 650; x += 140) {
    ctx.beginPath();
    ctx.moveTo(x, 145);
    ctx.lineTo(x + 140, 255);
    ctx.moveTo(x + 140, 145);
    ctx.lineTo(x, 255);
    ctx.moveTo(x, 255);
    ctx.lineTo(x + 140, 365);
    ctx.moveTo(x + 140, 255);
    ctx.lineTo(x, 365);
    ctx.stroke();
  }

  return canvas;
}

/** Draw Sprite for Indic Script Wordmark with High Contrast & Clarity */
function drawWordToCanvas(canvas: HTMLCanvasElement, text: string, font: string) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Clean graphite ink fill
  context.fillStyle = "rgba(24, 32, 36, 0.95)";
  context.fillText(text, canvas.width / 2, canvas.height / 2 - 2);

  // Distinct terracotta redline underline accent
  context.strokeStyle = "rgba(184, 92, 56, 0.85)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(canvas.width * 0.25, canvas.height - 16);
  context.lineTo(canvas.width * 0.75, canvas.height - 16);
  context.stroke();

  // Small redline tick mark
  context.fillStyle = "rgba(184, 92, 56, 0.95)";
  context.fillRect(canvas.width * 0.75 - 2, canvas.height - 21, 4, 8);
}

function wordSprite(text: string, font: string, scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 180;
  drawWordToCanvas(canvas, text, font);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.1 * scale, 0.62 * scale, 1);
  return { sprite, canvas, texture };
}

/** Create 3D Architectural Foundation Boundary Outline */
function foundationLine(x: number, y: number, z: number, width: number, height: number, opacity: number) {
  const geometry = new THREE.BufferGeometry();
  const points = [
    new THREE.Vector3(-width / 2, -height / 2, 0),
    new THREE.Vector3(width / 2, -height / 2, 0),
    new THREE.Vector3(width / 2, height / 2, 0),
    new THREE.Vector3(-width / 2, height / 2, 0),
    new THREE.Vector3(-width / 2, -height / 2, 0),
  ];
  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color("#b85c38"),
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const line = new THREE.Line(geometry, material);
  line.position.set(x, y, z);
  return line;
}

export default function AmbientResidentialScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activeScript, setActiveScript] = useState<string>("Kannada");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 7.8);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "ambient-scene-canvas";
    host.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);
    const movingItems: SceneItem[] = [];
    const disposeMaterials: THREE.Material[] = [];
    const disposeTextures: THREE.Texture[] = [];
    const spriteCanvases: { canvas: HTMLCanvasElement; text: string; font: string; texture: THREE.CanvasTexture }[] = [];

    // 1. Procedural Texture Canvases - Finished Residence & Under Construction
    const texturesSpec = [
      {
        canvas: createFinishedHomeCanvas(),
        width: 5.6,
        height: 3.7,
        position: new THREE.Vector3(3.0, 0.7, -1.3),
        rotation: new THREE.Euler(-0.06, -0.16, 0.02),
        opacity: 0.52,
      },
      {
        canvas: createUnderConstructionCanvas(),
        width: 5.0,
        height: 3.3,
        position: new THREE.Vector3(3.4, -1.8, -1.8),
        rotation: new THREE.Euler(0.08, 0.12, -0.05),
        opacity: 0.44,
      },
    ];

    texturesSpec.forEach((spec, index) => {
      const texture = new THREE.CanvasTexture(spec.canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      const geometry = new THREE.PlaneGeometry(spec.width, spec.height);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: spec.opacity,
        depthWrite: false,
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.copy(spec.position);
      plane.rotation.copy(spec.rotation);
      world.add(plane);
      movingItems.push({
        object: plane,
        base: spec.position.clone(),
        rotation: spec.rotation.clone(),
        speed: 0.22 + index * 0.04,
        radius: 0.16 + index * 0.05,
        phase: index * 1.6,
        opacityBase: spec.opacity,
        opacityPulse: 0.06,
      });
      disposeMaterials.push(material);
      disposeTextures.push(texture);
    });

    // 2. Technical Drafting Coordinate Grid
    const grid = new THREE.GridHelper(16, 20, 0x909c99, 0xc8d0cd);
    grid.position.set(1.6, -2.7, -3.25);
    grid.rotation.x = Math.PI / 2.15;
    const gridMaterial = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterial.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.25;
      disposeMaterials.push(mat);
    });
    world.add(grid);

    // 3. Redline Foundation Boundaries
    [
      foundationLine(2.8, 0.7, 0.1, 3.4, 2.0, 0.22),
      foundationLine(3.2, -1.8, -1.7, 2.8, 1.5, 0.16),
    ].forEach((line, index) => {
      world.add(line);
      movingItems.push({
        object: line,
        base: line.position.clone(),
        rotation: line.rotation.clone(),
        speed: 0.3 + index * 0.04,
        radius: 0.12,
        phase: 0.8 + index,
      });
      disposeMaterials.push(line.material as THREE.Material);
    });

    // 4. Multilingual Indic Scripts Wordmarks
    languageMarks.forEach((mark) => {
      const { sprite, canvas, texture } = wordSprite(mark.text, mark.font, mark.scale);
      sprite.position.set(mark.position[0], mark.position[1], mark.position[2]);
      world.add(sprite);
      movingItems.push({
        object: sprite,
        base: sprite.position.clone(),
        rotation: sprite.rotation.clone(),
        speed: 0.38,
        radius: 0.24,
        phase: mark.phase,
        opacityBase: 0.62,
        opacityPulse: 0.18,
      });
      disposeMaterials.push(sprite.material);
      disposeTextures.push(texture);
      spriteCanvases.push({ canvas, text: mark.text, font: mark.font, texture });
    });

    // Ensure fonts are re-rendered once loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        spriteCanvases.forEach(({ canvas, text, font, texture }) => {
          drawWordToCanvas(canvas, text, font);
          texture.needsUpdate = true;
        });
      });
    }

    // Resize Handler
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    // Mouse Interaction for 3D Parallax Depth
    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.28;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.14;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    // Animation Render Loop
    const clock = new THREE.Clock();
    let frame = 0;
    let lastScriptUpdate = 0;

    const render = () => {
      const time = clock.getElapsedTime();
      const idleYaw = Math.sin(time * 0.16) * 0.025;
      const idlePitch = Math.cos(time * 0.13) * 0.01;
      world.rotation.y += (targetX + idleYaw - world.rotation.y) * 0.03;
      world.rotation.x += (-targetY + idlePitch - world.rotation.x) * 0.03;
      world.rotation.z = Math.sin(time * 0.09) * 0.008;

      movingItems.forEach((item) => {
        const pulse = time * item.speed + item.phase;
        item.object.position.x = item.base.x + Math.sin(pulse) * item.radius;
        item.object.position.y = item.base.y + Math.cos(pulse * 1.2) * item.radius * 0.5;
        item.object.rotation.z = item.rotation.z + Math.sin(pulse * 0.7) * 0.018;

        // Breathing sinusoidal opacity pulse
        if (item.opacityBase !== undefined && item.opacityPulse !== undefined) {
          const mat = (item.object as THREE.Mesh | THREE.Sprite).material as THREE.Material & { opacity: number };
          if (mat && "opacity" in mat) {
            mat.opacity = item.opacityBase + Math.sin(pulse * 1.1) * item.opacityPulse;
          }
        }
      });

      // Update active script indicator every 3.5 seconds
      if (time - lastScriptUpdate > 3.5) {
        lastScriptUpdate = time;
        const index = Math.floor((time / 3.5) % languageMarks.length);
        setActiveScript(languageMarks[index].name);
      }

      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      disposeTextures.forEach((t) => t.dispose());
      disposeMaterials.forEach((m) => m.dispose());
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
          child.geometry.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="ambient-residential-scene" ref={hostRef} aria-hidden="true">
      {/* Subtle indicator showing the vernacular rhythm without being a language widget */}
      <div className="ambient-script-pill" title="Jodu across Indian regional scripts">
        <span className="script-pulse" />
        <span className="script-name">{activeScript}</span>
      </div>
    </div>
  );
}

