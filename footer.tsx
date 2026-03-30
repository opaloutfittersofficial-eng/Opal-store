import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Mail, Facebook, type LucideIcon } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!footerConfig.logoText && !footerConfig.email && footerConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: logoRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            logoRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full pt-24 md:pt-32 pb-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff 0%, #f8f5f0 100%)' }}
    >
      {/* Gold accent glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Massive Logo */}
        {footerConfig.logoText && (
          <div ref={logoRef} className="opacity-0 mb-16 md:mb-24">
            <svg
              viewBox="0 0 600 100"
              className="w-full h-auto max-h-[25vh]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f4d03f" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-sans font-extrabold"
                fill="url(#goldGradient)"
                style={{
                  fontSize: '90px',
                  letterSpacing: '-0.03em',
                }}
              >
                {footerConfig.logoText}
              </text>
            </svg>
          </div>
        )}

        {/* Footer Content */}
        <div ref={contentRef} className="opacity-0">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
            {/* Contact Info */}
            <div>
              {footerConfig.contactLabel && (
                <p 
                  className="text-sm font-body uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(184, 134, 11, 0.6)' }}
                >
                  {footerConfig.contactLabel}
                </p>
              )}
              {footerConfig.email && (
                <a
                  href={`mailto:${footerConfig.email}`}
                  className="text-xl md:text-2xl font-sans font-semibold transition-colors duration-300"
                  style={{ color: '#0d1f15' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#b8860b'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#0d1f15'}
                >
                  {footerConfig.email}
                </a>
              )}
              {footerConfig.locationText && (
                <p 
                  className="mt-4 font-body text-sm whitespace-pre-line"
                  style={{ color: 'rgba(13, 31, 21, 0.6)' }}
                >
                  {footerConfig.locationText}
                </p>
              )}
            </div>

            {/* Navigation */}
            {footerConfig.navLinks.length > 0 && (
              <div>
                {footerConfig.navigationLabel && (
                  <p 
                    className="text-sm font-body uppercase tracking-widest mb-4"
                    style={{ color: 'rgba(184, 134, 11, 0.6)' }}
                  >
                    {footerConfig.navigationLabel}
                  </p>
                )}
                <nav className="space-y-3">
                  {footerConfig.navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block font-body transition-colors duration-300"
                      style={{ color: 'rgba(13, 31, 21, 0.8)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#b8860b'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(13, 31, 21, 0.8)'}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Social Links */}
            <div>
              {footerConfig.socialLabel && (
                <p 
                  className="text-sm font-body uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(184, 134, 11, 0.6)' }}
                >
                  {footerConfig.socialLabel}
                </p>
              )}
              {footerConfig.socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {footerConfig.socialLinks.map((social) => {
                    const Icon = iconMap[social.iconName] || Mail;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ 
                          background: '#f8f5f0',
                          color: 'rgba(13, 31, 21, 0.7)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0d1f15';
                          e.currentTarget.style.color = '#d4af37';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f8f5f0';
                          e.currentTarget.style.color = 'rgba(13, 31, 21, 0.7)';
                        }}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </a>
                    );
                  })}
                </div>
              )}
              {footerConfig.tagline && (
                <p 
                  className="mt-6 font-body text-sm whitespace-pre-line"
                  style={{ color: 'rgba(13, 31, 21, 0.4)' }}
                >
                  {footerConfig.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
          >
            <p 
              className="font-body text-sm"
              style={{ color: 'rgba(13, 31, 21, 0.4)' }}
            >
              {footerConfig.copyright || `© ${new Date().getFullYear()} All rights reserved.`}
            </p>
            {footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center gap-6 font-body text-sm">
                {footerConfig.bottomLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    className="transition-colors duration-300"
                    style={{ color: 'rgba(13, 31, 21, 0.4)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#b8860b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(13, 31, 21, 0.4)'}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #f8f5f0, transparent)' }}
      />
    </footer>
  );
}
