import React, { useEffect, useState, useRef } from 'react';
import '../styles/AdminPanel.css';
import '../styles/LancamentoProdutos.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Autenticação de login
import AuthService from '../services/authService';

// Components
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal';

// Actions para reducer
import { setClear } from '../actions/clearAction';
import { showNoteFieldsAction } from '../actions/genericAction'; // Importe a ação corretamente

function LancamentoProdutos() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Variáveis com valores dos inputs dos produtos
    const [nProduto, setNproduto] = useState('');
    const [produto, setProduto] = useState('');
    const [unidade, setUnidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [finalNote, setFinalNote] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null); // Estado para controlar o input focado atualmente

    // Referência ao primeiro input para puxar automaticamente para ele ao adicionar um produto na nota
    const nProdutoRef = useRef(null);

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), state para alterar entre os fields que vão ser mostrados no front-end (persons/products), e state para limpar o campo do autocomplete quando adicionar produto;
    const note = useSelector((state) => state.note);
    const clear = useSelector((state) => state.generic);
    const showNoteFields = useSelector((state) => state.generic);

    // Autenticação se usuário está logado
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    // Função para armazenar os valores dos inputs nas suas respectivas variáveis
    function handleValue(event) {
        switch (event.target.name) {
            case 'nProduto':
                setNproduto(event.target.value);
                break;
            case 'produto':
                setProduto(event.target.value);
                break;
            case 'unidade':
                setUnidade(event.target.value);
                break;
            case 'quantidade':
                setQuantidade(event.target.value);
                break;
            default:
                break;
        }
    }

    // Handler para atualizar o estado do input focado
    const handleFocus = (event) => {
        setFocusedInput(event.target.name);
    };

    const handleBlur = (event) => {
        // Verifica se o próximo elemento focado é outro input antes de realizar as operações
        if (event.relatedTarget && event.relatedTarget.nodeName === 'INPUT') {
            let productFinally = JSON.parse(localStorage.getItem('Produtos'));

            // Encontrar o produto pelo nome (suponho que o produto seja identificado pelo nome)
            const produtoEncontrado = productFinally.find((prod) => prod.nome === produto);
            if (produtoEncontrado) {
                setNproduto(produtoEncontrado.codigo);
                setUnidade(produtoEncontrado.und);
            }
        }
    };

    // Função de adicionar o Produto
    function addProduct() {
        // Verifica se o valor do input é compatível com as sugestões de produtos, caso não, dispara um erro.
        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((prod) => prod.nome);
            if (!nomesProdutos.includes(produto)) {
                setError('Por favor, selecione um produto válido da lista.');
                return;
            }
        } else {
            setError('Nenhum produto encontrado. Verifique a lista de produtos.');
            return;
        }

        // Se passou na validação, adiciona o produto à nota final
        let product = { nProduto, produto, unidade, quantidade };
        setFinalNote([...finalNote, product]);

        // Limpar os valores dos inputs e resetar o erro
        setNproduto('');
        setProduto('');
        setUnidade('');
        setQuantidade('');
        setError('');

        // Foca automaticamente no primeiro input
        if (nProdutoRef.current) {
            clearInputProduto();
            nProdutoRef.current.focus();
        }
    }

    // Função para enviar os valores dos inputs dos produtores para o reducer dos produtores, para ser consumido no componente LancamentoProdutos
    function handleFields() {
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

    // Funções do modal
    function handleConcludeNote() {
        setShowModal(true);
    }
    function handleCloseModal() {
        setShowModal(false);
    }
    function handleConfirmConcludeNote() {
        console.log('Nota concluída!');
        setShowModal(false);
    }

    // Função para limpar o input Produto quando uma opção for selecionada no autocomplete
    function clearInputProduto() {
        dispatch(setClear(true));
        console.log(clear);
    }

    return (
        <div className="inputFieldNotes">
            <div className="inputsLancarNotas">
                <div className="person">
                    <Input
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={nProdutoRef}
                        autocomplete
                        change={handleValue}
                        valor={produto}
                        name="produto"
                        placeholder="Produto"
                        size="inputMedium"
                        clearInput={clear}
                        typeAutocomplete="Produto"
                    />
                    <Input
                        disabled
                        onFocus={handleFocus}
                        change={handleValue}
                        valor={nProduto}
                        name="nProduto"
                        placeholder="N° Produto"
                        size="inputMedium"
                    />
                </div>
                <Input
                    disabled
                    onFocus={handleFocus}
                    change={handleValue}
                    valor={unidade}
                    name="unidade"
                    placeholder="Unidade"
                    size="inputMedium"
                />
                <Input
                    onFocus={handleFocus}
                    change={handleValue}
                    valor={quantidade}
                    name="quantidade"
                    placeholder="Quantidade"
                    size="inputMedium"
                />
                <Button click={addProduct} buttonType="buttonSuccess" name="+" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="listProducts">
                <div className="extractList">
                    <label>
                        <strong>Data:</strong> {note.dataNote}
                    </label>
                    <label>
                        <strong>Nota fiscal:</strong> {note.nfNote}
                    </label>
                    <label>
                        <strong>Matricula:</strong> {note.matriculaNote}
                    </label>
                    <label>
                        <strong>Produtor / Atacadista:</strong> {note.personNote}
                    </label>
                    <label>
                        <strong>Cidade:</strong> {note.cidadeNote}
                    </label>
                </div>
                <div className="Table">
                    <table>
                        <thead>
                            <tr>
                                <th>N° PRODUTO</th>
                                <th>PRODUTO</th>
                                <th>UNIDADE</th>
                                <th>QUANTIDADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalNote.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nProduto}</td>
                                    <td>{item.produto}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="buttonsLancamentoNotas">
                <Button click={handleFields} buttonType="buttonLogout" name="Cancelar" />
                <Button click={handleConcludeNote} buttonType="buttonSuccess" name="Concluir nota" />
            </div>
            <Modal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmConcludeNote}
                title="Confirmar Conclusão"
            >
                <p>Tem certeza que deseja concluir a nota?</p>
            </Modal>
        </div>
    );
}

export default LancamentoProdutos;
