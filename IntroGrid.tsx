import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introGridConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const imageAnimConfigs = [
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: -2, parallax: [-6, 6], delay: 0 },
  { clipFrom: 'inset(0% 0% 100% 0%)', rotation: 1.5, parallax: [-3, 3], delay: 0.12 },
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.2, parallax: [-5, 5], delay: 0.08 },
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: 1, parallax: [-4, 4], delay: 0.22 },
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.5, parallax: [-7, 7], delay: 0.18 },
];

export function IntroGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!introGridConfig.titleLine1 && !introGridConfig.titleLine2 && introGridConfig.portfolioImages.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWrap = titleLine1Ref.current?.parentElement?.parentElement;
      if (titleWrap) {
        ScrollTrigger.create({
          trigger: titleWrap,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(
              [titleLine1Ref.current, titleLine2Ref.current],
              {
                yPercent: 0,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.13,
              }
            );
          },
          once: true,
        });
      }

      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.35 }
          );
        },
        once: true,
      });

      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gridItems.forEach((item, i) => {
          const img = item.querySelector('img');
          const cfg = imageAnimConfigs[i];
          if (!cfg) return;

          ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              gsap.set(item, { opacity: 1 });

              gsap.fromTo(
                item,
                { clipPath: cfg.clipFrom },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.3,
                  ease: 'power4.inOut',
                  delay: cfg.delay,
                }
              );

              if (img) {
                gsap.fromTo(
                  img,
                  { scale: 1.45, rotate: cfg.rotation },
                  {
                    scale: 1.12,
                    rotate: 0,
                    duration: 1.8,
                    ease: 'power3.out',
                    delay: cfg.delay,
                  }
                );
              }
            },
            once: true,
          });

          if (img) {
            gsap.fromTo(
              img,
              { yPercent: cfg.parallax[0] },
              {
                yPercent: cfg.parallax[1],
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #f8f5f0 0%, #fff 100%)' }}
    >
      {/* Gold accent glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="mb-6">
            <div className="overflow-hidden">
              <div
                ref={titleLine1Ref}
                className="translate-y-[110%]"
              >
                <span 
                  className="block text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight"
                  style={{ color: '#0d1f15' }}
                >
                  {introGridConfig.titleLine1}
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={titleLine2Ref}
                className="translate-y-[110%]"
              >
                <span 
                  className="block text-3xl md:text-4xl lg:text-5xl font-serif italic font-normal"
                  style={{ color: '#b8860b' }}
                >
                  {introGridConfig.titleLine2}
                </span>
              </div>
            </div>
          </div>

          <p
            ref={textRef}
            className="text-base md:text-lg font-body leading-relaxed opacity-0"
            style={{ color: 'rgba(13, 31, 21, 0.7)' }}
          >
            {introGridConfig.description}
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]"
        >
          {introGridConfig.portfolioImages.map((image, index) => (
            <div
              key={index}
              className={`grid-item relative overflow-hidden rounded-lg group cursor-pointer opacity-0 ${
                index === 0 ? 'md:col-span-1 md:row-span-2' : ''
              } ${index === 3 ? 'row-span-2' : ''}`}
              style={{ border: '1px solid rgba(212, 175, 55, 0.2)' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div 
                className="absolute inset-0 transition-colors duration-500"
                style={{ background: 'rgba(13, 31, 21, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(13, 31, 21, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(13, 31, 21, 0)'}
              />

              {/* Viewfinder corners on hover */}
              <div 
                className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/80 transition-all duration-500"
              />
              <div 
                className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/80 transition-all duration-500"
              />
              <div 
                className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/80 transition-all duration-500"
              />
              <div 
                className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/80 transition-all duration-500"
              />
            </div>
          ))}
        </div>

        {/* Floating accent text */}
        {introGridConfig.accentText && (
          <div className="mt-12 md:mt-16 flex justify-end">
            <p 
              className="text-sm font-body tracking-wider uppercase"
              style={{ color: 'rgba(184, 134, 11, 0.6)' }}
            >
              {introGridConfig.accentText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
