import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Autenticação de login
import AuthService from '../services/authService';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Actions para reducer
import { showNoteFieldsAction } from '../actions/genericAction'; // Importe a ação corretamente


function LancamentoProdutos(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), e state para alterar entre os fields que vão ser mostrados no front-end (persons/products);
    const note = useSelector((state) => state.note);
    const showNoteFields = useSelector((state) => state.generic);


    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    // Função para enviar os valores dos inputs dos produtores para o reducer dos produtores, para ser consumido no componente LancamentoProdutos
    function handleFields() {
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

    return (
        <div className="inputFieldNotes">
            <div className="person">
                <Input placeholder="N° Produto" size="inputMedium" />
                <Input placeholder="Produto" size="inputMedium" />
            </div>
            <Input placeholder="Unidade" size="inputMedium" />
            <Input placeholder="Quantidade" size="inputMedium" />
            <Button buttonType="buttonSuccess" name="+" />
            <div className="listProducts">
                <div className="extractList">
                    <label><strong>Data:</strong> {note.dataNote}</label>
                    <label><strong>Nota fiscal:</strong> {note.nfNote}</label>
                    <label><strong>Matricula:</strong> {note.matriculaNote}</label>
                    <label><strong>Produtor / Atacadista:</strong> {note.personNote}</label>
                    <label><strong>Cidade:</strong> {note.cidadeNote}</label>
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
            <Button click={handleFields} buttonType="buttonSuccess" name="Concluir nota" />
        </div>
    );
}

export default LancamentoProdutos;
