"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";

// Collection of verified free cultural images from Unsplash
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1722481742905-0ed15dd8d762",
    alt: "African traditional dancers",
    credit: "Natasha Kapur",
    creditUrl: "https://unsplash.com/@natasha_kapur",
    location: "West Africa",
  },
  {
    url: "https://images.unsplash.com/photo-1718996952496-272107d87749",
    alt: "Traditional Ghanaian drums",
    credit: "Nataliya Melnychuk",
    creditUrl: "https://unsplash.com/@nataliamelnychuk",
    location: "Ghana",
  },
  {
    url: "https://images.unsplash.com/photo-1550835002-8621fdda0461",
    alt: "Ghanaian market with colorful fabrics",
    credit: "Kofi Okyere",
    creditUrl: "https://unsplash.com/@kofiokyere",
    location: "Accra, Ghana",
  },
  {
    url: "https://images.unsplash.com/photo-1642600887226-0163d337f9f4",
    alt: "Traditional African masks",
    credit: "Wengang Zhai",
    creditUrl: "https://unsplash.com/@wgzhai",
    location: "West Africa",
  },
  {
    url: "https://images.unsplash.com/photo-1660675133223-c293889b9fb8",
    alt: "Traditional Ghanaian Kente cloth",
    credit: "Kwame Adusei",
    creditUrl: "https://unsplash.com/@kwameadusei",
    location: "Ghana",
  },
];

export function AuthBackground({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  // Change background image every 8 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);

      // After fade out, change the image
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % backgroundImages.length
        );
        setNextIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setFadeIn(true);
      }, 500);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  const currentImage = backgroundImages[currentIndex];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Current image */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-80"
          }`}
        >
          <Image
            src={`${currentImage.url}?auto=format&fit=crop&w=1920&q=80`}
            alt={currentImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Preload next image */}
        <div className="hidden">
          <Image
            src={`${backgroundImages[nextIndex].url}?auto=format&fit=crop&w=1920&q=80`}
            alt="Preload next image"
            width={1}
            height={1}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
