let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainNote = {
    data: '24/06/2022', // DATA DO LANÇAMENTO DA NOTA
    codigo_nf: '21855', // NUMERO DA NF
    matricula: "5568312", // MATRICULA DO PRODUTOR/ATACADISTA
    produtor: "LB",
    cidade: '025123', // CÓDIGO DO MUNICIPIO
    num_produto: '256632', // CÓDIGO DO PRODUTO
    produto: "Repolho",
    qtd: 2, // QUANTIDADE
    un: 'SACO', // UNIDADE
    peso: 23 // SEMPRE EM KILOS
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
});

describe("Notas", function () {
    describe("Leitura de notas", function () {
        it("Deve ler todas as notas registradas pelo mês", async () => {
            let searchDate = { searchDate: "2023" };

            return request.get("/get_notes").send(searchDate)
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.msg).toEqual("Notas capturadas com sucesso!");
                }).catch(err => {
                    throw err;
                });
        });
    });

    describe("Registro de notas", function () {
        it("Deve registrar uma nota fiscal", async () => {
            return request.post("/register_note").send(mainNote)
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.msg).toEqual("Nota registrada com sucesso!");
                }).catch(err => {
                    throw err;
                });
        });
        it("Deve impedir o registro uma nota fiscal com valores vazios", async () => {
            let note = { data: '', codigo_nf: '', matricula: '', produtor: '', cidade: '', num_produto: '', produto: '', qtd: '', un: '', peso: '' };

            return request.post("/register_note").send(note)
                .then(res => {
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.msg).toEqual("Por favor, preencha todos os dados para registro!");
                }).catch(err => {
                    throw err;
                });
        });
    });

    describe("Edição de notas", function () {
        it("Deve editar uma nota fiscal", async () => {

            let note = {
                data: '.', // DATA DO LANÇAMENTO DA NOTA
                codigo_nf: '2', // NUMERO DA NF
                matricula: ".", // MATRICULA DO PRODUTOR/ATACADISTA
                produtor: ".",
                cidade: '.', // CÓDIGO DO MUNICIPIO
                num_produto: '.', // CÓDIGO DO PRODUTO
                produto: ".",
                qtd: 2, // QUANTIDADE
                un: '.', // UNIDADE
                peso: 23 // SEMPRE EM KILOS
            };

            return request.put("/edit_note").send(note)
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.msg).toEqual("Nota editada com sucesso!");
                }).catch(err => {
                    throw err;
                });
        });

        it("Deve impedir que edite uma nota fiscal com valores vazios", async () => {
            let note = { data: "", codigo_nf: "2", matricula: "", produtor: "", cidade: "", num_produto: "", produto: "", qtd: "", un: '', peso: "" };

            return request.put("/edit_note").send(note)
                .then(res => {
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toEqual("Por favor, preencha todos os dados para a edição!");
                }).catch(err => {
                    throw err;
                })
        });

        it("Deve impedir que edite uma nota fiscal não econtrada na base de dados", async () => {
            let note = {
                data: ".", // DATA DO LANÇAMENTO DA NOTA
                codigo_nf: "1", // NUMERO DA NF
                matricula: ".", // MATRICULA DO PRODUTOR/ATACADISTA
                produtor: ".",
                cidade: ".", // CÓDIGO DO MUNICIPIO
                num_produto: ".", // CÓDIGO DO PRODUTO
                produto: ".",
                qtd: 7, // QUANTIDADE
                un: ".", // UNIDADE
                peso: 9 // SEMPRE EM KILOS
            };
            return request.put("/edit_note").send(note)
                .then(res => {
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toEqual("Nota fiscal não encontrada!");
                }).catch(err => {
                    throw err;
                })
        });
    });
});

// describe("Produtores", function () {
//     it("Deve registrar um novo produtor", async () => {
//         return request.post("/register_producer").send(mainProducer)
//             .then(res => {
//                 expect(res.statusCode).toEqual(200);
//             }).catch(err => {
//                 throw err;
//             })
//     })
// })

afterAll(() => {
    return request.delete("/delete_note_test/21855").then(res => {
        console.log(res.msg);
    }).catch(err => {
        console.log(err);
    })
})

afterAll((done) => {
    server.close(done);
});