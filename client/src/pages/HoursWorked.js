import React, { useEffect } from 'react';
// Navigation e Location para passar para o AuthService fazer a autenticação e gerenciamento de permissões
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Componente de autenticação
import AuthService from '../services/authService';

// Components
import Header from '../components/Header';


function HoursWorked() {
    // Parametros que devem ser passados para o AuthService fazer o gerenciamento de permissões
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
                <h1>HoursWorked</h1>
            </div>
        </div>
    )
}

export default HoursWorked;