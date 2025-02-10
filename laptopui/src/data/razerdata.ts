export interface RazerProduct {
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
  
  export const razerLaptops: RazerProduct[] = [
    {
      id: 1,
      name: "Razer Blade 16",
      category: "Elite Gaming",
      description: "The world's first dual-mode mini-LED laptop with desktop-class performance.",
      specs: [
        "Intel i9-13950HX",
        "NVIDIA RTX 4090 16GB",
        "64GB DDR5 5600MHz",
        "4TB NVMe SSD",
        "16\" Dual-Mode Display",
        "Vapor Chamber Cooling"
      ],
      images: [
        "/image/razer1.webp",
        "/image/razer2.jpg",
        "/image/razer3.jpg",
        "/image/razer4.jpg"
      ],
      video: "/video/razer.mp4",
      price: "$3,999",
      features: [
        {
          title: "Dual-Mode Display",
          description: "Switch between 4K 120Hz and FHD 240Hz",
          icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        },
        {
          title: "Vapor Chamber",
          description: "Next-gen cooling with liquid metal",
          icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        },
        {
          title: "CNC Aluminum",
          description: "Precision-crafted unibody design",
          icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        },
        {
          title: "Chroma RGB",
          description: "Per-key RGB with 16.8M colors",
          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        }
      ],
      performance: [
        { label: "Gaming", value: "100%" },
        { label: "Content Creation", value: "95%" },
        { label: "Ray Tracing", value: "98%" },
        { label: "Thermal Efficiency", value: "90%" }
      ]
    }
  ];