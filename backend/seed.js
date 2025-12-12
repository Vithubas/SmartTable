import mongoose from 'mongoose';
import Menu from './models/Menu.js';
import dotenv from 'dotenv';
dotenv.config();

const sampleMenu = [
    {
        name: 'Classic Bruschetta',
        price: 299,
        category: 'Appetizer',
        image: 'bruschetta.png',
        description: 'Toasted baguette slices topped with a fresh mixture of diced tomatoes, garlic, basil, and extra virgin olive oil.'
    },
    {
        name: 'Spicy Calamari',
        price: 499,
        category: 'Appetizer',
        image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80',
        description: 'Crispy fried calamari rings tossed with chili flakes and served with zesty marinara sauce.'
    },
    {
        name: 'Mushroom Arancini',
        price: 349,
        category: 'Appetizer',
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80',
        description: 'Crispy risotto balls stuffed with wild mushrooms and mozzarella, served with truffle aioli.'
    },
    {
        name: 'Pasta Carbonara',
        price: 599,
        category: 'Main Course',
        image: 'pasta.png',
        description: 'Authentic Roman pasta dish with egg yolk, pecorino cheese, guanciale, and black pepper.'
    },
    {
        name: 'Grilled Salmon',
        price: 899,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1580476262798-565d3d6b0b42?w=800&q=80',
        description: 'Fresh Atlantic salmon fillet grilled to perfection, served with asparagus and lemon butter sauce.'
    },
    {
        name: 'Truffle Mushroom Risotto',
        price: 649,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
        description: 'Creamy Arborio rice cooked with wild mushrooms, parmesan cheese, and drizzled with truffle oil.'
    },
    {
        name: 'Classic Tiramisu',
        price: 399,
        category: 'Dessert',
        image: 'tiramisu.png',
        description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.'
    },
    {
        name: 'Chocolate Lava Cake',
        price: 349,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1617305855068-154df66759c8?w=800&q=80',
        description: 'Warm chocolate cake with a molten chocolate center, served with vanilla bean ice cream.'
    },
    {
        name: 'Sunset Cocktail',
        price: 499,
        category: 'Beverage',
        image: 'cocktail.png',
        description: 'A refreshing blend of orange, vodka, and grenadine, creating a beautiful sunset gradient.'
    },
    {
        name: 'Berry Mojito',
        price: 399,
        category: 'Beverage',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
        description: 'Fresh mint, lime, and mixed berries muddled with white rum and sparkling soda.'
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Menu.deleteMany({}); // Clear existing menu
        await Menu.insertMany(sampleMenu);
        console.log('Menu seeded successfully');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error seeding database:', err);
        process.exit(1);
    });
