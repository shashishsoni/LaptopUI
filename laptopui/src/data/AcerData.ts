export interface AcerProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  images: string[];
  cloudinaryVideo: string;
  specs: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  performance: {
    label: string;
    value: number;
    color: string;
  }[];
  detailedSpecs: {
    category: string;
    items: {
      title: string;
      description: string;
    }[];
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

export const acerProducts: AcerProduct[] = [
  {
    id: 9,
    name: "Predator Helios 16",
    category: "Elite Gaming",
    description: "Dominate the gaming arena with the Predator Helios 16, featuring AI-powered cooling and next-gen performance in a sleek design.",
    price: "$2,499",
    images: [
      "/image/p1.jpg",
      "/image/p2.webp",
      "/image/p3.jpg",
      "/image/p4.jpg",
    ],
    specs: [
      "Intel® Core™ Ultra 9 275HX Processor",
      "NVIDIA® GeForce RTX™ 5090 Laptop GPU",
      "16\" WQXGA OLED 240Hz Display",
      "64GB DDR5-6400 RAM",
      "4TB PCIe Gen4 NVMe SSD",
      "6th Gen AeroBlade™ 3D Fans",
      "Wi-Fi 7 & Bluetooth 5.3",
      "90Wh Battery",
    ],
    features: [
      {
        icon: "❄️",
        title: "6th Gen AeroBlade™",
        description: "Advanced cooling with MagKey™ 4.0 Technology"
      },
      {
        icon: "🎯",
        title: "OLED Display",
        description: "240Hz with 100% DCI-P3 color gamut"
      },
      {
        icon: "🎮",
        title: "MagKey™ 4.0",
        description: "Customizable mechanical switches"
      },
      {
        icon: "⚡",
        title: "Wi-Fi 7",
        description: "Next-gen wireless connectivity"
      }
    ],
    performance: [
      {
        label: "Gaming Power",
        value: 98,
        color: "from-cyan-500 to-blue-500"
      },
      {
        label: "Thermal Efficiency",
        value: 95,
        color: "from-blue-500 to-cyan-500"
      },
      {
        label: "Display Quality",
        value: 96,
        color: "from-cyan-400 to-blue-400"
      },
      {
        label: "Audio Performance",
        value: 92,
        color: "from-blue-400 to-cyan-400"
      }
    ],
    detailedSpecs: [
      {
        category: "Processor Options",
        items: [
          {
            title: "Intel Core Ultra 9 275HX",
            description: "High-performance processor for demanding gaming"
          },
          {
            title: "Intel Core Ultra 7 255HX",
            description: "Balanced performance and efficiency"
          }
        ]
      },
      {
        category: "Graphics Options",
        items: [
          {
            title: "NVIDIA GeForce RTX 5090",
            description: "Top-tier graphics for ultimate gaming performance"
          },
          {
            title: "NVIDIA GeForce RTX 5070 Ti",
            description: "High-performance gaming capabilities"
          },
          {
            title: "NVIDIA GeForce RTX 5070",
            description: "Excellent gaming experience"
          }
        ]
      },
      {
        category: "Display Technology",
        items: [
          {
            title: "16\" OLED Display",
            description: "2560x1600 WQXGA, 240Hz, 100% DCI-P3, 400 nits"
          },
          {
            title: "16\" Mini LED Display",
            description: "2560x1600 WQXGA, 250Hz, Enhanced brightness"
          }
        ]
      },
      {
        category: "Memory & Storage",
        items: [
          {
            title: "RAM",
            description: "Up to 64GB DDR5-6400 for superior multitasking"
          },
          {
            title: "Storage",
            description: "Up to 4TB PCIe Gen 4 SSD"
          }
        ]
      },
      {
        category: "Connectivity",
        items: [
          {
            title: "Wireless",
            description: "Wi-Fi 7 and Bluetooth 5.3"
          },
          {
            title: "Ports",
            description: "Thunderbolt 4, USB-C 3.2 Gen 2, HDMI 2.1, USB-A, 3.5mm Audio"
          },
          {
            title: "Network",
            description: "Intel Killer Ethernet E5000B"
          }
        ]
      },
      {
        category: "Physical Specs",
        items: [
          {
            title: "Dimensions",
            description: "356.78 x 279.55 x 15.9-27.71 mm"
          },
          {
            title: "Weight",
            description: "Approximately 2.7 kg"
          },
          {
            title: "Battery",
            description: "90Wh for extended gaming sessions"
          }
        ]
      }
    ],
    configurations: {
      processor: {
        name: "Processor",
        required: true,
        options: [
          {
            id: "base",
            name: "Intel Core Ultra 7",
            price: 0,
            description: "16 Cores, Up to 5.0GHz"
          },
          {
            id: "ultra9",
            name: "Intel Core Ultra 9",
            price: 400,
            description: "24 Cores, Up to 5.6GHz"
          }
        ]
      },
      graphics: {
        name: "Graphics",
        required: true,
        options: [
          {
            id: "base",
            name: "RTX 4080",
            price: 0,
            description: "16GB GDDR6X"
          },
          {
            id: "rtx4090",
            name: "RTX 4090",
            price: 600,
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
            price: 400,
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
            name: "2TB NVMe",
            price: 0,
            description: "PCIe Gen4"
          },
          {
            id: "4tb",
            name: "4TB NVMe",
            price: 500,
            description: "RAID 0"
          }
        ]
      },
      display: {
        name: "Display",
        required: true,
        options: [
          {
            id: "base",
            name: "16\" QHD 240Hz",
            price: 0,
            description: "2560x1440"
          },
          {
            id: "4k",
            name: "16\" 4K 165Hz",
            price: 300,
            description: "3840x2160"
          }
        ]
      }
    },
    cloudinaryVideo: "qhrpppekxqbzpyz9fiht"
  }
];
