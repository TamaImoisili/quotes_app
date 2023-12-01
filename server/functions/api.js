// functions/myFunction.js
import express from "express";
import serverless from "serverless-http";

const basePath = "/.netlify/functions/api";
const app = express();

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

// Use the router with the specified base path
app.use(basePath, router);

export const handler = serverless(app);
