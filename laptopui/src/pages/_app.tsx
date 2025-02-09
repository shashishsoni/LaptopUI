import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import OpenAnimation from "../components/openanimation";
import LaptopProduct from "../components/laptopProduct";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <OpenAnimation />
      <LaptopProduct />
    </>
  );
}
