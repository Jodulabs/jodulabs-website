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

// 10 Indian scripts + Latin for Jodu
const languageMarks = [
  { text: "ಜೋಡು", font: '600 68px "Noto Sans Kannada", "IBM Plex Sans", sans-serif', position: [3.35, 2.25, -0.2], scale: 1.15, phase: 0.1, name: "Kannada" },
  { text: "जोडु", font: '600 66px "Noto Sans Devanagari", "IBM Plex Sans", sans-serif', position: [1.15, -2.25, -1.3], scale: 0.95, phase: 6.2, name: "Devanagari" },
  { text: "ஜோடு", font: '600 64px "Noto Sans Tamil", "IBM Plex Sans", sans-serif', position: [2.65, -1.95, -0.4], scale: 0.98, phase: 2.9, name: "Tamil" },
  { text: "జోడు", font: '600 65px "Noto Sans Telugu", "IBM Plex Sans", sans-serif', position: [5.2, 1.45, -1.2], scale: 0.92, phase: 4.1, name: "Telugu" },
  { text: "ജോഡു", font: '600 62px "Noto Sans Malayalam", "IBM Plex Sans", sans-serif', position: [-2.9, 2.1, -1.8], scale: 0.92, phase: 1.2, name: "Malayalam" },
  { text: "জোডু", font: '600 64px "Noto Sans Bengali", "IBM Plex Sans", sans-serif', position: [-4.2, -1.6, -1.5], scale: 0.94, phase: 3.5, name: "Bengali" },
  { text: "જોડુ", font: '600 64px "Noto Sans Gujarati", "IBM Plex Sans", sans-serif', position: [4.6, -1.1, -0.8], scale: 0.92, phase: 5.7, name: "Gujarati" },
  { text: "ਜੋਡੂ", font: '600 64px "Noto Sans Gurmukhi", "IBM Plex Sans", sans-serif', position: [-1.4, -2.6, -1.9], scale: 0.9, phase: 2.3, name: "Gurmukhi" },
  { text: "ଯୋଡ଼ୁ", font: '600 62px "Noto Sans Oriya", "IBM Plex Sans", sans-serif', position: [0.4, 2.5, -2.1], scale: 0.9, phase: 4.8, name: "Odia" },
  { text: "جوڈو", font: '600 60px "Noto Nastaliq Urdu", serif', position: [3.55, -0.4, 0.3], scale: 0.92, phase: 5.1, name: "Urdu" },
  { text: "jodu", font: '600 70px "Source Serif 4", serif', position: [4.75, 0.45, -0.65], scale: 0.92, phase: 1.8, name: "Latin" },
];

