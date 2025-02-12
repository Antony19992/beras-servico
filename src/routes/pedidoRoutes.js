const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const Pedido = require('../models/Pedido');
const StatusPedido = require('../models/StatusPedido');
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

router.get('/pedidosporid/:id', authenticateToken, async (req, res) => {
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

router.get('/pedidos/:clienteId', authenticateToken, async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: { clienteId: req.params.clienteId }
        });

        const pedidosComProdutos = await Promise.all(pedidos.map(async (pedido) => {
            const produtos = await Promise.all(pedido.itens.map(async (item) => {
                const produto = await Product.findByPk(item.productId);
                if (!produto) {
                    throw new Error(`Produto com ID ${item.productId} não encontrado.`);
                }
                return {
                    ...produto.toJSON(),
                    quantity: item.quantity // Adiciona a quantidade ao produto
                };
            }));
            return {
                ...pedido.toJSON(),
                produtos // Adiciona os produtos ao pedido
            };
        }));

        res.json(pedidosComProdutos);
    } catch (error) {
        console.error('Erro ao listar pedidos por cliente:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos por cliente' });
    }
});

router.post('/pedidos', authenticateToken, async (req, res) => {
    const { clienteId, statusId, itens } = req.body; // itens deve ser um array de objetos

    try {
        let totalFinal = 0;
        for (const item of itens) {
            const produto = await Product.findByPk(item.productId);
            if (!produto) {
                throw new Error(`Produto com ID ${item.productId} não encontrado.`);
            }
            let somaProdutos = produto.valor * item.quantity;
            totalFinal += somaProdutos; 
        }

        console.log("Total calculado:", totalFinal);

        const numero = `PED-${Date.now()}`;

        const pedido = await Pedido.create({
            clienteId,
            statusId,
            numero,
            dataHora: new Date(),
            itens, 
            total: totalFinal 
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
});

router.put('/pedidos/:id', authenticateToken, async (req, res) => {
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

router.delete('/pedidos/:id', authenticateToken, async (req, res) => {
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

module.exports = router;
