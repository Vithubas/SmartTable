import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-secondary border-b-2 border-primary shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">🍽️</span>
                        <span className="text-xl font-bold text-white">Smart<span className="text-primary">Table</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            Home
                        </Link>
                        <Link to="/tables" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            Tables
                        </Link>
                        <Link to="/menu" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            Menu
                        </Link>
                        <Link to="/reserve" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            Reserve
                        </Link>
                        <Link to="/orders" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            My Orders
                        </Link>
                        <Link to="/admin" className="text-white hover:text-primary transition-colors duration-300 font-medium">
                            Admin
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-primary focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-gray-dark border-t border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/tables"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Tables
                        </Link>
                        <Link
                            to="/menu"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Menu
                        </Link>
                        <Link
                            to="/reserve"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Reserve
                        </Link>
                        <Link
                            to="/orders"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            My Orders
                        </Link>
                        <Link
                            to="/admin"
                            className="block px-3 py-2 text-white hover:text-primary hover:bg-gray-700 rounded-md transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
