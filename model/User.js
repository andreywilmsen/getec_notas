const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db"); // Sua instância do Sequelize

const CadLogin = db.define("cad_login", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: "cad_login", // Nome da tabela no banco de dados
    freezeTableName: true, // Impede que o Sequelize modifique o nome da tabela
    timestamps: false, // Se não houver colunas createdAt e updatedAt
});

module.exports = CadLogin;
