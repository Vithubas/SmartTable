import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tableRoutes from './routes/tableRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import menuRatingRoutes from './routes/menuRatingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tables', tableRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/menu-ratings', menuRatingRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Restaurant Reservation API' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });
