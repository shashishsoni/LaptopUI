import LaptopConfigure from '../../components/laptopconfigure';
import { asusLaptops } from '../../data/asusdata';
import { lenovoProducts } from '../../data/lenovodata';
import { msiProducts } from '../../data/msidata';
import { alienwareLaptops } from '../../data/alienwaresdata';
import { acerProducts } from '../../data/AcerData';
import { razerProducts } from '../../data/razerdata';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { LaptopProduct } from '../../types/global';
import { NextPage } from 'next';

export async function getStaticPaths() {
  // Combine all laptop IDs from different brands
  const allLaptops = [
    ...asusLaptops,
    ...lenovoProducts,
    ...msiProducts,
    ...alienwareLaptops,
    ...acerProducts,
    ...razerProducts
  ];

  const paths = allLaptops.map(laptop => ({
    params: { laptopId: laptop.id.toString() }
  }));

  return {
    paths,
    fallback: false // Show 404 for non-existent IDs
  };
}

export async function getStaticProps({ params }: { params: { laptopId: string } }) {
  const laptopId = params?.laptopId;
  const allLaptops = [
    ...asusLaptops,
    ...lenovoProducts,
    ...msiProducts,
    ...alienwareLaptops,
    ...acerProducts,
    ...razerProducts
  ];

  const laptop = allLaptops.find(l => l.id.toString() === laptopId);

  if (!laptop) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      laptop
    }
  };
}

interface ConfigurePageProps {
  laptop: LaptopProduct;
}

const ConfigurePage: NextPage<ConfigurePageProps> = ({ laptop }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Handle navigation events
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Force a refresh when using browser back/forward
    window.addEventListener('popstate', () => {
      window.location.reload();
    });

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!laptop) return null;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`Configure ${laptop.brand} ${laptop.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="cache-control" content="no-cache" />
        <meta name="expires" content="0" />
        <meta name="pragma" content="no-cache" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
        <main className="w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <LaptopConfigure laptop={laptop} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ConfigurePage; 