import { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant3DViewer from '../components/Restaurant3DViewer';

function Tables() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetchTables(selectedDate);
    }, [selectedDate]);

    const fetchTables = async (date) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/tables?date=${date}`);
            setTables(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch tables. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading availability for {selectedDate}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="card text-center py-8">
                    <p className="text-red-400 text-lg mb-4">⚠️ {error}</p>
                    <button onClick={() => fetchTables(selectedDate)} className="btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="max-w-7xl mx-auto">
                <h1 className="page-title">Table Availability</h1>

                {/* Date Picker Section */}
                <div className="max-w-md mx-auto mb-12 bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-sm">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center uppercase tracking-wider">
                        Select Date to Check Availability
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-6 py-4 bg-black border-2 border-primary/50 text-white rounded-xl focus:border-primary outline-none text-center text-xl font-bold shadow-inner"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary">
                            📅
                        </div>
                    </div>
                    <p className="text-center text-gray-500 mt-3 text-sm">
                        Showing availability for <span className="text-primary font-bold">{new Date(selectedDate).toDateString()}</span>
                    </p>
                </div>


                {/* 3D Viewer */}
                <div className="mb-12">
                    <Restaurant3DViewer tables={tables} />
                </div>

                {/* Table Cards */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">📋 Table Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tables.map((table) => (
                        <div key={table._id} className="card relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                            {/* Header with distinct styling */}
                            <div className="px-6 py-4 -mx-6 -mt-6 mb-4 border-b border-gray-700 bg-black/30 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">Table {table.tableNumber}</h3>
                                <span className={`text-2xl ${table.isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                                    {table.isAvailable ? '✅' : '🔴'}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <span className="text-xl">👥</span>
                                    <span className="font-medium">{table.seats} seats</span>
                                </div>

                                <div className={`text-sm font-semibold ${table.isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                                    {table.isAvailable ? 'Available Now' : 'Currently Reserved'}
                                </div>
                            </div>

                            {table.isAvailable && (
                                <a
                                    href="/reserve"
                                    className="mt-4 block w-full btn-primary text-center"
                                >
                                    Reserve This Table
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tables;
