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

        let usuario = { matricula: "", nome: "", culturas: "" };

        return request.post("/register_usuario").send(usuario)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Não é permitido inserir dados vazios!")
            }).catch(err => {
                throw err;
            });
    });
});
describe("Leitura de produtores / atacadistas", function () {
    it("Deve buscar um produtor / atacadista pelo nome", async () => {
        let search = { searchMechanism: "name", search: "Andrey Wilmsen" };

        return request.get("/get_usuarios").send(search)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Busca efetuada com sucesso!");
            }).catch(err => {
                throw err;
            });
    });

    it("Deve impedir que seja feita uma busca com dados vazios", async () => {
        let search = { searchMechanism: "", search: "" };

        return request.get("/get_usuarios").send(search)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Não é permitido efetuar busca com dados vazios!");
            }).catch(err => {
                throw err;
            });
    });
});
describe("Edição de produtores / atacadistas", function () {
    it("Deve editar um usuario mediante matricula", async () => {
        let usuario = { matricula: "508874", nome: "João Barbosa", culturas: ["Bergamota", "Pinhão", "Laranja"] }

        return request.put("/edit_usuarios").send(usuario)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Usuario editado com sucesso!");
            }).catch(err => {
                throw err;
            });
    });
});

// afterAll(() => {
//     return request.delete("/delete_usuario_test/508874").then(res => {
//     }).catch(err => {
//         throw err;
//     });
// });

afterAll((done) => {
    server.close(done);
});