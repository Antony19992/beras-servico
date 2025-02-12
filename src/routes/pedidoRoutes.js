const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const Pedido = require('../models/Pedido');
const { authenticateToken } = require('./auth'); 

router.get('/pedidos', authenticateToken, async (req, res) => {
    console.log("Rota de listagem de pedidos chamada");
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
});

router.get('/pedidos/:id', authenticateToken, async (req, res) => {
    console.log("Rota de busca por ID chamada com ID:", req.params.id);
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado para o ID fornecido' });
        }
        res.json(pedido);
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
});

router.post('/pedido', authenticateToken, async (req, res) => {
    console.log("Requisição recebida:", req.body);
    try {
        const { clienteId, statusId, itens } = req.body;

        if (!itens || itens.length === 0) {
            return res.status(400).json({ error: 'Itens são obrigatórios' });
        }

        const produtos = await Product.findAll({
            where: { id: itens }
        });

        if (produtos.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos' });
        }

        // Verifica se todos os produtos têm preço definido
        const total = produtos.reduce((acc, produto) => {
            if (produto.valor == null) {
                throw new Error('Produto sem preço definido');
            }
            return acc + produto.valor;
        }, 0);

        console.log("Total calculado:", total); // Log do total calculado

        const numero = `PED-${Date.now()}`;

        const pedido = await Pedido.create({
            clienteId,
            statusId,
            numero,
            dataHora: new Date(),
            itens,
            total
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro ao criar pedido: ' + error.message });
    }
});

router.put('/pedido/:id', authenticateToken, async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        await pedido.update(req.body);
        res.json(pedido);
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
});

router.delete('/pedido/:id', authenticateToken, async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        await pedido.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ error: 'Erro ao deletar pedido' });
    }
});

router.get('/pedidos/:clienteId', authenticateToken, async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: { clienteId: req.params.clienteId }
        });
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos por cliente:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos por cliente' });
    }
});

module.exports = router;
