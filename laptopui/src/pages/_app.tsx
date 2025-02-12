import "@/styles/globals.css";
import type { AppProps } from "next/app";
import BrowserRouter from '../components/BrowserRouter';
import Navbar from '../components/navbar';
import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import PersistLogin from '../components/PersistLogin';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showProducts = router.pathname === '/';

  return (
    <Provider store={store}>
      <PersistLogin />
      <BrowserRouter>
        <Navbar />
        <MainLayout showProducts={showProducts}>
          <Component {...pageProps} />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
