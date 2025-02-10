export interface Laptop {
  id: string;
  brand: string;
  model: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    gpu: string;
    display: string;
  };
  images: string[];
  inStock: boolean;
  description: string;
}
