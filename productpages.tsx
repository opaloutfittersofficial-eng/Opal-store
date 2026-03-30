import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check, Star } from 'lucide-react';
import { products } from '../config';
import { useEffect, useState } from 'react';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#d4af37] mb-4">Product Not Found</h1>
          <Link to="/" className="btn-luxury inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#d4af37] hover:text-[#f4d03f] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative">
            <div className="product-card viewfinder viewfinder-corners">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 bg-[#d4af37] text-[#0d1f15] text-sm font-bold rounded-full">
                Premium
              </span>
              <span className="px-3 py-1 bg-[#0d1f15]/80 text-[#d4af37] text-sm font-bold rounded-full border border-[#d4af37]/30">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#d4af37]" fill="#d4af37" />
                  ))}
                </div>
                <span className="text-[#d4af37]/70 text-sm">(128 reviews)</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold gold-gradient mb-4">
                {product.name}
              </h1>
              <p className="text-[#d4af37]/80 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="price-tag text-3xl">
              PKR {product.price.toLocaleString()}
            </div>

            {/* Features */}
            <div className="bg-[#1a3d2a]/50 rounded-xl p-6 border border-[#d4af37]/20">
              <h3 className="text-xl font-bold text-[#d4af37] mb-4">Product Features</h3>
              <ul className="space-y-3">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                    <span className="text-[#d4af37]/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/order/${product.id}`}
                className="btn-luxury flex items-center justify-center gap-3 text-lg py-4 flex-1"
              >
                <ShoppingBag className="w-6 h-6" />
                Order Now
              </Link>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#d4af37]/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d4af37]">24h</div>
                <div className="text-sm text-[#d4af37]/60">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d4af37]">100%</div>
                <div className="text-sm text-[#d4af37]/60">Authentic</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d4af37]">7 Day</div>
                <div className="text-sm text-[#d4af37]/60">Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold gold-gradient mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="product-card group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f15] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#d4af37] mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[#d4af37]/80 font-bold">
                      PKR {relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
