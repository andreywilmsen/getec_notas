const { Sequelize } = require("sequelize");
const db = require("../db/db"); // Assuming this is your Sequelize instance

module.exports = db.define("notes", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    codigo_nf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    produtor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    num_produto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qtd: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    un: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    peso: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});
