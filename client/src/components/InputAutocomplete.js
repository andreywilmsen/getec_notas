import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de importar o arquivo CSS para os estilos

const InputAutocomplete = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

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

            if (suggestionsStore && props.typeAutocomplete === 'Persons') {
                const sugestions = JSON.parse(suggestionsStore);
                const nameSuggestions = sugestions.map((sugestion) => sugestion.nome);

                // Inicialmente, carrega apenas uma parte das sugestões
                setSuggestions(nameSuggestions);
                setFilteredSuggestions(nameSuggestions.slice(0, 10)); // Exemplo: carregar as 10 primeiras sugestões
            } else if (suggestionsStore && props.typeAutocomplete != 'Persons') {
                const sugestions = JSON.parse(suggestionsStore);
                const nameSuggestions = sugestions.map((sugestion) => sugestion.produto);

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
            setFilteredSuggestions(suggestions.slice(0, 10)); // Show the first 10 suggestions if the input is empty
        } else {
            // Ensure suggestions is an array before filtering
            if (Array.isArray(suggestions)) {
                const filtered = suggestions.filter(suggestion =>
                    suggestion && suggestion.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredSuggestions(filtered.slice(0, 10)); // Show the first 10 filtered suggestions
            } else {
                console.error('Suggestions is not an array:', suggestions);
            }
        }

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
    );
});

export default InputAutocomplete;
