const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Cliente = require('../models/Cliente');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate(['user', 'tasks']);

    return res.send({ clientes });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading clientes' });
  }
});

router.get('/:clienteId', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.clienteId).populate(['user', 'tasks']);

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading cliente' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const cliente = await Cliente.create({ title, description, user: req.userId });

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, cliente: cliente._id });

      await projectTask.save();

      cliente.tasks.push(projectTask);
    }));

    await cliente.save();

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new cliente' });
  }
});

router.put('/:clienteId', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const cliente = await Cliente.findByIdAndUpdate(req.params.clienteId, {
      title,
      description
    }, { new: true });

    cliente.tasks = [];
    await Task.remove({ cliente: cliente._id });

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, cliente: cliente._id });

      await projectTask.save();

      cliente.tasks.push(projectTask);
    }));

    await cliente.save();

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ error: 'Error updating cliente' });
  }
});

router.delete('/:clienteId', async (req, res) => {
  try {
    await Cliente.findByIdAndRemove(req.params.clienteId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting cliente' });
  }
});

module.exports = app => app.use('/clientes', router);
