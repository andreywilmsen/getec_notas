import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Input.css';
import '../styles/Autocomplete.css';

const InputDropdownAutocomplete = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const clear = useSelector((state) => state.clear);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadSuggestions = () => {
            const suggestionsStore = localStorage.getItem(props.typeAutocomplete === 'Persons' ? 'Persons' : 'Produtos');
            if (suggestionsStore) {
                const parsedSuggestions = JSON.parse(suggestionsStore);
                const nameSuggestions = parsedSuggestions.map(item => props.typeAutocomplete === 'Persons' ? item.nome : item.produto);
                setSuggestions(nameSuggestions);
                setFilteredSuggestions(nameSuggestions.slice(0, 10));
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

        // Notify parent component of the change
        props.change(event);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedOption(suggestion);
        setFilteredSuggestions([]); // Fecha o dropdown após a seleção
        setIsDropdownVisible(false);
    
        // Enviar o valor selecionado para o componente pai
        props.change({
            target: {
                value: suggestion,
                placeholder: props.placeholder,
            },
        });
    };
    

    useEffect(() => {
        if (clear) {
            setSelectedOption('');
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <input
                ref={ref}
                className={`inputGeneral ${props.size}`}
                value={selectedOption}
                placeholder={props.typeAutocomplete === 'Persons' ? 'Produtor / Atacadista' : 'Produto'}
                onChange={handleInputChange}
                onFocus={handleInputFocus} // Show suggestions on focus
                name={props.typeAutocomplete === 'Persons' ? 'produtor/atacadista' : 'produto'}
            />
            {isDropdownVisible && filteredSuggestions.length > 0 && (
                <div className="dropdown-menu">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default InputDropdownAutocomplete;
