import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ stressLevel = 0 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Central Cyber Polyhedron (Core)
    const geometry = new THREE.IcosahedronGeometry(6.5, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    scene.add(coreMesh);

    // Inner glowing sphere
    const innerGeom = new THREE.OctahedronGeometry(4, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerMesh);

    // Orbit Ring 1
    const ring1Geom = new THREE.TorusGeometry(10, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00ff87,
      transparent: true,
      opacity: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Orbit Ring 2
    const ring2Geom = new THREE.TorusGeometry(12, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 2. Starfield / Floating Data Nodes
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i + 2] = (Math.random() - 0.5) * 60;

      // Color mix of cyan, purple, and green
      const rChoice = Math.random();
      if (rChoice < 0.33) {
        particleColors[i] = 0.0;
        particleColors[i + 1] = 0.95;
        particleColors[i + 2] = 1.0;
      } else if (rChoice < 0.66) {
        particleColors[i] = 0.47;
        particleColors[i + 1] = 0.16;
        particleColors[i + 2] = 0.79;
      } else {
        particleColors[i] = 0.0;
        particleColors[i + 1] = 1.0;
        particleColors[i + 2] = 0.53;
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeom.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 3, 50);
    pointLight.position.set(10, 10, 15);
    scene.add(pointLight);

    const redLight = new THREE.PointLight(0xff0055, 1, 50);
    redLight.position.set(-10, -10, 10);
    scene.add(redLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.001;
      mouseY = (e.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 12;
      camera.lookAt(0, 0, 0);

      // Rotate objects
      const rotSpeed = 0.35 + stressLevel * 0.8;
      coreMesh.rotation.x = elapsedTime * 0.12 * rotSpeed;
      coreMesh.rotation.y = elapsedTime * 0.18 * rotSpeed;

      innerMesh.rotation.x = -elapsedTime * 0.22 * rotSpeed;
      innerMesh.rotation.z = elapsedTime * 0.15 * rotSpeed;

      ring1.rotation.z = elapsedTime * 0.08 * rotSpeed;
      ring2.rotation.x = elapsedTime * 0.06 * rotSpeed;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [stressLevel]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
}
