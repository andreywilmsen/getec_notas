import React, { useState, useEffect, useRef, forwardRef } from 'react';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de criar e importar um arquivo CSS para os estilos

const Input = forwardRef((props, ref) => {
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownMenuRef = useRef(null);
    const customInputRef = useRef(null);

    // Carrega os produtos do localStorage na inicialização do componente
    useEffect(() => {
        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((produto) => produto.nome);
            setAllSuggestions(nomesProdutos);
        }
    }, []);

    // Efeito para fechar o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownMenuRef.current &&
                !dropdownMenuRef.current.contains(event.target) &&
                !customInputRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
        props.change({ target: { value: option, name: props.name } }); // Propaga a mudança para o componente pai
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        props.change(event); // Propaga a mudança para o componente pai se necessário
    };

    return (
        props.span ? (
            // Se houver uma props chamada span, renderiza o input com o span em cima para identificar qual input é
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={handleInputChange}
                    value={props.valor || selectedOption}
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
                        ref={customInputRef}
                        className={'inputGeneral ' + props.size}
                        list="options"
                        id="optionInput"
                        name="produto"
                        value={selectedOption}
                        onChange={handleInputChange}
                        onClick={handleDropdownToggle}
                    />
                    <datalist id="options">
                        {allSuggestions.map((sugestao, index) => (
                            <option key={index} value={sugestao} onClick={() => handleOptionSelect(sugestao)}></option>
                        ))}
                    </datalist>
                </>
            ) : (
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
    );
});

export default Input;
