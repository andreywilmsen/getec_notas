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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    volume: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome_usuario_sistema: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tableName: "divtec_notasfiscais", // Nome da tabela no banco de dados
    freezeTableName: true, // Impede que o Sequelize modifique o nome da tabela
    timestamps: false, // Se não houver colunas createdAt e updatedAt 
});
