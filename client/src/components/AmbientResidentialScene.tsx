/** Design philosophy: a calm, real 3D world should give Jodu spatial identity without turning the product homepage into a visual demo. */
import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneItem = {
  object: THREE.Object3D;
  base: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  radius: number;
  phase: number;
};

const sceneImages = [
  {
    url: "/manus-storage/jodu-finished-indian-home-atlas_3b23590a.jpg",
    width: 5.1,
    height: 3.1,
    position: new THREE.Vector3(2.5, 0.72, -1.1),
    rotation: new THREE.Euler(-0.08, -0.24, 0.035),
    opacity: 0.5,
  },
  {
    url: "/manus-storage/jodu-house-under-construction-atlas_2b61b025.jpg",
    width: 4.0,
    height: 2.48,
    position: new THREE.Vector3(1.7, -1.42, -1.35),
    rotation: new THREE.Euler(0.12, 0.18, -0.07),
    opacity: 0.36,
  },
  {
    url: "/manus-storage/jodu-floorplan-material-atlas_185ce442.jpg",
    width: 4.4,
    height: 2.62,
    position: new THREE.Vector3(3.2, 1.38, -2.2),
    rotation: new THREE.Euler(-0.3, -0.08, 0.12),
    opacity: 0.32,
  },
];

const languageMarks = [
  { text: "ಜೋಡು", font: '600 68px "Noto Sans Kannada", sans-serif', position: [3.45, 2.38, -0.15], scale: 1.12, phase: 0.1 },
  { text: "jodu", font: '600 72px "Source Serif 4", serif', position: [4.82, 0.48, -0.72], scale: 0.92, phase: 1.8 },
  { text: "ஜோடு", font: '600 66px "Noto Sans Tamil", sans-serif', position: [2.72, -2.08, -0.35], scale: 0.96, phase: 2.9 },
  { text: "జోడు", font: '600 66px "Noto Sans Telugu", sans-serif', position: [5.35, 1.58, -1.3], scale: 0.9, phase: 4.1 },
  { text: "جوڈو", font: '600 61px "Noto Nastaliq Urdu", serif', position: [3.48, -0.45, 0.36], scale: 0.92, phase: 5.1 },
  { text: "जोडु", font: '600 65px "Noto Sans Devanagari", sans-serif', position: [0.92, -2.32, -1.46], scale: 0.9, phase: 6.2 },
];

function wordSprite(text: string, font: string, scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 560;
  canvas.height = 150;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(42, 47, 47, 0.92)";
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 3);
  context.strokeStyle = "rgba(184, 92, 56, 0.52)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(canvas.width * 0.31, canvas.height - 16);
  context.lineTo(canvas.width * 0.69, canvas.height - 16);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.31,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.62 * scale, 0.43 * scale, 1);
  return sprite;
}

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

    const loader = new THREE.TextureLoader();
    sceneImages.forEach((image, index) => {
      loader.load(image.url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        const geometry = new THREE.PlaneGeometry(image.width, image.height);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: image.opacity,
          depthWrite: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.copy(image.position);
        plane.rotation.copy(image.rotation);
        world.add(plane);
        movingItems.push({
          object: plane,
          base: image.position.clone(),
          rotation: image.rotation.clone(),
          speed: 0.34 + index * 0.07,
          radius: 0.24 + index * 0.075,
          phase: index * 1.4,
        });
        disposeMaterials.push(material);
        disposeTextures.push(texture);
      }, undefined, () => undefined);
    });

    const grid = new THREE.GridHelper(12, 16, 0xa1aaa6, 0xd6dbd8);
    grid.position.set(1.2, -2.7, -3.25);
    grid.rotation.x = Math.PI / 2.15;
    const gridMaterial = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterial.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.26;
      disposeMaterials.push(material);
    });
    world.add(grid);

    [
      foundationLine(2.1, 0.74, 0.1, 3.6, 2.05, 0.2),
      foundationLine(1.32, -1.52, -1.78, 2.6, 1.48, 0.13),
      foundationLine(3.1, -0.2, 0.38, 2.85, 1.7, 0.12),
    ].forEach((line, index) => {
      world.add(line);
      movingItems.push({
        object: line,
        base: line.position.clone(),
        rotation: line.rotation.clone(),
        speed: 0.38 + index * 0.04,
        radius: 0.14,
        phase: 0.8 + index,
      });
      disposeMaterials.push(line.material as THREE.Material);
      disposeMaterials.push(line.geometry ? new THREE.MeshBasicMaterial() : new THREE.MeshBasicMaterial());
    });

    languageMarks.forEach((mark) => {
      const sprite = wordSprite(mark.text, mark.font, mark.scale);
      if (!sprite) return;
      sprite.position.set(mark.position[0], mark.position[1], mark.position[2]);
      world.add(sprite);
      movingItems.push({
        object: sprite,
        base: sprite.position.clone(),
        rotation: sprite.rotation.clone(),
        speed: 0.46,
        radius: 0.25,
        phase: mark.phase,
      });
      disposeMaterials.push(sprite.material);
      const spriteMaterial = sprite.material as THREE.SpriteMaterial;
      if (spriteMaterial.map) disposeTextures.push(spriteMaterial.map);
    });

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

    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.34;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const time = clock.getElapsedTime();
      const idleYaw = Math.sin(time * 0.19) * 0.034;
      const idlePitch = Math.cos(time * 0.16) * 0.014;
      world.rotation.y += (targetX + idleYaw - world.rotation.y) * 0.035;
      world.rotation.x += (-targetY + idlePitch - world.rotation.x) * 0.035;
      world.rotation.z = Math.sin(time * 0.12) * 0.012;

      movingItems.forEach((item) => {
        const pulse = time * item.speed + item.phase;
        item.object.position.x = item.base.x + Math.sin(pulse) * item.radius;
        item.object.position.y = item.base.y + Math.cos(pulse * 1.22) * item.radius * 0.52;
        item.object.rotation.z = item.rotation.z + Math.sin(pulse * 0.74) * 0.026;
      });
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      disposeTextures.forEach((texture) => texture.dispose());
      disposeMaterials.forEach((material) => material.dispose());
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line) child.geometry.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="ambient-residential-scene" ref={hostRef} aria-hidden="true" />;
}
