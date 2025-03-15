import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const Sphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    if (mountRef.current?.children.length > 0) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.8,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff2df1,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.set(0, 9, 12);
    camera.lookAt(0, 0, 0);
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "30%", height: "40%" }} />;
};
