import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingContext";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/loadingProgress";
import { setAllTimeline, setCharTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;
    const currentCanvas = canvasDiv.current;
    if (!currentCanvas) return;

    const scene = sceneRef.current;
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }

    const rect = currentCanvas.getBoundingClientRect();
    const container = { width: rect.width || window.innerWidth, height: rect.height || window.innerHeight };
    const aspect = container.width / container.height;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768, 
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentCanvas.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer;
    let handleRes: () => void;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((v) => setLoading(v));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!isMounted || !gltf) return;

      const animations = setAnimations(gltf);
      const currentHover = hoverDivRef.current;
      if (currentHover) {
        animations.hover(gltf, currentHover);
      }
      mixer = animations.mixer;
      const loadedChar = gltf.scene;
      scene.add(loadedChar);

      setCharTimeline(loadedChar, camera);
      setAllTimeline();
      
      headBone = loadedChar.getObjectByName("spine006") || null;
      screenLight = loadedChar.getObjectByName("screenlight") || null;
      
      loadedChar.traverse((node) => {
        const n = node.name.toLowerCase();
        if (n.includes("plane") || n.includes("monitor") || n.includes("screen") || n.includes("desk")) {
            node.visible = false;
        }

        if (node instanceof THREE.Mesh) {
          const mat = node.material as THREE.MeshStandardMaterial;
          if (mat && mat.emissive) {
            const hex = mat.emissive.getHex();
            if (hex === 0xfb8dff || hex === 0xc481ff || (mat.emissive.r > 0.5 && mat.emissive.b > 0.5)) {
               mat.emissive.setHex(0x6366f1);
            }
          }
        }
      });

      progress.loaded().then(() => {
        if (!isMounted) return;
        setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
        }, 1500);
      });
      
      handleRes = () => handleResize(renderer, camera, canvasDiv, loadedChar);
      window.addEventListener("resize", handleRes);
    });

    let mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };
    
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, (x, y) => (mouse = { x, y }));
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e, (x, y) => (mouse = { x, y }));
    const onTouchEnd = () => handleTouchEnd((x, y) => (mouse = { x, y }));

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchmove", onTouchMove, { passive: true });
      landingDiv.addEventListener("touchend", onTouchEnd);
    }
    
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(headBone, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp);
        if (screenLight instanceof THREE.Mesh && screenLight.material instanceof THREE.MeshStandardMaterial) {
          light.setPointLight(screenLight as THREE.Mesh & { material: THREE.MeshStandardMaterial });
        }
      }
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(reqId);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchmove", onTouchMove);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (handleRes) window.removeEventListener("resize", handleRes);
      
      scene.clear();
      renderer.dispose();
      if (currentCanvas && renderer.domElement.parentNode === currentCanvas) {
        currentCanvas.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
