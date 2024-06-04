let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainNote = {
    data: '24/06/2022', // DATA DO LANÇAMENTO DA NOTA
    codigo_nf: '31205', // NUMERO DA NF
    matricula: "0106225", // MATRICULA DO PRODUTOR/ATACADISTA
    cidade: '056623', // CÓDIGO DO MUNICIPIO
    produto: '256632', // CÓDIGO DO PROTUDO
    qtd: 23, // QUANTIDADE
    un: 'CX', // UNIDADE
    peso: 98 // SEMPRE EM KILOS
};

describe("Servidor", function () {
    it("Deve se conectar a porta 8080", async () => {
        return request.get("/test_note")
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Conectado ao servidor")
            }).catch(err => {
                throw err;
            });
    });
})

describe("Notas", function () {
    it("Deve registrar uma nota fiscal", async () => {
        return request.post("/register_note").send(mainNote)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Nota registrada com sucesso!");
            }).catch(err => {
                throw err;
            })
    });
    it("Deve impedir o registro uma nota fiscal com valores vazios", async () => {
        let note = { data: '', codigo_nf: '', matricula: '', cidade: '', produto: '', qtd: '', un: '', peso: '' };

        return request.post("/register_note").send(note)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Por favor, preencha todos os dados para registro!");
            }).catch(err => {
                throw err;
            })
    });
})

afterAll((done) => {
    server.close(done);
});