/** Procedural Canvas: Finished Indian Contemporary Residence (G+1) */
function createFinishedHomeCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash background
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 540);
  bgGrad.addColorStop(0, "rgba(240, 242, 239, 0.92)");
  bgGrad.addColorStop(1, "rgba(230, 234, 231, 0.82)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 720, 460);

  // Drafting border & corner marks
  ctx.strokeStyle = "rgba(100, 115, 120, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, 720, 460);

  ctx.strokeStyle = "#b85c38";
  ctx.lineWidth = 2;
  // Corner ticks
  [
    [32, 40, 48, 40], [40, 32, 40, 48],
    [752, 40, 768, 40], [760, 32, 760, 48],
    [32, 500, 48, 500], [40, 492, 40, 508],
    [752, 500, 768, 500], [760, 492, 760, 508],
  ].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Architectural Title & Coordinates
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(40, 50, 55, 0.75)";
  ctx.fillText("RESIDENCE G+1 / CANONICAL 30×40 ELEVATION", 60, 70);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("LVL +21'-0\" TERRACE · LVL +10'-6\" FIRST · LVL ±0'-0\" PLINTH", 60, 90);

  // House Silhouette & Massing
  // Ground floor mass
  ctx.fillStyle = "rgba(215, 218, 214, 0.85)";
  ctx.fillRect(140, 260, 480, 180);
  ctx.strokeStyle = "rgba(45, 55, 60, 0.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 260, 480, 180);

  // Laterite accent cladding band on ground floor
  ctx.fillStyle = "rgba(184, 92, 56, 0.35)";
  ctx.fillRect(140, 260, 150, 180);
  // Laterite course lines
  ctx.strokeStyle = "rgba(184, 92, 56, 0.5)";
  ctx.lineWidth = 1;
  for (let y = 280; y < 440; y += 18) {
    ctx.beginPath();
    ctx.moveTo(140, y);
    ctx.lineTo(290, y);
    ctx.stroke();
  }

  // Teak Entrance door & louvered window
  ctx.fillStyle = "rgba(75, 50, 35, 0.65)";
  ctx.fillRect(180, 320, 55, 120);
  ctx.fillStyle = "rgba(60, 90, 110, 0.4)";
  ctx.fillRect(320, 310, 120, 80);
  ctx.strokeStyle = "rgba(45, 55, 60, 0.7)";
  ctx.strokeRect(320, 310, 120, 80);

  // First floor cantilevered volume
  ctx.fillStyle = "rgba(228, 231, 226, 0.9)";
  ctx.fillRect(120, 130, 460, 130);
  ctx.strokeStyle = "rgba(45, 55, 60, 0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(120, 130, 460, 130);

  // Cantilever Balcony with wood louvers & black steel railing
  ctx.fillStyle = "rgba(184, 92, 56, 0.2)";
  ctx.fillRect(120, 130, 180, 130);
  ctx.strokeStyle = "rgba(184, 92, 56, 0.6)";
  ctx.lineWidth = 1.5;
  for (let x = 135; x < 290; x += 12) {
    ctx.beginPath();
    ctx.moveTo(x, 140);
    ctx.lineTo(x, 250);
    ctx.stroke();
  }

  // Glass sliding fenestration on upper floor
  ctx.fillStyle = "rgba(120, 165, 185, 0.45)";
  ctx.fillRect(330, 150, 210, 95);
  ctx.strokeStyle = "rgba(45, 55, 60, 0.75)";
  ctx.strokeRect(330, 150, 210, 95);

  // Balcony glass & steel railing
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 215);
  ctx.lineTo(310, 215);
  ctx.stroke();

  // Terrace Pergola & Parapet
  ctx.strokeStyle = "rgba(45, 55, 60, 0.75)";
  ctx.lineWidth = 2.5;
  for (let x = 160; x <= 360; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x + 25, 130);
    ctx.stroke();
  }

  // Dimension chain lines & level markers
  ctx.strokeStyle = "rgba(184, 92, 56, 0.6)";
  ctx.lineWidth = 1;
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

  // Foliage / Palm silhouette on side
  ctx.strokeStyle = "rgba(80, 110, 90, 0.55)";
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

