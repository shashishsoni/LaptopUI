export interface LenovoProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  specs: string[];
  images: string[];
  video?: string;
  price: string;
  performance: {
    label: string;
    value: string;
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
    graphics: ConfigCategory;
    memory: ConfigCategory;
    storage: ConfigCategory;
    display: ConfigCategory;
  };
}

interface ConfigCategory {
  name: string;
  required: boolean;
  options: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
}

export const lenovoProducts: LenovoProduct[] = [
  {
    id: 5,
    name: "Legion Pro 7i",
    category: "Gaming",
    description: "Ultimate gaming performance with next-gen cooling",
    specs: [
      "Intel i9-13980HX",
      "RTX 4090 16GB",
      "32GB DDR5",
      "2TB NVMe SSD",
      "16\" 240Hz Mini-LED",
      "LA AI Chip"
    ],
    images: [
      "/image/lov.jpg",
      "/image/legion-bg-2.jpg",
      "/image/legion-bg-3.jpg",
      "/image/lov4.jpeg"
    ],
    video: "/video/levono.mp4",
    price: "$2,999",
    performance: [
      { label: "Gaming", value: "Exceptional" },
      { label: "Productivity", value: "Excellent" }
    ],
    configurations: {
      processor: {
        name: "Processor",
        required: true,
        options: [
          {
            id: "base",
            name: "Intel i7-13700HX",
            price: 0,
            description: "16 Cores, 24 Threads, Up to 5.0GHz"
          },
          {
            id: "i9-13900HX",
            name: "Intel i9-13900HX",
            price: 300,
            description: "24 Cores, 32 Threads, Up to 5.4GHz"
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
            description: "16GB GDDR6X, Ray Tracing"
          },
          {
            id: "rtx4090",
            name: "NVIDIA RTX 4090",
            price: 500,
            description: "24GB GDDR6X, Ultimate Performance"
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
            description: "5600MHz Dual Channel"
          },
          {
            id: "64gb",
            name: "64GB DDR5",
            price: 400,
            description: "6400MHz Dual Channel"
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
            description: "PCIe Gen4 Performance"
          },
          {
            id: "4tb",
            name: "4TB RAID 0",
            price: 600,
            description: "2x 2TB NVMe SSDs"
          }
        ]
      },
      display: {
        name: "Display",
        required: true,
        options: [
          {
            id: "base",
            name: '16" Mini-LED 240Hz',
            price: 0,
            description: "2560x1600, HDR 1000"
          },
          {
            id: "4k",
            name: '16" 4K Mini-LED',
            price: 400,
            description: "3840x2400, HDR 1600"
          }
        ]
      }
    }
  },
];