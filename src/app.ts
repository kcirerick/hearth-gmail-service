import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';

const express = require("express");
const ejs = require("ejs"); // View engine for template rendering.
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my app! To log-in, navigate to http://localhost:3000/auth/google/');
});

app.use('/auth/google', authRoutes);
app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;