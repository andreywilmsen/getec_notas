import React, { useState, useEffect } from 'react';
import '../styles/Autocomplete.css'; // Certifique-se de criar e importar um arquivo CSS para os estilos

const Autocomplete = () => {
    const [allSuggestions, setAllSuggestions] = useState([]); // Armazena todas as sugestões
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    // Carrega os produtos do localStorage na inicialização do componente
    useEffect(() => {
        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((produto) => produto.nome);
            setAllSuggestions(nomesProdutos);
        }
    }, []);

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        const filtered = allSuggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().includes(userInput.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
        setUserInput(userInput);
    };

    const onClick = (e) => {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[0]);
        }
    };

    const suggestionsListComponent = showSuggestions && userInput && (
        <ul className="suggestions">
            {filteredSuggestions.length ? (
                filteredSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={onClick}>
                        {suggestion}
                    </li>
                ))
            ) : (
                <div className="no-suggestions">
                    <em>No suggestions, you're on your own!</em>
                </div>
            )}
        </ul>
    );

    return (
        <div className="autocomplete">
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder="Type to search..."
            />
            {suggestionsListComponent}
        </div>
    );
};

export default Autocomplete;
