const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("cad_usuarios", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "cad_usuarios", // Nome da tabela no banco de dados
    freezeTableName: true, // Impede que o Sequelize modifique o nome da tabela
    timestamps: false, // Se não houver colunas createdAt e updatedAt 
}
);