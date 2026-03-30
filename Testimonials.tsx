import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Quote } from 'lucide-react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/free-mode';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!testimonialsConfig.titleRegular && testimonialsConfig.testimonials.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            carouselRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8f5f0 0%, #fff 100%)' }}
    >
      {/* Gold accent glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20 relative z-10">
        <div ref={headerRef} className="text-center opacity-0">
          {testimonialsConfig.subtitle && (
            <p 
              className="text-sm font-body uppercase tracking-widest mb-4"
              style={{ color: 'rgba(184, 134, 11, 0.6)' }}
            >
              {testimonialsConfig.subtitle}
            </p>
          )}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight"
            style={{ color: '#0d1f15' }}
          >
            {testimonialsConfig.titleRegular}{' '}
            <span 
              className="font-serif italic font-normal"
              style={{ color: '#b8860b' }}
            >
              {testimonialsConfig.titleItalic}
            </span>
          </h2>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div ref={carouselRef} className="relative opacity-0 z-10">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          className="!px-6"
        >
          {testimonialsConfig.testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div 
                className="group rounded-lg p-8 md:p-10 h-full transition-all duration-500"
                style={{ 
                  background: '#f8f5f0',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0d1f15';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f5f0';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                }}
              >
                {/* Quote icon */}
                <Quote 
                  className="w-10 h-10 mb-6 transition-colors duration-500 group-hover:text-[#d4af37]/30" 
                  strokeWidth={1}
                  style={{ color: 'rgba(13, 31, 21, 0.1)' }}
                />

                {/* Quote text */}
                <p 
                  className="font-body text-base md:text-lg leading-relaxed mb-8 transition-colors duration-500"
                  style={{ color: 'rgba(13, 31, 21, 0.8)' }}
                >
                  <span className="group-hover:text-[#d4af37]/90">&ldquo;{testimonial.quote}&rdquo;</span>
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full overflow-hidden"
                    style={{ border: '2px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p 
                      className="font-sans font-semibold transition-colors duration-500"
                      style={{ color: '#0d1f15' }}
                    >
                      <span className="group-hover:text-[#d4af37]">{testimonial.name}</span>
                    </p>
                    <p 
                      className="text-sm font-body transition-colors duration-500"
                      style={{ color: 'rgba(13, 31, 21, 0.5)' }}
                    >
                      <span className="group-hover:text-[#d4af37]/60">{testimonial.role}</span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlays for fade effect */}
        <div 
          className="absolute top-0 left-0 w-24 h-full z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #fff, transparent)' }}
        />
        <div 
          className="absolute top-0 right-0 w-24 h-full z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #fff, transparent)' }}
        />
      </div>

      {/* Decorative element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 relative z-10">
        <div 
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)' }}
        />
      </div>
    </section>
  );
}
