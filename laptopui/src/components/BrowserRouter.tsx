import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routes } from '../routes/routes';

interface BrowserRouterProps {
  children: React.ReactNode;
}

const BrowserRouter = ({ children }: BrowserRouterProps) => {
  const router = useRouter();

  useEffect(() => {
    // Add loading state
    const handleStart = () => {
      document.body.style.cursor = 'wait';
    };
    
    const handleComplete = () => {
      document.body.style.cursor = 'default';
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return <>{children}</>;
};

export default BrowserRouter; 