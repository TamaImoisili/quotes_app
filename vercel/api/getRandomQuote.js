module.exports = async (req, res) => {
    try {
      const apiUrl = 'https://api.quotable.io/random';
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from Quotable API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};