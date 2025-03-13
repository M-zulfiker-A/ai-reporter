import useSpline from "@splinetool/r3f-spline";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/kue5ShiPooJiMtDh/scene.splinecode",
  );
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(0, 0, -400);
    camera.near = 0.2;
    camera.far = 1000;
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const entranceAnimation = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });
  return (
    <>
      <color attach="background" args={["#feeade"]} />
      <group {...props} rotation={[0, 135, 0]} dispose={null}>
        <scene name="Scene 1">
          <pointLight
            name="Point Light"
            intensity={0.9}
            distance={254}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={100}
            shadow-camera-far={100000}
            color="#fee2e2"
            position={[186.9, -0.53, 198.12]}
          />
          <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={materials["Sphere Material"]}
            position={[181.1, -1, 198.79]}
          />
          <directionalLight
            name="Directional Light 2"
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            color="#c741ca"
            position={[297.69, -250.38, 375.92]}
          />
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[-271.28, 300, 375.92]}
          />
          <group
            name="Group 2"
            position={[-25.31, 100.08, -34.34]}
            scale={[1.07, 1, 1]}
          >
            <group name="Bodyy" position={[0, 38.79, 5.61]}>
              <mesh
                name="Cloth"
                geometry={nodes.Cloth.geometry}
                material={materials["Cloth Material"]}
                castShadow
                receiveShadow
                position={[-0.02, -155.79, 50.61]}
                scale={[1.09, 1.13, 1.05]}
              />
              <mesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[3.52, -155.46, 55.71]}
                scale={[1.09, 1.13, 1.05]}
              />
            </group>
            <group name="FACE" position={[1.72, 63.56, -26.22]}>
              <mesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials.Hair}
                castShadow
                receiveShadow
                position={[0.04, 80.78, 11.14]}
                scale={[1, 1, 0.83]}
              />
              <mesh
                name="Ear"
                geometry={nodes.Ear.geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[-77.72, 5.41, 22.12]}
                scale={[-1, 1.12, 0.49]}
              />
              <mesh
                name="Ear 2"
                geometry={nodes["Ear 2"].geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[76.46, 5.41, 22.12]}
                scale={[1, 1.12, 0.49]}
              />
              <mesh
                name="Mouth"
                geometry={nodes.Mouth.geometry}
                material={materials["Mouth Material"]}
                castShadow
                receiveShadow
                position={[2.16, -30.75, 88.57]}
                rotation={[-0.01, -0.01, 2.28]}
                scale={0.86}
              />
              <group name="brows" position={[0.76, 33.48, 88.41]}>
                <mesh
                  name="Brow"
                  geometry={nodes.Brow.geometry}
                  material={materials["Brow Material"]}
                  castShadow
                  receiveShadow
                  position={[-28.98, -5.66, 0.14]}
                  rotation={[0, -0.25, -1.58]}
                  scale={1}
                />
                <mesh
                  name="Brow 2"
                  geometry={nodes["Brow 2"].geometry}
                  material={materials["Brow 2 Material"]}
                  castShadow
                  receiveShadow
                  position={[31.48, -5.91, 0.14]}
                  rotation={[0, 0, -1.57]}
                  scale={1}
                />
              </group>
              <group name="Eyes" position={[2.49, 10.33, 91.5]}>
                <mesh
                  name="Cube 3"
                  geometry={nodes["Cube 3"].geometry}
                  material={materials.Eyes}
                  castShadow
                  receiveShadow
                  position={[31.65, -0.01, -0.12]}
                  rotation={[-0.12, 0, 0]}
                  scale={[1, 0.99, 1]}
                />
                <mesh
                  name="Cube 2"
                  geometry={nodes["Cube 2"].geometry}
                  material={materials.Eyes}
                  castShadow
                  receiveShadow
                  position={[-31.65, 0.01, 0.12]}
                  rotation={[-0.12, 0, 0]}
                  scale={[1, 0.99, 1]}
                />
              </group>
              <mesh
                name="Nose"
                geometry={nodes.Nose.geometry}
                material={materials["Nose Material"]}
                castShadow
                receiveShadow
                position={[2.31, -5.55, 91.94]}
                rotation={[-0.23, 0, 0]}
                scale={[1.02, 1.55, 1.02]}
              />
              <mesh
                name="Cube1"
                geometry={nodes.Cube1.geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[0.16, 5.11, 35.97]}
                scale={[1, 1, 0.82]}
              />
            </group>
          </group>
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
          />
        </scene>
      </group>
    </>
  );
}
