import ContactPage from '../components/contact';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Contact() {
  const router = useRouter();
  
  useEffect(() => {
    // Ensure this page is loaded independently
    if (window.opener) {
      window.opener = null;
    }
    
    // Clean up any existing routes
    const handleRouteChange = () => {
      router.events.emit('routeChangeComplete', router.asPath);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  
  return (
    <div className="min-h-screen bg-black relative isolate">
      <ContactPage />
    </div>
  );
} 