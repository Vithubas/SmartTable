import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tables from './pages/Tables';
import Menu from './pages/Menu';
import Reserve from './pages/Reserve';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import ChatBot from './components/ChatBot';
import { CartProvider } from './context/CartContext';
import restaurantBg from './assets/restaurant-bg.png';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen relative text-white">
                    {/* Global Background */}
                    <div
                        className="fixed inset-0 z-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${restaurantBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed'
                        }}
                    >
                        {/* Dark Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tables" element={<Tables />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/reserve" element={<Reserve />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                        <ChatBot />
                    </div>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
