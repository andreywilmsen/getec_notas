let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainUsuario = {
    matricula: "508874",
    nome: "Andrey Wilmsen",
    culturas: ["Batata Doce", "Repolho", "Alho"],
};

describe("Registro de produtor / atacadista", function () {

    it("Deve registrar um produtor / atacadista", async () => {
        return request.post("/register_usuario").send(mainUsuario)
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            });
    });

    it("Deve impedir registrar um produtor / atacadista com dados vazios", async () => {
        return request.post("/register_usuario").send(usuario)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Não é permitido inserir dados vazios!")
            }).catch(err => {
                throw err;
            });
    })
});

afterAll((done) => {
    server.close(done);
});