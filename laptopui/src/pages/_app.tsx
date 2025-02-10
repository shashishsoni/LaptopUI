import "@/styles/globals.css";
import type { AppProps } from "next/app";
import BrowserRouter from '../components/BrowserRouter';
import Navbar from '../components/navbar';
import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showProducts = router.pathname === '/';

  return (
    <BrowserRouter>
      <Navbar />
      <MainLayout showProducts={showProducts}>
        <Component {...pageProps} />
      </MainLayout>
    </BrowserRouter>
  );
}
