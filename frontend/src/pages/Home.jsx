import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`
                            }}
                        >
                            <div className="w-2 h-2 bg-primary/30 rounded-full blur-sm" />
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}>

                    {/* Animated Logo/Icon */}
                    <div className="mb-8 animate-bounce-slow">
                        <div className="inline-block p-6 bg-gradient-to-br from-primary to-orange-600 rounded-full shadow-2xl">
                            <span className="text-6xl">🍽️</span>
                        </div>
                    </div>

                    {/* Main Heading with Gradient */}
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
                        <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-gradient">
                            Gourmet Haven
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-slide-up animation-delay-200">
                        Experience Fine Dining at Its Best
                    </p>

                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up animation-delay-400">
                        Reserve your table, explore our exquisite menu, and enjoy a culinary journey
                        in our stunning 3D-visualized restaurant space.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600">
                        <Link
                            to="/tables"
                            className="group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">View Tables in 3D</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <Link
                            to="/menu"
                            className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                        >
                            Explore Menu
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center text-gray-400">
                        <span className="text-sm mb-2">Scroll Down</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
                        Why Choose Us?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🏢',
                                title: '3D Restaurant View',
                                description: 'Explore our restaurant in stunning 3D before you visit'
                            },
                            {
                                icon: '⭐',
                                title: 'User Ratings',
                                description: 'Real reviews from real customers guide your choices'
                            },
                            {
                                icon: '🤖',
                                title: 'AI Concierge',
                                description: 'Smart chatbot for reservations and recommendations'
                            },
                            {
                                icon: '📱',
                                title: 'Order Tracking',
                                description: 'Track your order status in real-time'
                            },
                            {
                                icon: '🍽️',
                                title: 'Exquisite Menu',
                                description: 'Curated dishes from around the world'
                            },
                            {
                                icon: '💳',
                                title: 'Easy Reservation',
                                description: 'Book your table in seconds, hassle-free'
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="card group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                                style={{
                                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-transparent to-black/30">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '1000+', label: 'Happy Customers' },
                            { number: '50+', label: 'Menu Items' },
                            { number: '4.8', label: 'Average Rating' },
                            { number: '24/7', label: 'Service' }
                        ].map((stat, index) => (
                            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
