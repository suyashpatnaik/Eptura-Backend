const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const { OpenAI } = require('openai');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Instantiate OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Allow all origins for dev, restrict in prod
const allowedOrigins = [
  'https://eptura-frontend-12.vercel.app',
  'http://localhost:5173', // for local Vite dev
];

app.use(express.json({ limit: '10mb' }));
app.use(helmet());

// Fixing CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Security & Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Sample endpoint for health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Backend is healthy' });
});

// Add your assistant endpoints here...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});