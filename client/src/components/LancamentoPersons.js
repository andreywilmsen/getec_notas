import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Autenticação de login
import AuthService from '../services/authService';

// Components
import Input from './Input';
import Button from './Button';

// Actions para reducer
import { NoteAction } from '../actions/noteAction';
import { showNoteFieldsAction } from '../actions/genericAction';

function LancamentoPersons(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Variáveis com valores dos inputs dos produtores / atacadistas
    const [dataNote, setDataNotes] = useState('');
    const [nfNote, setNfNotes] = useState('');
    const [matriculaNote, setMatriculaNotes] = useState('');
    const [personNote, setPersonNotes] = useState('');
    const [cidadeNote, setCidadeNotes] = useState('');

    // State para gerenciar a variavel de mostrar campo de produtores, e campo de notas
    const showNoteFields = useSelector((state) => state.generic);

    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    // Função para armazenar os valores dos inputs nas suas respectivas variáveis
    function handleValue(event) {
        switch (event.target.placeholder) {
            case 'Data':
                setDataNotes(event.target.value);
                break;
            case 'N° Nota Fiscal':
                setNfNotes(event.target.value);
                break;
            case 'Matricula':
                setMatriculaNotes(event.target.value);
                break;
            case 'Produtor / Atacadista':
                setPersonNotes(event.target.value);
                break;
            case 'Cidade':
                setCidadeNotes(event.target.value);
                break;
            default:
                break;
        }
    }

    // Função para enviar os valores dos inputs dos produtores para o reducer dos produtores, para ser consumido no componente LancamentoProdutos
    function handleFields() {
        const noteData = {
            dataNote,
            nfNote,
            matriculaNote,
            personNote,
            cidadeNote
        };
        // Envia para o reducer das notas os valores dos produtores / atacadistas
        dispatch(NoteAction(noteData));
        // Altera no reducer qual campo irá aparecer no front-end (Campo das notas ao invés dos produtores / atacadistas)
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

    return (
        <div className="inputFieldNotes">
            <Input change={handleValue} valor={dataNote} placeholder="Data" size="inputMedium" />
            <Input change={handleValue} valor={nfNote} placeholder="N° Nota Fiscal" size="inputMedium" />
            <div className="person">
                <Input change={handleValue} valor={matriculaNote} placeholder="Matricula" size="inputMedium" />
                <Input change={handleValue} valor={personNote} placeholder="Produtor / Atacadista" size="inputMedium" />
            </div>
            <Input change={handleValue} valor={cidadeNote} placeholder="Cidade" size="inputMedium" />
            <Button click={handleFields} buttonType="buttonSuccess" name="Avançar" />
        </div>
    );
}

export default LancamentoPersons;
