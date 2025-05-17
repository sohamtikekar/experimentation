const express = require('express');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error loading page');
      return;
    }
    const html = data.replace('API_KEY_PLACEHOLDER', process.env.GOOGLE_API_KEY);
    res.send(html);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
