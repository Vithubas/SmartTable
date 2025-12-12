import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

export default mongoose.model("Reservation", reservationSchema);
