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

// 10 Indian scripts + Latin for Jodu - distributed across open negative space
const languageMarks = [
  { text: "ಜೋಡು", font: '600 64px "Noto Sans Kannada", "IBM Plex Sans", sans-serif', position: [3.8, 2.6, -0.4], scale: 1.05, phase: 0.1, name: "Kannada" },
  { text: "जोडु", font: '600 62px "Noto Sans Devanagari", "IBM Plex Sans", sans-serif', position: [1.6, -2.5, -1.2], scale: 0.9, phase: 6.2, name: "Devanagari" },
  { text: "ஜோடு", font: '600 60px "Noto Sans Tamil", "IBM Plex Sans", sans-serif', position: [4.2, -1.8, -0.6], scale: 0.92, phase: 2.9, name: "Tamil" },
  { text: "జోడు", font: '600 60px "Noto Sans Telugu", "IBM Plex Sans", sans-serif', position: [5.6, 1.8, -1.4], scale: 0.88, phase: 4.1, name: "Telugu" },
  { text: "ജോഡു", font: '600 58px "Noto Sans Malayalam", "IBM Plex Sans", sans-serif', position: [-4.2, 2.8, -1.6], scale: 0.86, phase: 1.2, name: "Malayalam" },
  { text: "জোডু", font: '600 60px "Noto Sans Bengali", "IBM Plex Sans", sans-serif', position: [-5.2, -2.2, -1.8], scale: 0.88, phase: 3.5, name: "Bengali" },
  { text: "જોડુ", font: '600 60px "Noto Sans Gujarati", "IBM Plex Sans", sans-serif', position: [5.1, -0.6, -0.9], scale: 0.88, phase: 5.7, name: "Gujarati" },
  { text: "ਜੋਡੂ", font: '600 60px "Noto Sans Gurmukhi", "IBM Plex Sans", sans-serif', position: [-1.8, 3.2, -2.0], scale: 0.85, phase: 2.3, name: "Gurmukhi" },
  { text: "ଯୋଡ଼ୁ", font: '600 58px "Noto Sans Oriya", "IBM Plex Sans", sans-serif', position: [0.2, 3.0, -1.9], scale: 0.85, phase: 4.8, name: "Odia" },
  { text: "جوڈو", font: '600 56px "Noto Nastaliq Urdu", serif', position: [4.4, 0.4, 0.2], scale: 0.88, phase: 5.1, name: "Urdu" },
  { text: "jodu", font: '600 66px "Source Serif 4", serif', position: [5.8, -2.4, -0.8], scale: 0.88, phase: 1.8, name: "Latin" },
];

