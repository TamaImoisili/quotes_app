// functions/myFunction.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors"; // Import the cors middleware
import { createClient } from '@supabase/supabase-js';

const basePath = "/.netlify/functions/api";
const app = express();

// Use cors middleware
app.use(cors());

const router = express.Router(); // Create an instance of a router

router.get(`/hello`, (req, res) => {
  res.json({ message: "Hello from the serverless!" });
});

router.get(`/getRandom`, async (req, res) =>{
  try {
    const apiUrl = 'https://api.quotable.io/random';
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Quotable API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// signin route
router.get('/signin', (req, res) => {
  res.json({ message: "Hello from the serverless!" });
});

// Use the router with the specified base path
app.use(basePath, router);

export const handler = serverless(app);
