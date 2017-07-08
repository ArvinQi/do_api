'use strict';

// Dependencies
const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
const Database = require('../../../config/database');

AutoIncrement.initialize(Database);

const TaskSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  },
  estimate: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    enum: ['1', '2', '3', '4'],
    default: ['1'],
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false,
    required: false
  },
  // isShared: {
  //   type: Boolean,
  //   default: false,
  //   required: false
  // },
  // finishedByWho: {
  //   type: Number,
  //   required: false
  // },
  isAssign: {
    type: Boolean,
    default: false,
    required: false
  },
  order:{
    type: Number,
    required: false
  }
});

TaskSchema.plugin(AutoIncrement.plugin, {
  model: 'Task',
  field: '_id'
});

module.exports = Mongoose.model('task', TaskSchema);