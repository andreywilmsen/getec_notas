import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de importar o arquivo CSS para os estilos

const Input = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(props.valor || ''); // Inicializa com o valor recebido

    // State para verificar se deve ou não limpar o input autocomplete
    const clear = useSelector((state) => state.clear);

    // Limpa o input de sugestões quando o state clear for true
    useEffect(() => {
        if (clear) {
            setSelectedOption('');
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    // Sincroniza o estado local com o valor passado via props
    useEffect(() => {
        setSelectedOption(props.valor);
    }, [props.valor]);

    // Função para lidar com mudanças no input
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value); // Atualiza o estado local
        props.change(event); // Chama a função de mudança do pai
    };

    // Renderização do componente
    return (
        props.span ? (
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={handleInputChange}
                    value={selectedOption} // Usa o estado local
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
                value={selectedOption} // Usa o estado local
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
                value={selectedOption} // Isso deve ser o estado local do select
                name={props.name}
                className={'inputGeneral ' + props.size}
                placeholder="Unidade"
            >
                <option placeholder="Unidade" value="" disabled>{props.placeholder}</option>
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
                value={selectedOption} // Usa o estado local
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
                autoComplete="off"
            />
        ))));
});

export default Input;
