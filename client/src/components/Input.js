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
        // Set selectedOption to the first option in props.options when it changes
        if (props.options && Object.keys(props.options).length > 0 && !selectedOption) {
            setSelectedOption(Object.keys(props.options)[0]);
            props.change({ target: { value: Object.keys(props.options)[0] } });
        }
    }, [props.options, selectedOption, props.change]); // Include props.change in dependencies to prevent unnecessary re-renders

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        props.change(event);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.change(event);
        }
    };

    return (
        <>
            {props.span && <span className="spanInput">{props.span}</span>}
            {props.inputOptions ? (
                <select
                    ref={ref}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    name={props.name}
                    className={'inputGeneral ' + props.size}
                    value={selectedOption}
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
                    onKeyDown={handleKeyDown}
                    value={selectedOption}
                    placeholder={props.placeholder}
                    name={props.name}
                    type={props.inputType}
                    className={'inputGeneral ' + props.size}
                    autoComplete="off"
                />
            )}
        </>
    );
});

export default Input;
