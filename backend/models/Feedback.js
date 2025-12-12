import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
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
    source: {
        type: String,
        enum: ['web', 'chatbot'],
        default: 'web'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Feedback', feedbackSchema);
