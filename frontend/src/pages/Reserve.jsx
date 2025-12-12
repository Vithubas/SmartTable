import { useState, useEffect } from 'react';
import axios from 'axios';

function Reserve() {
    const [tables, setTables] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        tableNumber: '',
        date: '',
        time: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchAvailableTables();
    }, []);

    const fetchAvailableTables = async () => {
        try {
            const response = await axios.get('/api/tables');
            const availableTables = response.data.filter(table => table.isAvailable);
            setTables(availableTables);
        } catch (err) {
            console.error('Failed to fetch tables:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.post('/api/reservations', {
                ...formData,
                tableNumber: parseInt(formData.tableNumber)
            });

            setMessage({
                type: 'success',
                text: '🎉 Reservation successful! We look forward to serving you.'
            });

            setFormData({
                customerName: '',
                tableNumber: '',
                date: '',
                time: ''
            });

            fetchAvailableTables();
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to create reservation. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + i * 20}%`,
                            animation: `float ${6 + i}s infinite`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 page-container">
                <div className="max-w-2xl mx-auto">
                    <h1 className="page-title animate-fade-in-down">Reserve a Table</h1>
                    <p className="text-center text-gray-400 mb-12 text-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                        Book your dining experience in just a few clicks
                    </p>

                    {message.text && (
                        <div
                            className={`card mb-6 animate-slide-in ${message.type === 'success'
                                    ? 'bg-green-900/20 border-green-500'
                                    : 'bg-red-900/20 border-red-500'
                                }`}
                        >
                            <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                                {message.text}
                            </p>
                        </div>
                    )}

                    <div className="card backdrop-blur-xl bg-gray-dark/50 border-primary/30 shadow-2xl opacity-0 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                                <label htmlFor="customerName" className="block text-white font-semibold mb-2 flex items-center">
                                    <span className="text-primary mr-2">👤</span>
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                    className="input-field hover:border-primary/50 focus:scale-[1.02] transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                                <label htmlFor="tableNumber" className="block text-white font-semibold mb-2 flex items-center">
                                    <span className="text-primary mr-2">🪑</span>
                                    Select Table *
                                </label>
                                <select
                                    id="tableNumber"
                                    name="tableNumber"
                                    value={formData.tableNumber}
                                    onChange={handleChange}
                                    required
                                    className="input-field hover:border-primary/50 focus:scale-[1.02] transition-all duration-300"
                                >
                                    <option value="">Choose a table</option>
                                    {tables.map((table) => (
                                        <option key={table._id} value={table.tableNumber}>
                                            Table {table.tableNumber} - {table.seats} seats
                                        </option>
                                    ))}
                                </select>
                                {tables.length === 0 && (
                                    <p className="text-yellow-400 text-sm mt-2 animate-pulse">
                                        ⚠️ No tables currently available. Please check back later.
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                                    <label htmlFor="date" className="block text-white font-semibold mb-2 flex items-center">
                                        <span className="text-primary mr-2">📅</span>
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={today}
                                        required
                                        className="input-field hover:border-primary/50 focus:scale-[1.02] transition-all duration-300"
                                    />
                                </div>

                                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                                    <label htmlFor="time" className="block text-white font-semibold mb-2 flex items-center">
                                        <span className="text-primary mr-2">🕐</span>
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="input-field hover:border-primary/50 focus:scale-[1.02] transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || tables.length === 0}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed opacity-0 animate-slide-in-right relative overflow-hidden group"
                                style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                            >
                                <span className="relative z-10">
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        '✨ Confirm Reservation'
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-dark to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>
                        </form>
                    </div>

                    <div className="card mt-6 bg-primary/10 border-primary backdrop-blur-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                            <span className="mr-2">📌</span>
                            Reservation Policy
                        </h3>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Reservations are confirmed instantly</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Please arrive within 15 minutes of your reservation time</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Contact us to modify or cancel your reservation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Tables are held for 15 minutes past reservation time</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.4s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
        </div>
    );
}

export default Reserve;
