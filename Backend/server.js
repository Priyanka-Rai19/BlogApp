
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./Models/dbConnect');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/posts');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

connectDB(() => {
  const PORT = process.env.PORT || 5008;
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
});
