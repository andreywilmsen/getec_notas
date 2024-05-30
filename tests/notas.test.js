let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainNote = {
    produtor: "João Barbosa",
    produto: "Batata Doce",
    qtd: 23,
    un: "CX"
};

describe("Servidor", function () {
    it("Deve se conectar a porta 8080", async () => {
        return request.get("/test_note")
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            });
    });
})

describe("Notas", function () {
    it("Deve acessar a rota de registro", async () => {
        return request.post("/register_note")
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            });
    });
    it("Deve registrar uma nota fiscal", async (req, res) => {
        return request.post("/register_note").send(mainNote)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Nota registrada com sucesso!");
            }).catch(err => {
                throw err;
            })
    })
})

afterAll((done) => {
    server.close(done);
});