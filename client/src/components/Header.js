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
            <Logotipo />
            <Menu links={[{ name: "Registrar Ponto", link: "pointerrecorder" }, { name: "Tarefas", link: "todo" }, { name: "Calcular hora/trabalho", link: "hoursworked" }, { name: "Relatórios", link: "reports" }]} />
            <button onClick={dispatchLogout}>Logout</button>
        </header>
    )
}

export default Header;