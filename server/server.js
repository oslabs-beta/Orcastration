const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './.env' });

/*
Declare MongoDB Atlas URI to connect to MongoDB server
*/
const MONGO_URI = process.env.MONGO_URI;

/*
Connect to MongoDB databse
*/
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'OrcastrationDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/*
Route Handlers:
*/
const dockerContainerRouter = require('./routes/dockerContainerRouter');
const dockerSwarmRouter = require('./routes/dockerSwarmRouter');
const userRouter = require('./routes/user');

/*
Set headers for configuring the browser's same-origin policy and handling CORS for the application
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.status(200);
  next();
});

/*
 Add middleware to parse incoming requsts in JSON format and URL encoded data.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 Handle requests for static files
*/
app.use(express.static(path.resolve(__dirname, '../app')));

/*
 Mount imported route handlers to specific routes
*/
app.use('/user', userRouter);
app.use('/dockerCont', dockerContainerRouter);
app.use('/dockerSwarm', dockerSwarmRouter);

/*
 404 error handler
*/
app.get('*', (req, res) => {
  return res.status(400).send('This page does not exist. Try again!');
});

/*
 Global error handler
*/
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

/*
Start the server to listen for incoming HTTP requests on specified PORT
*/
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
