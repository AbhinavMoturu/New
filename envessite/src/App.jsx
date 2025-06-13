import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.css';

function Logo() {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.from('.tagline', {
      opacity: 0,
      y: 50,
      duration: 1,
    });
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });
    });
  }, []);

  return (
    <div>
      <header className="hero">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Logo />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <h1>Envees</h1>
        <p className="tagline">The Art of Hospitality, Engineered.</p>
      </header>

      <section className="section">
        <h2>Vision &amp; Mission</h2>
        <p>
          We craft unforgettable experiences, blending bold strategy with artistic
          flair to elevate hospitality brands.
        </p>
      </section>

      <section className="section">
        <h2>Services</h2>
        <div className="cards">
          <div className="card">Brand Strategy</div>
          <div className="card">Digital Marketing</div>
          <div className="card">Design &amp; Identity</div>
        </div>
      </section>
    </div>
  );
}

export default App;
