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
        let sugestionsStore;
        if (props.typeAutocomplete === 'Persons') {
            sugestionsStore = localStorage.getItem('Persons');
        } else {
            sugestionsStore = localStorage.getItem('Produtos');
        }

        // Verifica se sugestionsStore não é null antes de tentar fazer o parsing
        if (sugestionsStore) {
            const sugestions = JSON.parse(sugestionsStore);
            const nameSugestions = sugestions.map((sugestion) => sugestion.nome);

            // Insere todas as sugestões de nomes ou produtos nas sugestões do campo de input
            setAllSuggestions(nameSugestions);
        } else {
            console.log('Item não encontrado no localStorage');
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
                        placeholder={props.typeAutocomplete === 'Persons' ? 'Produtor / Atacadista' : 'Produto'}
                        onChange={handleInputChange}
                        onClick={handleDropdownToggle}
                        onBlur={props.onBlur}
                    />
                    <datalist id="options">
                        {allSuggestions.map((sugestao, index) => (
                            <option key={index} value={sugestao}></option>
                        ))}
                    </datalist>
                </>
            ) : (props.disabled ? (
                // Caso o input deverá ser desabilitado para edição
                <input
                    disabled
                    ref={ref}
                    onChange={handleInputChange}
                    value={props.valor}
                    placeholder={props.placeholder}
                    name={props.name}
                    type={props.inputType}
                    className={'inputGeneral ' + props.size}
                />) : (
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
        )
    );
});

export default Input;
