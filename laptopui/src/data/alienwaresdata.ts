export interface AlienwareProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  specs: string[];
  images: string[];
  video?: string;
  price: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  performance: {
    label: string;
    value: string;
  }[];
}

export const alienwareLaptops: AlienwareProduct[] = [
  {
    id: 1,
    name: "Alienware x17 R2",
    category: "Elite Gaming",
    description: "Experience otherworldly performance with our most powerful gaming laptop ever.",
    specs: [
      "Intel i9-12900HK",
      "NVIDIA RTX 3080 Ti 16GB",
      "64GB DDR5 4800MHz",
      "4TB NVMe SSD RAID0",
      "17.3\" UHD 120Hz",
      "Advanced Cooling"
    ],
    images: [
      "/image/alienware-1.webp",
      "/image/alienware-2.jpg",
      "/image/alienware-3.jpg",
      "/image/alienware-4.png"
    ],
    video: "/video/alienware.mp4",
    price: "$3,499",
    features: [
      {
        title: "Cryo-tech Cooling",
        description: "Element 31 thermal interface material and quad fans",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      },
      {
        title: "AlienFX RGB",
        description: "Customizable per-key RGB lighting with 16.8M colors",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      },
      {
        title: "Legend 2.0 Design",
        description: "Premium build with advanced thermal architecture",
        icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      },
      {
        title: "Dolby Vision",
        description: "4K UHD display with 120Hz refresh rate",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      }
    ],
    performance: [
      { label: "Gaming", value: "100%" },
      { label: "Ray Tracing", value: "98%" },
      { label: "4K Gaming", value: "95%" },
      { label: "Thermal Efficiency", value: "92%" }
    ]
  },
  {
    id: 2,
    name: "Alienware m15 R7",
    category: "Performance Gaming",
    description: "Compact powerhouse delivering desktop-class gaming performance.",
    specs: [
      "AMD Ryzen 9 6900HX",
      "NVIDIA RTX 3070 Ti 8GB",
      "32GB DDR5 4800MHz",
      "2TB NVMe SSD",
      "15.6\" QHD 240Hz",
      "Cryo-tech Cooling"
    ],
    images: [
      "/image/alienware-m15-1.webp",
      "/image/alienware-m15-2.jpg",
      "/image/alienware-m15-3.jpg",
      "/image/alienware-m15-4.png"
    ],
    video: "/video/alienware-m15.mp4",
    price: "$2,299",
    features: [
      {
        title: "AMD Advantage",
        description: "Smart technologies for optimal gaming performance",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
      },
      {
        title: "Comfort Edge",
        description: "Ergonomic design with improved keyboard",
        icon: "M12 4v16m8-8H4"
      },
      {
        title: "Dynamic Display",
        description: "QHD display with AMD FreeSync Premium",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      },
      {
        title: "Command Center",
        description: "Advanced system control and monitoring",
        icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      }
    ],
    performance: [
      { label: "Gaming", value: "95%" },
      { label: "Content Creation", value: "90%" },
      { label: "Thermal Control", value: "88%" },
      { label: "Battery Life", value: "85%" }
    ]
  }
];
