export interface LaptopProduct {
  id: number;
  category: string;
  brand: string;
  name: string;
  description: string;
  images: string[];
  video: string;
  price: string;
  specs: {
    title: string;
    value: string;
    icon: string;
  }[];
}

export const asusLaptops: LaptopProduct[] = [
  {
    id: 1,
    category: "Gaming",
    brand: "ASUS ROG",
    name: "ROG Strix SCAR 17",
    description: "Experience next-level gaming with our most powerful laptop ever.",
    images: ["/image/asus1.webp", "/image/asus2.jpg", "/image/asus3.jpg", "/image/asus4.png"],
    video: "/video/asusvideo.mp4",
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
  },
  {
    id: 2,
    category: "Premium",
    brand: "ASUS Zenbook",
    name: "Zenbook S 16 OLED",
    description: "Experience luxury computing with the world's thinnest 16-inch OLED laptop.",
    images: ["/image/zen1.webp", "/image/zen2.webp", "/image/zen3.jpg", "/image/zen4.webp"],
    video: "/video/zenbook.mp4",
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
  },
  {
    id: 3,
    category: "Business",
    brand: "ASUS ExpertBook",
    name: "ExpertBook B9",
    description: "Ultra-lightweight business laptop for the modern professional.",
    images: ["/image/exp1.jpg", "/image/exp2.avif", "/image/exp3.webp", "/image/exp4.jpg"],
    video: "/video/expert.mp4",
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
  },
  {
    id: 4,
    category: "Premium",
    brand: "ASUS Zenbook",
    name: "Zenbook S 16 OLED",
    description: "Experience luxury computing with the world's thinnest 16-inch OLED laptop.",
    images: ["/image/zen1.webp", "/image/zen2.webp", "/image/zen3.jpg", "/image/zen4.webp"],
    video: "/video/zenbook.mp4",
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
  }
];