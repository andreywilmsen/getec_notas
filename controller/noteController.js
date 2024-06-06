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
    deleteTestController: async (req, res) => {
        try {
            let response = await noteService.deleteTestService(req, res);
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).send("Ocorreu um erro ao deletar a nota de teste");
        }
    },
    getController: async (req, res) => {
        try {
            let response = await noteService.getService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response.emptySearch === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).json({ msg: "Ocorreu um erro no register controller" })
        }
    },
    registerController: async (req, res) => {
        try {
            let response = await noteService.registerService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).json({ msg: "Ocorreu um erro no register controller" })
        }
    },
    editController: async (req, res) => {
        try {
            let response = await noteService.editService(req, res);
            if (response.isFinded === false) return res.status(400).json({ msg: response.msg });
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).json({ msg: "Ocorreu um erro no edit controller" })
        }
    }
}


module.exports = noteController;