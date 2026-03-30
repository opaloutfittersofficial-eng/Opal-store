import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Diamond, Users, Sparkles, Truck, Shield, Headphones, type LucideIcon } from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Diamond,
  Users,
  Sparkles,
  Truck,
  Shield,
  Headphones,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!servicesConfig.titleLine1 && servicesConfig.services.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
              }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0d1f15 0%, #1a3d2a 100%)' }}
    >
      {/* Gold accent glow */}
      <div 
        className="absolute top-1/2 right-0 w-[400px] h-[400px] opacity-10"
        style={{ 
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - Heading */}
          <div ref={headingRef} className="opacity-0">
            {servicesConfig.subtitle && (
              <p 
                className="text-sm font-body uppercase tracking-widest mb-4"
                style={{ color: 'rgba(212, 175, 55, 0.6)' }}
              >
                {servicesConfig.subtitle}
              </p>
            )}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight"
              style={{ color: '#d4af37' }}
            >
              {servicesConfig.titleLine1}
              <br />
              <span 
                className="font-serif italic font-normal"
                style={{ color: '#f4d03f' }}
              >
                {servicesConfig.titleLine2Italic}
              </span>
            </h2>
            {servicesConfig.description && (
              <p 
                className="mt-6 font-body text-base md:text-lg max-w-md leading-relaxed"
                style={{ color: 'rgba(212, 175, 55, 0.7)' }}
              >
                {servicesConfig.description}
              </p>
            )}
          </div>

          {/* Right Column - Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: 'rgba(212, 175, 55, 0.2)' }}
          >
            {servicesConfig.services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Diamond;
              return (
                <div
                  key={index}
                  className="service-card group p-6 md:p-8 opacity-0 transition-all duration-500 cursor-pointer"
                  style={{ 
                    background: '#0d1f15',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1a3d2a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0d1f15';
                  }}
                >
                  <div className="mb-4">
                    <Icon 
                      className="w-8 h-8 transition-colors duration-300" 
                      style={{ color: '#d4af37' }}
                      strokeWidth={1.5} 
                    />
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-sans font-semibold mb-3 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: '#d4af37' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm font-body leading-relaxed transition-colors duration-300"
                    style={{ color: 'rgba(212, 175, 55, 0.6)' }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5"
                      style={{ color: '#d4af37' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div 
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)' }}
      />
    </section>
  );
}
