export interface MSIProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  images: string[];
  video?: string;
  specs: string[];
}

export const msiProducts: MSIProduct[] = [
  {
    id: 1,
    name: "MSI Raider GE78 HX",
    category: "Premium Gaming",
    description: "Experience unrivaled gaming performance with the MSI Raider GE78 HX, featuring cutting-edge technology and premium craftsmanship.",
    price: "$3,299",
    images: [
        "/image/msi.jpg",
        "/image/msi1.jpg",
        "/image/msi2.webp",
        "/image/msi3.png",
    ],
    video: "/video/msivideo.mp4",


    specs: [
      "13th Gen Intel® Core™ i9-13980HX Processor",
      "NVIDIA® GeForce RTX™ 4090 Laptop GPU 16GB GDDR6",
      "17.3\" QHD+ (2560x1600), 240Hz Refresh Rate",
      "32GB (16GB*2) DDR5 RAM",
      "2TB NVMe PCIe Gen4x4 SSD",
      "Per-Key RGB Gaming Keyboard by SteelSeries",
      "Cooler Boost Trinity+ with 3 Fans",
      "MSI Center with Gaming Mode",
    ]
  }
];
