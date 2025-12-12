import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('tables');
    const [tables, setTables] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [tableForm, setTableForm] = useState({ tableNumber: '', seats: '', isAvailable: true });
    const [menuForm, setMenuForm] = useState({ name: '', price: '', category: 'Appetizer', image: '', description: '' });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [tablesRes, menuRes, reservationsRes, feedbackRes, ordersRes] = await Promise.all([
                axios.get('/api/tables'),
                axios.get('/api/menu'),
                axios.get('/api/reservations'),
                axios.get('/api/feedback'),
                axios.get('/api/orders')
            ]);
            setTables(tablesRes.data);
            setMenuItems(menuRes.data);
            setReservations(reservationsRes.data);
            setFeedbackList(feedbackRes.data);
            setOrders(ordersRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Table Management
    const handleTableSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tables', {
                tableNumber: parseInt(tableForm.tableNumber),
                seats: parseInt(tableForm.seats),
                isAvailable: tableForm.isAvailable
            });
            setTableForm({ tableNumber: '', seats: '', isAvailable: true });
            fetchAllData();
            alert('✅ Table added successfully!');
        } catch (err) {
            alert('❌ Failed to add table: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    const handleTableInputChange = (e) => {
        const { name, value } = e.target;
        setTableForm(prev => ({ ...prev, [name]: value }));
    };

    const handleMenuInputChange = (e) => {
        const { name, value } = e.target;
        setMenuForm(prev => ({ ...prev, [name]: value }));
    };

    const addTable = async () => {
        try {
            await axios.post('/api/tables', tableForm);
            alert('✅ Table added successfully!');
            setTableForm({ tableNumber: '', seats: '', isAvailable: true });
            fetchAllData();
        } catch (error) {
            console.error('Error adding table:', error);
            alert('❌ Failed to add table');
        }
    };

    const addMenuItem = async () => {
        try {
            await axios.post('/api/menu', menuForm);
            alert('✅ Menu item added successfully!');
            setMenuForm({ name: '', price: '', category: 'Appetizer', image: '', description: '' });
            fetchAllData();
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert('❌ Failed to add menu item');
        }
    };

    const deleteTable = async (id) => {
        if (window.confirm('Are you sure you want to delete this table?')) {
            try {
                await axios.delete(`/api/tables/${id}`);
                fetchAllData();
                alert('✅ Table deleted successfully!');
            } catch (err) {
                alert('❌ Failed to delete table');
            }
        }
    };

    const toggleTableAvailability = async (table) => {
        try {
            await axios.put(`/api/tables/${table._id}`, {
                isAvailable: !table.isAvailable
            });
            fetchAllData();
        } catch (err) {
            alert('❌ Failed to update table');
        }
    };

    // Menu Management
    const handleMenuSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/menu', {
                ...menuForm,
                price: parseFloat(menuForm.price)
            });
            setMenuForm({ name: '', price: '', category: 'Appetizer', image: '', description: '' });
            fetchAllData();
            alert('✅ Menu item added successfully!');
        } catch (err) {
            alert('❌ Failed to add menu item: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    const deleteMenuItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            try {
                await axios.delete(`/api/menu/${id}`);
                fetchAllData();
                alert('✅ Menu item deleted successfully!');
            } catch (err) {
                alert('❌ Failed to delete menu item');
            }
        }
    };

    // Reservation Management
    const deleteReservation = async (id) => {
        if (window.confirm('Are you sure you want to cancel this reservation?')) {
            try {
                await axios.delete(`/api/reservations/${id}`);
                fetchAllData();
                alert('✅ Reservation cancelled successfully!');
            } catch (err) {
                alert('❌ Failed to cancel reservation');
            }
        }
    };

    // Order Management
    const updateOrderStatus = async (id, newStatus) => {
        try {
            await axios.put(`/api/orders/${id}`, { status: newStatus });
            fetchAllData();
        } catch (err) {
            alert('❌ Failed to update order status');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-primary/30 shadow-2xl backdrop-blur-md">
                <div className="container mx-auto px-6 py-4">
                    {/* Header Top - Logo & User Info */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-2xl">👨‍💼</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Admin Control Panel</h1>
                                <p className="text-sm text-gray-400">Restaurant Management System</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-xs text-gray-500">Logged in as</p>
                                <p className="text-sm font-semibold text-white">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                A
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex flex-wrap gap-2">
                        {[
                            { id: 'tables', icon: '🪑', label: 'Tables', count: tables.length },
                            { id: 'menu', icon: '📋', label: 'Menu', count: menuItems.length },
                            { id: 'reservations', icon: '📅', label: 'Reservations', count: reservations.length },
                            { id: 'orders', icon: '🛍️', label: 'Orders', count: orders.length },
                            { id: 'feedback', icon: '⭐', label: 'Feedback', count: feedbackList.length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/40 scale-105'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white text-primary' : 'bg-primary/20 text-primary'
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Content rendered based on active tab */}
                {activeTab === 'tables' && (
                    <div className="space-y-6">
                        {/* Add Table Form */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span>➕</span> Add New Table
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="number"
                                    name="tableNumber"
                                    value={tableForm.tableNumber}
                                    onChange={handleTableInputChange}
                                    placeholder="Table Number"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <input
                                    type="number"
                                    name="seats"
                                    value={tableForm.seats}
                                    onChange={handleTableInputChange}
                                    placeholder="Number of Seats"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <button
                                    onClick={addTable}
                                    className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-lg hover:shadow-primary/50"
                                >
                                    Add Table
                                </button>
                            </div>
                        </div>

                        {/* Tables List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tables.map((table) => (
                                <div
                                    key={table._id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Table {table.tableNumber}</h3>
                                            <p className="text-gray-400">{table.seats} seats</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${table.isAvailable
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                            }`}>
                                            {table.isAvailable ? '✓ Available' : '✗ Reserved'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleTableAvailability(table)}
                                            className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all ${table.isAvailable
                                                    ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                                                    : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                }`}
                                        >
                                            {table.isAvailable ? '🔒 Mark Reserved' : '🔓 Make Available'}
                                        </button>
                                        <button
                                            onClick={() => deleteTable(table._id)}
                                            className="px-4 py-2 bg-red-600/20 text-red-500 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="space-y-6">
                        {/* Add Menu Item Form */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span>➕</span> Add Menu Item
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={menuForm.name}
                                    onChange={handleMenuInputChange}
                                    placeholder="Item Name"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={menuForm.category}
                                    onChange={handleMenuInputChange}
                                    placeholder="Category"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={menuForm.price}
                                    onChange={handleMenuInputChange}
                                    placeholder="Price (₹)"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    value={menuForm.image}
                                    onChange={handleMenuInputChange}
                                    placeholder="Image URL"
                                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <textarea
                                    name="description"
                                    value={menuForm.description}
                                    onChange={handleMenuInputChange}
                                    placeholder="Description"
                                    rows="2"
                                    className="md:col-span-2 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <button
                                    onClick={addMenuItem}
                                    className="md:col-span-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-lg hover:shadow-primary/50"
                                >
                                    Add to Menu
                                </button>
                            </div>
                        </div>

                        {/* Menu Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {menuItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105"
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                            <span className="text-primary font-bold text-lg">₹{item.price}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
                                            {item.category}
                                        </span>
                                        <button
                                            onClick={() => deleteMenuItem(item._id)}
                                            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reservations' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-6">📅 Reservations</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {reservations.map((reservation) => (
                                <div
                                    key={reservation._id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{reservation.name}</h3>
                                            <p className="text-gray-400">{reservation.email}</p>
                                            <p className="text-gray-400">{reservation.phone}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-primary font-bold">Table {reservation.tableNumber}</p>
                                            <p className="text-sm text-gray-400">{reservation.guests} guests</p>
                                        </div>
                                    </div>
                                    <div className="bg-black/30 rounded-lg p-3 mb-4">
                                        <p className="text-white"><span className="text-gray-400">Date:</span> {new Date(reservation.date).toLocaleDateString()}</p>
                                        <p className="text-white"><span className="text-gray-400">Time:</span> {reservation.time}</p>
                                    </div>
                                    {reservation.specialRequests && (
                                        <p className="text-gray-400 text-sm italic mb-4">"{reservation.specialRequests}"</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-6">🛍️ Orders Management</h2>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                            <p className="text-gray-400">{order.customerName} • Table {order.tableNumber}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl font-bold text-primary">₹{order.totalAmount}</span>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="ready">Ready</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                                                <span className="text-white">{item.name} × {item.quantity}</span>
                                                <span className="text-primary font-semibold">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'feedback' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-6">⭐ Customer Feedback</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {feedbackList.map((feedback) => (
                                <div
                                    key={feedback._id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{feedback.customerName}</h3>
                                            <p className="text-sm text-gray-400">{new Date(feedback.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic">"{feedback.comments}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminDashboard;
