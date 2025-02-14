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
  
  export const razerProducts: RazerProduct[] = [
    {
      id: 10,
      name: "Razer Blade 16",
      category: "Gaming",
      description: "The ultimate gaming laptop with desktop-grade performance",
      specs: [
        "Intel i9-13950HX",
        "RTX 4090 16GB",
        "64GB DDR5",
        "4TB NVMe SSD",
        "16\" 240Hz OLED",
        "Vapor Chamber"
      ],
      images: ["/image/razer1.webp", "/image/razer2.jpg", "/image/razer3.jpg", "/image/razer4.jpg"],
      video: "/videos/razer.mp4",
      price: "$3,499",
      performance: [
        { label: "Gaming Performance", value: "99%" },
        { label: "Ray Tracing", value: "95%" },
        { label: "Content Creation", value: "97%" },
        { label: "Thermal Efficiency", value: "94%" },
        { label: "Battery Life", value: "92%" }
      ],
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
          title: "Chroma RGB",
          description: "Per-key RGB with 16.8M colors",
          icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        },
        {
          title: "THX Spatial Audio",
          description: "360° immersive gaming audio",
          icon: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l3.182-3.182M5.586 8.464L2.404 5.282m0 13.436l3.182-3.182M18.314 18.718l3.182 3.182M12 12h.01"
        },
        {
          title: "NVIDIA DLSS 3",
          description: "AI-powered performance boost",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      configurations: {
        processor: {
          name: "Processor",
          required: true,
          options: [
            {
              id: "base",
              name: "Intel Core i9-13950HX",
              price: 0,
              description: "24 Cores, Up to 5.5GHz"
            },
            {
              id: "i9-14900HX",
              name: "Intel Core i9-14900HX",
              price: 600,
              description: "32 Cores, Up to 5.8GHz"
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
    }
  ];