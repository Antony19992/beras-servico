const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./auth');

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro de validação:', error);
    console.error('Erro de validação detalhado:', error.errors);
    res.status(400).json({ error: error.message, details: error.errors });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erro:', error);
    console.error('Erro detalhado:', error);
    res.status(500).json({ error: error.message, details: error });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro:', error);
    console.error('Erro detalhado:', error);
    res.status(500).json({ error: error.message, details: error });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Erro de validação:', error);
    console.error('Erro de validação detalhado:', error.errors);
    res.status(400).json({ error: error.message, details: error.errors });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro:', error);
    console.error('Erro detalhado:', error);
    res.status(500).json({ error: error.message, details: error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email: username } });
      
      if (!user || user.senha !== password) {
          return res.status(400).json({ error: 'Credenciais inválidas' });
      }
      
      const plainUser = JSON.parse(JSON.stringify(user));
    
      delete plainUser.senha; 
      
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      
      const response = {
          clienteId: user.id,
          nome: user.nome,
          token: token
      };
      res.json(response);
  } catch (error) {
      return res.status(500).json({ error: `Erro interno: ${error}` });
  }
});

module.exports = router;