import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const { addToCart, setIsCartOpen, cartItems } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/api/menu');
                setMenuItems(response.data);
            } catch (err) {
                setError('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen page-container pb-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <h1 className="page-title mb-4">Our Delicious Menu</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience a symphony of flavors crafted with passion and the finest ingredients.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${activeCategory === category
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-black/40 text-gray-400 hover:text-white border border-gray-700 hover:border-primary backdrop-blur-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="text-red-500 text-center text-xl mb-8 animate-pulse">
                        {error}
                    </div>
                )}

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item._id}
                            className="group bg-black/60 backdrop-blur-md rounded-xl overflow-visible border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both', opacity: 0 }}
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="relative h-64 overflow-hidden rounded-t-xl">
                                <img
                                    src={item.image.startsWith('http') ? item.image : `/images/${item.image}`}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x400/1a1a1a/ff6b35?text=Delicious+Food';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <span className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                                        ₹{item.price}
                                    </span>
                                </div>

                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2 mb-6">
                                    {item.description}
                                </p>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 overflow-hidden relative group/btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <span className="text-lg">+</span> Add to Order
                                    </span>
                                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && !loading && !error && (
                    <div className="text-center text-gray-500 text-xl mt-12">
                        No items found in this category.
                    </div>
                )}
            </div>

            {/* Floating Cart Button */}
            {cartItems.length > 0 && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-24 right-6 w-16 h-16 bg-white text-primary rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-40 border-4 border-primary animate-bounce-in"
                >
                    <span className="text-3xl">🛒</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                </button>
            )}

            {/* Cart Drawer */}
            <CartDrawer />

            <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
         @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
        </div>
    );
}

export default Menu;
