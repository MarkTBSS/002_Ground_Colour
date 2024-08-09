import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const App = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = () => {
            // This creates a basic Babylon Scene object (non-mesh)
            const scene = new BABYLON.Scene(engine);
            // This creates and positions a free camera (non-mesh)
            const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.7;
            // Our built-in 'sphere' shape.
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
            // Move the sphere upward 1/2 its height
            sphere.position.y = 1;

            var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
            let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
            groundMaterial.diffuseColor = BABYLON.Color3.Red();
            ground.material = groundMaterial;

            return scene;
        };

        const scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener('resize', () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default App;