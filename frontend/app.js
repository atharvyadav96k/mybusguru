const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const axios = require('axios')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register route
app.get('/api/org/register', (req, res) => {
    res.render("register");
});

const API = process.env.API;
app.post('/api/org/register', async (req, res) => {
  const { name, code, phone, address, password } = req.body;

  console.log('Received organization registration:', {
    name, code, phone, address, password
  });

  try {
    const response = await axios.post(API, {
      name,
      code,
      phone,
      address,
      password
    });

    console.log('API response:', response.data);
    res.send('Organization registered successfully!');
  } catch (error) {
    console.error('Error sending data to API:', error.message);
    res.status(500).send('Failed to register organization.');
  }
});


//Login route
app.get('/api/org/login',(req,res)=>{
    res.render("login");
})

//sample data
// const users = [
//   { code: 'ABC123', password: 'password123', token: 'fake-jwt-token', redirectUrl: '/api/org/register' }
// ];
app.post('/api/org/login', (req, res) => {
  const { code, password } = req.body;

  if (!code || !password) {
    return res.status(400).json({ message: 'Code and password are required.' });
  }

//   const user = users.find(
//     (u) => u.code === code.toUpperCase() && u.password === password
//   );

  if (user) {
    return res.status(200).json({
      message: 'Login successful',
      token: user.token,
      redirectUrl: user.redirectUrl
    });
  } else {
    return res.status(401).json({ message: 'Invalid code or password.' });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
