require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/routes');
const path = require('path');
const sequelize = require('sequelize')
// const db = require('./db/conn'); // MONGOOSE
const db = require("./db/db"); // SEQUELIZE


app.use("/", express.json(), router);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Authorization-Token');
    next();
});

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV != "development") {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'), (err) => {
            if (err) return res.status(500).send(err);
        });
    });
}

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

module.exports = server;
