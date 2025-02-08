import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import OpenAnimation from "../components/openanimation";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <OpenAnimation />
    </>
  );
}
