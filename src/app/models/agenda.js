const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const AgendaSchema = new mongoose.Schema({

  players: {
    type: String,
    require: true,
  },
  inicio: {
    type: String
  },
  termino: {
    type: String
  },
  layout: {
    type: String
  },
  sequencia: {
    type: String
  },
  prioridade: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  //********************************REPETIÇÕES */
  repeticoes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repeticoes',
  }],

//***************************************USER */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
},
{
  usePushEach: true
},
);

const Agenda = mongoose.model('Agenda', AgendaSchema);

module.exports = Agenda;
