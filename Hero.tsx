import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  if (!heroConfig.backgroundText && !heroConfig.heroImage && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Parallax effect for main text
      const textTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (textRef.current) {
            gsap.set(textRef.current, { yPercent: self.progress * 50 });
          }
        },
      });
      triggers.push(textTrigger);

      // Parallax effect for model
      const modelTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (modelRef.current) {
            gsap.set(modelRef.current, { yPercent: self.progress * 20 });
          }
        },
      });
      triggers.push(modelTrigger);

      // Fade out overlay text
      const overlayTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: 1,
        onUpdate: (self) => {
          if (overlayTextRef.current) {
            gsap.set(overlayTextRef.current, { opacity: 1 - self.progress });
          }
        },
      });
      triggers.push(overlayTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1f15 0%, #0a1910 100%)' }}
    >
      {/* Layer 1: Background gradient */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{ background: 'linear-gradient(180deg, #0d1f15 0%, #1a3d2a 50%, #0d1f15 100%)' }}
      />

      {/* Gold accent glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 2: Big Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
      >
        <h1 
          className="text-[12vw] md:text-[14vw] lg:text-[16vw] font-sans font-extrabold tracking-tighter leading-none select-none whitespace-nowrap"
          style={{ 
            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(212, 175, 55, 0.3)'
          }}
        >
          {heroConfig.backgroundText}
        </h1>
      </div>

      {/* Layer 3: Hero Model Image */}
      {heroConfig.heroImage && (
        <div
          ref={modelRef}
          className="absolute inset-0 flex items-end justify-center z-20 will-change-transform"
        >
          <div className="relative w-[50vw] md:w-[35vw] lg:w-[28vw] max-w-[500px]">
            <img
              src={heroConfig.heroImage}
              alt={heroConfig.heroImageAlt}
              className="w-full h-auto object-contain drop-shadow-2xl"
              loading="eager"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
            />
            {/* Gradient fade at bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32"
              style={{ background: 'linear-gradient(to top, #0d1f15, transparent)' }}
            />
          </div>
        </div>
      )}

      {/* Layer 4: Overlay Text */}
      {heroConfig.overlayText && (
        <div
          ref={overlayTextRef}
          className="absolute bottom-[15%] right-[8%] md:right-[12%] z-30 will-change-transform"
        >
          <p 
            className="font-serif italic text-xl md:text-2xl lg:text-3xl tracking-wide"
            style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}
          >
            {heroConfig.overlayText}
          </p>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#d4af37]/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
