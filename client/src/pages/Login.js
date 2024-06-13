import React, { useState } from 'react'
import '../styles/Login.css'

// Components
import Logotipo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


function Login() {

    // Evento para mudar o formulário de login para registro e vice versa
    const [register, setRegister] = useState(false);

    // Função para alterar o estado de register, para mudar os inputs do formulario
    // De login, para register
    function handleRegister() {
        setRegister(!register);
    }

    return (
        <div className="Login">
            <div>
                <div className="loginContainer">
                    {/* Passa props para o Logotipo para renderizar no componente
                    a informações conforme o estado atual de register */}
                    <div className="loginContainerLogo">
                        <Logotipo register={register} />
                    </div>
                    <div className="loginContainerInputField">
                        {!register && (
                            <><LoginForm /></>
                        )}
                        {register && (
                            <><RegisterForm handleRegister={handleRegister} /></>
                        )}
                        <div className="loginContainerInputFieldRegisterAccount">
                            {!register && (
                                <>
                                    <p>Não possui uma conta? </p>
                                    <a onClick={handleRegister}>Registrar conta</a>
                                </>
                            )}
                            {register && (
                                <>
                                    <a onClick={handleRegister}>Voltar</a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;