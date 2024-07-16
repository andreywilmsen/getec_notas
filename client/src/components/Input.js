import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de importar o arquivo CSS para os estilos

const Input = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');

    // State para verificar se deve ou não limpar o input autocomplete
    const clear = useSelector((state) => state.clear);

    // Filtrar sugestões conforme o usuário digita
    const handleInputChange = (event) => {
        const value = event.target.value;

        setSelectedOption(value);

        props.change(event); // Trigger the change event to the parent component
    };


    // Limpa o input de sugestões quando o state clear for true
    useEffect(() => {
        if (clear) {
            setSelectedOption('');

            // Disparar a ação para informar que o campo foi limpo
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    return (
        props.span ? (
            // Se houver uma props chamada span, renderiza o input com o span em cima para identificar qual input é
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={handleInputChange}
                    value={props.valor}
                    placeholder={props.placeholder}
                    name={props.name}
                    type={props.inputType}
                    className={'inputGeneral ' + props.size}
                    autoComplete="off"
                />
            </>
        ) : (props.disabled ? (
            // Caso o input deverá ser desabilitado para edição
            <input
                disabled
                ref={ref}
                onChange={handleInputChange}
                value={props.valor}
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
                autoComplete="off"
            />) : (
            // Caso contrário, renderiza um input sem span e sem autocomplete
            <input
                ref={ref}
                onChange={handleInputChange}
                value={props.valor}
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
                autoComplete="off"
            />
        )

        )
    );
});

export default Input;
