import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        },
        name: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', orderSchema);