/** Procedural Canvas: Finished Indian Contemporary Residence (Delicate Line Art Elevation) */
function createFinishedHomeCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft translucent drafting wash
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 540);
  bgGrad.addColorStop(0, "rgba(244, 246, 243, 0.75)");
  bgGrad.addColorStop(1, "rgba(235, 239, 236, 0.55)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 720, 460);

  // Light drafting border
  ctx.strokeStyle = "rgba(100, 115, 120, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 720, 460);

  // Corner marks
  ctx.strokeStyle = "rgba(184, 92, 56, 0.6)";
  ctx.lineWidth = 1.5;
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

  // Architectural Title & Level Tags
  ctx.font = '500 12px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(45, 55, 60, 0.65)";
  ctx.fillText("RESIDENTIAL STUDY / G+1 CONTEMPORARY ELEVATION", 60, 70);
  ctx.font = '400 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.fillText("LVL +21'-0\" TERRACE · LVL +10'-6\" FIRST · LVL ±0'-0\" PLINTH", 60, 88);

  // House Silhouette & Masses
  // Ground floor mass
  ctx.fillStyle = "rgba(220, 224, 220, 0.65)";
  ctx.fillRect(140, 260, 480, 180);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(140, 260, 480, 180);

  // Laterite stone cladding accent band
  ctx.fillStyle = "rgba(184, 92, 56, 0.22)";
  ctx.fillRect(140, 260, 150, 180);
  ctx.strokeStyle = "rgba(184, 92, 56, 0.4)";
  ctx.lineWidth = 0.8;
  for (let y = 280; y < 440; y += 18) {
    ctx.beginPath();
    ctx.moveTo(140, y);
    ctx.lineTo(290, y);
    ctx.stroke();
  }

  // Teak Entrance door & louvered window
  ctx.fillStyle = "rgba(80, 55, 40, 0.45)";
  ctx.fillRect(180, 320, 55, 120);
  ctx.fillStyle = "rgba(90, 120, 135, 0.28)";
  ctx.fillRect(320, 310, 120, 80);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.55)";
  ctx.strokeRect(320, 310, 120, 80);

  // First floor cantilevered volume
  ctx.fillStyle = "rgba(232, 235, 230, 0.75)";
  ctx.fillRect(120, 130, 460, 130);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(120, 130, 460, 130);

  // Cantilever Balcony with wood louvers
  ctx.fillStyle = "rgba(184, 92, 56, 0.15)";
  ctx.fillRect(120, 130, 180, 130);
  ctx.strokeStyle = "rgba(184, 92, 56, 0.45)";
  ctx.lineWidth = 1.2;
  for (let x = 135; x < 290; x += 12) {
    ctx.beginPath();
    ctx.moveTo(x, 140);
    ctx.lineTo(x, 250);
    ctx.stroke();
  }

  // Glass sliding fenestration
  ctx.fillStyle = "rgba(130, 175, 195, 0.32)";
  ctx.fillRect(330, 150, 210, 95);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.6)";
  ctx.strokeRect(330, 150, 210, 95);

  // Balcony railing
  ctx.strokeStyle = "rgba(45, 55, 60, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(120, 215);
  ctx.lineTo(310, 215);
  ctx.stroke();

  // Terrace Pergola
  ctx.strokeStyle = "rgba(50, 60, 65, 0.6)";
  ctx.lineWidth = 2;
  for (let x = 160; x <= 360; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x + 25, 130);
    ctx.stroke();
  }

  // Dimension chain lines & level markers (delicate dashed)
  ctx.strokeStyle = "rgba(184, 92, 56, 0.45)";
  ctx.lineWidth = 0.8;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(80, 130);
  ctx.lineTo(680, 130);
  ctx.moveTo(80, 260);
  ctx.lineTo(680, 260);
  ctx.moveTo(80, 440);
  ctx.lineTo(680, 440);
  ctx.stroke();
  ctx.setLineDash([]);

  // Foliage / Palm silhouette
  ctx.strokeStyle = "rgba(90, 120, 100, 0.45)";
  ctx.lineWidth = 1.2;
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

