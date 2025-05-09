// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'usuarios', // 👈 nome exato da tabela no banco
    timestamps: false
});

module.exports = Usuario;
