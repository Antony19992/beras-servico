const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = 'sua_chave_secreta'; 

// Middleware para verificar o token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token ausente' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken, router, SECRET_KEY };
