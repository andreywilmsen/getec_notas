const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("products", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    und: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    peso: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
