// src/types/global.d.ts
import type { GLTF as GLTFType } from 'three/examples/jsm/loaders/GLTFLoader';
import type * as THREE from 'three';

declare module 'three/examples/jsm/loaders/GLTFLoader' {
    export interface GLTF extends GLTFType {
        scene: THREE.Group;
        scenes: THREE.Group[];
        animations: THREE.AnimationClip[];
        cameras: THREE.Camera[];
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

export interface LaptopProduct {
  id: number;
  brand: string;
  name: string;
  category: string;
  description: string;
  specs: {
    title: string;
    value: string;
    icon: string;
  }[];
  images: string[];
  video: string;
  price: string;
  configurations: {
    processor: {
      name: string;
      required: boolean;
      options: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
      }>;
    };
    graphics: {
      name: string;
      required: boolean;
      options: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
      }>;
    };
    memory: {
      name: string;
      required: boolean;
      options: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
      }>;
    };
    storage: {
      name: string;
      required: boolean;
      options: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
      }>;
    };
    display: {
      name: string;
      required: boolean;
      options: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
      }>;
    };
  };
}

export {};

declare module '*.mp4' {
  const src: string;
  export default src;
} 