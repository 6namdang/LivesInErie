'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

import PhotoPreview from './PhotoPreview'; 

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [img1, img2, img3, img4, img5];

const Hero = () => {
  // Manage the active background and the layer that expands over it
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandingIndex, setExpandingIndex] = useState(1); 
  const [hasClicked, setHasClicked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Reference to handle the preview box disappearing smoothly
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Calculate the infinite loop sequence for the slider
  const totalImages = IMAGES.length;
  const upcomingIndex = (currentIndex + 1) % totalImages;

  // Silently pre-fetch the image that will appear after the next click
  // This ensures the browser cache has it ready before the user even asks for it
  useEffect(() => {
    const nextNextIndex = (upcomingIndex + 1) % totalImages;
    const preloadImage = new Image();
    preloadImage.src = IMAGES[nextNextIndex];
  }, [upcomingIndex, totalImages]);

  // Lock the click interaction while the expansion animation is running
  const handleMiniImgClick = () => {
    if (hasClicked) return; 
    setExpandingIndex(upcomingIndex); 
    setHasClicked(true);
  };

  // Reveal the 3D preview box when the mouse moves, and hide it after inactivity
  const handleMouseMove = () => {
    setShowPreview(true);
    if (hideTimeout.current !== null) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setShowPreview(false);
      hideTimeout.current = null;
    }, 300);
  };

  // Clean up timeouts to prevent memory leaks if the component unmounts
  useEffect(() => {
    return () => {
      if (hideTimeout.current !== null) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Handle the cinematic expansion sequence using GSAP
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-image', { visibility: 'visible' });
        
        gsap.to('#next-image', {
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            setCurrentIndex(expandingIndex);
            
            // Allow React a fraction of a second to render the background swap
            // before hiding the expansion layer to prevent visual flickering
            setTimeout(() => {
              setHasClicked(false);
              gsap.set('#next-image', { clearProps: 'all' });
            }, 50); 
          }
        });

        gsap.from('#current-image-preview', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1,
          ease: 'power2.inOut',
        });
      }
    },
    { dependencies: [hasClicked], revertOnUpdate: true }
  );

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-black mb-0">
      <div
        id="image-frame"
        onMouseMove={handleMouseMove}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        {/* Floating 3D Preview Container */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <PhotoPreview>
            <div
              onClick={handleMiniImgClick}
              className={`origin-center transition-all duration-500 ease-in
                          hover:scale-100 hover:opacity-100 scale-50 opacity-0
                          ${showPreview ? 'scale-100 opacity-100' : ''}`}
            >
              <img
                id="current-image-preview"
                src={IMAGES[upcomingIndex]}
                className="size-64 origin-center scale-150 object-cover object-center"
                alt="Preview"
              />
            </div>
          </PhotoPreview>
        </div>

        {/* The layer that triggers and expands on click */}
        <img
          id="next-image"
          src={IMAGES[expandingIndex]}
          className="absolute-center absolute z-20 size-64 object-cover object-center invisible rounded-lg"
          alt="Expanding Background"
        />

        {/* The static background image */}
        <img
          id="main-image"
          src={IMAGES[currentIndex]}
          className="absolute left-0 top-0 size-full object-cover object-center"
          alt="Main Background"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-30 bg-linear-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Main Typography and Call to Action */}
        <div className="absolute inset-0 flex items-center justify-start z-40 px-6 md:px-20 pointer-events-none">
          <div className="relative max-w-4xl space-y-6 pointer-events-auto">
            <p className="uppercase tracking-[0.4em] text-[9px] font-black text-blue-400 mb-2 animate-slide-up">
              Establish 1795 — Pennsylvania
            </p>
            <h1 className="hero-heading leading-[0.85] tracking-tighter mb-4 italic uppercase text-white">
              ERIE <span className="text-transparent font-outline-2 block md:inline">PA</span>
            </h1>
            <p className="text-lg md:text-xl font-light max-w-md leading-relaxed opacity-70 text-white">
              A coastal frontier where the Great Lakes spirit meets modern innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-500 hover:tracking-widest uppercase shadow-lg shadow-white/10">
                EXPLORE THE LAKE
              </button>
            </div>
          </div>
        </div>

        {/* Animated indicator guiding the user to scroll down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-white/50 animate-bounce pointer-events-none">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="size-5"
          >
            <path d="m7 15 5 5 5-5"/>
            <path d="m7 8 5 5 5-5"/>
          </svg>
        </div>

      </div>
    </div>
  );
};

export default Hero;