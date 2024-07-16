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
import DropdownAutocomplete from './DropdownAutocomplete';

function LancamentoProdutos() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Variáveis com valores dos inputs dos produtos
    const [produto, setProduto] = useState('');
    const [unidade, setUnidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [finalNote, setFinalNote] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectOptions, setSelectOptions] = useState()
    const [error, setError] = useState('');
    // Estado para controlar o input focado atualmente
    const [focusedInput, setFocusedInput] = useState(null);

    // Referencia para voltar ao input inicial ao clicar em adicionar produto
    const nProdutoRef = useRef(null);

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), state para alterar entre os fields que vão ser mostrados no front-end (persons/products), e state para limpar o campo do autocomplete quando adicionar produto;
    const note = useSelector((state) => state.note);
    const clear = useSelector((state) => state.generic);
    const showNoteFields = useSelector((state) => state.generic);

    // Autenticação se usuário está logado
    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);


    const buscarProdutoNoLocalStorage = (nomeProduto) => {
        const produtosStorage = localStorage.getItem('Produtos');
        if (!produtosStorage) return null; // Retorna null se não houver produtos

        const produtos = JSON.parse(produtosStorage);
        return produtos.find(prod => prod.produto === nomeProduto) || null; // Retorna o produto encontrado ou null
    };

    const gerarObjetoComValoresMaioresQueZero = (data) => {
        const { id, ...resto } = data; // Remove o 'id'
        return Object.entries(resto).reduce((acc, [key, value]) => {
            if (value > 0) acc[key] = value.toString(); // Adiciona se maior que 0
            return acc;
        }, {});
    };

    useEffect(() => {
        const produtoEncontrado = buscarProdutoNoLocalStorage(produto); // 'produto' é o nome que você procura
        if (produtoEncontrado) {
            const novoObjeto = gerarObjetoComValoresMaioresQueZero(produtoEncontrado);
            console.log(novoObjeto);
            setSelectOptions(novoObjeto);

        } else {
            console.log('Produto não encontrado no localStorage.');
        }
    }, [produto]);

    // Função para armazenar os valores dos inputs nas suas respectivas variáveis
    function handleValue(event) {
        switch (event.target.placeholder) {
            case 'Produto':
                setProduto(event.target.value);
                break;
            case 'Unidade':
                setUnidade(event.target.value);
                break;
            case 'Quantidade':
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
    // Função de adicionar o Produto
    function addProduct() {
        // Verifica se todos os campos do novo produto estão preenchidos
        console.log(produto, unidade, quantidade)
        if (!produto || !unidade || !quantidade) {
            alert('Por favor, preencha todos os campos do produto antes de adicionar.');
            return;
        }

        // Verifica se todos os campos da nota estão preenchidos
        if (!note.dataNote || !note.nfNote || !note.personNote || !note.cidadeNote) {
            alert('Por favor, preencha todos os campos da nota antes de adicionar um produto.');
            return;
        }

        // Verifica se o valor do input é compatível com as sugestões de produtos
        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((prod) => prod.produto);

            // Verifica se o produto digitado está na lista de produtos válidos
            if (!nomesProdutos.includes(produto)) {
                alert('Por favor, selecione um produto válido da lista.');
                setError('Por favor, selecione um produto válido da lista.');
                return;
            }
        } else {
            alert('Nenhum produto encontrado. Verifique a lista de produtos.');
            setError('Nenhum produto encontrado. Verifique a lista de produtos.');
            return;
        }

        // Se passou na validação, adiciona o produto à nota final
        const product = { produto, unidade, quantidade };
        setFinalNote(prevFinalNote => [...prevFinalNote, product]);

        // Limpar os valores dos inputs
        setProduto(''); // Limpa o campo do produto
        setUnidade(''); // Limpa o campo da unidade
        setQuantidade(''); // Limpa o campo da quantidade
        setError(''); // Reseta o erro

        clearInputProduto()

        // Foca automaticamente no primeiro input
        if (nProdutoRef.current) {
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
    }

    return (
        <div className="inputFieldNotes">
            <div className="inputsLancarNotas">
                <div className="person">
                    <DropdownAutocomplete
                        onFocus={handleFocus}
                        ref={nProdutoRef}
                        autocomplete
                        change={handleValue}
                        valor={produto}
                        placeholder="Produto"
                        size="inputMedium"
                        clearInput={clear}
                        typeAutocomplete="Produto"
                    />
                    {/* <InputAutocomplete
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
                    /> */}
                </div>
                <Input
                    inputOptions
                    options={selectOptions}
                    change={handleValue} // Chama a mesma função para lidar com mudanças
                    placeholder="Unidade"
                    size="inputMedium"
                    valor={unidade} // Ligação correta com a variável unidade
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
            {/* {error && <p className="error-message">{error}</p>} */}
            <div className="listProducts">
                <div className="extractList">
                    <label>
                        <strong>Data:</strong> {note.dataNote}
                    </label>
                    <label>
                        <strong>Nota fiscal:</strong> {note.nfNote}
                    </label>
                    <label>
                        <strong>Procedência:</strong> {note.cidadeNote}
                    </label>
                    <label>
                        <strong>Produtor / Atacadista:</strong> {note.personNote}
                    </label>
                </div>
                <div className="Table">
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUTO</th>
                                <th>UNIDADE</th>
                                <th>QUANTIDADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalNote.map((item, index) => (
                                <tr key={index}>
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