import { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemRatings, setItemRatings] = useState({}); // Store ratings for each item

    useEffect(() => {
        fetchOrders();
        // Auto-refresh every 10 seconds to show status updates
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-500/20 text-gray-400 border-gray-500';
            case 'preparing':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
            case 'ready':
                return 'bg-green-500/20 text-green-400 border-green-500';
            case 'completed':
                return 'bg-blue-500/20 text-blue-400 border-blue-500';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'preparing':
                return '👨‍🍳';
            case 'ready':
                return '✅';
            case 'completed':
                return '🎉';
            default:
                return '📦';
        }
    };

    const submitRating = async (orderId, itemName, menuItemId, rating) => {
        try {
            await axios.post('/api/menu-ratings', {
                menuItem: menuItemId,
                menuItemName: itemName,
                customerName: 'Guest User',
                rating,
                orderId
            });
            alert('✅ Thank you for your rating!');
        } catch (err) {
            alert('❌ Failed to submit rating');
        }
    };

    const renderStarRating = (orderId, item) => {
        const key = `${orderId}-${item.name}`;
        const currentRating = itemRatings[key] || 0;

        return (
            <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => {
                            setItemRatings({ ...itemRatings, [key]: star });
                            submitRating(orderId, item.name, item.menuItem, star);
                        }}
                        className={`text-2xl transition-all duration-200 hover:scale-110 ${star <= currentRating ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                    >
                        {star <= currentRating ? '★' : '☆'}
                    </button>
                ))}
                {currentRating > 0 && (
                    <span className="text-xs text-gray-400 ml-2">({currentRating}/5)</span>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="page-container flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="max-w-6xl mx-auto">
                <h1 className="page-title">My Orders</h1>
                <p className="text-center text-gray-400 mb-12 text-lg">
                    Track your orders in real-time
                </p>

                {orders.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-6xl mb-4">🍽️</p>
                        <p className="text-gray-400 text-lg">No orders yet.</p>
                        <p className="text-gray-500 text-sm mt-2">Start ordering from our menu!</p>
                        <a href="/menu" className="btn-primary inline-block mt-6">
                            Browse Menu
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="card">
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-700">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            Order #{order._id.slice(-6).toUpperCase()}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            Table {order.tableNumber} • {order.customerName}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full border font-semibold text-sm flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                        <span className="text-xl">{getStatusIcon(order.status)}</span>
                                        <span className="uppercase tracking-wide">{order.status}</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-3 mb-6">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="bg-black/20 p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{item.name}</p>
                                                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>

                                                    {/* Rating UI for completed orders */}
                                                    {order.status === 'completed' && (
                                                        <div className="mt-2">
                                                            <p className="text-xs text-gray-500 mb-1">Rate this dish:</p>
                                                            {renderStarRating(order._id, item)}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-primary font-bold">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Total */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                    <span className="text-gray-400 font-semibold">Total Amount</span>
                                    <span className="text-2xl font-bold text-white">₹{order.totalAmount}</span>
                                </div>

                                {/* Status Progress */}
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="flex justify-between items-center relative">
                                        <div className="absolute top-3 left-0 right-0 h-1 bg-gray-700"></div>
                                        <div
                                            className="absolute top-3 left-0 h-1 bg-primary transition-all duration-500"
                                            style={{
                                                width: order.status === 'pending' ? '0%' :
                                                    order.status === 'preparing' ? '33%' :
                                                        order.status === 'ready' ? '66%' : '100%'
                                            }}
                                        ></div>
                                        {['pending', 'preparing', 'ready', 'completed'].map((status, index) => (
                                            <div key={status} className="flex flex-col items-center z-10">
                                                <div className={`w-6 h-6 rounded-full border-2 ${['pending', 'preparing', 'ready', 'completed'].indexOf(order.status) >= index
                                                    ? 'bg-primary border-primary'
                                                    : 'bg-gray-700 border-gray-600'
                                                    }`}></div>
                                                <p className="text-xs text-gray-400 mt-2 capitalize">{status}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
