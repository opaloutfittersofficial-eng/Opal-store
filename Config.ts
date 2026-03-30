// Site Configuration
// OPAL OUTFITTER - Luxury Fashion E-commerce

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "OPAL OUTFITTER - Luxury Fashion",
  siteDescription: "Discover premium fashion collections at OPAL OUTFITTER. Men's and Women's clothing, shoes, dressing, and accessories with elegant dark green and gold luxury theme.",
};

// Product Type
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  details: string[];
}

// Products Data
export const products: Product[] = [
  {
    id: "chunky-loafer",
    name: "Chunky Loafer",
    price: 6000,
    category: "Shoes",
    image: "/chunky-loafer.jpg",
    description: "Elevate your style with our premium Chunky Loafer. Crafted from the finest leather with exquisite gold buckle detailing, these loafers combine classic elegance with modern chunky sole design.",
    details: [
      "Premium genuine leather upper",
      "Gold-tone hardware accents",
      "Chunky rubber sole for comfort",
      "Cushioned insole",
      "Handcrafted with precision",
      "Available in multiple sizes"
    ]
  },
  {
    id: "samba-shoes",
    name: "Samba Shoes",
    price: 10000,
    category: "Shoes",
    image: "/samba-shoes.jpg",
    description: "Experience the perfect blend of sporty style and luxury. Our Samba Shoes feature premium black leather with signature white stripes and gold logo accents.",
    details: [
      "Premium black leather construction",
      "Iconic three-stripe design",
      "Gold logo detailing",
      "Gum rubber outsole",
      "Classic Samba silhouette",
      "Limited edition release"
    ]
  },
  {
    id: "formal-shoes-1",
    name: "Classic Formal Shoes",
    price: 5500,
    category: "Shoes",
    image: "/formal-shoes-1.jpg",
    description: "Make a lasting impression with our Classic Formal Shoes. Polished black leather with gold toe cap detailing creates the perfect sophisticated look for any formal occasion.",
    details: [
      "Polished black leather upper",
      "Gold toe cap accent",
      "Oxford style design",
      "Leather lining",
      "Durable leather sole",
      "Perfect for business and formal events"
    ]
  },
  {
    id: "formal-shoes-2",
    name: "Premium Brogue Formal",
    price: 6000,
    category: "Shoes",
    image: "/formal-shoes-2.jpg",
    description: "Step into luxury with our Premium Brogue Formal shoes. Dark brown polished leather with intricate brogue detailing and gold accent stitching exudes timeless elegance.",
    details: [
      "Dark brown polished leather",
      "Intricate brogue pattern",
      "Gold accent stitching",
      "Wingtip design",
      "Premium leather sole",
      "Hand-finished details"
    ]
  }
];

// Category Type
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Categories Data
export const categories: Category[] = [
  {
    id: "mens-collection",
    name: "Men's Collection",
    image: "/mens-collection.jpg",
    description: "Discover our exclusive men's fashion collection featuring premium suits, formal wear, and sophisticated accessories."
  },
  {
    id: "womens-collection",
    name: "Women's Collection",
    image: "/womens-collection.jpg",
    description: "Explore our elegant women's collection with stunning dresses, designer wear, and luxury fashion pieces."
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "/chunky-loafer.jpg",
    description: "Step into luxury with our curated selection of premium footwear, from formal to casual styles."
  },
  {
    id: "dressing",
    name: "Dressing",
    image: "/dressing.jpg",
    description: "Experience the art of dressing with our traditional and modern collection of premium garments."
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/accessories.jpg",
    description: "Complete your look with our luxury accessories including handbags, watches, and fine jewelry."
  }
];

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "OPAL",
  heroImage: "/hero-model.png",
  heroImageAlt: "Luxury Fashion Model",
  overlayText: "Curated by OPAL OUTFITTER",
  brandName: "OPAL OUTFITTER",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Men's Collection", href: "/category/mens-collection" },
    { label: "Women's Collection", href: "/category/womens-collection" },
    { label: "Shoes", href: "/category/shoes" },
    { label: "Dressing", href: "/category/dressing" },
    { label: "Accessories", href: "/category/accessories" },
  ],
};

// Intro Grid Section
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "Discover Luxury",
  titleLine2: "Fashion Redefined",
  description: "Welcome to OPAL OUTFITTER, where elegance meets sophistication. Our curated collections feature premium fashion pieces crafted with the finest materials and exquisite attention to detail. Experience the art of dressing with our dark green and gold themed luxury selections.",
  portfolioImages: [
    { src: "/mens-collection.jpg", alt: "Men's Collection" },
    { src: "/womens-collection.jpg", alt: "Women's Collection" },
    { src: "/chunky-loafer.jpg", alt: "Premium Shoes" },
    { src: "/accessories.jpg", alt: "Luxury Accessories" },
    { src: "/dressing.jpg", alt: "Dressing Collection" },
  ],
  accentText: "Premium Collections - 2024",
};

// Featured Projects Section (Using for Featured Products)
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "Featured Products",
  titleRegular: "Premium",
  titleItalic: "Footwear",
  viewAllText: "View All Products",
  viewAllHref: "/category/shoes",
  viewProjectText: "View Details",
  projects: products.map((p, i) => ({
    id: i + 1,
    title: p.name,
    category: p.category,
    year: `PKR ${p.price.toLocaleString()}`,
    image: p.image,
    description: p.description
  })),
};

