import { Environment, ContactShadows, useCursor } from "@react-three/drei";
import Man from "./Man";
import { useAtom } from "jotai";
import { charactersAtom, socketIdAtom } from "./SocketManager";
import Classroom from "./Classroom";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { socket } from "./SocketManager";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [socketId] = useAtom(socketIdAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  const { camera } = useThree();
  const localCharacterRef = useRef(null);

  const cameraOffset = new THREE.Vector3(0, 8, 25);
  const cameraLookAtOffset = new THREE.Vector3(0, 1.5, 0);

  useFrame(() => {
    const localCharacterData = characters.find((char) => char.id === socketId);

    if (localCharacterData && localCharacterRef.current) {
      const characterPosition = localCharacterRef.current.position;

      const targetCameraPosition = characterPosition.clone().add(cameraOffset);
      camera.position.lerp(targetCameraPosition, 0.05);

      const targetLookAt = characterPosition.clone().add(cameraLookAtOffset);
      camera.lookAt(targetLookAt);
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />

      <Classroom position={[0, 0, 0]} scale={[1, 1, 1]} />

      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[69, 115]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character) => (
        <Man
          key={character.id}
          id={character.id}
          initialPosition={character.position}
          targetPosition={character.position}
          localSocketId={socketId}
          ref={character.id === socketId ? localCharacterRef : undefined}
        />
      ))}

      <ContactShadows
        position={[0, 0, 0]}
        opacity={1}
        scale={120}   // Increased scale for wider shadow coverage
        blur={0.85}
        far={200}    // Increased far for longer shadow reach
      />
    </>
  );
};

export default Experience;