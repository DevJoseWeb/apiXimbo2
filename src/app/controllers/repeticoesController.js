const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Repeticoes = require('../models/Repeticoes');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const repeticoess = await Repeticoes.find().populate(['user']);

    return res.send({ repeticoess });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading repeticoess' });
  }
});

router.get('/:repeticoesId', async (req, res) => {
  try {
    const Repeticoes = await Repeticoes.findById(req.params.repeticoesId).populate(['user']);

    return res.send({ Repeticoes });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading Repeticoes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { repeticoes, acada, ate } = req.body;

    const Repeticoes = await Repeticoes.create({  repeticoes, acada, ate, user: req.userId });

    await Repeticoes.save();

    return res.send({ Repeticoes });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new Repeticoes' });
  }
});

router.put('/:repeticoesId', async (req, res) => {
  try {
    const { repeticoes, acada, ate} = req.body;

    const Repeticoes = await Repeticoes.findByIdAndUpdate(req.params.repeticoesId, {
        repeticoes, acada, ate        
    }, { new: true });

     await Repeticoes.save();

    return res.send({ Repeticoes });
  } catch (err) {
    return res.status(400).send({ error: 'Error updating Repeticoes' });
  }
});

router.delete('/:repeticoesId', async (req, res) => {
  try {
    await Repeticoes.findByIdAndRemove(req.params.repeticoesId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting Repeticoes' });
  }
});

module.exports = app => app.use('/repeticoess', router);
