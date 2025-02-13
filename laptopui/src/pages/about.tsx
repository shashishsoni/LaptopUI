import AboutPage from '../components/aboutpage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function About() {
  const router = useRouter();
  
  useEffect(() => {
    // Ensure this page is loaded independently
    if (window.opener) {
      window.opener = null;
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-black">
      <AboutPage />
    </div>
  );
} 