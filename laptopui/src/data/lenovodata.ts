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
}

export const lenovoProducts: LenovoProduct[] = [
  {
    id: 1,
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
    ]
  },
];