import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Check, Phone, User, MapPin, Mail, MessageSquare } from 'lucide-react';
import { products, contactInfo } from '../config';
import { useEffect, useState } from 'react';

export function OrderPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare order message
    const orderMessage = `
🛍️ *NEW ORDER - OPAL OUTFITTER*

📦 *Product Details:*
• Product: ${product?.name}
• Price: PKR ${product?.price.toLocaleString()}
• Category: ${product?.category}

👤 *Customer Information:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}
• Address: ${formData.address}
• City: ${formData.city}

📝 *Additional Notes:*
${formData.notes || 'No additional notes'}

📅 Order Date: ${new Date().toLocaleString()}
    `.trim();

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Send to Email
    const emailSubject = `New Order - ${product?.name} from ${formData.name}`;
    const emailBody = encodeURIComponent(orderMessage);
    const emailUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    window.open(emailUrl, '_blank');

    // Show success
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a3d2a] flex items-center justify-center gold-glow">
            <Check className="w-12 h-12 text-[#d4af37]" />
          </div>
          <h1 className="text-4xl font-bold gold-gradient mb-4">Order Submitted!</h1>
          <p className="text-[#d4af37]/80 mb-8">
            Thank you for your order! We've opened WhatsApp and Email for you to confirm your order with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-luxury">
              Continue Shopping
            </Link>
            <button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="px-6 py-3 rounded-lg font-semibold border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#d4af37] hover:text-[#f4d03f] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gold-gradient mb-8 text-center">
          Complete Your Order
        </h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-xl font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#d4af37]/80 mb-2 text-sm">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/50" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="order-input pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#d4af37]/80 mb-2 text-sm">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/50" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="03XX-XXXXXXX"
                        className="order-input pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#d4af37]/80 mb-2 text-sm">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/50" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="order-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-xl font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#d4af37]/80 mb-2 text-sm">Complete Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#d4af37]/50" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="House #, Street, Area"
                        className="order-input pl-10 resize-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#d4af37]/80 mb-2 text-sm">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="order-input"
                    >
                      <option value="">Select City</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-xl font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Additional Notes
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special instructions (optional)"
                  className="order-input resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury w-full flex items-center justify-center gap-3 text-lg py-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-[#0d1f15] border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-center text-[#d4af37]/60 text-sm">
                By placing this order, you agree to our terms and conditions.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Product Summary */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-xl font-bold text-[#d4af37] mb-4">Order Summary</h2>
                <div className="flex gap-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-[#d4af37]">{product.name}</h3>
                    <p className="text-[#d4af37]/60 text-sm">{product.category}</p>
                    <p className="text-[#f4d03f] font-bold mt-2">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-xl font-bold text-[#d4af37] mb-4">Price Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-[#d4af37]/80">
                    <span>Product Price</span>
                    <span>PKR {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#d4af37]/80">
                    <span>Delivery Charges</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-[#d4af37]/20 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-[#d4af37]">Total</span>
                      <span className="text-[#f4d03f]">PKR {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-[#1a3d2a]/30 rounded-xl p-6 border border-[#d4af37]/20">
                <h2 className="text-lg font-bold text-[#d4af37] mb-3">Delivery Information</h2>
                <ul className="space-y-2 text-sm text-[#d4af37]/70">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Free delivery on all orders
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    24-hour delivery in major cities
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Cash on delivery available
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    7-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
