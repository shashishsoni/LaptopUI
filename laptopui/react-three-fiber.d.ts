// src/react-three-fiber.d.ts
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      spotLight: ReactThreeFiber.Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    }
  }
}