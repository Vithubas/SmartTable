import { useState } from 'react';
import axios from 'axios';

function FeedbackModal({ isOpen, onClose, orderId }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/feedback', {
                customerName: 'Guest User', // Could be from order context if available
                rating,
                comment,
                source: 'web'
            });
            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
                setRating(5);
                setComment('');
            }, 2000);
        } catch (err) {
            console.error(err);
            alert('Failed to submit feedback');
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-dark border border-primary/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {submitted ? '🎉 Thank You!' : 'Rate Your Experience'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                {submitted ? (
                    <div className="text-center py-8">
                        <p className="text-xl text-green-400 mb-2">Feedback Received!</p>
                        <p className="text-gray-400">We appreciate your support.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-4xl transition-transform hover:scale-125 focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-600'
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <div className="text-center text-primary font-semibold">
                            {rating === 5 ? 'Excellent! 🤩' :
                                rating === 4 ? 'Good! 🙂' :
                                    rating === 3 ? 'Okay 😐' :
                                        rating === 2 ? 'Could be better 😕' : 'Poor 😞'}
                        </div>

                        <textarea
                            className="input-field h-32 resize-none"
                            placeholder="Tell us what you liked or how we can improve..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        <button type="submit" className="btn-primary w-full">
                            Submit Review
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default FeedbackModal;
