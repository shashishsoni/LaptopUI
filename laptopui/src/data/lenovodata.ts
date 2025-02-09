export interface LenovoProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  specs: string[];
  images: string[];
  video?: string;
  price: string;
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
    price: "$2,999"
  },
  {
    id: 2,
    name: "Legion Slim 7",
    category: "Portable Gaming",
    description: "Portable gaming powerhouse with premium design",
    specs: [
      "Ryzen 9 7940HS",
      "RTX 4070 8GB",
      "32GB DDR5",
      "1TB NVMe SSD",
      "16\" 240Hz OLED",
      "ColdFront 5.0"
    ],
    images: [
      "/image/legion-slim-1.webp",
      "/image/legion-slim-2.jpg",
      "/image/legion-slim-3.jpg",
      "/image/legion-slim-4.png"
    ],
    video: "/video/legion-slim.mp4",
    price: "$2,499"
  },
  {
    id: 3,
    name: "Legion Tower 7i",
    category: "Desktop",
    description: "Desktop-class gaming with unlimited potential",
    specs: [
      "Intel i9-13900K",
      "RTX 4080 16GB",
      "64GB DDR5",
      "2TB NVMe SSD",
      "700W PSU",
      "Legion Coldfront"
    ],
    images: [
      "/image/legion-tower-1.webp",
      "/image/legion-tower-2.jpg",
      "/image/legion-tower-3.jpg",
      "/image/legion-tower-4.png"
    ],
    price: "$3,499"
  }
];