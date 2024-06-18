import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';

// Navigation e Location para passar para o AuthService fazer a autenticação e gerenciamento de permissões
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Componente de autenticação
import AuthService from '../services/authService';
import Header from '../components/Header';

// Componentes gerais
import Input from '../components/Input';
import Button from '../components/Button';

// Autocomplete para inputs
import Autocomplete from '../services/Autocomplete';

function AdminPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [notes, setNotes] = useState(false);
    // States de produtor
    const [dataNote, setDataNotes] = useState("");
    const [nfNote, setNfNotes] = useState("");
    const [matriculaNote, setMatriculaNotes] = useState("");
    const [personNote, setPersonNotes] = useState("");
    const [cidadeNote, setCidadeNotes] = useState("");
    // States de produtos
    const [products, setProducts] = useState([]);

    // Atualiza toda vez que atualizar a página e verifica se o token armazenado ainda é válido, caso não, redireciona para a tela de login
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, []);

    function handleNotes() {
        setNotes(!notes);
    };

    function addProduct() {

    };

    return (
        <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <div className="LancarNotas">
                    <h1>Lançar Notas</h1>
                    <hr></hr>

                    {/* LANÇAMENTO DE PRODUTOR */}

                    {!notes && (<div className="inputFieldNotes">

                        <Input placeholder="Data" size="inputMedium" />
                        <Input placeholder="N° Nota Fiscal" size="inputMedium" />
                        <div className="person">
                            <Input placeholder="Matricula" size="inputMedium" />
                            <Input placeholder="Produtor / Atacadista" size="inputMedium" />
                        </div>
                        <Input placeholder="Cidade" size="inputMedium" />
                        <Button click={handleNotes} buttonType="buttonSuccess" name="Avançar" />
                    </div>)}

                    {/* LANÇAMENTO DE PRODUTO */}

                    {notes && (<div className="inputFieldNotes">
                        <div className="person">
                            <Input placeholder="N° Produto" size="inputMedium" />
                            <Input placeholder="Produto" size="inputMedium" />
                        </div>
                        <Input placeholder="Unidade" size="inputMedium" />
                        <Input placeholder="Quantidade" size="inputMedium" />
                        <Button click={addProduct} buttonType="buttonSuccess" name="+" />
                        <div className="listProducts">
                            <div className="extractList">
                                <label><strong>Data:</strong> {dataNote}</label>
                                <label><strong>Nota fiscal:</strong> {nfNote}</label>
                                <label><strong>Matricula:</strong> {matriculaNote}</label>
                                <label><strong>Produtor / Atacadista:</strong> {personNote}</label>
                                <label><strong>Cidade:</strong> {cidadeNote}</label>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>N° PRODUTO</th>
                                        <th>PRODUTO</th>
                                        <th>UNIDADE</th>
                                        <th>QUANTIDADE</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Data 1</td>
                                        <td>Data 2</td>
                                        <td>Data 3</td>
                                        <td>Data 4</td>
                                        <td>Data 5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Button click={handleNotes} buttonType="buttonSuccess" name="Concluir nota" />
                    </div>)}
                    {/* <Autocomplete suggestions={suggestions} /> */}
                </div>

            </div>
        </div>
    );
}

export default AdminPanel;
