import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css';

const InputAutocomplete = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const clear = useSelector((state) => state.clear);

    useEffect(() => {
        const loadSuggestions = () => {
            const suggestionsStore = localStorage.getItem(props.typeAutocomplete === 'Persons' ? 'Persons' : 'Produtos');
            if (suggestionsStore) {
                const parsedSuggestions = JSON.parse(suggestionsStore);
                const nameSuggestions = parsedSuggestions.map(item => props.typeAutocomplete === 'Persons' ? item.nome : item.produto);
                setSuggestions(nameSuggestions);
                setFilteredSuggestions(nameSuggestions.slice(0, 10));
            } else {
                console.log('Item não encontrado no localStorage');
            }
        };

        loadSuggestions();
    }, [props.typeAutocomplete]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value.trim() === '') {
            setFilteredSuggestions(suggestions.slice(0, 10));
        } else {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, 10));
        }

        props.change(event);
    };

    const handleBlur = () => {
        // Verifica se a opção selecionada está entre as sugestões filtradas
        if (!filteredSuggestions.includes(selectedOption)) {
            setSelectedOption(''); // Limpa o campo se a entrada não estiver nas sugestões
        }
    };

    useEffect(() => {
        if (clear) {
            setSelectedOption('');
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
