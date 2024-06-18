import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';

// Navigation e Location para passar para o AuthService fazer a autenticação e gerenciamento de permissões
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Componente de autenticação
import AuthService from '../services/authService';
import Header from './Header';

// Componentes gerais
import Input from './Input';
import Button from './Button';

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

    // Atualiza toda vez que atualizar a página e verifica se o token armazenado ainda é válido, caso não, redireciona para a tela de login
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, []);

    function handleNotes() {
        setNotes(!notes);
    };

    return (
        <div className="inputFieldNotes">
            <Input placeholder="Data" size="inputMedium" />
            <Input placeholder="N° Nota Fiscal" size="inputMedium" />
            <div className="person">
                <Input placeholder="Matricula" size="inputMedium" />
                <Input placeholder="Produtor / Atacadista" size="inputMedium" />
            </div>
            <Input placeholder="Cidade" size="inputMedium" />
            <Button click={handleNotes} buttonType="buttonSuccess" name="Avançar" />
        </div>
    );
}

export default AdminPanel;
