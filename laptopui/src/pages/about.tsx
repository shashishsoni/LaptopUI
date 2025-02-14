import AboutPage from '../components/aboutpage';
import { useEffect } from 'react';

export default function About() {
  
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