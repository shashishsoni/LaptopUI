import * as THREE from 'three';
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      primitive: any;
      pointLight: any;
      ambientLight: any;
      group: any;
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