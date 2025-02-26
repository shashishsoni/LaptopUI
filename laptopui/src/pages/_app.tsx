import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from "../components/Navbar";
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
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = ['/login', '/signup'].includes(router.pathname);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  if (router.pathname.startsWith('/configure/')) {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Head>
          <title>LaptopUI</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <Navbar />
          {isAuthPage ? (
            <div className="pt-20">
              <Component {...pageProps} />
            </div>
          ) : (
            <>
              <main className="w-full">
                <Component {...pageProps} />
              </main>
              <OpenAnimation />
              <LaptopProduct />
              <LenovoProduct />
              <AcerPredatorPage />
              <Footer />
            </>
          )}
        </div>
      </ErrorBoundary>
    </Provider>
  );
}