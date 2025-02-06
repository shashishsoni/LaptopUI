// src/app/layout.tsx
import React from 'react';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import './globals.css'; // Import global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}