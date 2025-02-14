// src/types/global.d.ts
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group, Scene, Camera } from 'three';

declare module 'three/examples/jsm/loaders/GLTFLoader' {
    export interface GLTF {
        scene: Group;
        scenes: Group[];
        animations: THREE.AnimationClip[];
        cameras: Camera[];
        asset: {
            version: string;
            generator: string;
            copyright?: string;
        };
    }

    export class GLTFLoader extends Loader {
        load(
            url: string,
            onLoad: (gltf: GLTF) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
    }
}

declare global {
  interface Window {
    // Define specific types instead of any
    threejs: {
      renderer: THREE.WebGLRenderer;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
    };
  }
}

export {};