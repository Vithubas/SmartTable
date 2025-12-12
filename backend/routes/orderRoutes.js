import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update order status (for admin)
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
