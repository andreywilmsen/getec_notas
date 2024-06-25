import React, { useEffect } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancarNotas.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Autenticação de login

import AuthService from '../services/authService';

// Componentes
import Header from '../components/Header';
import PersonsFields from '../components/LancamentoPersons';
import NotesFields from '../components/LancamentoProdutos';

function LancamentoNotas() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // State para gerenciar a variavel de mostrar campo de produtores, e campo de notas
    const showNoteFields = useSelector((state) => state.generic);

    useEffect(() => {
        AuthService(navigate, location, dispatch);

        const getProducts = async () => {
            try {
                const responseProducts = await axios.post('http://localhost:8080/get_products');
                localStorage.setItem("Produtos", JSON.stringify(responseProducts.data.products))
                const responsePersons = await axios.post('http://localhost:8080/get_usuarios');
                localStorage.setItem("Persons", JSON.stringify(responsePersons.data.search.response))
            } catch (error) {
                console.log(error)
            }
        };

        getProducts();
    }, []);

    return (
        <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <div className="LancarNotas">
                    <h1>Lançar Notas</h1>
                    <hr />
                    {!showNoteFields ? (
                        <PersonsFields />
                    ) : (<NotesFields />)}
                </div>
            </div>
        </div>
    );
}

export default LancamentoNotas;
