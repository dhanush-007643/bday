import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ThreeCakeScene({ isBlown, onBlowComplete }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    flames: [],
    pointLights: [],
    smokeParticles: [],
    isBlown: isBlown,
  });

  // Keep stateRef up to date with isBlown
  useEffect(() => {
    stateRef.current.isBlown = isBlown;
    const { flames, pointLights, smokeParticles } = stateRef.current;

    if (isBlown) {
      // Extinguish animation
      flames.forEach((flame) => {
        gsap.to(flame.rotation, { z: Math.PI / 4, duration: 0.25, ease: 'power1.inOut' });
        gsap.to(flame.scale, { x: 0, y: 0, z: 0, duration: 0.45, delay: 0.1, ease: 'back.in(2)' });
      });

      pointLights.forEach((light) => {
        gsap.to(light, { intensity: 0, duration: 0.5, ease: 'power2.out' });
      });

      if (onBlowComplete) {
        onBlowComplete();
      }
    } else {
      // Relight / Initial animation
      flames.forEach((flame) => {
        gsap.to(flame.rotation, { z: 0, duration: 0.3, ease: 'power1.out' });
        gsap.to(flame.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(1.7)' });
      });

      pointLights.forEach((light) => {
        gsap.to(light, { intensity: 1.2, duration: 0.5, ease: 'power2.out' });
      });

      smokeParticles.forEach((smoke) => {
        smoke.material.opacity = 0;
        smoke.userData.life = Math.random();
      });
    }
  }, [isBlown, onBlowComplete]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setup Scene
    const scene = new THREE.Scene();

    // Positioning: align cake seamlessly atop the circular stone pedestal in the background
    const isWide = width >= 900;
    const cakeBaseX = isWide ? -0.35 : 0;
    const cakeBaseY = isWide ? -0.7 : -0.5;

    // Camera setup - positioned to view the cake straight-on from the FRONT
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(cakeBaseX, 3.4, 8.8);
    camera.lookAt(cakeBaseX, 1.25, 0);

    // Renderer setup (Transparent background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Mouse tracking for subtle frontal parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = cakeBaseX;
    let targetY = 3.8;
    let animationFrameId;

    const clock = new THREE.Clock();
    const flames = [];
    const pointLights = [];
    const smokeParticles = [];
    const candlePositions = [];

    stateRef.current.flames = flames;
    stateRef.current.pointLights = pointLights;
    stateRef.current.smokeParticles = smokeParticles;

    // 1. Ambient Light (Soft warm overall fill)
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.85);
    scene.add(ambientLight);

    // 2. Frontal Key Light - Illuminates the FRONT of the cake brightly so icing text pops!
    const frontKeyLight = new THREE.DirectionalLight(0xffeedd, 1.3);
    frontKeyLight.position.set(cakeBaseX, 4.5, 8.0);
    frontKeyLight.castShadow = true;
    frontKeyLight.shadow.mapSize.width = 1024;
    frontKeyLight.shadow.mapSize.height = 1024;
    scene.add(frontKeyLight);

    // 3. Moonlight (Backlight for rim illumination)
    const moonLight = new THREE.DirectionalLight(0xa0c4ff, 0.7);
    moonLight.position.set(-5, 10, -5);
    scene.add(moonLight);

    // Cake Group - scaled gracefully to fit comfortably with clean margins
    const cakeGroup = new THREE.Group();
    cakeGroup.position.set(cakeBaseX, cakeBaseY, 0);
    cakeGroup.scale.set(0.82, 0.82, 0.82);
    scene.add(cakeGroup);

    // Materials
    const frostingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff2f5, // Soft celebratory cream frosting
      roughness: 0.65,
      metalness: 0.08,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.2,
      metalness: 0.85,
    });

    // 1. Base Plate (Dark rich wood / gold edge)
    const plateGeo = new THREE.CylinderGeometry(3, 3.1, 0.2, 64);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = 0.1;
    plate.receiveShadow = true;
    plate.castShadow = true;
    cakeGroup.add(plate);

    // 2. Bottom Tier (Radius 2.4, Height 1.8, Center Y = 1.1)
    const tier1Geo = new THREE.CylinderGeometry(2.4, 2.4, 1.8, 64);
    const tier1 = new THREE.Mesh(tier1Geo, frostingMaterial);
    tier1.position.y = 1.1;
    tier1.receiveShadow = true;
    tier1.castShadow = true;
    cakeGroup.add(tier1);

    // 3. Top Tier (Radius 1.6, Height 1.4, Center Y = 2.7)
    const tier2Geo = new THREE.CylinderGeometry(1.6, 1.6, 1.4, 64);
    const tier2 = new THREE.Mesh(tier2Geo, frostingMaterial);
    tier2.position.y = 2.7;
    tier2.receiveShadow = true;
    tier2.castShadow = true;
    cakeGroup.add(tier2);

    // Gold trimming bottom tier
    const trim1Geo = new THREE.TorusGeometry(2.4, 0.08, 16, 100);
    const trim1 = new THREE.Mesh(trim1Geo, goldMaterial);
    trim1.rotation.x = Math.PI / 2;
    trim1.position.y = 0.25;
    trim1.castShadow = true;
    cakeGroup.add(trim1);

    // Gold trimming top tier
    const trim2Geo = new THREE.TorusGeometry(1.6, 0.06, 16, 100);
    const trim2 = new THREE.Mesh(trim2Geo, goldMaterial);
    trim2.rotation.x = Math.PI / 2;
    trim2.position.y = 2.05;
    trim2.castShadow = true;
    cakeGroup.add(trim2);

    // Sunflowers around the base plate
    const sunflowerGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const sunflowerMat = new THREE.MeshStandardMaterial({ color: 0xffa500, roughness: 0.6 });
    const numFlowers = 12;
    for (let i = 0; i < numFlowers; i++) {
      const angle = (i / numFlowers) * Math.PI * 2;
      const radius = 2.5;
      const flower = new THREE.Mesh(sunflowerGeo, sunflowerMat);
      flower.position.set(Math.cos(angle) * radius, 0.4, Math.sin(angle) * radius);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x4a3728 })
      );
      core.position.set(
        Math.cos(angle) * (radius + 0.15),
        0.45,
        Math.sin(angle) * (radius + 0.15)
      );

      cakeGroup.add(flower);
      cakeGroup.add(core);
    }

    // ========================================================
    // 3D TEXT DIRECTLY IN THE FRONT OF THE CAKE
    // Note: In Three.js CylinderGeometry, theta = 0 is z = +radius (DIRECT FRONT)
    // ========================================================

    // 1. Bottom Tier: Curved Fondant Sash reading "✨ HAPPY BIRTHDAY NISHA ✨"
    const tier1Canvas = document.createElement('canvas');
    tier1Canvas.width = 2048;
    tier1Canvas.height = 512;
    const c1 = tier1Canvas.getContext('2d');
    c1.clearRect(0, 0, 2048, 512);

    // Dark royal satin banner background
    const gradBg = c1.createLinearGradient(0, 0, 2048, 0);
    gradBg.addColorStop(0, 'rgba(15, 10, 25, 0.0)');
    gradBg.addColorStop(0.12, 'rgba(25, 15, 35, 0.95)');
    gradBg.addColorStop(0.5, 'rgba(40, 20, 50, 0.98)');
    gradBg.addColorStop(0.88, 'rgba(25, 15, 35, 0.95)');
    gradBg.addColorStop(1, 'rgba(15, 10, 25, 0.0)');

    c1.fillStyle = gradBg;
    c1.beginPath();
    c1.roundRect(100, 50, 1848, 412, 60);
    c1.fill();

    // Dual gold borders
    c1.lineWidth = 14;
    c1.strokeStyle = '#ffd700';
    c1.shadowColor = '#ffd700';
    c1.shadowBlur = 35;
    c1.stroke();

    c1.lineWidth = 4;
    c1.strokeStyle = '#fff6b0';
    c1.strokeRect(135, 80, 1778, 352);

    // Shimmering Gold Text
    const goldTextGrad = c1.createLinearGradient(0, 0, 2048, 0);
    goldTextGrad.addColorStop(0.1, '#ffd700');
    goldTextGrad.addColorStop(0.3, '#ffffff');
    goldTextGrad.addColorStop(0.5, '#ffd700');
    goldTextGrad.addColorStop(0.7, '#ffe57f');
    goldTextGrad.addColorStop(0.9, '#ffaa00');

    c1.fillStyle = goldTextGrad;
    c1.shadowColor = 'rgba(255, 215, 0, 0.95)';
    c1.shadowBlur = 40;
    c1.font = 'bold 118px "Cinzel", "Playfair Display", Georgia, serif';
    c1.textAlign = 'center';
    c1.textBaseline = 'middle';
    c1.fillText('✨ HAPPY BIRTHDAY NISHA ✨', 1024, 256);

    const tier1Texture = new THREE.CanvasTexture(tier1Canvas);
    tier1Texture.needsUpdate = true;

    // Curved surface centered exactly at theta = 0 (DIRECT FRONT facing camera +Z!)
    const curvedGeo1 = new THREE.CylinderGeometry(
      2.42,
      2.42,
      0.85,
      64,
      1,
      true,
      -0.78, // thetaStart centered around 0
      1.56  // thetaLength
    );
    const curvedMat1 = new THREE.MeshBasicMaterial({
      map: tier1Texture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const curvedBanner1 = new THREE.Mesh(curvedGeo1, curvedMat1);
    curvedBanner1.position.y = 1.15;
    cakeGroup.add(curvedBanner1);

    // 2. Top Tier: Gold Crest reading "👑 NISHA 👑"
    const tier2Canvas = document.createElement('canvas');
    tier2Canvas.width = 1024;
    tier2Canvas.height = 300;
    const c2 = tier2Canvas.getContext('2d');
    c2.clearRect(0, 0, 1024, 300);

    const gradBg2 = c2.createLinearGradient(0, 0, 1024, 0);
    gradBg2.addColorStop(0, 'rgba(20, 15, 30, 0.0)');
    gradBg2.addColorStop(0.18, 'rgba(25, 15, 35, 0.92)');
    gradBg2.addColorStop(0.82, 'rgba(25, 15, 35, 0.92)');
    gradBg2.addColorStop(1, 'rgba(20, 15, 30, 0.0)');

    c2.fillStyle = gradBg2;
    c2.beginPath();
    c2.roundRect(60, 40, 904, 220, 40);
    c2.fill();

    c2.lineWidth = 7;
    c2.strokeStyle = '#ffd700';
    c2.shadowColor = '#ffd700';
    c2.shadowBlur = 22;
    c2.stroke();

    c2.fillStyle = goldTextGrad;
    c2.shadowColor = '#ffd700';
    c2.shadowBlur = 25;
    c2.font = 'bold 90px "Cinzel", "Playfair Display", Georgia, serif';
    c2.textAlign = 'center';
    c2.textBaseline = 'middle';
    c2.fillText('👑 NISHA 👑', 512, 150);

    const tier2Texture = new THREE.CanvasTexture(tier2Canvas);
    tier2Texture.needsUpdate = true;

    // Centered at theta = 0 (DIRECT FRONT)
    const curvedGeo2 = new THREE.CylinderGeometry(
      1.62,
      1.62,
      0.58,
      64,
      1,
      true,
      -0.78,
      1.56
    );
    const curvedMat2 = new THREE.MeshBasicMaterial({
      map: tier2Texture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const curvedBanner2 = new THREE.Mesh(curvedGeo2, curvedMat2);
    curvedBanner2.position.y = 2.65;
    cakeGroup.add(curvedBanner2);

    // 3. Tall Golden Acrylic Cake Topper inserted in the top tier
    const topperCanvas = document.createElement('canvas');
    topperCanvas.width = 1024;
    topperCanvas.height = 360;
    const tCtx = topperCanvas.getContext('2d');
    tCtx.clearRect(0, 0, 1024, 360);

    tCtx.font = 'bold 82px "Cinzel", serif, Georgia';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillStyle = goldTextGrad;
    tCtx.shadowColor = '#ffd700';
    tCtx.shadowBlur = 30;
    tCtx.fillText('Happy Birthday', 512, 100);

    tCtx.font = 'bold 112px "Cinzel", "Playfair Display", Georgia, serif';
    tCtx.fillStyle = '#fff6b0';
    tCtx.shadowColor = 'rgba(255, 215, 0, 0.95)';
    tCtx.shadowBlur = 35;
    tCtx.fillText('NISHA ✨', 512, 230);

    const topperTexture = new THREE.CanvasTexture(topperCanvas);
    topperTexture.needsUpdate = true;

    const topperGeo = new THREE.PlaneGeometry(2.35, 0.85);
    const topperMat = new THREE.MeshBasicMaterial({
      map: topperTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const topperMesh = new THREE.Mesh(topperGeo, topperMat);
    topperMesh.position.set(0, 4.45, 0.1);
    topperMesh.rotation.x = 0.18; // Angled slightly backward to directly face camera
    cakeGroup.add(topperMesh);

    // Support sticks
    const stickMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2,
    });
    const stickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.95, 16);

    const stick1 = new THREE.Mesh(stickGeo, stickMat);
    stick1.position.set(-0.75, 3.85, 0);
    cakeGroup.add(stick1);

    const stick2 = new THREE.Mesh(stickGeo, stickMat);
    stick2.position.set(0.75, 3.85, 0);
    cakeGroup.add(stick2);

    // 6 Candles on top tier
    const createCandle = (x, z) => {
      const candleGroup = new THREE.Group();
      candleGroup.position.set(x, 3.4, z);

      // Wax body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16),
        new THREE.MeshStandardMaterial({ color: 0xffe4e1, roughness: 0.4 })
      );
      body.position.y = 0.4;
      body.castShadow = true;
      candleGroup.add(body);

      // Wick
      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8),
        new THREE.MeshBasicMaterial({ color: 0x222222 })
      );
      wick.position.y = 0.85;
      candleGroup.add(wick);

      // Flame
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.25, 16),
        new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.9 })
      );
      flame.position.y = 0.98;
      if (stateRef.current.isBlown) {
        flame.scale.set(0, 0, 0);
      }
      candleGroup.add(flame);
      flames.push(flame);

      // Point Light
      const light = new THREE.PointLight(0xffa500, stateRef.current.isBlown ? 0 : 1.2, 5.5);
      light.position.y = 1.0;
      light.castShadow = true;
      candleGroup.add(light);
      pointLights.push(light);

      candlePositions.push({ x: x, y: 3.4 + 0.85 - 0.45, z: z });
      cakeGroup.add(candleGroup);
    };

    const numCandles = 6;
    for (let i = 0; i < numCandles; i++) {
      const angle = (i / numCandles) * Math.PI * 2;
      const radius = 1.0;
      createCandle(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    // Fireflies field
    const firefliesGeo = new THREE.BufferGeometry();
    const firefliesCount = 60;
    const fireflyPositions = new Float32Array(firefliesCount * 3);
    const fireflyOffsets = new Float32Array(firefliesCount);

    for (let i = 0; i < firefliesCount * 3; i += 3) {
      fireflyPositions[i] = (Math.random() - 0.5) * 16;
      fireflyPositions[i + 1] = Math.random() * 8;
      fireflyPositions[i + 2] = (Math.random() - 0.5) * 16;
      fireflyOffsets[i / 3] = Math.random() * Math.PI * 2;
    }

    firefliesGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
    firefliesGeo.setAttribute('aOffset', new THREE.BufferAttribute(fireflyOffsets, 1));

    const firefliesMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const fireflies = new THREE.Points(firefliesGeo, firefliesMat);
    scene.add(fireflies);

    // Smoke System
    const smokeGroup = new THREE.Group();
    scene.add(smokeGroup);

    const smokeGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    candlePositions.forEach((pos) => {
      for (let i = 0; i < 20; i++) {
        const smoke = new THREE.Mesh(smokeGeo, smokeMat.clone());
        smoke.position.set(pos.x, pos.y, pos.z);
        smoke.userData = {
          originX: pos.x,
          originY: pos.y,
          originZ: pos.z,
          life: Math.random(),
          speed: Math.random() * 0.012 + 0.01,
          driftX: (Math.random() - 0.5) * 0.02,
          driftZ: (Math.random() - 0.5) * 0.02,
        };
        smokeGroup.add(smoke);
        smokeParticles.push(smoke);
      }
    });

    // Parallax input
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const wide = w >= 900;
      cakeGroup.position.x = wide ? -0.35 : 0;
      cakeGroup.position.y = wide ? -0.7 : -0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Frontal camera parallax with gentle follow
      const curWide = window.innerWidth >= 900;
      const curBaseX = curWide ? -0.35 : 0;

      targetX = curBaseX + mouseX * 0.6;
      targetY = 3.4 + mouseY * 0.3;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(curBaseX, 1.25, 0);

      // Fireflies floating
      const posArray = firefliesGeo.attributes.position.array;
      for (let i = 0; i < firefliesCount; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += Math.sin(elapsedTime + fireflyOffsets[i]) * 0.005;
        posArray[i3] += Math.cos(elapsedTime * 0.5 + fireflyOffsets[i]) * 0.005;
      }
      firefliesGeo.attributes.position.needsUpdate = true;

      // Candle flicker (if not blown)
      if (!stateRef.current.isBlown) {
        const flicker = Math.sin(elapsedTime * 20) * 0.05 + Math.sin(elapsedTime * 10) * 0.05 + 1;
        flames.forEach((flame) => {
          flame.scale.set(flicker, flicker * 1.1, flicker);
        });
        pointLights.forEach((light) => {
          light.intensity = 1.2 * flicker;
        });
      } else {
        // Smoke particles simulation
        smokeParticles.forEach((smoke) => {
          const ud = smoke.userData;
          ud.life += 0.01;

          if (ud.life > 1) {
            ud.life = 0;
            smoke.position.set(ud.originX, ud.originY, ud.originZ);
          } else {
            smoke.position.y += ud.speed;
            smoke.position.x += ud.driftX;
            smoke.position.z += ud.driftZ;

            const scale = 1 + ud.life * 2.2;
            smoke.scale.set(scale, scale, scale);

            const opacity = Math.sin(ud.life * Math.PI) * 0.45;
            smoke.material.opacity = opacity;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    />
  );
}
