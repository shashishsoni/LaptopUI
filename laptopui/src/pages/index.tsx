import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';

export default function Home() {
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const modelsRef = useRef<{ left: THREE.Group | null; right: THREE.Group | null }>({
    left: null,
    right: null,
  });

  useEffect(() => {
    if (!leftContainerRef.current || !rightContainerRef.current) return;

    // Scene setup
    const setupScene = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 2, 6);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      return { scene, camera, renderer };
    };

    const leftScene = setupScene();
    const rightScene = setupScene();

    // Append renderers
    leftContainerRef.current.innerHTML = '';
    rightContainerRef.current.innerHTML = '';
    leftContainerRef.current.appendChild(leftScene.renderer.domElement);
    rightContainerRef.current.appendChild(rightScene.renderer.domElement);

    // Lighting setup
    const setupLighting = (scene: THREE.Scene) => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(ambientLight, directionalLight);
    };
    setupLighting(leftScene.scene);
    setupLighting(rightScene.scene);

    // Load models
    const loader = new GLTFLoader();
    const loadModel = (
      url: string,
      scene: THREE.Scene,
      isLeft: boolean,
      modelName: string
    ) => {
      loader.load(
        url,
        (gltf: GLTF) => {
          const model = gltf.scene;
          if (isLeft) {
            modelsRef.current.left = model;
            model.scale.set(0.8, 0.8, 0.8);
            model.position.set(0, -0.2, -2.3);
            model.rotation.set(Math.PI * 0.100, -Math.PI * 0.1, 0);
          } else {
            modelsRef.current.right = model;
            model.scale.set(0.7, 0.7, 0.7);
            model.position.set(0, 1.5, -2.5);
            model.rotation.set(Math.PI * 0.111, -Math.PI * 0.1, 0);
          }

          scene.add(model);

          // Create animated text
          const fontLoader = new FontLoader();
          fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            const createTextMesh = (text: string) => {
              const textGeometry = new TextGeometry(text, {
                font: font,
                size: 0.15,
                depth: 0.02,
                curveSegments: 12,
              });
              textGeometry.center();

              const textMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 0.5,
                shininess: 100,
              });
              const textMesh = new THREE.Mesh(textGeometry, textMaterial);
              textMesh.position.set(isLeft ? -2.2 : 2.2, 3.5, 0);
              textMesh.rotation.z = Math.PI / 2;
              return textMesh;
            };

            const textGroup = new THREE.Group();
            
            // Create clipping plane for overflow hidden effect
            const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
            leftScene.renderer.clippingPlanes = [clipPlane];
            rightScene.renderer.clippingPlanes = [clipPlane];
            leftScene.renderer.localClippingEnabled = true;
            rightScene.renderer.localClippingEnabled = true;

            // Define specifications for each laptop
            const specs = isLeft ? [
              'ROG Strix SCAR 17',
              'RTX 4090 16GB',
              '32GB DDR5',
              '2TB NVMe SSD',
              '240Hz QHD'
            ] : [
              'Alienware m18',
              'RTX 4080 12GB',
              '64GB DDR5',
              '4TB NVMe SSD',
              '165Hz QHD+'
            ];

            // Create main timeline
            const timeline = gsap.timeline({ repeat: -1 });
            
            specs.forEach((spec, index) => {
              const mesh = createTextMesh(spec);
              mesh.visible = false;
              textGroup.add(mesh);
              
              const moveDistance = 1;
              const duration = 2;
              
              timeline
                .set(mesh, { visible: true }, index * duration)
                .to(mesh.position, {
                  y: 2.5,
                  duration: 1.5,
                  ease: 'power2.out'
                })
                .set(mesh, { visible: false })
                .set(mesh.position, { y: 3.5 });
            });

            scene.add(textGroup);

            // Entrance animation
            gsap.from(model.position, {
              x: isLeft ? -5 : 5,
              duration: 2,
              ease: 'power3.out',
            });

            // Infinite slow rotation
            gsap.to(model.rotation, {
              y: model.rotation.y + Math.PI * 2,
              duration: 10,
              repeat: -1,
              ease: 'linear',
            });
          });
        },
        undefined,
        (error: ErrorEvent) => console.error('Model load error:', error)
      );
    };

    loadModel('/models/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb', leftScene.scene, true, 'ASUS ROG Strix SCAR 17');
    loadModel('/models/alienware_m18_gaming_laptop.glb', rightScene.scene, false, 'Alienware m18');

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = (e.clientX - mouseRef.current.x) * 0.005;
      const deltaY = (e.clientY - mouseRef.current.y) * 0.005;

      if (modelsRef.current.left) {
        modelsRef.current.left.rotation.y += deltaX * 1.2;
        modelsRef.current.left.rotation.x += deltaY * 0.8;
      }
      if (modelsRef.current.right) {
        modelsRef.current.right.rotation.y += deltaX * 0.8;
        modelsRef.current.right.rotation.x += deltaY * 1.2;
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      leftScene.renderer.render(leftScene.scene, leftScene.camera);
      rightScene.renderer.render(rightScene.scene, rightScene.camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      leftScene.renderer.dispose();
      rightScene.renderer.dispose();
    };
  }, [isDragging]);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex">
        <div
          ref={leftContainerRef}
          className="w-1/2 h-full bg-gradient-to-br from-blue-900 via-blue-800 to-black"
        ></div>
        {/* Middle Line with Glow Effect */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1 h-[80vh] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-75 animate-glow"
        />
        <div
          ref={rightContainerRef}
          className="w-1/2 h-full bg-gradient-to-bl from-purple-900 via-purple-800 to-black"
        ></div>
      </div>
      {/* Main Heading */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
        <h1 className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Premium Gaming Laptops
        </h1>
        <p className="text-xl text-gray-300">Unleash Ultimate Gaming Performance</p>
      </div>
      {/* Buy Now Buttons */}
      <div className="absolute bottom-20 w-full flex justify-around z-20">
        <button 
          className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
          onClick={() => window.location.href = '/configure/1'}
        >
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center space-x-2 text-white font-semibold">
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Configure ROG Strix</span>
          </span>
        </button>

        <button 
          className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
          onClick={() => window.location.href = '/configure/8'}
        >
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center space-x-2 text-white font-semibold">
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Configure Alienware</span>
          </span>
        </button>
      </div>
    </main>
  );
}