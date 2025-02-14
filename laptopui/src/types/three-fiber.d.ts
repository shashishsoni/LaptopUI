import * as THREE from 'three';
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: THREE.Mesh;
      primitive: THREE.Object3D;
      pointLight: THREE.PointLight;
      ambientLight: THREE.AmbientLight;
      group: THREE.Group;
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: JSX.IntrinsicElements['mesh'] & {
      geometry: THREE.BufferGeometry;
      material: THREE.Material | THREE.Material[];
    };
    primitive: JSX.IntrinsicElements['primitive'] & {
      object: THREE.Object3D;
    };
    group: JSX.IntrinsicElements['group'] & {
      children: React.ReactNode;
    };
  }
}