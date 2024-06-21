const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/db'); // Supondo que este seja a sua instância do Sequelize

const Produto = db.define('Produto', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    und: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false // Desabilita createdAt e updatedAt
});

module.exports = Produto;
