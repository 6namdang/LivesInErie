import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const IMAGES = [img1, img2, img3, img4, img5];

const Hero = () => {
  // Track which slide is currently active to update dots and counter
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize Embla with with loop and autoplay every 5 secounds
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  // Synchronizes our local 'selectedIndex' state with Embla's internal state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Set up the event listener: whenever the slide changes, run onSelect
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    // Cleanup: remove the listener if the component unmounts to prevent memory leaks
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);


  // Navigation Helper: Jumps to a specific slide (used by dot indicators)
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <section
      className="relative h-dvh w-screen overflow-hidden bg-black"
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
    >
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {IMAGES.map((src, i) => (
            <div className="relative min-w-0 flex-[0_0_100%] h-full" key={i}>
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Main Content TEXt */}
      <div className="absolute inset-0 z-20 flex items-center justify-start px-6 md:px-20 pointer-events-none">
        <div className="max-w-4xl space-y-6 pointer-events-auto">
          <p className="uppercase tracking-[0.4em] text-[9px] font-black text-blue-400 mb-2">
            Established in 1795 — Pennsylvania
          </p>
          <h1 className="hero-heading leading-[0.85] tracking-tighter mb-4 italic uppercase text-white">
            ERIE{' '}
            <span className="text-transparent font-outline-2 block md:inline">
              PA
            </span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-md leading-relaxed opacity-70 text-white">
            A coastal frontier where the Great Lakes spirit meets modern
            innovation.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-500 hover:tracking-widest uppercase shadow-lg shadow-white/10">
              EXPLORE THE LAKE
            </button>
          </div>
        </div>
      </div>

      {/* Navigation: Left/Right Arrows */}
      <div className="absolute bottom-8 right-6 md:right-20 z-30 flex items-center gap-3">
        <button
          onClick={scrollPrev}
          className="group grid place-items-center w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-white/70 hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 group-hover:-translate-x-0.5 transition-transform">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="group grid place-items-center w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-white/70 hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 group-hover:translate-x-0.5 transition-transform">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination: Dot Indicators with dynamic width for the active slide */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === selectedIndex
                ? 'w-10 bg-white'
                : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selectedIndex ? 'true' : undefined}
          />
        ))}
      </div>

      {/* Counter in the top right */}
      <div className="absolute top-8 right-6 md:right-20 z-30 text-white/40 text-xs font-mono tracking-widest">
        <span className="text-white font-bold">
          {String(selectedIndex + 1).padStart(2, '0')}
        </span>
        <span className="mx-1">/</span>
        <span>{String(IMAGES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Hero;