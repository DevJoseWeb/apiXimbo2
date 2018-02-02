const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Agenda = require('../models/Agenda');
const Repeticoes = require('../models/Repeticoes');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const agendas = await Agenda.find().populate(['user', 'repeticoes']);
    return res.send({ agendas });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar  Agenda' });
  }
});

router.get('/:agendaId', async (req, res) => {
  try {
    const agendas = await Agenda.findById(req.params.agendaId).populate(['user', 'repeticoes']);
    return res.send({ agendas });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading repeticoes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { players, inicio, termino, layout, sequencia, prioridade, repeticoes  } = req.body;

    const agenda = await Agenda.create({ players, inicio, termino, layout, sequencia,
       prioridade, user: req.userId });

    await Promise.all(repeticoes.map(async repeticoes => {
      
      const agendaRepeticoes = new Repeticoes({ ...repeticoes, agenda: agenda._id });

      await agendaRepeticoes.save();

      agenda.repeticoes.push(agendaRepeticoes);
    }));

    await agenda.save();

    return res.send({ agenda });
  } catch (err) {
    return res.status(400).send({ error: 'Error criar uma nova  agenda' });
  }
});

router.put('/:agendaId', async (req, res) => {
  try {
    const { players, inicio, termino, layout, sequencia, prioridade, repeticoes } = req.body;

    const agenda = await Agenda.findByIdAndUpdate(req.params.agendaId, {
      players,
      inicio,
      termino,
      layout,
      sequencia,
      prioridade

    }, { new: true });

    agenda.repeticoes = [];
    await Repeticoes.remove({ agenda: agenda._id });

    await Promise.all(repeticoes.map(async repeticoes => {
      const agendaRepeticoes = new Repeticoes({ ...repeticoes, agenda: agenda._id });

      await agendaRepeticoes.save();

      agenda.repeticoes.push(agendaRepeticoes);
    }));

    await agenda.save();

    return res.send({ agenda });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro atualizar agenda' });
  }
});

router.delete('/:agendaId', async (req, res) => {
  try {
    await Agenda.findByIdAndRemove(req.params.agendaId);

    return res.send();
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error deleting repeticoes' });
  }
});

module.exports = app => app.use('/agendas', router);