/** Procedural Canvas: House Under Construction (RCC Frame, Masonry & Scaffolding) */
function createUnderConstructionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 780;
  canvas.height = 520;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash
  const bgGrad = ctx.createLinearGradient(0, 0, 780, 520);
  bgGrad.addColorStop(0, "rgba(242, 244, 241, 0.75)");
  bgGrad.addColorStop(1, "rgba(232, 236, 233, 0.55)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 700, 440);

  // Drafting border
  ctx.strokeStyle = "rgba(100, 115, 120, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 700, 440);

  // Header tag
  ctx.font = '500 12px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(45, 55, 60, 0.65)";
  ctx.fillText("STRUCTURAL EXECUTION / RCC SKELETON + MASONRY", 60, 70);
  ctx.font = '400 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.fillText("M25 RCC COLUMNS 9\"×15\" · CLAY BRICK INFILL · STEEL SCAFFOLD", 60, 88);

  // Concrete Columns
  const columnsX = [130, 250, 380, 510, 620];
  ctx.fillStyle = "rgba(170, 178, 180, 0.65)";
  columnsX.forEach((x) => {
    ctx.fillRect(x, 130, 24, 310);
    ctx.strokeStyle = "rgba(50, 60, 65, 0.65)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, 130, 24, 310);

    // Rebar starter dowels
    ctx.strokeStyle = "rgba(184, 92, 56, 0.65)";
    ctx.lineWidth = 1.2;
    for (let r = 0; r < 4; r++) {
      ctx.beginPath();
      ctx.moveTo(x + 4 + r * 5, 130);
      ctx.lineTo(x + 4 + r * 5, 95 + (r % 2) * 10);
      ctx.stroke();
    }
  });

  // RCC Slabs
  ctx.fillStyle = "rgba(155, 164, 166, 0.75)";
  ctx.fillRect(110, 420, 550, 22);
  ctx.fillRect(110, 270, 550, 18);
  ctx.fillRect(110, 130, 550, 18);

  // Brick Infill Masonry
  ctx.fillStyle = "rgba(188, 92, 58, 0.65)";
  ctx.fillRect(154, 290, 96, 130);
  ctx.strokeStyle = "rgba(245, 245, 240, 0.7)";
  ctx.lineWidth = 0.8;
  for (let y = 300; y < 420; y += 12) {
    ctx.beginPath();
    ctx.moveTo(154, y);
    ctx.lineTo(250, y);
    ctx.stroke();
  }

  // AAC Block Infill
  ctx.fillStyle = "rgba(200, 208, 206, 0.7)";
  ctx.fillRect(404, 290, 106, 130);
  ctx.strokeStyle = "rgba(130, 140, 140, 0.5)";
  for (let y = 305; y < 420; y += 22) {
    ctx.beginPath();
    ctx.moveTo(404, y);
    ctx.lineTo(510, y);
    ctx.stroke();
  }

  // Scaffolding Lattice
  ctx.strokeStyle = "rgba(45, 80, 100, 0.45)";
  ctx.lineWidth = 1.2;
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

/** Procedural Canvas: Plotted Site Layout & Farmhouse Land Parcel */
function createSiteLayoutCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 820;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash
  const bgGrad = ctx.createLinearGradient(0, 0, 820, 540);
  bgGrad.addColorStop(0, "rgba(243, 245, 242, 0.75)");
  bgGrad.addColorStop(1, "rgba(233, 237, 234, 0.55)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 740, 460);

  // Border
  ctx.strokeStyle = "rgba(100, 115, 120, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 740, 460);

  // Header tag
  ctx.font = '500 12px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(45, 55, 60, 0.65)";
  ctx.fillText("SITE SURVEY / RESIDENTIAL PLOTS & ROAD CORRIDOR", 60, 70);
  ctx.font = '400 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.fillText("SURVEY NO. 142/2B · PLOT 01 & 02 (30'×40') · 30'-0\" ROAD", 60, 88);

  // Road
  ctx.fillStyle = "rgba(220, 224, 222, 0.6)";
  ctx.fillRect(80, 390, 660, 85);
  ctx.strokeStyle = "rgba(70, 80, 85, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 390);
  ctx.lineTo(740, 390);
  ctx.moveTo(80, 475);
  ctx.lineTo(740, 475);
  ctx.stroke();

  // Road centerline
  ctx.strokeStyle = "rgba(184, 92, 56, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(80, 432);
  ctx.lineTo(740, 432);
  ctx.stroke();
  ctx.setLineDash([]);

  // Plot 01
  ctx.fillStyle = "rgba(250, 251, 249, 0.75)";
  ctx.fillRect(110, 130, 270, 240);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(110, 130, 270, 240);

  // Setback dashed line
  ctx.strokeStyle = "rgba(184, 92, 56, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(135, 155, 220, 195);
  ctx.setLineDash([]);

  ctx.font = '600 13px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(40, 50, 55, 0.8)";
  ctx.fillText("PLOT NO. 01", 145, 185);
  ctx.font = '500 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.fillText("30'-0\" × 40'-0\" (1,200 SQ.FT)", 145, 205);

  // Plot 02
  ctx.fillStyle = "rgba(250, 251, 249, 0.75)";
  ctx.fillRect(410, 130, 270, 240);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(410, 130, 270, 240);

  // Setback dashed line
  ctx.strokeStyle = "rgba(184, 92, 56, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(435, 155, 220, 195);
  ctx.setLineDash([]);

  ctx.font = '600 13px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(40, 50, 55, 0.8)";
  ctx.fillText("PLOT NO. 02", 445, 185);
  ctx.font = '500 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.fillText("30'-0\" × 40'-0\" (1,200 SQ.FT)", 445, 205);

  // North Compass Rose
  ctx.save();
  ctx.translate(720, 150);
  ctx.strokeStyle = "rgba(50, 60, 65, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(184, 92, 56, 0.75)";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(5, 0);
  ctx.lineTo(-5, 0);
  ctx.closePath();
  ctx.fill();
  ctx.font = '700 11px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(50, 60, 65, 0.8)";
  ctx.textAlign = "center";
  ctx.fillText("N", 0, -24);
  ctx.restore();

  return canvas;
}

