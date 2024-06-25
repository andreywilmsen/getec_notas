const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("usuarios", {
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
    culturas: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { 
    timestamps: false 
}
);