/** Procedural Canvas: House Under Construction (RCC Frame, Masonry & Scaffolding) */
function createUnderConstructionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 780;
  canvas.height = 520;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash background
  const bgGrad = ctx.createLinearGradient(0, 0, 780, 520);
  bgGrad.addColorStop(0, "rgba(238, 240, 237, 0.92)");
  bgGrad.addColorStop(1, "rgba(228, 232, 229, 0.85)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 700, 440);

  // Drafting border & corner marks
  ctx.strokeStyle = "rgba(100, 115, 120, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, 700, 440);

  // Header tag
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(40, 50, 55, 0.75)";
  ctx.fillText("STRUCTURAL EXECUTION / RCC SKELETON + MASONRY", 60, 70);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("M25 GRADE RCC COLUMNS 9\"×15\" · CLAY BRICK INFILL · STEEL SCAFFOLD", 60, 90);

  // Structural Grid - Concrete Columns
  const columnsX = [130, 250, 380, 510, 620];
  columnsX.forEach((x) => {
    // Column from foundation to roof
    ctx.fillStyle = "rgba(160, 168, 170, 0.85)";
    ctx.fillRect(x, 130, 26, 310);
    ctx.strokeStyle = "rgba(45, 55, 60, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, 130, 26, 310);

    // Exposed rebar starter bars protruding above slab
    ctx.strokeStyle = "rgba(184, 92, 56, 0.75)";
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 4; r++) {
      ctx.beginPath();
      ctx.moveTo(x + 4 + r * 5, 130);
      ctx.lineTo(x + 4 + r * 5, 95 + (r % 2) * 10);
      ctx.stroke();
    }
  });

  // RCC Slabs (Plinth, Mid-Floor, Roof Slab)
  ctx.fillStyle = "rgba(145, 154, 156, 0.9)";
  // Plinth Beam Level
  ctx.fillRect(110, 420, 550, 24);
  // 1st Floor Slab Level
  ctx.fillRect(110, 270, 550, 20);
  // Roof Slab Level
  ctx.fillRect(110, 130, 550, 20);

  // Brick Infill Masonry (Red Clay Bricks in English Bond)
  ctx.fillStyle = "rgba(188, 92, 58, 0.85)";
  // Ground floor brick wall between col 1 and 2
  ctx.fillRect(156, 290, 94, 130);
  // Course lines
  ctx.strokeStyle = "rgba(240, 240, 235, 0.8)";
  ctx.lineWidth = 1;
  for (let y = 300; y < 420; y += 12) {
    ctx.beginPath();
    ctx.moveTo(156, y);
    ctx.lineTo(250, y);
    ctx.stroke();
  }

  // AAC Block Infill (light grey) between col 3 and 4
  ctx.fillStyle = "rgba(195, 202, 200, 0.9)";
  ctx.fillRect(406, 290, 104, 130);
  ctx.strokeStyle = "rgba(120, 130, 130, 0.6)";
  for (let y = 305; y < 420; y += 22) {
    ctx.beginPath();
    ctx.moveTo(406, y);
    ctx.lineTo(510, y);
    ctx.stroke();
  }

  // Scaffolding Lattice (Diagonal Bracing & Walkways)
  ctx.strokeStyle = "rgba(40, 75, 95, 0.65)";
  ctx.lineWidth = 1.5;
  // Vertical standards
  for (let x = 90; x <= 670; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 110);
    ctx.lineTo(x, 445);
    ctx.stroke();
  }
  // Horizontal ledgers
  for (let y = 145; y <= 445; y += 55) {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(680, y);
    ctx.stroke();
  }
  // Cross bracing
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

  // Technical Dimension Callouts
  ctx.font = '500 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("BEAM B1 (9\"×15\")", 260, 262);
  ctx.fillText("COL C2 (9\"×15\")", 255, 360);
  ctx.fillText("INSPECTION PASS · BATCH 04", 415, 282);

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

  // Soft wash background
  const bgGrad = ctx.createLinearGradient(0, 0, 820, 540);
  bgGrad.addColorStop(0, "rgba(239, 241, 238, 0.92)");
  bgGrad.addColorStop(1, "rgba(229, 233, 230, 0.85)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 740, 460);

  // Border
  ctx.strokeStyle = "rgba(100, 115, 120, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, 740, 460);

  // Header tag
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(40, 50, 55, 0.75)";
  ctx.fillText("SITE LAYOUT / RESIDENTIAL PLOT DEMARCATION & SETBACKS", 60, 70);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("SURVEY NO. 142/2B · PLOT 01 & 02 (30'×40') · 30'-0\" ACCESS ROAD", 60, 90);

  // 30'-0" Wide Access Road
  ctx.fillStyle = "rgba(215, 218, 216, 0.8)";
  ctx.fillRect(80, 390, 660, 85);
  ctx.strokeStyle = "rgba(60, 70, 75, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 390);
  ctx.lineTo(740, 390);
  ctx.moveTo(80, 475);
  ctx.lineTo(740, 475);
  ctx.stroke();

  // Road centerline dash
  ctx.strokeStyle = "rgba(184, 92, 56, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(80, 432);
  ctx.lineTo(740, 432);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(50, 60, 65, 0.75)";
  ctx.fillText("30'-0\" [9.14M] WIDE ASPHALT ROAD", 280, 437);

  // Plot 01 (30' x 40')
  ctx.fillStyle = "rgba(248, 249, 247, 0.8)";
  ctx.fillRect(110, 130, 270, 240);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(110, 130, 270, 240);

  // Setback boundary inside Plot 01 (dashed)
  ctx.strokeStyle = "rgba(184, 92, 56, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(135, 155, 220, 195);
  ctx.setLineDash([]);

  // Plot 01 Details
  ctx.font = '600 14px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(35, 45, 50, 0.9)";
  ctx.fillText("PLOT NO. 01", 145, 185);
  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("30'-0\" × 40'-0\" (1,200 SQ.FT)", 145, 205);
  ctx.fillStyle = "rgba(80, 90, 95, 0.8)";
  ctx.fillText("FRONT SETBACK: 5'-0\"", 145, 228);
  ctx.fillText("REAR SETBACK:  3'-0\"", 145, 245);
  ctx.fillText("SIDE SETBACKS: 3'-0\"", 145, 262);
  ctx.fillText("BUILDABLE ENVELOPE: 748 SQ.FT", 145, 288);

  // Plot 02 (30' x 40')
  ctx.fillStyle = "rgba(248, 249, 247, 0.8)";
  ctx.fillRect(410, 130, 270, 240);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(410, 130, 270, 240);

  // Setback inside Plot 02
  ctx.strokeStyle = "rgba(184, 92, 56, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(435, 155, 220, 195);
  ctx.setLineDash([]);

  ctx.font = '600 14px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(35, 45, 50, 0.9)";
  ctx.fillText("PLOT NO. 02", 445, 185);
  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("30'-0\" × 40'-0\" (1,200 SQ.FT)", 445, 205);
  ctx.fillStyle = "rgba(80, 90, 95, 0.8)";
  ctx.fillText("NORTH-FACING ENTRY", 445, 228);
  ctx.fillText("VASTU COMPLIANT LAYOUT", 445, 245);

  // North Arrow Compass Rose
  ctx.save();
  ctx.translate(720, 150);
  ctx.strokeStyle = "rgba(40, 50, 55, 0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(184, 92, 56, 0.9)";
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(6, 0);
  ctx.lineTo(-6, 0);
  ctx.closePath();
  ctx.fill();
  ctx.font = '700 12px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(40, 50, 55, 0.9)";
  ctx.textAlign = "center";
  ctx.fillText("N", 0, -26);
  ctx.restore();

  return canvas;
}

