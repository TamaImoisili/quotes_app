const express = require('express');
const cors = require('cors');   
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper function to get the server URL based on environment
const getServerUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use your Heroku app URL when deployed
    return 'https://tama-imoisili-quotes-app-2cb0e821d0e8.herokuapp.com';
  } else {
    // Use localhost when in local development
    return `http://localhost:${PORT}`;
  }
};

app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js backend!');
});

app.get('/getRandomQuote', async (req, res) => {
    try {
      const apiUrl = 'https://api.quotable.io/random';
      const response = await fetch(apiUrl);
      console.log(response);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from Quotable API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/getBackground', async (req, res) => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=yQ9KO4B4hQ3PB68zH_p9329REx24t6hS0fn5eThGStw`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching author image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${getServerUrl()}`);
});