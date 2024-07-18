import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';
import '../styles/DropdownAutocomplete.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Autenticação de login
import AuthService from '../services/authService';

// Components
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

    const [dataNote, setDataNotes] = useState('');
    const [nfNote, setNfNotes] = useState('');
    const [personNote, setPersonNotes] = useState('');
    const [cidadeNote, setCidadeNotes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const showNoteFields = useSelector((state) => state.generic);
    const suggestions = JSON.parse(localStorage.getItem('Persons')) || [];

    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    useEffect(() => {
        if (suggestions.length > 0) {
            setLoading(false);
        }
    }, [suggestions]);

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
            case 'Procedência':
                setCidadeNotes(event.target.value);
                break;
            default:
                break;
        }
    }

    function handleFields() {
        if (!dataNote || !nfNote || !personNote || !cidadeNote) {
            alert('Por favor, preencha todos os dados para prosseguir.');
            setError('Por favor, preencha todos os dados para prosseguir.');
            return;
        }

        if (!suggestions.some(s => s.matricula_nome.toLowerCase() === personNote.toLowerCase())) {
            alert('Por favor, selecione um produtor válido.');
            setError('Por favor, selecione um produtor válido.');
            return;
        }

        const noteData = { dataNote, nfNote, personNote, cidadeNote };
        dispatch(NoteAction(noteData));
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="inputFieldNotes">
            <Input inputType="date" change={handleValue} valor={dataNote} placeholder="Data" size="inputMedium" />
            <Input change={handleValue} valor={nfNote} placeholder="N° Nota Fiscal" size="inputMedium" />
            <DropdownAutocomplete
                autocomplete
                change={handleValue}
                valor={cidadeNote}
                name="cidade"
                size="inputMedium"
                typeAutocomplete="Cidade"
                placeholder="Procedência"
            />
            {/* <Input change={handleValue} valor={cidadeNote} placeholder="Procedência" name="cidade" size="inputMedium" /> */}
            <DropdownAutocomplete
                autocomplete
                change={handleValue}
                valor={personNote}
                name="person"
                size="inputMedium"
                typeAutocomplete="Persons"
                placeholder="Produtor / Atacadista"
            />
            <Button click={handleFields} buttonType="buttonSuccess" name="Avançar" />
        </div>
    );
}

export default LancamentoPersons;
