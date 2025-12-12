import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find().sort({ category: 1, name: 1 });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new menu item (admin)
router.post('/', async (req, res) => {
    const menuItem = new Menu({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update menu item (admin)
router.put('/:id', async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        if (req.body.name !== undefined) menuItem.name = req.body.name;
        if (req.body.price !== undefined) menuItem.price = req.body.price;
        if (req.body.category !== undefined) menuItem.category = req.body.category;
        if (req.body.image !== undefined) menuItem.image = req.body.image;
        if (req.body.description !== undefined) menuItem.description = req.body.description;

        const updatedMenuItem = await menuItem.save();
        res.json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete menu item (admin)
router.delete('/:id', async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        await menuItem.deleteOne();
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
