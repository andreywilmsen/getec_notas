import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element }) {
    // Capta o valor do state user, para validar se o usuário está permitido a logar ou não
    const login = useSelector(state => state.user)
    
    // Caso não esteja autorizado seu login, é redirecionado para a url /login para efetuar seu login
    if (!login) {
        return <Navigate to="/login" />;
    }

    // Caso autorizado, é permitido acessar a área administrativa, retornando assim o element da rota
    return element;
}
