import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  PartyPopper,
  Check,
  Copy,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface BabyMascotWithAudioProps {
  onApplyCoupon?: (discountPercent: number, couponCode: string) => void;
}

export default function BabyMascotWithAudio({ onApplyCoupon }: BabyMascotWithAudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [drumTapCount, setDrumTapCount] = useState(0);
  const [isDrumming, setIsDrumming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('Tap my drum for a secret reward! 🥁');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState<Array<{ id: number; symbol: string; left: number }>>([]);

  const COUPON_CODE = 'SANODRUM15';
  const MASCOT_REF_IMAGE = '/assets/aistudio/image_98e309ae.png';

  // Safe Web Audio Context initializer
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 🥁 Synthesize Rich Toy Drum Beats with Kick Body & Snare Snap
  const playDrumSound = (timeOffset = 0, isAccent = false) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime + timeOffset;

      // 1. Drum body tone (decaying sine wave)
      const drumOsc = ctx.createOscillator();
      const drumGain = ctx.createGain();
      drumOsc.type = 'sine';
      drumOsc.frequency.setValueAtTime(isAccent ? 230 : 165, now);
      drumOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      drumGain.gain.setValueAtTime(isAccent ? 0.32 : 0.22, now);
      drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      drumOsc.connect(drumGain);
      drumGain.connect(ctx.destination);
      drumOsc.start(now);
      drumOsc.stop(now + 0.15);

      // 2. Snare rattle / stick transient click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(420, now);
      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.05);
    } catch {
      // Audio fallback
    }
  };

  // 🎶 Synthesize Joyful Drumming Solo with Melodic Riffs & Giggles
  const playDrumSoloAndMelody = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Drum rhythm sequence: Bap-bap-ba-dum-dum!
      const drumHits = [
        { t: 0.0, accent: false },
        { t: 0.14, accent: false },
        { t: 0.28, accent: true },
        { t: 0.46, accent: false },
        { t: 0.60, accent: true },
        { t: 0.82, accent: false },
        { t: 0.96, accent: true },
      ];

      drumHits.forEach((hit) => {
        playDrumSound(hit.t, hit.accent);
      });

      // Melodic accompaniment: C5, E5, G5, A5, C6
      const chimes = [523.25, 659.25, 783.99, 880.0, 1046.5];
      chimes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const t = now + 0.15 + idx * 0.16;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.28);
      });

      // Happy baby giggle sweep
      [0.2, 0.42].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620 + Math.random() * 150, now + delay);
        osc.frequency.exponentialRampToValueAtTime(1050 + Math.random() * 200, now + delay + 0.09);
        gain.gain.setValueAtTime(0.15, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.12);
      });
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect software rendering guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return false;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene & Dimensions
    const isMobile = window.innerWidth < 640;
    const width = isMobile ? 150 : 190;
    const height = isMobile ? 190 : 230;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfffaed, 0.95);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfff3db, 1.35);
    mainSun.position.set(2.5, 4.5, 3.5);
    scene.add(mainSun);

    const skyFill = new THREE.DirectionalLight(0x8fd0ea, 0.55);
    skyFill.position.set(-2.5, 2, -1.5);
    scene.add(skyFill);

    // 3. Materials directly matching user's reference image
    const skinMaterial = new THREE.MeshToonMaterial({ color: 0xffdfc4 });
    const mintShirtMaterial = new THREE.MeshToonMaterial({ color: 0x48c9a0 }); // Mint/seafoam t-shirt
    const redStrapMaterial = new THREE.MeshToonMaterial({ color: 0xeb4d4b }); // Diagonal red strap
    const yellowShortsMaterial = new THREE.MeshToonMaterial({ color: 0xf5b301 }); // Canary yellow shorts
    const blondeHairMaterial = new THREE.MeshToonMaterial({ color: 0xf4cf7b }); // Golden blonde hair
    const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const blueIrisMaterial = new THREE.MeshBasicMaterial({ color: 0x1990ea }); // Vibrant cartoon blue eyes
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0f2038 });
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const blushMaterial = new THREE.MeshBasicMaterial({ color: 0xff9999, transparent: true, opacity: 0.65 });
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xbb3344 });
    const tongueMat = new THREE.MeshBasicMaterial({ color: 0xff7088 });

    // Drum Materials (Red cylinder, Yellow rims/hardware, White head)
    const drumBodyMaterial = new THREE.MeshToonMaterial({ color: 0xe74c3c });
    const drumRimMaterial = new THREE.MeshToonMaterial({ color: 0xf5b301 });
    const drumHeadMaterial = new THREE.MeshToonMaterial({ color: 0xfbfcfe });
    const stickWoodMaterial = new THREE.MeshToonMaterial({ color: 0xf2ebd9 });
    const malletHeadMaterial = new THREE.MeshToonMaterial({ color: 0x1f2a44 });

    // Grass patch shadow
    const grassGeo = new THREE.CircleGeometry(0.72, 32);
    const grassMat = new THREE.MeshBasicMaterial({ color: 0x5da864, transparent: true, opacity: 0.28 });
    const grassDisk = new THREE.Mesh(grassGeo, grassMat);
    grassDisk.rotation.x = -Math.PI / 2;
    grassDisk.position.y = -0.62;
    scene.add(grassDisk);

    // 4. Build 3D Baby Drummer Character Group
    const babyGroup = new THREE.Group();
    scene.add(babyGroup);

    // Head
    const headGeo = new THREE.SphereGeometry(0.58, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMaterial);
    head.position.y = 0.82;
    babyGroup.add(head);

    // Golden-blonde hair curl tuft on forehead (matching reference)
    const hairGroup = new THREE.Group();
    const curlGeo = new THREE.ConeGeometry(0.14, 0.32, 16);
    const curlMesh = new THREE.Mesh(curlGeo, blondeHairMaterial);
    curlMesh.rotation.z = -0.3;
    curlMesh.rotation.x = 0.2;
    hairGroup.add(curlMesh);

    const curl2Geo = new THREE.SphereGeometry(0.12, 16, 16);
    curl2Geo.scale(1.2, 0.7, 1.4);
    const curl2 = new THREE.Mesh(curl2Geo, blondeHairMaterial);
    curl2.position.set(-0.06, -0.06, 0.08);
    hairGroup.add(curl2);

    hairGroup.position.set(0.04, 1.42, 0.12);
    babyGroup.add(hairGroup);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.56, 0.82, 0);
    leftEar.scale.set(0.6, 1, 0.8);
    const rightEar = new THREE.Mesh(earGeo, skinMaterial);
    rightEar.position.set(0.56, 0.82, 0);
    rightEar.scale.set(0.6, 1, 0.8);
    babyGroup.add(leftEar, rightEar);

    // Big Expressive Cartoon Eyes (Double highlight catchlights)
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.86, 0.5);

    const eyeScleraGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const leftSclera = new THREE.Mesh(eyeScleraGeo, eyeWhiteMaterial);
    leftSclera.position.x = -0.19;
    const rightSclera = new THREE.Mesh(eyeScleraGeo, eyeWhiteMaterial);
    rightSclera.position.x = 0.19;

    const irisGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const leftIris = new THREE.Mesh(irisGeo, blueIrisMaterial);
    leftIris.position.set(-0.19, 0.01, 0.06);
    const rightIris = new THREE.Mesh(irisGeo, blueIrisMaterial);
    rightIris.position.set(0.19, 0.01, 0.06);

    const pupilGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.19, 0.01, 0.1);
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0.19, 0.01, 0.1);

    // Specular catchlights
    const hl1Geo = new THREE.SphereGeometry(0.025, 8, 8);
    const leftHl1 = new THREE.Mesh(hl1Geo, highlightMaterial);
    leftHl1.position.set(-0.16, 0.04, 0.135);
    const rightHl1 = new THREE.Mesh(hl1Geo, highlightMaterial);
    rightHl1.position.set(0.22, 0.04, 0.135);

    const hl2Geo = new THREE.SphereGeometry(0.013, 8, 8);
    const leftHl2 = new THREE.Mesh(hl2Geo, highlightMaterial);
    leftHl2.position.set(-0.21, -0.02, 0.135);
    const rightHl2 = new THREE.Mesh(hl2Geo, highlightMaterial);
    rightHl2.position.set(0.17, -0.02, 0.135);

    eyesGroup.add(leftSclera, rightSclera, leftIris, rightIris, leftPupil, rightPupil, leftHl1, rightHl1, leftHl2, rightHl2);
    babyGroup.add(eyesGroup);

    // Chubby Rosy Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const leftCheek = new THREE.Mesh(cheekGeo, blushMaterial);
    leftCheek.position.set(-0.29, 0.73, 0.49);
    const rightCheek = new THREE.Mesh(cheekGeo, blushMaterial);
    rightCheek.position.set(0.29, 0.73, 0.49);
    babyGroup.add(leftCheek, rightCheek);

    // Cute Button Nose
    const noseGeo = new THREE.SphereGeometry(0.048, 16, 16);
    const nose = new THREE.Mesh(noseGeo, skinMaterial);
    nose.position.set(0, 0.77, 0.57);
    babyGroup.add(nose);

    // Happy Smiling Mouth with Tongue
    const mouthGeo = new THREE.TorusGeometry(0.065, 0.016, 8, 16, Math.PI);
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, 0.68, 0.54);
    mouth.rotation.x = Math.PI / 1.1;
    mouth.rotation.z = Math.PI;
    babyGroup.add(mouth);

    const tongueGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const tongue = new THREE.Mesh(tongueGeo, tongueMat);
    tongue.position.set(0, 0.67, 0.53);
    babyGroup.add(tongue);

    // Torso (Mint-Green T-Shirt)
    const bodyGeo = new THREE.SphereGeometry(0.48, 32, 32);
    bodyGeo.scale(1, 1.25, 0.95);
    const body = new THREE.Mesh(bodyGeo, mintShirtMaterial);
    body.position.y = 0.12;
    babyGroup.add(body);

    // Diagonal Red Drum Strap across chest
    const strapGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.85, 12);
    const strap = new THREE.Mesh(strapGeo, redStrapMaterial);
    strap.position.set(0.06, 0.15, 0.42);
    strap.rotation.z = Math.PI / 3.4;
    strap.rotation.x = 0.18;
    babyGroup.add(strap);

    // Yellow Shorts / Waistband
    const shortsGeo = new THREE.CylinderGeometry(0.49, 0.51, 0.24, 32);
    const shorts = new THREE.Mesh(shortsGeo, yellowShortsMaterial);
    shorts.position.y = -0.22;
    babyGroup.add(shorts);

    // Sitting Legs & Chubby Bare Feet
    const legGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.32, 16);
    const footGeo = new THREE.SphereGeometry(0.1, 16, 16);
    footGeo.scale(1.1, 0.7, 1.5);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.28, -0.36, 0.15);
    const leftLeg = new THREE.Mesh(legGeo, skinMaterial);
    leftLeg.rotation.z = Math.PI / 3;
    leftLeg.rotation.x = -Math.PI / 8;
    const leftFoot = new THREE.Mesh(footGeo, skinMaterial);
    leftFoot.position.set(-0.16, -0.06, 0.2);
    leftLegGroup.add(leftLeg, leftFoot);
    babyGroup.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.28, -0.36, 0.15);
    const rightLeg = new THREE.Mesh(legGeo, skinMaterial);
    rightLeg.rotation.z = -Math.PI / 3;
    rightLeg.rotation.x = -Math.PI / 8;
    const rightFoot = new THREE.Mesh(footGeo, skinMaterial);
    rightFoot.position.set(0.16, -0.06, 0.2);
    rightLegGroup.add(rightLeg, rightFoot);
    babyGroup.add(rightLegGroup);

    // Left Arm (Mint green sleeve + skin hand resting on the drum rim)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.46, 0.28, 0.05);

    const sleeveGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.2, 16);
    const leftSleeve = new THREE.Mesh(sleeveGeo, mintShirtMaterial);
    leftSleeve.position.y = -0.08;
    leftArmGroup.add(leftSleeve);

    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.28, 16);
    const leftArm = new THREE.Mesh(armGeo, skinMaterial);
    leftArm.position.y = -0.24;
    leftArm.position.z = 0.12;
    leftArm.rotation.x = Math.PI / 4;
    leftArmGroup.add(leftArm);

    const handGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(0.08, -0.36, 0.26);
    leftArmGroup.add(leftHand);

    leftArmGroup.rotation.z = Math.PI / 5;
    babyGroup.add(leftArmGroup);

    // Right Arm (Holding Mallet ready to drum!)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.46, 0.28, 0.05);

    const rightSleeve = new THREE.Mesh(sleeveGeo, mintShirtMaterial);
    rightSleeve.position.y = -0.08;
    rightArmGroup.add(rightSleeve);

    const rightArm = new THREE.Mesh(armGeo, skinMaterial);
    rightArm.position.y = -0.22;
    rightArmGroup.add(rightArm);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0, -0.34, 0.05);
    rightArmGroup.add(rightHand);

    // Drum Mallet (Wood shaft + dark round head, matching reference image)
    const stickGroup = new THREE.Group();
    stickGroup.position.set(0, -0.34, 0.05);

    const shaftGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.38, 12);
    const shaft = new THREE.Mesh(shaftGeo, stickWoodMaterial);
    shaft.position.y = 0.14;
    stickGroup.add(shaft);

    const malletHeadGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const malletHead = new THREE.Mesh(malletHeadGeo, malletHeadMaterial);
    malletHead.position.y = 0.32;
    stickGroup.add(malletHead);

    stickGroup.rotation.z = -Math.PI / 5;
    stickGroup.rotation.x = Math.PI / 3;
    rightArmGroup.add(stickGroup);

    rightArmGroup.rotation.z = -Math.PI / 3.5;
    babyGroup.add(rightArmGroup);

    // 5. TOY MARCHING DRUM (Sitting directly in front of baby)
    const drumGroup = new THREE.Group();
    drumGroup.position.set(0, -0.32, 0.48);

    // Drum cylinder body (Red)
    const drumCylGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.32, 32);
    const drumCyl = new THREE.Mesh(drumCylGeo, drumBodyMaterial);
    drumGroup.add(drumCyl);

    // White drumheads (top and bottom)
    const drumHeadGeo = new THREE.CylinderGeometry(0.375, 0.375, 0.02, 32);
    const topDrumHead = new THREE.Mesh(drumHeadGeo, drumHeadMaterial);
    topDrumHead.position.y = 0.16;
    drumGroup.add(topDrumHead);

    // Yellow Rims (top and bottom hoops)
    const rimGeo = new THREE.TorusGeometry(0.39, 0.035, 12, 32);
    const topRim = new THREE.Mesh(rimGeo, drumRimMaterial);
    topRim.rotation.x = Math.PI / 2;
    topRim.position.y = 0.17;
    const botRim = new THREE.Mesh(rimGeo, drumRimMaterial);
    botRim.rotation.x = Math.PI / 2;
    botRim.position.y = -0.17;
    drumGroup.add(topRim, botRim);

    // 6 Vertical Yellow Tension Rods/Posts around drum
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const postGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.34, 8);
      const post = new THREE.Mesh(postGeo, drumRimMaterial);
      post.position.set(Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4);
      drumGroup.add(post);
    }

    drumGroup.rotation.x = -Math.PI / 14; // Slight ergonomic tilt towards baby
    babyGroup.add(drumGroup);

    // Pointer Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.22;
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth eye/head tracking
      head.rotation.y += (targetRotationY - head.rotation.y) * 0.1;
      head.rotation.x += (targetRotationX - head.rotation.x) * 0.1;
      eyesGroup.rotation.y = head.rotation.y;
      eyesGroup.rotation.x = head.rotation.x;

      if (!babyGroup.userData.isDrumming) {
        // Idle gentle breathing bounce & occasional light drum tap
        babyGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.025;
        babyGroup.rotation.y += (0 - babyGroup.rotation.y) * 0.08;
        
        // Gentle mallet bounce
        const idleTap = Math.sin(elapsedTime * 3.5);
        rightArmGroup.rotation.x = Math.max(0, idleTap * 0.22);
        leftArmGroup.rotation.z = Math.PI / 5 + Math.sin(elapsedTime * 2) * 0.04;
        grassDisk.scale.setScalar(1 + Math.sin(elapsedTime * 2.2) * 0.03);
      } else {
        // Fast Rhythmic Drumming Solo Animation!
        const drumBeat = elapsedTime * 18; // Fast tempo
        const drumStrike = Math.abs(Math.sin(drumBeat));
        
        // Rapid mallet hitting drum surface
        rightArmGroup.rotation.x = drumStrike * 0.75;
        rightArmGroup.rotation.z = -Math.PI / 3.8 + Math.cos(drumBeat * 0.5) * 0.15;
        
        // Left hand rhythmically tapping the drum rim
        leftArmGroup.rotation.x = Math.abs(Math.cos(drumBeat)) * 0.3;
        
        // Head bobbing to the music
        head.rotation.z = Math.sin(elapsedTime * 9) * 0.15;
        head.rotation.x = (targetRotationX) + Math.abs(Math.sin(drumBeat * 0.5)) * 0.12;

        // Drum squashes slightly on hit
        drumGroup.scale.y = 1 - drumStrike * 0.06;

        // Baby torso bounce
        babyGroup.position.y = Math.abs(Math.sin(elapsedTime * 9)) * 0.07;
        grassDisk.scale.setScalar(0.92 + Math.abs(Math.sin(elapsedTime * 9)) * 0.18);
      }

      renderer.render(scene, camera);
    };

    animate();

    (mountRef.current as any).babyGroup = babyGroup;

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  // Sync isDrumming state to Three.js loop
  useEffect(() => {
    if (mountRef.current && (mountRef.current as any).babyGroup) {
      (mountRef.current as any).babyGroup.userData.isDrumming = isDrumming;
    }
  }, [isDrumming]);

  // Handle Drum Mascot Click: Drum solo, synthesized audio, reward progression
  const handleMascotClick = () => {
    const nextCount = drumTapCount + 1;
    setDrumTapCount(nextCount);
    setIsDrumming(true);

    // Play drum solo + melody + giggles
    playDrumSoloAndMelody();

    // Spawn floating musical & drum symbols
    const newNotes = [
      { id: Date.now() + 1, symbol: '🥁', left: 20 + Math.random() * 55 },
      { id: Date.now() + 2, symbol: '🎵', left: 15 + Math.random() * 70 },
      { id: Date.now() + 3, symbol: '🎶', left: 30 + Math.random() * 45 },
      { id: Date.now() + 4, symbol: '✨', left: 25 + Math.random() * 50 },
    ];
    setFloatingNotes((prev) => [...prev, ...newNotes]);
    setTimeout(() => {
      setFloatingNotes((prev) => prev.filter((n) => !newNotes.find((nn) => nn.id === n.id)));
    }, 1800);

    if (nextCount === 1) {
      setSpeechBubble('Ba-dum! 🥁 Tap 2 more times for secret gift!');
    } else if (nextCount === 2) {
      setSpeechBubble('Great rhythm! 🎶 1 more tap for 15% OFF!');
    } else if (nextCount >= 3) {
      setSpeechBubble('🎉 YAY! 15% OFF Voucher Unlocked!');
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.85, x: 0.9 },
          colors: ['#F5B301', '#E8604F', '#48C9A0', '#1F2A44', '#E74C3C'],
        });
      } catch {
        // Confetti fallback
      }
      setTimeout(() => setShowCouponModal(true), 650);
    }

    setTimeout(() => {
      setIsDrumming(false);
    }, 2400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyDiscount = () => {
    if (onApplyCoupon) {
      onApplyCoupon(15, COUPON_CODE);
    }
    setShowCouponModal(false);
    setSpeechBubble('15% OFF Voucher Applied to Cart! ✨');
  };

  return (
    <>
      {/* Floating Bottom-Right Corner Container */}
      <div className="fixed bottom-3 right-2 sm:bottom-4 sm:right-4 z-40 flex flex-col items-end pointer-events-none select-none">
        
        {/* Minimized Pill Toggle for Mobile Comfort */}
        {isMinimized ? (
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto flex items-center justify-center gap-2 rounded-full bg-[#1F2A44] border-2 border-[#F5B301] px-4 py-2 text-xs font-bold text-[#FFF6E9] shadow-xl hover:bg-[#1F2A44]/90 transition-all cursor-pointer active:scale-95 min-h-[48px] min-w-[48px]"
            title="Expand Drumming Baby Mascot"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#F5B301] shrink-0">
              <img
                src={MASCOT_REF_IMAGE}
                alt="Sano Drummer Baby Mascot"
                className="w-full h-full object-cover"
              />
            </div>
            <span>Sano Drummer</span>
            <ChevronUp className="w-4 h-4 text-[#F5B301]" />
          </button>
        ) : (
          <div className="flex flex-col items-end">
            
            {/* Top Bubble & Audio Control Row */}
            <div className="pointer-events-auto mb-1 flex items-center gap-2 max-w-[280px] sm:max-w-xs">
              
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label="Toggle Sound Effects"
                className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#1F2A44] flex items-center justify-center text-[#FFF6E9] shadow-md hover:bg-[#1F2A44]/90 active:scale-95 transition-all cursor-pointer border border-[#F5B301]/40 shrink-0"
                title={isMuted ? 'Unmute drum music' : 'Mute drum music'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-[#E8604F]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#F5B301]" />
                )}
              </button>

              {/* Speech Bubble with Mascot Character Avatar */}
              <div
                onClick={handleMascotClick}
                className="clickable-card min-h-[48px] min-w-[48px] cursor-pointer rounded-2xl bg-[#FFF6E9] border-2 border-[#1F2A44] px-3.5 py-2 shadow-md flex items-center gap-2 animate-bounce hover:scale-105 active:scale-95 transition-transform"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#1F2A44]/20 shrink-0 shadow-2xs">
                  <img
                    src={MASCOT_REF_IMAGE}
                    alt="Sano Drummer Boy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-[10px] sm:text-xs text-[#1F2A44] leading-tight truncate">
                  {speechBubble}
                </span>
              </div>

              {/* Minimize Mascot Button */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/95 border border-[#1F2A44]/20 flex items-center justify-center text-[#1F2A44] hover:bg-white text-xs font-bold cursor-pointer transition-all active:scale-95 shrink-0 shadow-sm"
                title="Minimize mascot"
                aria-label="Minimize mascot"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* 3D Canvas Element & Floating Musical Notes */}
            <div className="relative">
              {/* Floating Music & Drum Notes Animation */}
              {floatingNotes.map((note) => (
                <div
                  key={note.id}
                  style={{ left: `${note.left}%` }}
                  className="absolute bottom-24 text-xl pointer-events-none animate-float-fade z-50 drop-shadow-md"
                >
                  {note.symbol}
                </div>
              ))}

              <div
                onClick={handleMascotClick}
                className="pointer-events-auto cursor-pointer relative hover:scale-105 transition-transform active:scale-95"
                title="Click me to drum & unlock 15% OFF!"
              >
                <div
                  ref={mountRef}
                  className="w-[150px] h-[190px] sm:w-[190px] sm:h-[230px]"
                />
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Secret Coupon Reward Modal featuring Reference Mascot */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#FFF6E9] border-4 border-[#F5B301] p-6 text-center text-[#1F2A44] shadow-2xl relative space-y-4">
            
            <button
              type="button"
              onClick={() => setShowCouponModal(false)}
              className="absolute top-3.5 right-3.5 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/90 flex items-center justify-center text-[#1F2A44] hover:bg-white cursor-pointer transition-all active:scale-95 shadow-xs"
              aria-label="Close coupon modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mascot Character Feature Card in Modal */}
            <div className="relative w-24 h-24 mx-auto rounded-3xl overflow-hidden border-4 border-[#F5B301] shadow-lg">
              <img
                src={MASCOT_REF_IMAGE}
                alt="Sano Drummer Baby Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#1F2A44]/80 text-[#F5B301] text-[9px] font-bold py-0.5">
                Drum Solo
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8604F] bg-[#E8604F]/10 px-3 py-1 rounded-full">
                Interactive Reward
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#1F2A44] mt-2">
                Drummer Baby Reward Unlocked!
              </h3>
            </div>

            <p className="text-xs text-[#1F2A44]/80 leading-relaxed">
              Thanks for drumming with our Sano mascot! Enjoy <strong>15% OFF</strong> on all <strong>sano care.</strong> diapering, feeding, apparel, and health essentials across Kathmandu Valley.
            </p>

            {/* Promo Code Box */}
            <div className="rounded-2xl bg-white border-2 border-dashed border-[#1F2A44]/30 p-3.5 flex items-center justify-between gap-2 shadow-xs">
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#1F2A44]/50 uppercase tracking-wider block">
                  Promo Voucher
                </span>
                <span className="font-mono text-base font-extrabold text-[#1F2A44] tracking-wider">
                  {COUPON_CODE}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center justify-center gap-2 rounded-full bg-[#1F2A44] px-5 py-2.5 text-xs font-bold text-[#FFF6E9] hover:bg-[#1F2A44]/90 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px]"
              >
                {copied ? <Check className="w-4 h-4 text-[#5DAA7A]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="w-full rounded-full bg-[#F5B301] py-3.5 px-6 text-xs sm:text-sm font-bold text-[#1F2A44] hover:bg-[#F5B301]/90 active:scale-95 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 min-h-[48px] min-w-[48px]"
              >
                <Sparkles className="w-4 h-4 text-[#1F2A44]" />
                <span>Apply 15% Discount to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="w-full py-2.5 text-xs font-bold text-[#1F2A44]/70 hover:text-[#1F2A44] active:scale-95 transition-all cursor-pointer min-h-[48px] flex items-center justify-center"
              >
                Keep Browsing Sano
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
