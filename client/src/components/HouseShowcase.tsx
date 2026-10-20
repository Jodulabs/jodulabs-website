import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function HouseShowcase() {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<OrbitControls | null>(null);
  const [status, setStatus] = useState("Loading the house…");
  useEffect(() => {
    const element = host.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e6e8df");
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 500);
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
    catch { setStatus("3D is unavailable in this browser. You can still inspect the house views below."); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    element.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc4c3af, 3));
    const sun = new THREE.DirectionalLight(0xfff5e4, 3.5);
    sun.position.set(-12, 22, 16);
    scene.add(sun);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: "#e6e8df", roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    const orbit = new OrbitControls(camera, renderer.domElement);
    controls.current = orbit;
    orbit.enableDamping = true;
    orbit.enablePan = false;
    orbit.maxPolarAngle = Math.PI / 2.05;
    let stopped = false;
    let frame = 0;
    const render = () => { orbit.update(); renderer.render(scene, camera); frame = requestAnimationFrame(render); };
    const resize = () => {
      renderer.setSize(element.clientWidth, element.clientHeight);
      camera.aspect = element.clientWidth / element.clientHeight;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    new GLTFLoader().load("/showcase/laterite-house.glb", gltf => {
      const model = gltf.scene;
      if (!stopped) {
        scene.add(model);
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        orbit.target.copy(center);
        const distance = Math.max(size.x, size.z, size.y * 1.5) * 1.25 * Math.max(1, 1.4 / camera.aspect);
        camera.position.set(center.x - distance * .65, center.y + distance * .28, center.z - distance);
        orbit.minDistance = distance * .5;
        orbit.maxDistance = distance * 2;
        setStatus("");
      } else {
        dispose(model);
      }
    }, undefined, () => { if (!stopped) setStatus("The model could not load. Inspect the captured views below."); });
    resize(); render();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); orbit.dispose(); controls.current = null;
      dispose(scene); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className="house-interactive">
    <div className="house-canvas" ref={host} />
    {status && <p className="model-status" role="status">{status}</p>}
    <div className="model-controls"><span>Drag to orbit · scroll to zoom</span>
      <button aria-label="Rotate house left" onClick={() => rotate(controls.current, -.25)}>←</button>
      <button aria-label="Rotate house right" onClick={() => rotate(controls.current, .25)}>→</button>
    </div>
  </div>;
}
function rotate(orbit: OrbitControls | null, angle: number) {
  if (!orbit) return;
  orbit.object.position.sub(orbit.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle).add(orbit.target);
  orbit.update();
}
function dispose(object: THREE.Object3D) {
  const textures = new Set<THREE.Texture>();
  object.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
      material.dispose();
    }
  });
  textures.forEach(texture => texture.dispose());
}
