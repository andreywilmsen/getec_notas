const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("divtec_notasfiscais", {
    identificador: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    numeroNotaFiscal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    destino: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    procedencia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unidade_peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    nome_usuario_sistema: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "divtec_notasfiscais",
    freezeTableName: true,
    timestamps: false
});