/** Procedural Canvas: Detailed Architectural Floor Plan Fragment */
function createFloorPlanCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft wash background
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 540);
  bgGrad.addColorStop(0, "rgba(241, 243, 240, 0.92)");
  bgGrad.addColorStop(1, "rgba(231, 235, 232, 0.85)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(40, 40, 720, 460);

  // Drafting border
  ctx.strokeStyle = "rgba(100, 115, 120, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, 720, 460);

  // Header tag
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(40, 50, 55, 0.75)";
  ctx.fillText("FLOOR PLAN / GROUND FLOOR WORKING DRAWING", 60, 70);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.85)";
  ctx.fillText("SCALE 1:50 · IS-962 COMPLIANT · COORDINATED MODEL OUTPUT", 60, 90);

  // Rooms Layout with Double-Line Masonry Walls
  // Outer footprint
  ctx.fillStyle = "rgba(246, 247, 245, 0.95)";
  ctx.fillRect(100, 120, 560, 340);

  // Heavy outer walls
  ctx.strokeStyle = "rgba(35, 45, 50, 0.9)";
  ctx.lineWidth = 7;
  ctx.strokeRect(100, 120, 560, 340);

  // Interior dividing walls
  ctx.lineWidth = 4.5;
  // Vertical dividing wall (Living/Dining from Bedrooms)
  ctx.beginPath();
  ctx.moveTo(380, 120);
  ctx.lineTo(380, 460);
  // Horizontal dividing wall 1 (Living from Kitchen)
  ctx.moveTo(100, 290);
  ctx.lineTo(380, 290);
  // Horizontal dividing wall 2 (Master Bed from Bed 2)
  ctx.moveTo(380, 300);
  ctx.lineTo(660, 300);
  // Pooja room divider
  ctx.moveTo(270, 290);
  ctx.lineTo(270, 380);
  ctx.lineTo(380, 380);
  ctx.stroke();

  // Door Openings & Clearance Swing Arcs (90-degree dashed arcs)
  ctx.strokeStyle = "rgba(184, 92, 56, 0.85)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);

  // Main Door (D1) Swing
  ctx.beginPath();
  ctx.arc(100, 200, 40, 0, Math.PI / 2);
  ctx.stroke();

  // Bedroom Door (D2) Swing
  ctx.beginPath();
  ctx.arc(380, 160, 34, 0, Math.PI / 2);
  ctx.stroke();

  // Kitchen Door (D3) Swing
  ctx.beginPath();
  ctx.arc(380, 330, 32, -Math.PI / 2, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  // Dog-legged Staircase Grid
  ctx.strokeStyle = "rgba(45, 55, 60, 0.75)";
  ctx.lineWidth = 1.2;
  for (let y = 130; y <= 270; y += 15) {
    ctx.beginPath();
    ctx.moveTo(115, y);
    ctx.lineTo(175, y);
    ctx.stroke();
  }
  // Up arrow
  ctx.strokeStyle = "#b85c38";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(145, 270);
  ctx.lineTo(145, 140);
  ctx.lineTo(140, 150);
  ctx.moveTo(145, 140);
  ctx.lineTo(150, 150);
  ctx.stroke();
  ctx.font = '600 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = "#b85c38";
  ctx.fillText("UP (18 RISERS)", 115, 285);

  // Room Name & Area Labels
  ctx.font = '600 13px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(35, 45, 50, 0.9)";
  ctx.fillText("LIVING ROOM", 200, 190);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(100, 110, 115, 0.9)";
  ctx.fillText("12'-0\" × 15'-6\"", 200, 208);

  ctx.font = '600 13px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(35, 45, 50, 0.9)";
  ctx.fillText("KITCHEN & DINING", 125, 340);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(100, 110, 115, 0.9)";
  ctx.fillText("10'-0\" × 12'-0\"", 125, 358);

  ctx.font = '600 13px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(35, 45, 50, 0.9)";
  ctx.fillText("MASTER BEDROOM", 430, 200);
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(100, 110, 115, 0.9)";
  ctx.fillText("13'-6\" × 14'-0\"", 430, 218);

  ctx.font = '600 12px "IBM Plex Sans", sans-serif';
  ctx.fillStyle = "rgba(184, 92, 56, 0.95)";
  ctx.fillText("POOJA", 295, 335);

  // Dimension chain ticks
  ctx.strokeStyle = "rgba(184, 92, 56, 0.7)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, 480);
  ctx.lineTo(660, 480);
  ctx.moveTo(100, 472);
  ctx.lineTo(100, 488);
  ctx.moveTo(380, 472);
  ctx.lineTo(380, 488);
  ctx.moveTo(660, 472);
  ctx.lineTo(660, 488);
  ctx.stroke();

  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = "rgba(184, 92, 56, 0.9)";
  ctx.textAlign = "center";
  ctx.fillText("30'-0\" [9.14M]", 380, 498);
  ctx.textAlign = "left";

  return canvas;
}

