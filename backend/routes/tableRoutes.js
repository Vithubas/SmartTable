import express from 'express';
import Table from '../models/Table.js';

const router = express.Router();

// Get all tables with availability status for a specific date
router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        let tables = await Table.find().sort({ tableNumber: 1 });

        // If a date is provided, check reservations for that date
        if (date) {
            const Reservation = (await import('../models/Reservation.js')).default;
            const reservations = await Reservation.find({ date: date, status: { $ne: 'cancelled' } });

            // Create a set of reserved table numbers
            const reservedTableNumbers = new Set(reservations.map(r => r.tableNumber));

            // Map tables to include dynamic availability based on date
            tables = tables.map(table => ({
                ...table.toObject(),
                isAvailable: !reservedTableNumbers.has(table.tableNumber)
            }));
        }

        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new table (admin)
router.post('/', async (req, res) => {
    const table = new Table({
        tableNumber: req.body.tableNumber,
        seats: req.body.seats,
        isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true
    });

    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update table (admin)
router.put('/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        if (req.body.tableNumber !== undefined) table.tableNumber = req.body.tableNumber;
        if (req.body.seats !== undefined) table.seats = req.body.seats;
        if (req.body.isAvailable !== undefined) table.isAvailable = req.body.isAvailable;

        const updatedTable = await table.save();
        res.json(updatedTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete table (admin)
router.delete('/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        await table.deleteOne();
        res.json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
