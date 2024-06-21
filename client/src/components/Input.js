import React, { forwardRef } from 'react';
import '../styles/Input.css';

const Input = forwardRef((props, ref) => {
    return (
        props.span ? (
            // Se houver uma props chamada span, renderiza o input com o span em cima para identificar qual input é
            <>
                <span className="spanInput">{props.span}</span>
                <input 
                    ref={ref} 
                    onChange={props.change} 
                    value={props.valor} 
                    placeholder={props.placeholder} 
                    name={props.name} 
                    type={props.inputType} 
                    className={'inputGeneral ' + props.size}
                />
            </>
        ) : (
            // Caso contrário, renderiza um input sem span
            <input 
                ref={ref} 
                onChange={props.change} 
                value={props.valor} 
                placeholder={props.placeholder} 
                type={props.inputType} 
                className={'inputGeneral ' + props.size}
            />
        )
    );
});

export default Input;
