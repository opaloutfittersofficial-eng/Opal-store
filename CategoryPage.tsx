import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { products, categories } from '../config';
import { useEffect, useState } from 'react';

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  const category = categories.find(c => c.id === categoryId);
  
  // Filter products based on category
  const categoryProducts = products.filter(p => {
    if (categoryId === 'shoes') return p.category === 'Shoes';
    if (categoryId === 'mens-collection') return p.category === 'Men' || p.category === 'Shoes';
    if (categoryId === 'womens-collection') return p.category === 'Women' || p.category === 'Shoes';
    return true;
  });

  // For dressing and accessories, show placeholder products
  const showPlaceholder = categoryId === 'dressing' || categoryId === 'accessories';
  
  useEffect(() => {
    setIsVisible(true);
  }, [categoryId]);

  if (!category && !showPlaceholder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#d4af37] mb-4">Category Not Found</h1>
          <Link to="/" className="btn-luxury inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const categoryData = category || {
    id: categoryId || '',
    name: categoryId === 'dressing' ? 'Dressing Collection' : 'Accessories Collection',
    image: categoryId === 'dressing' ? '/dressing.jpg' : '/accessories.jpg',
    description: categoryId === 'dressing' 
      ? 'Explore our exquisite dressing collection featuring traditional and modern garments crafted with premium materials.'
      : 'Complete your look with our luxury accessories including handbags, watches, jewelry, and more.'
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Hero Section */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={categoryData.image}
          alt={categoryData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f15] via-[#0d1f15]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#d4af37] hover:text-[#f4d03f] transition-colors mb-6 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-5xl lg:text-7xl font-bold gold-gradient mb-4">
              {categoryData.name}
            </h1>
            <p className="text-xl text-[#d4af37]/80 max-w-2xl mx-auto">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#d4af37]">
                  {categoryProducts.length} Products
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-[#d4af37]/60">Sort by:</span>
                  <select className="order-input py-2 px-3 text-sm">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f15] via-transparent to-transparent opacity-60" />
                      
                      {/* Quick Actions */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="btn-luxury w-full flex items-center justify-center gap-2 text-sm py-2">
                          <ShoppingBag className="w-4 h-4" />
                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-[#d4af37]/60 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-semibold text-[#d4af37] mt-1 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#f4d03f] font-bold text-xl">
                        PKR {product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Placeholder for Dressing and Accessories */
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a3d2a] flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-[#d4af37]" />
              </div>
              <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
                Coming Soon
              </h2>
              <p className="text-[#d4af37]/70 max-w-md mx-auto mb-8">
                Our {categoryData.name} is currently being curated. Check back soon for premium selections.
              </p>
              <Link to="/" className="btn-luxury inline-block">
                Explore Other Collections
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Other Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-12 bg-[#0a1910]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gold-gradient mb-8 text-center">
            Explore Other Collections
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories
              .filter(c => c.id !== categoryId)
              .slice(0, 4)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f15] via-[#0d1f15]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-[#d4af37]">{cat.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
