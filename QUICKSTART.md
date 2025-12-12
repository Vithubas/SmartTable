# Smart Table Reservation System - Quick Start Guide

## 🚀 Quick Setup

### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas and update the connection string in backend/.env
```

### Step 2: Start Backend
```bash
cd backend
npm start
```
✅ Backend should be running on http://localhost:5000

### Step 3: Fix Frontend Issue (If Needed)

The frontend has a runtime error. Here are the solutions:

#### Option A: Downgrade React Router (Recommended)
```bash
cd frontend
npm uninstall react-router-dom
npm install react-router-dom@6.18.0
npm run dev
```

#### Option B: Check for Errors in Browser
```bash
cd frontend
npm run dev
# Open http://localhost:3000 in browser
# Check browser console for detailed error message
```

#### Option C: Rebuild from Scratch
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Step 4: Add Sample Data

Once the frontend is running, go to http://localhost:3000/admin and add:

**Sample Tables:**
- Table 1, 2 seats, Available
- Table 2, 4 seats, Available
- Table 3, 6 seats, Available
- Table 4, 8 seats, Available

**Sample Menu Items:**
```
Appetizer:
- Bruschetta, ₹299, https://via.placeholder.com/300x200?text=Bruschetta
- Spring Rolls, ₹249, https://via.placeholder.com/300x200?text=Spring+Rolls

Main Course:
- Pasta Carbonara, ₹599, https://via.placeholder.com/300x200?text=Pasta
- Grilled Chicken, ₹699, https://via.placeholder.com/300x200?text=Chicken

Dessert:
- Tiramisu, ₹399, https://via.placeholder.com/300x200?text=Tiramisu
- Chocolate Cake, ₹349, https://via.placeholder.com/300x200?text=Cake

Beverage:
- Fresh Juice, ₹149, https://via.placeholder.com/300x200?text=Juice
- Coffee, ₹99, https://via.placeholder.com/300x200?text=Coffee
```

## 🎯 Testing the Application

### Customer Flow
1. Visit http://localhost:3000
2. Click "Click for Gravity Effect!" to see the animation
3. Navigate to "Tables" to view available tables
4. Navigate to "Menu" to browse dishes
5. Navigate to "Reserve" to book a table
6. Fill in your details and submit

### Admin Flow
1. Visit http://localhost:3000/admin
2. Add tables using the Tables tab
3. Add menu items using the Menu tab
4. View reservations in the Reservations tab
5. Toggle table availability
6. Delete items as needed

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Start MongoDB service or update .env with MongoDB Atlas URI

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Kill the process using port 5000 or change PORT in .env

### Frontend Issues

**Module Not Found:**
```
Error: Cannot find module 'react-router-dom'
```
Solution: `npm install` in frontend directory

**Vite Runtime Error:**
```
Error in BK3b2jBa.js
```
Solution: Try Option A (downgrade React Router) above

**Blank Page:**
- Check browser console for errors
- Verify backend is running
- Check network tab for failed API calls

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Test**: http://localhost:5000/api/tables

## 🎨 Features to Test

- ✅ Google Gravity animation on homepage
- ✅ Responsive navbar with mobile menu
- ✅ Table availability display
- ✅ Menu category filtering
- ✅ Reservation form validation
- ✅ Admin CRUD operations
- ✅ Real-time table availability updates
- ✅ Orange/Black/White theme throughout

## 📝 API Endpoints for Testing

### Tables
```bash
# Get all tables
curl http://localhost:5000/api/tables

# Add a table
curl -X POST http://localhost:5000/api/tables \
  -H "Content-Type: application/json" \
  -d '{"tableNumber": 1, "seats": 4, "isAvailable": true}'
```

### Menu
```bash
# Get menu
curl http://localhost:5000/api/menu

# Add menu item
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{"name": "Pasta", "price": 599, "category": "Main Course", "image": "url"}'
```

### Reservations
```bash
# Create reservation
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"customerName": "John Doe", "tableNumber": 1, "date": "2025-12-15", "time": "19:00"}'
```

## 🚀 Deployment Ready

Once everything works locally:

1. **Backend**: Deploy to Railway/Heroku
2. **Frontend**: Deploy to Vercel/Netlify
3. **Database**: Use MongoDB Atlas for production
4. **Environment**: Update API URLs in production

## 💡 Tips

- Use Chrome DevTools to inspect the orange/black/white theme
- Test responsive design by resizing browser window
- Try the gravity effect multiple times for fun!
- Admin dashboard works without authentication (add auth for production)

Enjoy your restaurant management system! 🍽️
