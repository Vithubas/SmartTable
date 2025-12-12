import mongoose from 'mongoose';

const menuRatingSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    menuItemName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {
    timestamps: true
});

export default mongoose.model('MenuRating', menuRatingSchema);
