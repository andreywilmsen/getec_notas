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
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const clear = useSelector((state) => state.clear);

    useEffect(() => {
        const loadSuggestions = () => {
            let suggestionsStore = localStorage.getItem(props.typeAutocomplete === 'Persons' ? 'Persons' : 'Produtos');
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
        setIsDropdownVisible(true); // Abre o dropdown ao digitar

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

    // InputAutocomplete.js
    const handleSuggestionClick = (suggestion) => {
        const persons = JSON.parse(localStorage.getItem('Persons'));
        const personFinded = persons.find((person) => person.nome === suggestion);
    
        // Se encontrar a pessoa, atualiza a matrícula
        if (personFinded) {
            props.setDisabledValue(personFinded.matricula);
        }
    
        // Atualiza o estado do input com o nome da sugestão selecionada
        setSelectedOption(suggestion);
    
        // Cria um evento simulado para o componente pai
        const event = {
            target: {
                value: suggestion,
                name: props.name // Certifique-se de que 'name' está sendo passado corretamente
            }
        };
    
        // Chama a função de mudança do componente pai
        props.change(event);
    
        // Mover o foco para o input de cidade
        const cityInput = document.querySelector('input[name="cidade"]');
        if (cityInput) {
            cityInput.focus();
        }
    
        // Limpa as sugestões
        setFilteredSuggestions([]);
        setIsDropdownVisible(false);
    };
    

    const handleInputFocus = () => {
        setIsDropdownVisible(true); // Abre o dropdown ao focar
    };

    const handleBlur = () => {
        // Fecha o dropdown ao sair do input
        setTimeout(() => setIsDropdownVisible(false), 100); // Usar timeout para evitar fechamento imediato
    };

    useEffect(() => {
        if (clear) {
            setSelectedOption('');
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    return (
        <div className="autocomplete-container">
            <input
                ref={ref}
                className={`inputGeneral ${props.size}`}
                name="produto"
                value={selectedOption}
                placeholder={props.typeAutocomplete === 'Persons' ? 'Produtor / Atacadista' : 'Produto'}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
            />
            {isDropdownVisible && filteredSuggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default InputAutocomplete;
