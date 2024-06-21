import React, { useState, useEffect, forwardRef } from 'react';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de criar e importar um arquivo CSS para os estilos

const Input = forwardRef((props, ref) => {

    // FUNÇÕES PARA O AUTOCOMPLETE
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
        if (props.change) {
            props.change(e);
        }
    };

    const onClick = (e) => {
        const selectedSuggestion = e.currentTarget.innerText;
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(selectedSuggestion);
        console.log('userInput: ', userInput, filteredSuggestions)
        if (props.change) {
            props.change({
                target: { value: selectedSuggestion, name: props.name }
            });
        }
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && filteredSuggestions.length > 0) { // Enter
            const selectedSuggestion = filteredSuggestions[0];
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            setUserInput(selectedSuggestion);
            if (props.change) {
                props.change({
                    target: { value: selectedSuggestion, name: props.name }
                });
            }
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
        props.span ? (
            // Se houver uma props chamada span, renderiza o input com o span em cima para identificar qual input é
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={props.change}
                    value={props.valor}
                    placeholder={props.placeholder}
                    name={props.name}
                    type={props.inputType}
                    className={'inputGeneral ' + props.size}
                />
            </>
        ) : (props.autocomplete ? (
            <div className="autocomplete">
                <input
                    ref={ref}
                    className={'inputGeneral ' + props.size}
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="Type to search..."
                />
                {suggestionsListComponent}
            </div>
        ) : (
            // Caso contrário, renderiza um input sem span
            <input
                ref={ref}
                onChange={props.change}
                value={props.valor}
                placeholder={props.placeholder}
                name={props.name}
                type={props.inputType}
                className={'inputGeneral ' + props.size}
            />
        )
        )
    );
});

export default Input;
