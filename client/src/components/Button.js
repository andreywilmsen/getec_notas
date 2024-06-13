import React from 'react';
import '../styles/Button.css'
import { Link } from 'react-router-dom'

function Button(props) {
    return (
        // Caso haja a props link, renderizara um botão com um link para o caminho passado pela props
        props.link ? (
            <>
                <Link to={`/${props.link}`}>
                    <button onClick={props.click} type={props.type} className={props.buttonType + ' ' + props.size}>{props.name}</button>
                </Link>
            </>
        ) :
            // Caso contrário, renderizara um botão sem redirecionamento
            <>
                <button onClick={props.click} type={props.type} className={props.buttonType + ' ' + props.size}>{props.name}</button>
            </>
    )
}

export default Button;