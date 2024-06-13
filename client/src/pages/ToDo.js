import React, { useEffect } from 'react';
import '../styles/ToDo.css'
// Navigation e Location para passar para o AuthService fazer a autenticação e gerenciamento de permissões
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Componente de autenticação
import AuthService from '../services/authService';


// Components
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import ToDoListItem from './ToDoListItem';


function ToDo() {
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
                <div className="ToDo">
                    <div className="ToDoTitle">
                        <h1>Lista de tarefas</h1>
                    </div>
                    <div className="toDoInputFieldContainer">
                        <Input size="inputMedium" inputType="" placeholder="Titulo" />
                        <Input size="inputMedium" inputType="" placeholder="Descrição" />
                        <Input size="inputMedium" inputType="" placeholder="Data" />
                        <Button buttonType="buttonSuccess" name="Adicionar" />
                    </div>
                    <hr></hr>
                    <ToDoListItem />
                </div>
            </div>
        </div>
    )
}

export default ToDo;