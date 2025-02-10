import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import OpenAnimation from "../components/openanimation";
import LaptopProduct from "../pages/laptopProduct";
import LenovoProduct from "../pages/lenovoproduct";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AcerPredatorPage from "../pages/AcerPredatorPage";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <OpenAnimation />
      <LaptopProduct />
      <LenovoProduct />
      <AcerPredatorPage />
      <Footer />
    </>
  );
}
