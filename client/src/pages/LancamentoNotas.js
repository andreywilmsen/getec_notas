import React, { useEffect } from 'react';
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

// Autocomplete para inputs
import Autocomplete from '../services/Autocomplete';

function AdminPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Atualiza toda vez que atualizar a página e verifica se o token armazenado ainda é válido, caso não, redireciona para a tela de login
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, []);



    return (
        <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <h1>Lançar Notas</h1>
                {/* <Autocomplete suggestions={suggestions} /> */}

            </div>
        </div>
    );
}

export default AdminPanel;
