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
    kg: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cx: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cxt: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dz: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    eng: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    mol: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    scl: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    saco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    bdj: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    und: {
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
