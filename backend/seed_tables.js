import mongoose from 'mongoose';
import Table from './models/Table.js';
import dotenv from 'dotenv';
dotenv.config();

const sampleTables = [
    { tableNumber: 1, seats: 2, isAvailable: true },
    { tableNumber: 2, seats: 2, isAvailable: true },
    { tableNumber: 3, seats: 4, isAvailable: true },
    { tableNumber: 4, seats: 4, isAvailable: true },
    { tableNumber: 5, seats: 6, isAvailable: true },
    { tableNumber: 6, seats: 8, isAvailable: true },
    { tableNumber: 7, seats: 4, isAvailable: false }, // One reserved table
    { tableNumber: 8, seats: 2, isAvailable: true }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Table.deleteMany({}); // Clear existing tables
        await Table.insertMany(sampleTables);
        console.log('Tables seeded successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error seeding tables:', err);
        process.exit(1);
    });
