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
      {/* Overlay escuro para melhorar legibilidade em toda a página */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/80 z-10" />
      
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

    </div>
  );
}

