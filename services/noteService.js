require('dotenv').config();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const Note = require('../model/Note');

const noteService = {
    testService: (req, res) => {
        let response = "Hello from GET NOTE";
        return { response };
    },
    registerNoteService: async (req, res) => {
        let produtor = req.body.produtor;
        let produto = req.body.produto;
        let qtd = req.body.qtd;
        let un = req.body.un;

        // console.log(produtor, produto, qtd, un);
        try {
            let newNote = await Note.create({
                produtor,
                produto,
                qtd,
                un
            });
            if (newNote) return { status: success, response: newNote, msg: "Nota registrada com sucesso!" };
        } catch (err) {
            console.log(err)
            if (!newNote) return { status: failed };
        }
    }
};

module.exports = noteService;