import express from 'express';
import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';

const router = express.Router();

// Get all reservations (admin)
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: -1, time: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new reservation
router.post('/', async (req, res) => {
    try {
        // Check if table exists and is available
        const table = await Table.findOne({ tableNumber: req.body.tableNumber });
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        if (!table.isAvailable) {
            return res.status(400).json({ message: 'Table is not available' });
        }

        const reservation = new Reservation({
            customerName: req.body.customerName,
            tableNumber: req.body.tableNumber,
            date: req.body.date,
            time: req.body.time
        });

        const newReservation = await reservation.save();

        // Mark table as unavailable
        table.isAvailable = false;
        await table.save();

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete/Cancel reservation (admin)
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Make table available again
        const table = await Table.findOne({ tableNumber: reservation.tableNumber });
        if (table) {
            table.isAvailable = true;
            await table.save();
        }

        await reservation.deleteOne();
        res.json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
