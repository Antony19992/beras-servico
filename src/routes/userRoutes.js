const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar usuário
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

// Listar todos os usuários
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

// Buscar usuário por ID
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

// Atualizar usuário
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

// Deletar usuário
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

// Endpoint de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: username } }); // Alterado para buscar pelo email

    if (!user || user.senha !== password) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // Aqui você pode gerar um token se estiver usando autenticação baseada em token
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;