/** Create Sprite for Indic Script Wordmark */
function wordSprite(text: string, font: string, scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 560;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Main text fill - soft graphite ink
  context.fillStyle = "rgba(40, 48, 52, 0.78)";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Subtle clay redline underline accent
  context.strokeStyle = "rgba(184, 92, 56, 0.5)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(canvas.width * 0.32, canvas.height - 18);
  context.lineTo(canvas.width * 0.68, canvas.height - 18);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.6 * scale, 0.44 * scale, 1);
  return sprite;
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
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0, 8.2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.className = "ambient-scene-canvas";
    host.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);
    const movingItems: SceneItem[] = [];
    const disposeMaterials: THREE.Material[] = [];
    const disposeTextures: THREE.Texture[] = [];

    // 1. Procedural Texture Canvases - Placed in Open Spaces (No Floor Plan, No Clash with Hero Text)
    const texturesSpec = [
      {
        canvas: createFinishedHomeCanvas(),
        width: 5.4,
        height: 3.6,
        position: new THREE.Vector3(3.2, 1.1, -1.4),
        rotation: new THREE.Euler(-0.06, -0.18, 0.02),
        opacity: 0.38,
      },
      {
        canvas: createUnderConstructionCanvas(),
        width: 4.8,
        height: 3.2,
        position: new THREE.Vector3(2.4, -1.6, -1.6),
        rotation: new THREE.Euler(0.08, 0.14, -0.05),
        opacity: 0.32,
      },
      {
        canvas: createSiteLayoutCanvas(),
        width: 5.0,
        height: 3.3,
        position: new THREE.Vector3(4.1, 1.8, -2.4),
        rotation: new THREE.Euler(-0.2, -0.06, 0.08),
        opacity: 0.26,
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
        speed: 0.24 + index * 0.04,
        radius: 0.18 + index * 0.05,
        phase: index * 1.6,
        opacityBase: spec.opacity,
        opacityPulse: 0.06,
      });
      disposeMaterials.push(material);
      disposeTextures.push(texture);
    });

    // 2. Technical Drafting Coordinate Grid
    const grid = new THREE.GridHelper(14, 18, 0xa1aaa6, 0xd6dbd8);
    grid.position.set(1.6, -2.7, -3.25);
    grid.rotation.x = Math.PI / 2.15;
    const gridMaterial = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterial.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.18;
      disposeMaterials.push(mat);
    });
    world.add(grid);

    // 3. Redline Foundation Boundaries
    [
      foundationLine(2.6, 0.9, 0.1, 3.4, 2.0, 0.18),
      foundationLine(1.8, -1.6, -1.7, 2.8, 1.5, 0.12),
      foundationLine(3.6, -0.1, 0.35, 2.8, 1.6, 0.11),
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

    // 4. Multilingual Indic Scripts Wordmarks - Breathing in Negative Space
    languageMarks.forEach((mark) => {
      const sprite = wordSprite(mark.text, mark.font, mark.scale);
      if (!sprite) return;
      sprite.position.set(mark.position[0], mark.position[1], mark.position[2]);
      world.add(sprite);
      movingItems.push({
        object: sprite,
        base: sprite.position.clone(),
        rotation: sprite.rotation.clone(),
        speed: 0.38,
        radius: 0.22,
        phase: mark.phase,
        opacityBase: 0.2,
        opacityPulse: 0.09,
      });
      disposeMaterials.push(sprite.material);
      const spriteMaterial = sprite.material as THREE.SpriteMaterial;
      if (spriteMaterial.map) disposeTextures.push(spriteMaterial.map);
    });

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

      // Update active script indicator every 4 seconds
      if (time - lastScriptUpdate > 4) {
        lastScriptUpdate = time;
        const index = Math.floor((time / 4) % languageMarks.length);
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

