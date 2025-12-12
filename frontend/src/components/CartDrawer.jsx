import { useCart } from '../context/CartContext';
import { useState } from 'react';
import axios from 'axios';
import FeedbackModal from './FeedbackModal';

function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    if (!isCartOpen) return null;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            // Simulate/Real API call
            await axios.post('/api/orders', {
                items: cartItems.map(item => ({
                    menuItem: item._id, // Assuming item has _id
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: getCartTotal(),
                customerName: "Guest", // Hardcoded for demo
                tableNumber: 1 // Hardcoded for demo
            });

            // Clear cart
            clearCart();
            setIsProcessing(false);
            setIsCartOpen(false); // Close drawer
            setShowFeedback(true); // Open Feedback
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
            alert('Failed to place order.');
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-gray-dark border-l border-primary/30 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 animate-slide-in-right">
                <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <span className="text-3xl mr-2">🛒</span> Your Order
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-400 mt-20">
                            <p className="text-6xl mb-4">🍽️</p>
                            <p>Your cart is empty.</p>
                            <p className="text-sm">Start adding some delicious items!</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item._id} className="bg-black/20 p-4 rounded-xl flex justify-between items-center border border-gray-700">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">{item.name}</h3>
                                    <p className="text-primary font-bold">₹{item.price}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateQuantity(item._id, -1)}
                                        className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-primary transition-colors flex items-center justify-center font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, 1)}
                                        className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-primary transition-colors flex items-center justify-center font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-700 pt-6 mt-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-400">Total Amount</span>
                            <span className="text-3xl font-bold text-white">₹{getCartTotal()}</span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="w-full btn-primary py-4 text-lg shadow-xl relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isProcessing ? 'Processing...' : '✅ Place Order'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-dark to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </div>
                )}
            </div>

            <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </>
    );
}

export default CartDrawer;
