import React, { useState } from 'react';

const Autocomplete = ({ suggestions }) => {
    // Estado para rastrear a sugestão ativa (navegação com teclado)
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    // Estado para armazenar as sugestões filtradas com base na entrada do usuário
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // Estado para controlar se a lista de sugestões deve ser exibida
    const [showSuggestions, setShowSuggestions] = useState(false);
    // Estado para armazenar a entrada do usuário
    const [userInput, setUserInput] = useState("");

    // Função chamada quando há uma mudança na entrada do usuário
    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        // Filtra as sugestões com base na entrada do usuário (case-insensitive)
        const filteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        // Atualiza o estado com as novas sugestões filtradas e reinicia o índice da sugestão ativa
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(userInput);
    };

    // Função chamada quando uma sugestão é clicada
    const onClick = (e) => {
        // Atualiza a entrada do usuário com a sugestão clicada e oculta a lista de sugestões
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    };

    // Função chamada quando uma tecla é pressionada (navegação no teclado)
    const onKeyDown = (e) => {
        // Enter (seleciona a sugestão ativa)
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
        }
        // Up Arrow (navega para cima na lista de sugestões)
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // Down Arrow (navega para baixo na lista de sugestões)
        else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    // Componente da lista de sugestões
    const suggestionsListComponent = showSuggestions && userInput && (
        <ul className="suggestions">
            {filteredSuggestions.length ? (
                filteredSuggestions.map((suggestion, index) => {
                    let className;
                    // Adiciona uma classe para estilizar a sugestão ativa
                    if (index === activeSuggestion) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })
            ) : (
                <div className="no-suggestions">
                    <em>No suggestions, you're on your own!</em>
                </div>
            )}
        </ul>
    );

    return (
        <div>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
            {suggestionsListComponent}
        </div>
    );
};

export default Autocomplete;
