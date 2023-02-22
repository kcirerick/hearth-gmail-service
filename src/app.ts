import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';

const express = require("express");
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my app! /n To log-in, navigate to https://localhost:3000/auth/google/');
});

app.use('/auth/google', authRoutes);

app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
