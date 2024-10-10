const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT ||3000 ;
const cors = require('cors');
var jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.PAYMENT_KEY);
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);


const mongoose = require('mongoose');
app.use(express.json()) ; 
app.use(cors());

const placeRouter = require('./Router/placerouter');

const DB_ID = process.env.DB_ID 
const DB_PASS = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${DB_ID}:${DB_PASS}@tuhin.nxzywfc.mongodb.net/Gateway-Travel?retryWrites=true&w=majority&appName=tuhin`)
.then(() => console.log('MongoDB Connected...'))


app.post('/jwt', (req, res) => {
  const user = req.body;
  console.log(user);

  const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: '24h'
  });
  console.log(token);
  res.send({ token });
});


app.get('/', (req, res) => {
  res.send('server is running')
})
 
app.use('/places', placeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 