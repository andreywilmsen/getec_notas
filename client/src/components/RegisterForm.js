import React, { useState } from 'react'
import '../styles/Login.css'

// Components
import Input from '../components/Input'
import Button from '../components/Button';

// Requisição HTTP
import axios from 'axios'

function RegisterForm(props) {

    // Eventos para captação de valor de formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // Função para captação de valor de formulário
    function setValue(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'nome':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'senha':
                setPassword(value);
                break;
            case 'confirmacao':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    }

    // REGISTRA USUÁRIO NA API

    async function registerUser() {
        const data = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        // Faz um fetch para a url de registro de usuario
        await axios.post('http://localhost:8080/login/register', data).then(res => {
            // Limpa os inputs após requisição
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            // Muda o valor de registar para aparecer o formulário de login

            props.handleRegister(false);
        }).catch(err => { console.log(err) })
    }

    return (
        <div className="loginContainerInputField">
            <>
                <Input change={setValue} valor={name} span="Nome" name="nome" size="inputMedium" inputType="" placeholder="" />
                <Input change={setValue} valor={email} span="Email" name="email" size="inputMedium" inputType="" placeholder="" />
                <Input change={setValue} valor={password} span="Senha" name="senha" size="inputMedium" inputType="password" placeholder="" />
                <Input change={setValue} valor={confirmPassword} span="Confirme sua senha" name="confirmacao" size="inputMedium" inputType="password" placeholder="" />
                <Button click={registerUser} buttonType="buttonSuccess" name="Cadastrar" />
            </>
        </div>
    )
}

export default RegisterForm;