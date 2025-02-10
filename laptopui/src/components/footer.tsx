import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SocialLink = ({ icon, label, link, theta, phi, radius }: {
  icon: string;
  label: string;
  link: string;
  theta: number;
  phi: number;
  radius: number;
}) => {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute left-1/2 top-1/2 group"
      style={{
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateX(${z * 0.1}deg)`,
        transformStyle: 'preserve-3d',
        zIndex: Math.round(z + 1000),
      }}
    >
      <div className="relative p-5 rounded-full backdrop-blur-md
        bg-gradient-to-br from-white/10 to-white/5 border border-white/20 
        hover:border-cyan-500/50 transition-all duration-500
        hover:scale-125 shadow-lg shadow-cyan-500/5
        hover:shadow-cyan-500/20 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-blue-500/20">
        <span className="relative z-10 text-2xl transform group-hover:scale-110 transition-transform">{icon}</span>
        
        <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 opacity-0 group-hover:opacity-100
          transition-all duration-300 whitespace-nowrap scale-0 group-hover:scale-100">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md 
            px-4 py-2 rounded-full border border-white/20 text-sm text-white">
            {label}
          </div>
        </div>
      </div>
    </a>
  );
};

const SphereContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const socialLinks = [
    { icon: "👾", label: "GitHub", link: "https://github.com/shashishsoni" },
    { icon: "💼", label: "LinkedIn", link: "https://www.linkedin.com/in/shashishsoni/" },
    { icon: "📧", label: "Email", link: "shshshsoni2003@gmail.com" },
    { icon: "🐦", label: "Twitter", link: "https://twitter.com/shashishsoni" },
    { icon: "📸", label: "Instagram", link: "https://www.instagram.com/_shashish_soni_/" },
    { icon: "🎮", label: "Discord", link: "https://discord.com/users/696428315728150578" },
    { icon: "📱", label: "Telegram", link: "https://t.me/shashishsoni" },
    { icon: "📺", label: "YouTube", link: "https://youtube.com/@yourusername" },
    { icon: "📝", label: "Blog", link: "https://yourblog.com" },
    { icon: "🎨", label: "Portfolio", link: "https://portfolioweb-self-eta.vercel.app/" },
    { icon: "🎵", label: "Spotify", link: "https://open.spotify.com/user/yourusername" },
    { icon: "📚", label: "Medium", link: "https://medium.com/@yourusername" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      rotateY: 360,
      duration: 40,
      repeat: -1,
      ease: "none"
    });

    gsap.to(container, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="relative w-[600px] h-[600px] perspective-2000">
      <div ref={containerRef} className="relative w-full h-full transform-style-3d">
        {socialLinks.map((link, i) => {
          const total = socialLinks.length;
          const y = 1 - (i / (total - 1)) * 2;
          const radius = Math.sqrt(1 - y * y);
          const theta = (i * Math.PI * (3 - Math.sqrt(5)));
          const phi = Math.acos(y);

          return (
            <SocialLink
              key={i}
              {...link}
              theta={theta}
              phi={phi}
              radius={250}
            />
          );
        })}

        {/* Center Sphere */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                inset: `${i * 4}px`,
                background: `radial-gradient(circle at 30% 30%, 
                  rgba(34, 211, 238, ${0.15 - i * 0.02}) 0%, 
                  rgba(56, 189, 248, ${0.08 - i * 0.01}) 50%, 
                  rgba(0, 0, 0, 0) 100%)`,
                border: `1px solid rgba(255, 255, 255, ${0.15 - i * 0.02})`,
                backdropFilter: 'blur(8px)',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.1)_0%,transparent_60%)]" />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-blue-950/10" />
        {/* Animated Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center">
        <div className="container mx-auto px-4">
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
          </div>

          {/* Sphere Container */}
          <div className="flex justify-center mb-16">
            <SphereContainer />
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center max-w-5xl mx-auto border-t border-white/10 pt-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                LaptopUI
              </span>
            </div>
            <div className="text-white/40 text-sm">
              © 2025 Shashish Soni. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;