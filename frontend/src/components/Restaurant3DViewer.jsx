import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Restaurant3DViewer({ tables }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1410);

        // Camera
        const camera = new THREE.PerspectiveCamera(
            60,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 15, 18);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        // Warm restaurant lighting
        scene.add(new THREE.AmbientLight(0xffa666, 0.5));

        const dirLight = new THREE.DirectionalLight(0xffddaa, 0.7);
        dirLight.position.set(5, 15, 5);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const pointLight1 = new THREE.PointLight(0xff9500, 0.8);
        pointLight1.position.set(-8, 5, -8);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff9500, 0.8);
        pointLight2.position.set(8, 5, -8);
        scene.add(pointLight2);

        // Wooden floor
        const floorTexture = new THREE.TextureLoader().load('data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                <rect fill="#4a3520" width="200" height="200"/>
                <rect fill="#3d2a15" y="0" width="200" height="10"/>
                <rect fill="#3d2a15" y="50" width="200" height="10"/>
                <rect fill="#3d2a15" y="100" width="200" height="10"/>
                <rect fill="#3d2a15" y="150" width="200" height="10"/>
            </svg>
        `));
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(10, 10);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.8 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Walls
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9 });

        const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, 6, 0.3), wallMat);
        backWall.position.set(0, 3, -10);
        scene.add(backWall);

        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 20), wallMat);
        leftWall.position.set(-10, 3, 0);
        scene.add(leftWall);

        const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 20), wallMat);
        rightWall.position.set(10, 3, 0);
        scene.add(rightWall);

        const frontLeftWall = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.3), wallMat);
        frontLeftWall.position.set(-7, 3, 10);
        scene.add(frontLeftWall);

        const frontRightWall = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.3), wallMat);
        frontRightWall.position.set(7, 3, 10);
        scene.add(frontRightWall);

        // Glass entrance door
        const doorFrame = new THREE.Mesh(
            new THREE.BoxGeometry(4, 5, 0.2),
            new THREE.MeshStandardMaterial({ color: 0x2d1810 })
        );
        doorFrame.position.set(0, 2.5, 10);
        scene.add(doorFrame);

        const doorGlass = new THREE.Mesh(
            new THREE.BoxGeometry(3.8, 4.8, 0.1),
            new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transparent: true, opacity: 0.3, metalness: 0.1, roughness: 0.1 })
        );
        doorGlass.position.set(0, 2.5, 10.05);
        scene.add(doorGlass);

        // Door handle
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.3),
            new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 })
        );
        handle.rotation.z = Math.PI / 2;
        handle.position.set(1.5, 2.5, 10.15);
        scene.add(handle);

        // "ENTRANCE" sign
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        ctx.fillStyle = '#2d1810';
        ctx.fillRect(0, 0, 256, 64);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'Bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ENTRANCE', 128, 40);

        const sign = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.6, 0.1),
            new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas) })
        );
        sign.position.set(0, 5.3, 10.1);
        scene.add(sign);

        // Random table positions
        const positions = [
            [-6, 0, -6], [6, 0, -6], [-6, 0, 2], [6, 0, 2],
            [-3, 0, -3], [3, 0, -3], [0, 0, 5], [-7, 0, -2],
            [7, 0, 0], [0, 0, -7], [-3, 0, 5], [3, 0, 6]
        ];

        tables.forEach((table, i) => {
            if (i >= positions.length) return;
            const tableGroup = new THREE.Group();
            tableGroup.position.set(...positions[i]);

            const color = table.isAvailable ? 0x10b981 : 0xef4444;

            // Round table top
            const top = new THREE.Mesh(
                new THREE.CylinderGeometry(1, 1, 0.1, 32),
                new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.7 })
            );
            top.position.y = 0.7;
            top.castShadow = true;
            tableGroup.add(top);

            // Leg
            const leg = new THREE.Mesh(
                new THREE.CylinderGeometry(0.1, 0.1, 0.7),
                new THREE.MeshStandardMaterial({ color: 0x2d1810, roughness: 0.8 })
            );
            leg.position.y = 0.35;
            leg.castShadow = true;
            tableGroup.add(leg);

            // Chairs
            for (let j = 0; j < table.seats; j++) {
                const angle = (j / table.seats) * Math.PI * 2;
                const chairGroup = new THREE.Group();

                const seat = new THREE.Mesh(
                    new THREE.BoxGeometry(0.4, 0.1, 0.4),
                    new THREE.MeshStandardMaterial({ color: 0x654321 })
                );
                seat.castShadow = true;
                chairGroup.add(seat);

                const back = new THREE.Mesh(
                    new THREE.BoxGeometry(0.4, 0.5, 0.05),
                    new THREE.MeshStandardMaterial({ color: 0x654321 })
                );
                back.position.set(0, 0.3, -0.2);
                back.castShadow = true;
                chairGroup.add(back);

                chairGroup.position.set(
                    Math.cos(angle) * 1.5,
                    0.3,
                    Math.sin(angle) * 1.5
                );
                chairGroup.rotation.y = -angle;
                tableGroup.add(chairGroup);
            }

            // Table number label
            const labelCanvas = document.createElement('canvas');
            const labelCtx = labelCanvas.getContext('2d');
            labelCanvas.width = 128;
            labelCanvas.height = 64;
            labelCtx.fillStyle = '#ffffff';
            labelCtx.font = 'Bold 32px Arial';
            labelCtx.textAlign = 'center';
            labelCtx.fillText(`T${table.tableNumber}`, 64, 40);

            const sprite = new THREE.Sprite(
                new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(labelCanvas) })
            );
            sprite.position.set(0, 1.8, 0);
            sprite.scale.set(1, 0.5, 1);
            tableGroup.add(sprite);

            scene.add(tableGroup);
        });

        // Pendant lights
        for (let i = 0; i < 5; i++) {
            const x = (i - 2) * 4;
            const lampGroup = new THREE.Group();

            lampGroup.add(new THREE.Mesh(
                new THREE.ConeGeometry(0.3, 0.5, 8),
                new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, emissiveIntensity: 0.3 })
            ));

            const cord = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 2),
                new THREE.MeshBasicMaterial({ color: 0x333333 })
            );
            cord.position.y = 1;
            lampGroup.add(cord);

            lampGroup.position.set(x, 5, -3);
            scene.add(lampGroup);

            const light = new THREE.PointLight(0xffaa66, 0.5, 8);
            light.position.set(x, 4.5, -3);
            scene.add(light);
        }

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 8;
        controls.maxDistance = 30;
        controls.maxPolarAngle = Math.PI / 2.2;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [tables]);

    return (
        <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-700 bg-black/30">
                <h2 className="text-xl font-bold text-white">🏢 3D Restaurant Layout</h2>
                <p className="text-sm text-gray-400 mt-1">
                    Drag to rotate • Scroll to zoom • Entrance at front
                </p>
            </div>

            <div ref={mountRef} style={{ height: '600px', width: '100%' }} />

            <div className="p-4 bg-gradient-to-t from-black/40 to-transparent border-t border-gray-700">
                <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span className="text-gray-300">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span className="text-gray-300">Reserved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restaurant3DViewer;
