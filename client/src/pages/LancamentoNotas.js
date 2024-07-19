import React, { useEffect, useState } from 'react';
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

    const [loading, setLoading] = useState(true); // Estado de carregamento

    // State para gerenciar a variável de mostrar campo de produtores e campo de notas
    const showNoteFields = useSelector((state) => state.generic);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseProducts = await axios.post('http://192.168.0.134:8080/get_products');
                localStorage.setItem("Produtos", JSON.stringify(responseProducts.data.products));
                
                const responsePersons = await axios.post('http://192.168.0.134:8080/get_usuarios');
                localStorage.setItem("Persons", JSON.stringify(responsePersons.data.search.response));
                
                const responseCity = await axios.post('http://192.168.0.134:8080/get_city');
                localStorage.setItem("City", JSON.stringify(responseCity.data.cidade));
                
                setLoading(false); // Após carregar, marca como não carregando
            } catch (error) {
                console.log(error);
                setLoading(false); // Em caso de erro, também marca como não carregando
            }
        }

        // Executa fetchData() apenas uma vez, passando um array vazio de dependências
        if (loading) {
            fetchData();
        }

        AuthService(navigate, location, dispatch);
    }, []); // Array vazio para executar apenas uma vez

    if (loading) {
        return <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <div className="LancarNotas">
                    <h1>Lançar Notas</h1>
                    <hr />
                    <p>Carregando...</p>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="AdminPanel">
            <Header />
            <div className="contentDashboard">
                <div className="LancarNotas">
                    <h1>Lançar Notas</h1>
                    <hr />
                    {!showNoteFields ? (
                        <PersonsFields />
                    ) : (
                        <NotesFields />
                    )}
                </div>
            </div>
        </div>
    );
}

export default LancamentoNotas;
