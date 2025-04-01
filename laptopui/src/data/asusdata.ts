export interface LaptopProduct {
  id: number;
  category: string;
  brand: string;
  name: string;
  description: string;
  images: string[];
  cloudinaryVideo?: string;
  price: string;
  specs: {
    title: string;
    value: string;
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

export const asusLaptops: LaptopProduct[] = [
  {
    id: 1,
    category: "Gaming",
    brand: "ASUS ROG",
    name: "ROG Strix SCAR 17",
    description: "Experience next-level gaming with our most powerful laptop ever.",
    images: ["/image/asus1.webp", "/image/asus2.jpg", "/image/asus3.jpg", "/image/asus4.png"],
    cloudinaryVideo: "https://ucarecdn.com/c22489ed-db43-459c-9c88-ca65dbc9d757/asusvideo.mp4",
    price: "$2,499",
    specs: [
      {
        title: 'Processor',
        value: 'Intel i9-13980HX',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
      {
        title: 'Graphics',
        value: 'NVIDIA RTX 4090',
        icon: 'M12 2l7 7-7 7-7-7 7-7zm0 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
      },
      {
        title: 'Memory',
        value: '64GB DDR5',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
      {
        title: 'Storage',
        value: '2TB NVMe SSD',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
    ],
    configurations: {
      processor: {
        name: 'Processor',
        required: true,
        options: [
          {
            id: 'base',
            name: 'Intel i9-13980HX',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'Intel Core i9-13980HX OC',
            price: 300,
            description: 'Ultimate Performance with Overclocking'
          },
          {
            id: 'i7-13700H',
            name: 'Intel Core i7-13700H',
            price: 200,
            description: '14 Cores, 20 Threads, Up to 5.0GHz'
          },
          {
            id: 'i9-13900HX',
            name: 'Intel Core i9-13900HX',
            price: 450,
            description: '24 Cores, 32 Threads, Up to 5.4GHz'
          },
          {
            id: 'ryzen-9-7945HX',
            name: 'AMD Ryzen 9 7945HX',
            price: 400,
            description: '16 Cores, 32 Threads, Up to 5.4GHz'
          }
        ]
      },
      graphics: {
        name: 'Graphics',
        required: true,
        options: [
          {
            id: 'base',
            name: 'NVIDIA RTX 4090',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'NVIDIA RTX 4090 OC',
            price: 500,
            description: 'Factory Overclocked for Maximum Gaming Performance'
          },
          {
            id: 'rtx-4070',
            name: 'NVIDIA RTX 4070',
            price: 300,
            description: '8GB GDDR6, Advanced Ray Tracing, DLSS 3.0'
          },
          {
            id: 'rtx-4080',
            name: 'NVIDIA RTX 4080',
            price: 600,
            description: '12GB GDDR6X, Premium Ray Tracing, DLSS 3.0'
          },
          {
            id: 'rtx-4090',
            name: 'NVIDIA RTX 4090',
            price: 1200,
            description: '16GB GDDR6X, Ultimate Performance, DLSS 3.0'
          }
        ]
      },
      memory: {
        name: 'Memory',
        required: true,
        options: [
          {
            id: 'base',
            name: '64GB DDR5',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '128GB DDR5',
            price: 200,
            description: 'More RAM for multitasking'
          },
          {
            id: '32gb-5200',
            name: '32GB DDR5',
            price: 150,
            description: '5200MHz Dual Channel'
          },
          {
            id: '64gb-5600',
            name: '64GB DDR5',
            price: 300,
            description: '5600MHz Dual Channel'
          }
        ]
      },
      storage: {
        name: 'Storage',
        required: true,
        options: [
          {
            id: 'base',
            name: '2TB NVMe SSD',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4TB NVMe SSD',
            price: 500,
            description: 'More storage for all your files'
          },
          {
            id: '1tb-nvme',
            name: '1TB NVMe SSD',
            price: 100,
            description: 'PCIe 4.0, 7000MB/s Read'
          },
          {
            id: '2tb-nvme',
            name: '2TB NVMe SSD',
            price: 250,
            description: 'PCIe 4.0, 7000MB/s Read'
          },
          {
            id: '4tb-raid',
            name: '4TB RAID 0',
            price: 600,
            description: '2x 2TB NVMe SSDs, 14000MB/s Read'
          }
        ]
      },
      display: {
        name: 'Display',
        required: true,
        options: [
          {
            id: 'base',
            name: '3.2K OLED HDR',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4K OLED HDR',
            price: 500,
            description: 'Higher resolution for a more immersive experience'
          },
          {
            id: 'qhd-240hz',
            name: '17.3" QHD 240Hz',
            price: 200,
            description: '2560x1440, 100% DCI-P3, G-SYNC'
          },
          {
            id: '4k-120hz',
            name: '17.3" 4K 120Hz',
            price: 400,
            description: '3840x2160, HDR 1000, 100% DCI-P3'
          },
          {
            id: '4k-mini-led',
            name: '17.3" 4K Mini LED',
            price: 800,
            description: '3840x2160, HDR 1600, ROG Nebula'
          }
        ]
      },
    },
  },
  {
    id: 2,
    category: "Premium",
    brand: "ASUS Zenbook",
    name: "Zenbook S 16 OLED",
    description: "Experience luxury computing with the world's thinnest 16-inch OLED laptop.",
    images: ["/image/zen1.webp", "/image/zen2.webp", "/image/zen3.jpg", "/image/zen4.webp"],
    cloudinaryVideo: "https://ucarecdn.com/fc482217-e090-4041-868e-cab0d25e3fb5/zenbook.mp4",
    price: "$1,999",
    specs: [
      {
        title: 'Processor',
        value: 'Intel i7-13700H',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
      {
        title: 'Display',
        value: '3.2K OLED HDR',
        icon: 'M12 2l7 7-7 7-7-7 7-7zm0 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
      },
      {
        title: 'Design',
        value: '12.9mm Thin',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
      {
        title: 'Battery',
        value: '96Wh Long Life',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
    ],
    configurations: {
      processor: {
        name: 'Processor',
        required: true,
        options: [
          {
            id: 'base',
            name: 'Intel i7-13700H',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'Intel Core i7-13700H OC',
            price: 200,
            description: 'Ultimate Performance with Overclocking'
          }
        ]
      },
      graphics: {
        name: 'Graphics',
        required: true,
        options: [
          {
            id: 'base',
            name: 'NVIDIA RTX 4090',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'NVIDIA RTX 4090 OC',
            price: 500,
            description: 'Factory Overclocked for Maximum Gaming Performance'
          }
        ]
      },
      memory: {
        name: 'Memory',
        required: true,
        options: [
          {
            id: 'base',
            name: '64GB DDR5',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '128GB DDR5',
            price: 200,
            description: 'More RAM for multitasking'
          }
        ]
      },
      storage: {
        name: 'Storage',
        required: true,
        options: [
          {
            id: 'base',
            name: '2TB NVMe SSD',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4TB NVMe SSD',
            price: 500,
            description: 'More storage for all your files'
          }
        ]
      },
      display: {
        name: 'Display',
        required: true,
        options: [
          {
            id: 'base',
            name: '3.2K OLED HDR',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4K OLED HDR',
            price: 500,
            description: 'Higher resolution for a more immersive experience'
          }
        ]
      },
    },
  },
  {
    id: 3,
    category: "Business",
    brand: "ASUS ExpertBook",
    name: "ExpertBook B9",
    description: "Ultra-lightweight business laptop for the modern professional.",
    images: ["/image/exp1.jpg", "/image/exp2.avif", "/image/exp3.webp", "/image/exp4.jpg"],
    cloudinaryVideo: "https://ucarecdn.com/f2a73b6a-c387-4062-9863-2ead6cc94bf1/expertbook.mp4",
    price: "$1,799",
    specs: [
      {
        title: 'Processor',
        value: 'Intel i7-1355U',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
      {
        title: 'Battery',
        value: '16 Hours',
        icon: 'M12 2l7 7-7 7-7-7 7-7zm0 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
      },
      {
        title: 'Weight',
        value: '880g',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
      {
        title: 'Security',
        value: 'TPM 2.0',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
    ],
    configurations: {
      processor: {
        name: 'Processor',
        required: true,
        options: [
          {
            id: 'base',
            name: 'Intel i7-1355U',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'Intel Core i7-1355U OC',
            price: 200,
            description: 'Ultimate Performance with Overclocking'
          }
        ]
      },
      graphics: {
        name: 'Graphics',
        required: true,
        options: [
          {
            id: 'base',
            name: 'NVIDIA RTX 4090',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'NVIDIA RTX 4090 OC',
            price: 500,
            description: 'Factory Overclocked for Maximum Gaming Performance'
          }
        ]
      },
      memory: {
        name: 'Memory',
        required: true,
        options: [
          {
            id: 'base',
            name: '16GB DDR5',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '32GB DDR5',
            price: 200,
            description: 'More RAM for multitasking'
          }
        ]
      },
      storage: {
        name: 'Storage',
        required: true,
        options: [
          {
            id: 'base',
            name: '1TB NVMe SSD',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '2TB NVMe SSD',
            price: 500,
            description: 'More storage for all your files'
          }
        ]
      },
      display: {
        name: 'Display',
        required: true,
        options: [
          {
            id: 'base',
            name: '3.2K OLED HDR',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4K OLED HDR',
            price: 500,
            description: 'Higher resolution for a more immersive experience'
          }
        ]
      },
    },
  },
  {
    id: 4,
    category: "Premium",
    brand: "ASUS Zenbook",
    name: "Zenbook S 16 OLED",
    description: "Experience luxury computing with the world's thinnest 16-inch OLED laptop.",
    images: ["/image/zen1.webp", "/image/zen2.webp", "/image/zen3.jpg", "/image/zen4.webp"],
    cloudinaryVideo: "laptopui/asusvideo",
    price: "$1,999",
    specs: [
      {
        title: 'Processor',
        value: 'Intel i7-13700H',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
      {
        title: 'Display',
        value: '3.2K OLED HDR',
        icon: 'M12 2l7 7-7 7-7-7 7-7zm0 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
      },
      {
        title: 'Design',
        value: '12.9mm Thin',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
      {
        title: 'Battery',
        value: '96Wh Long Life',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      },
    ],
    configurations: {
      processor: {
        name: 'Processor',
        required: true,
        options: [
          {
            id: 'base',
            name: 'Intel i7-13700H',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'Intel Core i7-13700H OC',
            price: 200,
            description: 'Ultimate Performance with Overclocking'
          }
        ]
      },
      graphics: {
        name: 'Graphics',
        required: true,
        options: [
          {
            id: 'base',
            name: 'NVIDIA RTX 4090',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: 'NVIDIA RTX 4090 OC',
            price: 500,
            description: 'Factory Overclocked for Maximum Gaming Performance'
          }
        ]
      },
      memory: {
        name: 'Memory',
        required: true,
        options: [
          {
            id: 'base',
            name: '64GB DDR5',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '128GB DDR5',
            price: 200,
            description: 'More RAM for multitasking'
          }
        ]
      },
      storage: {
        name: 'Storage',
        required: true,
        options: [
          {
            id: 'base',
            name: '2TB NVMe SSD',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4TB NVMe SSD',
            price: 500,
            description: 'More storage for all your files'
          }
        ]
      },
      display: {
        name: 'Display',
        required: true,
        options: [
          {
            id: 'base',
            name: '3.2K OLED HDR',
            price: 0,
            description: 'Base Configuration'
          },
          {
            id: 'premium',
            name: '4K OLED HDR',
            price: 500,
            description: 'Higher resolution for a more immersive experience'
          }
        ]
      },
    },
  }
];