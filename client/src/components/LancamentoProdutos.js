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
import { showNoteFieldsAction } from '../actions/genericAction'; // Importe a ação corretamente

function LancamentoProdutos(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Referência ao primeiro input
    const nProdutoRef = useRef(null);

    // Variáveis com valores dos inputs dos produtos
    const [nProduto, setNproduto] = useState('');
    const [produto, setProduto] = useState('');
    const [unidade, setUnidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [finalNote, setFinalNote] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), e state para alterar entre os fields que vão ser mostrados no front-end (persons/products);
    const note = useSelector((state) => state.note);
    const showNoteFields = useSelector((state) => state.generic);

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

    function addProduct() {
        // Verifica se o produto está na lista de produtos no localStorage
        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((produto) => produto.nome);
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
        console.log(nProduto)
        setProduto('');
        console.log(produto)
        setUnidade('');
        console.log(unidade)
        setQuantidade('');
        console.log(quantidade)
        setError('');
        console.log(error)

        // Focar automaticamente no primeiro input
        if (nProdutoRef.current) {
            nProdutoRef.current.focus();
        }
    }

    // Função para enviar os valores dos inputs dos produtores para o reducer dos produtores, para ser consumido no componente LancamentoProdutos
    function handleFields() {
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

    // Mostrar o modal de confirmação
    function handleConcludeNote() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    // Lógica para concluir a nota
    function handleConfirmConcludeNote() {
        console.log('Nota concluída!');
        setShowModal(false);
    }

    return (
        <div className="inputFieldNotes">
            <div className="inputsLancarNotas">
                <div className="person">
                    <Input ref={nProdutoRef} autocomplete change={handleValue} valor={produto} name="produto" placeholder="Produto" size="inputMedium" />
                    <Input change={handleValue} valor={nProduto} name="nProduto" placeholder="N° Produto" size="inputMedium" />
                </div>
                <Input change={handleValue} valor={unidade} name="unidade" placeholder="Unidade" size="inputMedium" />
                <Input change={handleValue} valor={quantidade} name="quantidade" placeholder="Quantidade" size="inputMedium" />
                <Button click={addProduct} buttonType="buttonSuccess" name="+" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="listProducts">
                <div className="extractList">
                    <label><strong>Data:</strong> {note.dataNote}</label>
                    <label><strong>Nota fiscal:</strong> {note.nfNote}</label>
                    <label><strong>Matricula:</strong> {note.matriculaNote}</label>
                    <label><strong>Produtor / Atacadista:</strong> {note.personNote}</label>
                    <label><strong>Cidade:</strong> {note.cidadeNote}</label>
                </div>
                <div className='Table'>
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
