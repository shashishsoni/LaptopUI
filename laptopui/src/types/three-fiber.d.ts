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
    mesh: THREE.Mesh;
    primitive: { object: THREE.Object3D } & JSX.IntrinsicElements['primitive'];
    pointLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    group: THREE.Group;
  }
} 