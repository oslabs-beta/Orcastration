const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Create Mongoose schema for 'ContainerSnapshot' model
Schema will have a UUID and containerList field that stores a snapshot of the list of containers active in the user's Docker Swarm
 The universally unique identifier (UUID) will be used in an event source to retrieve data
*/
const containerSnapshotSchema = new Schema(
  {
    UUID: { type: String, unique: true },
    containerList: [],
  },
  { minimize: false }
);

module.exports = mongoose.model('ContainerSnapshot', containerSnapshotSchema);
