// Componente para autenticação de token e redirecionamento

import axios from 'axios';
import { LogoutAction } from '../actions/userAction';

async function AuthService(navigate, location, dispatch) {
    try {
        // Recupera o token do local Storage
        let token = localStorage.getItem('token');
        // Faz um fetch para a API de autenticação
        const authRes = await axios.post("http://localhost:8080/auth", null, {
            headers: { 'authorization-token': token }
        });
        // Caso success, permanece no pathname atual (endereço atual do site)
        if (authRes.status === 200) {
            navigate(location.pathname);
        } else {
            // Caso contrário, dispara um dispatch para o reducer de logout, altera o estado do state de true para false, e redireciona para a tela de login
            dispatch(LogoutAction());
            navigate('/login');
        }
    } catch (err) {
        // Caso entre no bloco de erro, faz a mesma funcionalidade do else acima
        dispatch(LogoutAction());
        navigate('/login');
    }
}

export default AuthService;
