require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

sequelize.authenticate()
    .then(() => console.log('🟢 Conexão com PostgreSQL estabelecida com sucesso!'))
    .catch(err => console.error('🔴 Erro ao conectar ao banco:', err.message));

const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);

// Conectar ao PostgreSQL e iniciar o servidor
sequelize.sync()
    .then(() => {
        console.log('PostgreSQL sincronizado! -> ', sequelize.getDatabaseName());
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error('Erro ao conectar ao banco:', err));

