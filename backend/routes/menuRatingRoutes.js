import express from 'express';
import MenuRating from '../models/MenuRating.js';

const router = express.Router();

// Submit rating for menu item
router.post('/', async (req, res) => {
    try {
        const newRating = new MenuRating(req.body);
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all ratings for a specific menu item
router.get('/item/:menuId', async (req, res) => {
    try {
        const ratings = await MenuRating.find({ menuItem: req.params.menuId });
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get menu items with calculated average ratings
router.get('/menu-with-ratings', async (req, res) => {
    try {
        const ratings = await MenuRating.aggregate([
            {
                $group: {
                    _id: '$menuItem',
                    averageRating: { $avg: '$rating' },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json(err);
    }
});

// NEW: Get full menu with ratings merged
router.get('/menu-full-ratings', async (req, res) => {
    try {
        const Menu = (await import('../models/Menu.js')).default;
        const menuItems = await Menu.find();

        const ratings = await MenuRating.aggregate([
            {
                $group: {
                    _id: '$menuItemName',
                    averageRating: { $avg: '$rating' },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);

        // Create a map of ratings by item name
        const ratingsMap = {};
        ratings.forEach(r => {
            ratingsMap[r._id] = {
                averageRating: r.averageRating,
                ratingCount: r.ratingCount
            };
        });

        // Merge ratings into menu items
        const menuWithRatings = menuItems.map(item => ({
            ...item.toObject(),
            averageRating: ratingsMap[item.name]?.averageRating || 0,
            ratingCount: ratingsMap[item.name]?.ratingCount || 0
        }));

        res.status(200).json(menuWithRatings);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
