const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Ingredients = require('../models/Ingredients'); // Adicionei essa linha

// Criar produto
router.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(400).json({ error: error.message });
    }
});

// Listar todos os produtos com ingredientes
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Ingredients, as: 'ingredients' }]
        });
        // Formatar a resposta para incluir apenas os campos desejados
        const formattedProducts = products.map(product => {
            return {
                id: product.id,
                nome: product.nome,
                descricao: product.descricao,
                idImagem: product.idImagem,
                valor: product.valor,
                categoria: product.categoria,
                idComplementos: product.idComplementos,
                idIngredientes: product.idIngredientes,
                ativo: product.ativo,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                ingredientes: product.ingredients ? product.ingredients : [] 
            };
        });
        res.json(formattedProducts);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Ingredients, as: 'ingredients' }]
        });
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: error.message });
    }
});

// Atualizar produto
router.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await product.update(req.body);
        res.json(product);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(400).json({ error: error.message });
    }
});

// Deletar produto
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