// Services Section (Using for Features)
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "What We Offer",
  titleLine1: "Luxury",
  titleLine2Italic: "Experience",
  description: "At OPAL OUTFITTER, we provide an unparalleled shopping experience with premium products, exceptional service, and attention to every detail.",
  services: [
    { 
      iconName: "Diamond", 
      title: "Premium Quality", 
      description: "Every piece in our collection is crafted from the finest materials with meticulous attention to detail." 
    },
    { 
      iconName: "Truck", 
      title: "Fast Delivery", 
      description: "Enjoy swift and secure delivery of your luxury items right to your doorstep." 
    },
    { 
      iconName: "Shield", 
      title: "Authentic Guarantee", 
      description: "All our products are 100% authentic with quality assurance and satisfaction guarantee." 
    },
    { 
      iconName: "Headphones", 
      title: "24/7 Support", 
      description: "Our dedicated support team is always ready to assist you with any inquiries or concerns." 
    },
  ],
};

// Why Choose Me Section (Using for Why Choose Us)
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Why Choose Us",
  titleRegular: "The OPAL",
  titleItalic: "Difference",
  statsLabel: "By The Numbers",
  stats: [
    { value: 5000, suffix: "+", label: "Happy Customers" },
    { value: 100, suffix: "%", label: "Authentic Products" },
    { value: 24, suffix: "h", label: "Delivery Time" },
    { value: 5, suffix: "★", label: "Customer Rating" },
  ],
  featureCards: [
    { 
      image: "/mens-collection.jpg", 
      imageAlt: "Men's Collection", 
      title: "Men's Excellence", 
      description: "Discover our premium men's collection featuring sophisticated suits and formal wear." 
    },
    { 
      image: "/womens-collection.jpg", 
      imageAlt: "Women's Collection", 
      title: "Women's Elegance", 
      description: "Explore our elegant women's collection with stunning designer pieces." 
    },
  ],
  wideImage: "/dressing.jpg",
  wideImageAlt: "Dressing Collection",
  wideTitle: "Traditional & Modern",
  wideDescription: "Experience the perfect blend of traditional craftsmanship and modern design in our dressing collection.",
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "Customer Stories",
  titleRegular: "What Our",
  titleItalic: "Clients Say",
  testimonials: [
    {
      id: 1,
      name: "Ahmed Khan",
      role: "Business Executive",
      image: "/mens-collection.jpg",
      quote: "OPAL OUTFITTER has transformed my wardrobe. The quality of their formal shoes is unmatched, and the customer service is exceptional."
    },
    {
      id: 2,
      name: "Sarah Malik",
      role: "Fashion Enthusiast",
      image: "/womens-collection.jpg",
      quote: "I absolutely love the dark green and gold theme! Every piece I've ordered has exceeded my expectations in terms of quality and style."
    },
    {
      id: 3,
      name: "Hassan Raza",
      role: "Entrepreneur",
      image: "/accessories.jpg",
      quote: "The attention to detail in every product is remarkable. OPAL OUTFITTER is now my go-to destination for luxury fashion."
    },
  ],
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Common Questions",
  titleRegular: "Frequently",
  titleItalic: "Asked",
  ctaText: "Still have questions?",
  ctaButtonText: "Contact Us",
  ctaHref: "mailto:opaloutfitter@gmail.com",
  faqs: [
    {
      id: "1",
      question: "How do I place an order?",
      answer: "Simply browse our collections, select your desired items, and click 'Order Now' to fill out the order form. We'll handle the rest and confirm your order via WhatsApp and email."
    },
    {
      id: "2",
      question: "What payment methods do you accept?",
      answer: "We accept Cash on Delivery (COD) for all orders within Pakistan. For international orders, please contact us directly for payment arrangements."
    },
    {
      id: "3",
      question: "How long does delivery take?",
      answer: "We offer 24-hour delivery for orders in major cities. For other locations, delivery typically takes 2-3 business days."
    },
    {
      id: "4",
      question: "Can I return or exchange items?",
      answer: "Yes, we offer a 7-day return and exchange policy for unused items in their original packaging. Please contact our support team for assistance."
    },
    {
      id: "5",
      question: "Are your products authentic?",
      answer: "Absolutely! All products at OPAL OUTFITTER are 100% authentic. We source directly from trusted manufacturers and designers."
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "OPAL",
  contactLabel: "Get in Touch",
  email: "opaloutfitter@gmail.com",
  locationText: "Karachi, Pakistan",
  navigationLabel: "Quick Links",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Men's Collection", href: "/category/mens-collection" },
    { label: "Women's Collection", href: "/category/womens-collection" },
    { label: "Shoes", href: "/category/shoes" },
    { label: "Dressing", href: "/category/dressing" },
    { label: "Accessories", href: "/category/accessories" },
  ],
  socialLabel: "Follow Us",
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Facebook", href: "#", label: "Facebook" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
    { iconName: "Mail", href: "mailto:opaloutfitter@gmail.com", label: "Email" },
  ],
  tagline: "Luxury Fashion\nRedefined",
  copyright: "© 2024 OPAL OUTFITTER. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

// Contact Info
export const contactInfo = {
  whatsappNumber: "03483351028",
  email: "opaloutfitter@gmail.com",
  phone: "+92 348 3351028",
  address: "Karachi, Pakistan"
};
