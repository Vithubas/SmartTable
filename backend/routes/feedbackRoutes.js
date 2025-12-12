import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all feedback (for admin)
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
