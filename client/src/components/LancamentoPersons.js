import React, { useEffect, useState, useRef } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';
import '../styles/DropdownAutocomplete.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Autenticação de login
import AuthService from '../services/authService';

// Components
import InputAutocomplete from './InputAutocomplete';
import DropdownAutocomplete from './DropdownAutocomplete';
import Input from './Input';
import Button from './Button';

// Actions para reducer
import { NoteAction } from '../actions/noteAction';
import { showNoteFieldsAction } from '../actions/genericAction';


function LancamentoPersons(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), state para alterar entre os fields que vão ser mostrados no front-end (persons/products), e state para limpar o campo do autocomplete quando adicionar produto;

    // Variáveis com valores dos inputs dos produtores / atacadistas
    const [dataNote, setDataNotes] = useState('');
    const [nfNote, setNfNotes] = useState('');
    const [personNote, setPersonNotes] = useState('');
    const [cidadeNote, setCidadeNotes] = useState('');
    const [error, setError] = useState('');

    // State para gerenciar a variavel de mostrar campo de produtores, e campo de notas
    const showNoteFields = useSelector((state) => state.generic);

    const suggestions = JSON.parse(localStorage.getItem('Persons')) || []; // Obter sugestões de 'Persons'

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
        // Verifica se algum dos campos está vazio
        if (!dataNote || !nfNote || !personNote || !cidadeNote) {
            alert('Por favor, preencha todos os dados para prosseguir.');
            setError('Por favor, preencha todos os dados para prosseguir.');
            return;
        }

        if (!suggestions.some(s => s.nome.toLowerCase() === personNote.toLowerCase())) {
            alert('Por favor, selecione um produtor válido.');
            setError('Por favor, selecione um produtor válido.');
            return;
        }

        const noteData = {
            dataNote,
            nfNote,
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
            <Input inputType="date" change={handleValue} valor={dataNote} placeholder="Data" size="inputMedium" />
            <Input change={handleValue} valor={nfNote} placeholder="N° Nota Fiscal" size="inputMedium" />
            <Input change={handleValue} valor={cidadeNote} placeholder="Cidade" name="cidade" size="inputMedium" />
            {/* <InputAutocomplete
                autocomplete
                change={handleValue}
                valor={personNote}
                name="person"
                size="inputMedium"
                typeAutocomplete="Persons"
            /> */}
            <DropdownAutocomplete
                autocomplete
                change={handleValue}
                valor={personNote}
                name="person"
                size="inputMedium"
                typeAutocomplete="Persons"
                placeholder="Produtor / Atacadista"
            />
            {/* {error && <p className="error-message">{error}</p>} */}
            <Button click={handleFields} buttonType="buttonSuccess" name="Avançar" />
        </div>
    );
}

export default LancamentoPersons;
