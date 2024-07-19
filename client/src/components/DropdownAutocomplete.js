import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';
import '../styles/Autocomplete.css';

const DropdownAutocomplete = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const clear = useSelector((state) => state.clear);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadSuggestions = () => {
            let suggestionsStore;
            if (props.typeAutocomplete === 'Persons') {
                suggestionsStore = localStorage.getItem('Persons');
            } else if (props.typeAutocomplete === 'Produto') {
                suggestionsStore = localStorage.getItem('Produtos');
            } else if (props.typeAutocomplete === 'Cidade') {
                suggestionsStore = localStorage.getItem('City');
            }

            if (suggestionsStore) {
                const parsedSuggestions = JSON.parse(suggestionsStore);
                const nameSuggestions = parsedSuggestions.map(item =>
                    props.typeAutocomplete === 'Persons' ? item.matricula_nome :
                        props.typeAutocomplete === 'Produto' ? item.produto :
                            item.cidade
                );
                setSuggestions(nameSuggestions);
                setFilteredSuggestions(nameSuggestions.slice(0, 50));
            }
        };

        loadSuggestions();
    }, [props.typeAutocomplete]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setHighlightedIndex(-1);

        if (value.trim() === '') {
            setFilteredSuggestions(suggestions.slice(0, 50));
            setIsDropdownVisible(false);
        } else {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, 50));
            setIsDropdownVisible(filtered.length > 0);
        }

        props.change(event);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedOption(suggestion);
        setFilteredSuggestions([]);
        setIsDropdownVisible(false);
        props.change({ target: { value: suggestion, placeholder: props.placeholder } });
    };
    

    useEffect(() => {
        if (clear) {
            setSelectedOption('');
            setHighlightedIndex(-1);
            dispatch(setClear(false));
        }
    }, [clear, dispatch]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredSuggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'Enter') {
            if (highlightedIndex >= 0) {
                handleSuggestionClick(filteredSuggestions[highlightedIndex]);
            }
        }
    };

    const handleBlur = () => {
        // Adiciona um pequeno atraso para permitir que o clique no menu seja detectado
        setTimeout(() => {
            if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
                setIsDropdownVisible(false);
                // dispatch(setClear(true));
            }
        }, 100);
    };



    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <input
                ref={ref}
                className={`inputGeneral ${props.size}`}
                value={selectedOption}
                placeholder={props.typeAutocomplete === 'Persons' ? 'Produtor / Atacadista' :
                    props.typeAutocomplete === 'Cidade' ? 'Procedência' : 'Produto'}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                name={props.typeAutocomplete === 'Persons' ? 'produtor/atacadista' :
                    props.typeAutocomplete === 'Cidade' ? 'cidade' : 'produto'}
                autoComplete="off"
            />
            {isDropdownVisible && filteredSuggestions.length > 0 && (
                <div className="dropdown-menu">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${index === highlightedIndex ? 'highlighted' : ''}`}
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

export default DropdownAutocomplete;
