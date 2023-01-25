const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Create Mongoose schema for 'Session' model
Schema will have a cookieID and createdAt field that will be used to handle a session for a logged in user
*/
const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 10, default: Date.now }
  });
  
  module.exports = mongoose.model('Session', sessionSchema);