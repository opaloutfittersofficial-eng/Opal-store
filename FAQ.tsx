import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  if (!faqConfig.titleRegular && faqConfig.faqs.length === 0) return null;

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
        trigger: accordionRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = accordionRef.current?.querySelectorAll('[data-faq-item]');
          if (items) {
            gsap.fromTo(
              items,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.08,
              }
            );
          }
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
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
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0d1f15 0%, #1a3d2a 100%)' }}
    >
      {/* Gold accent glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          {faqConfig.subtitle && (
            <p 
              className="text-sm font-body uppercase tracking-widest mb-4"
              style={{ color: 'rgba(212, 175, 55, 0.6)' }}
            >
              {faqConfig.subtitle}
            </p>
          )}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight"
            style={{ color: '#d4af37' }}
          >
            {faqConfig.titleRegular}{' '}
            <span 
              className="font-serif italic font-normal"
              style={{ color: '#f4d03f' }}
            >
              {faqConfig.titleItalic}
            </span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqConfig.faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                data-faq-item
                className="opacity-0 rounded-lg overflow-hidden"
                style={{ 
                  background: 'rgba(26, 61, 42, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <AccordionTrigger 
                  className="px-6 py-5 hover:no-underline transition-colors duration-300 group"
                  style={{ background: 'transparent' }}
                >
                  <span 
                    className="text-left font-sans font-medium text-base md:text-lg pr-4"
                    style={{ color: '#d4af37' }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p 
                    className="font-body text-sm md:text-base leading-relaxed"
                    style={{ color: 'rgba(212, 175, 55, 0.7)' }}
                  >
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        {(faqConfig.ctaText || faqConfig.ctaButtonText) && (
          <div ref={ctaRef} className="mt-16 text-center opacity-0">
            {faqConfig.ctaText && (
              <p 
                className="font-body text-sm mb-4"
                style={{ color: 'rgba(212, 175, 55, 0.6)' }}
              >
                {faqConfig.ctaText}
              </p>
            )}
            {faqConfig.ctaButtonText && (
              <a
                href={faqConfig.ctaHref || 'mailto:opaloutfitter@gmail.com'}
                className="inline-flex items-center gap-2 px-8 py-4 font-sans font-semibold text-sm rounded-full transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#0d1f15'
                }}
              >
                {faqConfig.ctaButtonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
