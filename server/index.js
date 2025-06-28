const { execFile } = require('child_process');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'User already exists' });
  }
  users.push({ email, password });
  res.json({ success: true, message: 'Signup successful!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email && u.password === password)) {
    return res.json({ success: true, message: 'Login successful!' });
  }
  res.json({ success: false, message: 'Invalid credentials' });
});



app.post('/run-cpp', (req, res) => {
  const { source, dest } = req.body;
  execFile('bus_route.exe', [source, dest], (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ success: false, error: stderr.toString() });
    }
    res.json({ success: true, output: stdout.toString() });
  });
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});
