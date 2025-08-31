const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Only basic routes - no imports
app.get('/', (req, res) => {
  res.json({ message: 'Simple server works!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test works!' });
});

app.listen(5000, () => {
  console.log('Simple test server running on port 5000');
});