import OpenAnimation from "./openanimation";
import LaptopProduct from "../pages/laptopProduct";
import LenovoProduct from "../pages/lenovoproduct";
import AcerPredatorPage from "../pages/AcerPredatorPage";
import Footer from "./footer";
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  showProducts?: boolean;
}

const MainLayout = ({ children, showProducts = false }: MainLayoutProps) => {
  const router = useRouter();
  const hideFooter = ['/login', '/signup'].includes(router.pathname);

  return (
    <AnimatePresence mode="wait">
      <div key={router.pathname}>
        {children}
        {showProducts && (
          <>
            <OpenAnimation />
            <LaptopProduct />
            <LenovoProduct />
            <AcerPredatorPage />
          </>
        )}
        {!hideFooter && <Footer />}
      </div>
    </AnimatePresence>
  );
};

export default MainLayout; 