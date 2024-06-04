const noteService = require('../services/noteService');

const noteController = {
    testController: async (req, res) => {
        try {
            let response = await noteService.testService(req, res);
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota GET NOTE");
        }
    },
    registerController: async (req, res) => {
        try {
            let response = await noteService.registerNoteService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).json({ msg: "Ocorreu um erro no register controller" })
        }
    }
}


module.exports = noteController;