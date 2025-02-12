const express = require('express');
const axios = require('axios');
const router = express.Router();
const { pagbank } = require('../config/config');

// Rota para criar cobrança PIX
router.post('/pix', async (req, res) => {
    const { valor, descricao } = req.body;
    try {
        const response = await axios.post(`${pagbank.baseUrl}/pix`, {
            valor,
            descricao
        }, {
            headers: {
                'Authorization': `Bearer ${pagbank.clientId}:${pagbank.clientSecret}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao criar cobrança PIX:', error.response.data);
        res.status(500).json({ error: 'Erro ao criar cobrança PIX' });
    }
});

module.exports = router;