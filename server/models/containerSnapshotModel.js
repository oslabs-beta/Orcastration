const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const containerSnapshotSchema = new Schema(
  {
    UUID: { type: String, unique: true },
    containerList: [],
  },
  { minimize: false }
);

module.exports = mongoose.model('ContainerSnapshot', containerSnapshotSchema);
