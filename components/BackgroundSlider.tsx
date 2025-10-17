'use client';

import { useEffect, useState } from 'react';

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // URLs de imagens do Unsplash relacionadas a corrida de rua
  const images = [
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      
      {/* Imagens de fundo com transição */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      {/* Partículas decorativas animadas */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-300/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-blue-500/25 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-300/20 rounded-full animate-float" />
      </div>
    </div>
  );
}

