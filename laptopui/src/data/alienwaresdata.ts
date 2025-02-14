import { LenovoProduct } from './lenovodata';

export interface AlienwareProduct extends LenovoProduct {
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  configurations: {
    processor: {
      name: string;
      required: boolean;
      options: {
        id: string;
        name: string;
        price: number;
        description: string;
      }[];
    };
    graphics: {
      name: string;
      required: boolean;
      options: {
        id: string;
        name: string;
        price: number;
        description: string;
      }[];
    };
    memory: {
      name: string;
      required: boolean;
      options: {
        id: string;
        name: string;
        price: number;
        description: string;
      }[];
    };
    storage: {
      name: string;
      required: boolean;
      options: {
        id: string;
        name: string;
        price: number;
        description: string;
      }[];
    };
    display: {
      name: string;
      required: boolean;
      options: {
        id: string;
        name: string;
        price: number;
        description: string;
      }[];
    };
  };
}

export const alienwareLaptops: AlienwareProduct[] = [
  {
    id: 8,
    name: "Alienware x17 R2",
    category: "Elite Gaming",
    description: "The most powerful Alienware laptop ever built",
    specs: [
      "Intel i9-13980HX",
      "NVIDIA RTX 4090",
      "64GB DDR5",
      "4TB SSD RAID 0",
      "17\" 4K 360Hz",
      "Cryo-tech"
    ],
    images: ["/image/aln1.jpg", "/image/aln2.jpg", "/image/aln3.jpg", "/image/aln4.webp"],
    video: "/videos/alnvideo.mp4",
    price: "$3,999",
    performance: [
      { label: "Gaming Performance", value: "98%" },
      { label: "CPU Speed", value: "95%" },
      { label: "GPU Power", value: "97%" },
      { label: "Cooling Efficiency", value: "94%" }
    ],
    configurations: {
      processor: {
        name: "Processor",
        required: true,
        options: [
          {
            id: "base",
            name: "Intel i9-13900HX",
            price: 0,
            description: "24 Cores, Up to 5.4GHz"
          },
          {
            id: "i9-13980HX",
            name: "Intel i9-13980HX",
            price: 500,
            description: "24 Cores, Up to 5.6GHz, Unlocked"
          }
        ]
      },
      graphics: {
        name: "Graphics",
        required: true,
        options: [
          {
            id: "base",
            name: "NVIDIA RTX 4080",
            price: 0,
            description: "16GB GDDR6X"
          },
          {
            id: "rtx4090",
            name: "NVIDIA RTX 4090",
            price: 800,
            description: "24GB GDDR6X"
          }
        ]
      },
      memory: {
        name: "Memory",
        required: true,
        options: [
          {
            id: "base",
            name: "32GB DDR5",
            price: 0,
            description: "5600MHz"
          },
          {
            id: "64gb",
            name: "64GB DDR5",
            price: 500,
            description: "6400MHz"
          }
        ]
      },
      storage: {
        name: "Storage",
        required: true,
        options: [
          {
            id: "base",
            name: "2TB NVMe SSD",
            price: 0,
            description: "PCIe Gen4"
          },
          {
            id: "4tb",
            name: "4TB RAID 0",
            price: 800,
            description: "2x 2TB NVMe"
          }
        ]
      },
      display: {
        name: "Display",
        required: true,
        options: [
          {
            id: "base",
            name: '17" QHD 240Hz',
            price: 0,
            description: "2560x1440"
          },
          {
            id: "4k",
            name: '17" 4K 360Hz',
            price: 600,
            description: "3840x2160"
          }
        ]
      }
    },
    features: [
      {
        title: "Cryo-tech Cooling",
        description: "Advanced thermal technology for maximum performance",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      },
      {
        title: "360Hz Display",
        description: "Ultra-smooth gaming with 360Hz refresh rate",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      },
      {
        title: "AlienFX RGB",
        description: "Customizable per-key RGB lighting",
        icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"
      }
    ]
  },
];