/** Create Sprite for Indic Script Wordmark */
function wordSprite(text: string, font: string, scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 180;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Main text fill - graphite ink
  context.fillStyle = "rgba(35, 42, 45, 0.88)";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Subtle clay redline underline accent
  context.strokeStyle = "rgba(184, 92, 56, 0.65)";
  context.lineWidth = 2.5;
  context.beginPath();
  context.moveTo(canvas.width * 0.28, canvas.height - 20);
  context.lineTo(canvas.width * 0.72, canvas.height - 20);
  context.stroke();

  // Redline tick mark
  context.fillStyle = "rgba(184, 92, 56, 0.85)";
  context.fillRect(canvas.width * 0.72 - 2, canvas.height - 24, 4, 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.75 * scale, 0.48 * scale, 1);
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

    // 1. Procedural Texture Canvases for Real Indian Residential Construction Context
    const texturesSpec = [
      {
        canvas: createFinishedHomeCanvas(),
        width: 5.2,
        height: 3.5,
        position: new THREE.Vector3(2.6, 0.8, -1.2),
        rotation: new THREE.Euler(-0.08, -0.22, 0.03),
        opacity: 0.46,
      },
      {
        canvas: createUnderConstructionCanvas(),
        width: 4.5,
        height: 3.0,
        position: new THREE.Vector3(1.8, -1.45, -1.5),
        rotation: new THREE.Euler(0.1, 0.16, -0.06),
        opacity: 0.38,
      },
      {
        canvas: createSiteLayoutCanvas(),
        width: 4.8,
        height: 3.15,
        position: new THREE.Vector3(3.3, 1.45, -2.3),
        rotation: new THREE.Euler(-0.25, -0.08, 0.1),
        opacity: 0.32,
      },
      {
        canvas: createFloorPlanCanvas(),
        width: 4.6,
        height: 3.1,
        position: new THREE.Vector3(-2.8, -0.5, -2.6),
        rotation: new THREE.Euler(0.06, 0.2, -0.04),
        opacity: 0.28,
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
        speed: 0.28 + index * 0.05,
        radius: 0.22 + index * 0.06,
        phase: index * 1.5,
        opacityBase: spec.opacity,
        opacityPulse: 0.08,
      });
      disposeMaterials.push(material);
      disposeTextures.push(texture);
    });

    // 2. Technical Drafting Coordinate Grid
    const grid = new THREE.GridHelper(14, 18, 0xa1aaa6, 0xd6dbd8);
    grid.position.set(1.2, -2.7, -3.25);
    grid.rotation.x = Math.PI / 2.15;
    const gridMaterial = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterial.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.22;
      disposeMaterials.push(mat);
    });
    world.add(grid);

    // 3. Redline Foundation Boundaries
    [
      foundationLine(2.1, 0.74, 0.1, 3.6, 2.05, 0.22),
      foundationLine(1.32, -1.52, -1.78, 2.6, 1.48, 0.14),
      foundationLine(3.1, -0.2, 0.38, 2.85, 1.7, 0.13),
      foundationLine(-2.6, -0.4, -2.2, 3.2, 2.1, 0.12),
    ].forEach((line, index) => {
      world.add(line);
      movingItems.push({
        object: line,
        base: line.position.clone(),
        rotation: line.rotation.clone(),
        speed: 0.34 + index * 0.04,
        radius: 0.15,
        phase: 0.8 + index,
      });
      disposeMaterials.push(line.material as THREE.Material);
    });

    // 4. Multilingual Indic Scripts Wordmarks
    languageMarks.forEach((mark) => {
      const sprite = wordSprite(mark.text, mark.font, mark.scale);
      if (!sprite) return;
      sprite.position.set(mark.position[0], mark.position[1], mark.position[2]);
      world.add(sprite);
      movingItems.push({
        object: sprite,
        base: sprite.position.clone(),
        rotation: sprite.rotation.clone(),
        speed: 0.42,
        radius: 0.28,
        phase: mark.phase,
        opacityBase: 0.26,
        opacityPulse: 0.12,
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
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.32;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.16;
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
      const idleYaw = Math.sin(time * 0.18) * 0.03;
      const idlePitch = Math.cos(time * 0.15) * 0.012;
      world.rotation.y += (targetX + idleYaw - world.rotation.y) * 0.032;
      world.rotation.x += (-targetY + idlePitch - world.rotation.x) * 0.032;
      world.rotation.z = Math.sin(time * 0.1) * 0.01;

      movingItems.forEach((item) => {
        const pulse = time * item.speed + item.phase;
        item.object.position.x = item.base.x + Math.sin(pulse) * item.radius;
        item.object.position.y = item.base.y + Math.cos(pulse * 1.2) * item.radius * 0.5;
        item.object.rotation.z = item.rotation.z + Math.sin(pulse * 0.7) * 0.02;

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

