import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de importar o arquivo CSS para os estilos

const Input = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownMenuRef = useRef(null);
    const customInputRef = useRef(null);

    // State para verificar se deve ou não limpar o input autocomplete
    const clear = useSelector((state) => state.clear);

    // Carregar sugestões do localStorage ou API na inicialização do componente
    useEffect(() => {
        const loadSuggestions = () => {
            let suggestionsStore;
            if (props.typeAutocomplete === 'Persons') {
                suggestionsStore = localStorage.getItem('Persons');
            } else {
                suggestionsStore = localStorage.getItem('Produtos');
            }

            if (suggestionsStore) {
                const sugestions = JSON.parse(suggestionsStore);
                const nameSuggestions = sugestions.map((sugestion) => sugestion.nome);

                // Inicialmente, carrega apenas uma parte das sugestões
                setSuggestions(nameSuggestions);
                setFilteredSuggestions(nameSuggestions.slice(0, 10)); // Exemplo: carregar as 10 primeiras sugestões
            } else {
                console.log('Item não encontrado no localStorage');
            }
        };

        loadSuggestions();
    }, [props.typeAutocomplete]);

    // Filtrar sugestões conforme o usuário digita
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value.trim() === '') {
            setFilteredSuggestions(suggestions.slice(0, 10)); // Mostra as 10 primeiras sugestões se o campo estiver vazio
        } else {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, 10)); // Mostra as 10 primeiras sugestões filtradas
        }

        props.change(event); // Dispara para o componente pai o valor da sugestão
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
                />
            </>
        ) : (
            props.autocomplete ? (
                // Se houver a prop autocomplete, renderiza um input com datalist
                <>
                    <input
                        ref={ref}
                        className={'inputGeneral ' + props.size}
                        list="options"
                        id="optionInput"
                        name="produto"
                        value={selectedOption}
                        placeholder={props.typeAutocomplete === 'Persons' ? 'Produtor / Atacadista' : 'Produto'}
                        onChange={handleInputChange}
                        onBlur={props.onBlur}
                    />
                    <datalist id="options">
                        {filteredSuggestions.map((sugestao, index) => (
                            <option key={index} value={sugestao}></option>
                        ))}
                    </datalist>
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
                />
            )
            )
        )
    );
});

export default Input;
