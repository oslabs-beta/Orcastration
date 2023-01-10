const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

// import routers
const dockerContainerRouter = require('./routes/dockerContainer');
const dockerSwarmRouter = require('./routes/dockerSwarm');
const userRouter = require('./routes/user');

// parses JSON from incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../app')));

// define route handlers
app.use('/user', userRouter);

app.use('/dockerCont', dockerContainerRouter);

app.use('/dockerSwarm', dockerSwarmRouter);

// define catch all error handler
app.get('*', (req, res) => {
  return res.status(400).send('This page does not exist. Try again!');
});

// define catch all global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// port listener
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
