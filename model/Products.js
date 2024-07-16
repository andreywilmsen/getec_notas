const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/db'); // Supondo que este seja a sua instância do Sequelize

const Produto = db.define('divtec_pesos_produtos', {
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
    quilogramas: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    caixa: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    caixeta: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duzia: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    engradado: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    molho: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sacola: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    saco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    bandeja: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    unidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    outros: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: "divtec_pesos_produtos", // Nome da tabela no banco de dados
    freezeTableName: true, // Impede que o Sequelize modifique o nome da tabela
    timestamps: false, // Se não houver colunas createdAt e updatedAt 
});

module.exports = Produto;
