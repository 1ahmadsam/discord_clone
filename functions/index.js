const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const Message = require('./models/message');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

// middlewares
app.use(cors());
app.use(express.json());

// API routes
app.get('/', (req, res) => res.status(200).send('hello world2'));

app.post('/messages', async (req, res) => {
  const body = req.body;
  const message = new Message({
    message: body.message,
    profilePic: body.profilePic,
    username: body.username,
    image: body.image,
    date: Date.now(),
  });

  if (message.message) {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage.toJSON());
  } else {
    return res.status(401).json({ error: 'message was not sent' });
  }
});
// Listen command
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
