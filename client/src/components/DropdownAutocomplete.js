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
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
        setHighlightedIndex(-1);

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

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
    };

    const handleInputBlur = () => {
        setIsDropdownVisible(false); // Fecha o dropdown ao perder o foco
    };

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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur} // Fecha o dropdown ao perder o foco
                onKeyDown={handleKeyDown}
                name={props.typeAutocomplete === 'Persons' ? 'produtor/atacadista' : 'produto'}
                autoComplete="off"
            />
            {isDropdownVisible && filteredSuggestions.length > 0 && (
                <div className="dropdown-menu">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${highlightedIndex === index ? 'highlighted' : ''}`}
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
