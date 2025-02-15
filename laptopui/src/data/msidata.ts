import { LenovoProduct } from './lenovodata';

export const msiProducts: LenovoProduct[] = [
  {
    id: 7, // Unique ID for MSI laptop
    name: "MSI Titan GT77",
    category: "Gaming",
    description: "Ultimate gaming laptop with desktop-grade performance",
    specs: [
      "Intel i9-13980HX",
      "RTX 4090 16GB",
      "64GB DDR5",
      "4TB NVMe SSD",
      "17.3\" 4K 144Hz",
      "Cooler Boost"
    ],
    images: ["/image/msi.jpg", "/image/msi1.jpg", "/image/msi2.webp", "/image/msi3.png"],
    price: "$3,799",
    performance: [
      { label: "Gaming", value: "Ultimate" },
      { label: "Content Creation", value: "Exceptional" }
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
            price: 400,
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
            name: '17.3" QHD 240Hz',
            price: 0,
            description: "2560x1440, HDR 600"
          },
          {
            id: "4k",
            name: '17.3" 4K 144Hz',
            price: 400,
            description: "3840x2160, HDR 1000"
          }
        ]
      }
    },
    cloudinaryVideo: "ofnnqpb7goul8eqa6ykk"
  }
];
