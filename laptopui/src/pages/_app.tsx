import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from "../components/navbar";
import OpenAnimation from "../components/openanimation";
import LaptopProduct from "../pages/laptopProduct";
import LenovoProduct from "../pages/lenovoproduct";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AcerPredatorPage from "../pages/AcerPredatorPage";
import Footer from "../components/footer";
import { useRouter } from 'next/router';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = ['/login', '/signup'].includes(router.pathname);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        {isAuthPage ? (
          <Component {...pageProps} />
        ) : (
          <div className="min-h-screen bg-black">
            <Navbar />
            <main className="w-full">
              <Component {...pageProps} />
            </main>
            <OpenAnimation />
            <LaptopProduct />
            <LenovoProduct />
            <AcerPredatorPage />
            <Footer />
          </div>
        )}
      </ErrorBoundary>
    </Provider>
  );
}