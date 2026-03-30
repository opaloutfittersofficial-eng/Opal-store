import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { Hero } from './sections/Hero';
import { IntroGrid } from './sections/IntroGrid';
import { Services } from './sections/Services';
import { WhyChooseMe } from './sections/WhyChooseMe';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';
import { OrderPage } from './pages/OrderPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Navigation } from './components/Navigation';
import { siteConfig, contactInfo } from './config';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Home Page Component
function HomePage() {
  return (
    <>
      <Hero />
      <IntroGrid />
      <Services />
      <WhyChooseMe />
      <FeaturedProjects />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

// Main App Content
function AppContent() {
  const [showFashionMenu, setShowFashionMenu] = useState(false);
  
  useLenis();

  useEffect(() => {
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation */}
      <Navigation 
        showFashionMenu={showFashionMenu} 
        setShowFashionMenu={setShowFashionMenu} 
      />
      
      {/* Main Content */}
      <main className="relative w-full overflow-x-hidden pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/order/:productId" element={<OrderPage />} />
        </Routes>
      </main>
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={contactInfo.whatsappNumber} />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
