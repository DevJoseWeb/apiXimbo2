const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const RepeticoesSchema = new mongoose.Schema({
  nome: {
    type: String
    
  },
  acada: {
    type: String
    
  },
  ate: {
    type: String
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  agenda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agenda',
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
 },
 {
  usePushEach: true
},
);

const Repeticoes = mongoose.model('Repeticoes', RepeticoesSchema);

module.exports = Repeticoes;
