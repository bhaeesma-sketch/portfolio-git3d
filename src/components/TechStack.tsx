import * as THREE from "three";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Text } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";

const textureLoader = new THREE.TextureLoader();
const techItems = [
  { name: "React", url: "/images/react2.webp" },
  { name: "Next.js", url: "/images/next2.webp" },
  { name: "Node.js", url: "/images/node2.webp" },
  { name: "TypeScript", url: "/images/typescript.webp" },
  { name: "JavaScript", url: "/images/javascript.webp" },
  { name: "Express", url: "/images/express.webp" },
  { name: "MongoDB", url: "/images/mongo.webp" },
  { name: "MySQL", url: "/images/mysql.webp" }
];

function PremiumIcon({ url, index, total }: { url: string; index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => {
    const tex = textureLoader.load(url);
    tex.anisotropy = 16;
    return tex;
  }, [url]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Orbital path with smooth sine wave verticality
    const angle = (index / total) * Math.PI * 2 + time * 0.12;
    const radius = 7 + Math.sin(time * 0.3) * 0.5;
    const height = Math.cos(angle * 2 + time * 0.5) * 2;
    
    meshRef.current.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * (radius * 0.5)
    );
    
    // Look at user with a soft tilt
    meshRef.current.lookAt(0, 0, 10);
    
    // Smooth hover scaling
    const scale = hovered ? 1.6 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[3.2, 3.2, 0.15]} />
      <meshStandardMaterial 
        map={texture} 
        transparent 
        roughness={0.05} 
        metalness={0.9}
        emissive="#38bdf8"
        emissiveIntensity={hovered ? 2.5 : 0.6}
      />
      {/* Glossy Front Layer */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshStandardMaterial 
            color="#38bdf8" 
            transparent 
            opacity={0.15} 
            roughness={0} 
            metalness={1}
            emissive="#38bdf8"
            emissiveIntensity={hovered ? 1.5 : 0.2}
        />
      </mesh>
    </mesh>
  );
}

const TechStack = () => {
  return (
    <div className="techstack" style={{ height: '110vh', width: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 40 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        gl={{ 
            antialias: false, 
            stencil: false, 
            depth: true, 
            powerPreference: 'high-performance' 
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 25, 10]} intensity={2.5} color="#38bdf8" />
        <spotLight position={[-15, 20, 15]} angle={0.25} penumbra={1} intensity={2} castShadow />
        
        <group rotation={[Math.PI / 12, 0, 0]}>
          {techItems.map((item, i) => (
            <PremiumIcon 
                key={i} 
                url={item.url} 
                index={i} 
                total={techItems.length} 
            />
          ))}
        </group>

        <Environment preset="night" />
        <ContactShadows opacity={0.3} scale={30} blur={2} far={6} position={[0, -10, 0]} />
        
        {/* Post-Processing Bloom for that "Glowing" Look */}
        <EffectComposer disableNormalPass>
            <Bloom 
                intensity={1.2} 
                luminanceThreshold={0.2} 
                luminanceSmoothing={0.9} 
                mipmapBlur 
            />
            <ChromaticAberration 
                offset={new THREE.Vector2(0.001, 0.001)} 
            />
        </EffectComposer>

        {/* Ambient Floating Elements */}
        <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
           <mesh position={[-12, 6, -10]}>
             <torusGeometry args={[1.5, 0.1, 16, 100]} />
             <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} />
           </mesh>
           <mesh position={[12, -6, -10]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} wireframe />
           </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default TechStack;
