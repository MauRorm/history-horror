const express = require('express');
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(port);
