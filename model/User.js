const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("cad_login", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    permission: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});