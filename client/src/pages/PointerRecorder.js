import React, { useState, useEffect } from 'react';
import '../styles/PointerRecorder.css';
// Navigation e Location para passar para o AuthService fazer a autenticação e gerenciamento de permissões
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Componente de autenticação
import AuthService from '../services/authService';

// Components
import Header from '../components/Header';
import PointerRecorderHour from '../components/PointerRecorder';
import PointerRecorderTable from '../components/TableRecorder';
import { updateDateTime } from '../services/updateDateTime';

function PointerRecorder() {
    // Parametros que devem ser passados para o AuthService fazer o gerenciamento de permissões
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Atualiza toda vez que atualizar a página e verifica se o token armazenado ainda é válido, caso não, redireciona para a tela de login
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, []);

    // Parametros para controle de data e hora

    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [grid, setGrid] = useState(false);

    // Atualiza de 1 em 1 segundo o horário da aplicação utilizando o updatedDateTime que é um arquivo services

    useEffect(() => {
        updateDateTime(setDate, setHour);

        const intervalId = setInterval(() => {
            updateDateTime(setDate, setHour);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Gerencia a visualização do grid de registro ponto

    function handleGrid() {
        setGrid(!grid)
    }

    return (
        <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <div className="PointerRecorder">
                    {!grid && (
                        <h1 className="titlePointerRecorder">Registrar Ponto</h1>
                    )}
                    {grid && (
                        <h1 className="titlePointerRecorder">Grade de registro ponto</h1>
                    )}
                    <hr />
                    <div className="pointerRecorderContainer">

                        {!grid && (<PointerRecorderHour date={date} hour={hour} click={handleGrid} />
                        )}

                        {grid && (
                            <PointerRecorderTable date={date} click={handleGrid} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointerRecorder;