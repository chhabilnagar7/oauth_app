import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session'
import authRoutes from './routes/authRoutes.js';
import oauthRoutes from './config/oauthconfig.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api',authRoutes);
app.use('/auth',oauthRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log('server running');
})