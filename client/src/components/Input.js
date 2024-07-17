import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css';

const Input = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(props.valor || '');

    const clear = useSelector((state) => state.clear);

    useEffect(() => {
        if (clear) {
            setSelectedOption('');
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    useEffect(() => {
        setSelectedOption(props.valor);
    }, [props.valor]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        props.change(event);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Ao pressionar Enter, chama a função de mudança
            props.change(event);
        }
    };

    return (
        props.span ? (
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={selectedOption}
                    placeholder={props.placeholder}
                    name={props.name}
                    type={props.inputType}
                    className={'inputGeneral ' + props.size}
                    autoComplete="off"
                />
            </>
        ) : (props.disabled ? (
            <input
                disabled
                ref={ref}
                value={selectedOption}
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
                autoComplete="off"
            />
        ) : (props.inputOptions ? (
            <select
                ref={ref}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={selectedOption}
                name={props.name}
                className={'inputGeneral ' + props.size}
                placeholder="Unidade"
            >
                <option value="" disabled>{props.placeholder}</option>
                {Object.entries(props.options || {}).map(([key]) => (
                    <option key={key} value={key}>
                        {key.toUpperCase()}
                    </option>
                ))}
            </select>
        ) : (
            <input
                ref={ref}
                onChange={handleInputChange}
                value={selectedOption}
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
                autoComplete="off"
            />
        ))));
});

export default Input;
