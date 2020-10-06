const functions = require('firebase-functions');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
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

const typeDefs = gql`
  type Message {
    message: String!
    profilePic: String
    username: String
    image: String
    date: String!
    id: ID!
  }
  type Query {
    allMessages: [Message!]!
  }
  type Mutation {
    addMessage(
      message: String!
      profilePic: String
      username: String!
      image: String
    ): Message
  }
`;

const resolvers = {
  Query: {
    allMessages: () => Message.find({}),
  },
  Mutation: {
    addMessage: async (root, args) => {
      const message = new Message({ ...args, date: Date.now() });
      const savedMessage = await message.save();
      return savedMessage;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
// middlewares
app.use(cors());
app.use(express.json());
server.applyMiddleware({ app });
// API routes
// app.get('/messages', async (req, res) => {
//   const returnedMessages = await Message.find({});
//   return res.status(200).json(returnedMessages);
// });

// app.post('/messages', async (req, res) => {
//   const body = req.body;
//   const message = new Message({
//     message: body.message,
//     profilePic: body.profilePic,
//     username: body.username,
//     image: body.image,
//     date: Date.now(),
//   });

//   if (message.message) {
//     const savedMessage = await message.save();
//     res.status(201).json(savedMessage.toJSON());
//   } else {
//     return res.status(401).json({ error: 'message was not sent' });
//   }
// });
// Listen command
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
