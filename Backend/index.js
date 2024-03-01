require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db');

const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors());
app.use(express.json());
//routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
// Serving the profile files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Catch-all route for undefined routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

//db connection
connectDB();
//listening to the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
