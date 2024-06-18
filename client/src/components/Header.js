import React from 'react';
import '../styles/Header.css'

// Components
import Logotipo from './Logo';
import Menu from './Menu'

// Router
import { Link } from 'react-router-dom';
import { LogoutAction } from '../actions/userAction';
import { useDispatch } from 'react-redux';

function Header() {
    let dispatch = useDispatch();

    function dispatchLogout(e) {
        e.preventDefault()
        dispatch(LogoutAction())
    }

    return (
        <header className="Header">
            <Logotipo image="logoceasabranco.png" />
            <Menu links={[{ name: "Home", link: "" },{ name: "Lançar notas", link: "lancamentonotas" }, { name: "Relatórios", link: "relatorios" }]} />
            <div className="buttonHeader">
                <button onClick={dispatchLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header;