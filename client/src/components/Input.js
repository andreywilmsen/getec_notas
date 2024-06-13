import React from 'react';
import '../styles/Input.css'

function Input(props) {
    return (
        props.span ? (
            // Se houver uma props chamada span, renderizara o input com o span em cima para identificar qual input que é
            <>
                <span className="spanInput">{props.span}</span><input onChange={props.change} value={props.valor} placeholder={props.placeholder} name={props.name} type={props.inputType} className={'inputGeneral ' + props.size}></input>
            </>
        ) :
            // Caso contrário, renderizara um input sem span
            <>
                <input onChange={props.change} value={props.valor} placeholder={props.placeholder} type={props.inputType} className={'inputGeneral ' + props.size}></input>
            </>
    )
}

export default Input;