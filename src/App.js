import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

function BlackBox({ ...props }) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/black-box.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += 0.005;
    groupRef.current.position.y = Math.sin(t / 0.5) / 3;
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["Material.001"]}
        material-color={props.color}
        scale={1.5}
      />
    </group>
  );
}

function App() {
  const [color, setColor] = useState("black");

  const handleColor = (colorCode) => {
    setColor(colorCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-5 bg-gradient-to-tl from-indigo-600 bg-emerald-600">
      <div className="flex flex-col w-full max-w-sm text-base text-center text-white text-normal">
        <span>
          <strong>Swipe</strong> or <strong>click and drag</strong> object to
          rotate
        </span>

        <span>
          Scroll to <strong>zoom</strong> in or out.
        </span>
      </div>

      <div className="w-full max-w-sm h-96 rounded-xl">
        <Canvas className="hover:cursor-grab active:cursor-grabbing">
          <Suspense fallback={null}>
            <ambientLight />

            <spotLight
              intensity={0.9}
              angle={1}
              penumbra={1}
              position={[10, 10, 10]}
              castShadow
            />

            <Environment preset="city" />

            <BlackBox color={color} />

            <ContactShadows
              position={[0, -1, 0]}
              opacity={0.25}
              scale={10}
              blur={1.5}
              far={0.8}
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableDamping={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="grid w-full h-16 max-w-sm grid-cols-5 gap-3 p-3 overflow-hidden bg-black/90 backdrop-blur rounded-xl">
        <button
          className={`rounded-md from-red-800 via-red-600 to-red-800 bg-gradient-to-r hover:from-red-700 hover:via-red-500 hover:to-red-700 hover:cursor-pointer ${
            color === "#991b1b" ? "ring ring-white" : null
          }`}
          onClick={() => handleColor("#991b1b")}
        ></button>

        <button
          className={`rounded-md from-emerald-800 via-emerald-600 to-emerald-800 bg-gradient-to-r hover:from-emerald-700 hover:via-emerald-500 hover:to-emerald-700 hover:cursor-pointer ${
            color === "#065f46" ? "ring ring-white" : null
          }`}
          onClick={() => handleColor("#065f46")}
        ></button>

        <button
          className={`rounded-md from-blue-800 via-blue-600 to-blue-800 bg-gradient-to-r hover:from-blue-700 hover:via-blue-500 hover:to-blue-700 hover:cursor-pointer ${
            color === "#1e40af" ? "ring ring-white" : null
          }`}
          onClick={() => handleColor("#1e40af")}
        ></button>

        <button
          className={`rounded-md from-orange-800 via-orange-600 to-orange-800 bg-gradient-to-r hover:from-orange-700 hover:via-orange-500 hover:to-orange-700 hover:cursor-pointer ${
            color === "#ea580c" ? "ring ring-white" : null
          }`}
          onClick={() => handleColor("#ea580c")}
        ></button>

        <button
          className={`rounded-md from-violet-800 via-violet-600 to-violet-800 bg-gradient-to-r hover:from-violet-700 hover:via-violet-500 hover:to-violet-700 hover:cursor-pointer ${
            color === "#5b21b6" ? "ring ring-white" : null
          }`}
          onClick={() => handleColor("#5b21b6")}
        ></button>
      </div>
    </div>
  );
}

export default App;
