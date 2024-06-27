import React, { useEffect, useState, useRef } from 'react';
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

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), state para alterar entre os fields que vão ser mostrados no front-end (persons/products), e state para limpar o campo do autocomplete quando adicionar produto;

    // Variáveis com valores dos inputs dos produtores / atacadistas
    const [dataNote, setDataNotes] = useState('');
    const [nfNote, setNfNotes] = useState('');
    const [matriculaNote, setMatriculaNotes] = useState('');
    const [personNote, setPersonNotes] = useState('');
    const [cidadeNote, setCidadeNotes] = useState('');
    const [error, setError] = useState('');

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
        // Verifica se algum dos campos está vazio
        if (!dataNote || !nfNote || !matriculaNote || !personNote || !cidadeNote) {
            setError('Por favor, preencha todos os dados para prosseguir.');
            return;
        }

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


    // Função criada para incluir a matricula do produtor / atacadista ao selecionar o nome dele.
    const handleBlur = (event) => {
        // Verifica se o próximo elemento focado é outro input antes de realizar as operações
        if (event.relatedTarget && event.relatedTarget.nodeName === 'INPUT') {
            let personFinally = JSON.parse(localStorage.getItem('Persons'));

            // Encontrar o produto pelo nome (suponho que o produto seja identificado pelo nome)
            const personFinded = personFinally.find((person) => person.nome === personNote);
            if (personFinded) {
                setMatriculaNotes(personFinded.matricula);
            }
        }
    };

    return (
        <div className="inputFieldNotes">
            <Input inputType="date" change={handleValue} valor={dataNote} placeholder="Data" size="inputMedium" />
            <Input change={handleValue} valor={nfNote} placeholder="N° Nota Fiscal" size="inputMedium" />
            <div className="person">
                <Input
                    onBlur={handleBlur}
                    autocomplete
                    change={handleValue}
                    valor={personNote}
                    name="person"
                    size="inputMedium"
                    typeAutocomplete="Persons"
                />
                <Input disabled change={handleValue} valor={matriculaNote} placeholder="Matricula" size="inputMedium" />
            </div>
            <Input change={handleValue} valor={cidadeNote} placeholder="Cidade" size="inputMedium" />
            {error && <p className="error-message">{error}</p>}
            <Button click={handleFields} buttonType="buttonSuccess" name="Avançar" />
        </div>
    );
}

export default LancamentoPersons;
