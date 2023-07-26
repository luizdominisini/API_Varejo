const Sequelize = require('sequelize');
const database = require('../db/db');

const Usuario = database.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { database, modelName: 'usuario', tableName: 'usuarios' });

module.exports = Usuario;