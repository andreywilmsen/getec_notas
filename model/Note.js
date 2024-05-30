const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("notes", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    produtor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    qtd: {
        type: Sequelize.INTEGER, // Assuming qtd is an integer value
        allowNull: false,
        unique: true,
    },
    un: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});
