import React, { useState, useEffect, useRef, forwardRef } from 'react';
import '../styles/Input.css';
import '../styles/Autocomplete.css'; // Certifique-se de criar e importar um arquivo CSS para os estilos
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../actions/clearAction';

const Input = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const [allSuggestions, setAllSuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownMenuRef = useRef(null);
    const customInputRef = useRef(null);

    // State para verificar se deve ou não limpar o input autocomplete
    const clear = useSelector((state) => state.clear);

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

    // Abre o dropdown com sugestões
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Dispara para o componente pai o valor da sugestão
    const handleInputChange = (event) => {
        let value = event.target.value;
        setSelectedOption(value);
        props.change(event);
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
        props.span ? (
            // Se houver uma props chamada span, renderiza o input com o span em cima para identificar qual input é
            <>
                <span className="spanInput">{props.span}</span>
                <input
                    ref={ref}
                    onChange={handleInputChange}
                    value={props.valor}
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
                        ref={ref}
                        className={'inputGeneral ' + props.size}
                        list="options"
                        id="optionInput"
                        name="produto"
                        value={selectedOption}
                        placeholder='Produto'
                        onChange={handleInputChange}
                        onClick={handleDropdownToggle}
                        onBlur={props.onBlur} // Chama a função handleBlur ao perder o foco
                    />
                    <datalist id="options">
                        {allSuggestions.map((sugestao, index) => (
                            <option key={index} value={sugestao}></option>
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
