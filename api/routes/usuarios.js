// routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Criar usuário
router.post('/', async (req, res) => {
    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Usuario.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });
        const usuarioAtualizado = await Usuario.findByPk(req.params.id);
        res.json(usuarioAtualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Usuario.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
