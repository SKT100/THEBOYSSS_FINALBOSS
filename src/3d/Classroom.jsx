import { useGLTF } from "@react-three/drei";

export default function Classroom(props) {
  const { scene } = useGLTF("/models/Classroom.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/Classroom.glb");