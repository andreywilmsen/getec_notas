import React from 'react';
import '../styles/Menu.css'

// Router
import { Link } from 'react-router-dom';

function Menu(props) {
    return (
        <div className="Menu">
            <ul>
                {/* Fará um map com o array passado pela props para inserir todos os links do menu */}
                {props.links.map((link, index) => (<Link to={`/${link.link}`} key={index}><li>{link.name}</li></Link>))}
            </ul>
        </div>
    )
}

export default Menu;