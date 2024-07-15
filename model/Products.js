const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/db'); // Supondo que este seja a sua instância do Sequelize

const Produto = db.define('divtec_pesosprodutos', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peso_equivalente_kg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unidades_texto: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "divtec_pesosprodutos", // Nome da tabela no banco de dados
    freezeTableName: true, // Impede que o Sequelize modifique o nome da tabela
    timestamps: false, // Se não houver colunas createdAt e updatedAt 
});

module.exports = Produto;
