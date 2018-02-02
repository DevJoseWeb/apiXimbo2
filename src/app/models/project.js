const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema(
   {
    title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  //*****************************************USUARIO */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  //*******************************************TASKS */
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  usePushEach: true
},
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
