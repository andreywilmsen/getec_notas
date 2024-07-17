import React, { useState } from 'react'
import '../styles/Login.css'

// Components
import Input from '../components/Input'
import Button from '../components/Button';

// Requisição HTTP
import axios from 'axios'

// Actions
import { LoginAction } from '../actions/userAction';

// Métodos de Routes
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    // Eventos
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");

    // Métodos de routes    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // gerenciamento de estados dos valores variaveis dos inputs
    function setValue(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setNome(value);
                break;
            case 'senha':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    // FAZ LOGIN NA API
    async function loginUser() {
        const data = {
            name: nome,
            password: password,
        };
        try {
            // Faz o post para a url de login
            const res = await axios.post('http://192.168.0.134:8080/login', data);
            const token = res.data.token;
            const name = res.data.name
            console.log(res)
            // Acessa o reducer de login, setando o token no local Storage e mudando o valor de state para true
            dispatch(LoginAction(token, name));
            // Limpa os valores dos inputs
            setNome("");
            setPassword("");
            // Faz o get para a url de autenticação
            const authRes = await axios.post("http://192.168.0.134:8080/auth", null, {
                headers: { 'authorization-token': token }
            });

            // Caso seja um token valido, redireciona para a home do painel administrativo
            console.log({ authRes: authRes });
            if (authRes.status === 200) {
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="loginContainerInputField">
            <>
                <Input change={setValue} span="Nome" valor={nome} name="name" size="inputMedium" inputType="" placeholder="" />
                <Input change={setValue} span="Senha" valor={password} name="senha" size="inputMedium" inputType="password" placeholder="" />
                <Button click={loginUser} buttonType="buttonSuccess" name="Fazer login" />
            </>
        </div>
    )
}

export default LoginForm;