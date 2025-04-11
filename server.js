// Import the cors package at the top of your file
const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS - place this before other middleware
app.use(cors({
  origin: [
    'http://localhost:3000',                  // Development frontend
    'https://test.bookid.ee',                 // Production frontend
    'https://unibetkart.zone.ee'              // Another production domain if needed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true                           // Allow cookies and credentials
}));

// For handling preflight requests
app.options('*', cors());