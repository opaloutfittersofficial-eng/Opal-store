import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Shirt, 
  Menu, 
  X, 
  Mail,
  ChevronDown,
  Footprints,
  Gem
} from 'lucide-react';
import { heroConfig, contactInfo } from '../config';

interface NavigationProps {
  showFashionMenu: boolean;
  setShowFashionMenu: (show: boolean) => void;
}

export function Navigation({ setShowFashionMenu }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_blank');
  };

  const fashionSubmenuItems = [
    { label: 'Dressing', href: '/category/dressing', icon: Shirt },
    { label: 'Shoes', href: '/category/shoes', icon: Footprints },
    { label: 'Accessories', href: '/category/accessories', icon: Gem },
  ];

  const mainNavItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: "Men's Collection", href: '/category/mens-collection' },
    { label: "Women's Collection", href: '/category/womens-collection' },
    { 
      label: 'Fashion', 
      href: '#', 
      icon: Shirt,
      hasSubmenu: true,
      submenu: fashionSubmenuItems
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0d1f15]/95 backdrop-blur-md shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center">
                <span className="text-[#0d1f15] font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold gold-gradient hidden sm:block">
                {heroConfig.brandName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div 
                  key={item.label} 
                  className={`relative ${item.hasSubmenu ? 'fashion-menu' : ''}`}
                  onMouseEnter={() => item.hasSubmenu && setShowFashionMenu(true)}
                  onMouseLeave={() => item.hasSubmenu && setShowFashionMenu(false)}
                >
                  <Link
                    to={item.href}
                    className={`nav-link flex items-center gap-2 ${
                      isActive(item.href) ? 'text-[#f4d03f]' : ''
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                    {item.hasSubmenu && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Fashion Submenu */}
                  {item.hasSubmenu && (
                    <div className="fashion-submenu">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="flex items-center gap-2"
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="contact-icon"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#0d1f15]" />
              </button>

              {/* Contact/Email Icon */}
              <button
                onClick={handleContactClick}
                className="contact-icon hidden sm:flex"
                aria-label="Contact via Email"
              >
                <Mail className="w-5 h-5 text-[#0d1f15]" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden contact-icon"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#0d1f15]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#0d1f15]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0d1f15]/95 backdrop-blur-md border-t border-[#d4af37]/20 p-4 animate-in slide-in-from-top-2">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="order-input"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0d1f15]/98 backdrop-blur-md border-t border-[#d4af37]/20">
            <div className="px-4 py-6 space-y-4">
              {mainNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => !item.hasSubmenu && setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-3 text-lg ${
                      isActive(item.href) ? 'text-[#f4d03f]' : 'text-[#d4af37]'
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    {item.label}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.hasSubmenu && (
                    <div className="pl-8 space-y-2 mt-2">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-2 text-[#d4af37]/80"
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact */}
              <button
                onClick={() => {
                  handleContactClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 py-3 text-lg text-[#d4af37] w-full"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
