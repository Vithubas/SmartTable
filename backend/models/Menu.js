import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300x200?text=Food+Item'
    },
    description: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

export default mongoose.model("Menu", menuSchema);
