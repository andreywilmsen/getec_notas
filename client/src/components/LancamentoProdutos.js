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
import { showNoteFieldsAction } from '../actions/genericAction';
import DropdownAutocomplete from './DropdownAutocomplete';

function LancamentoProdutos() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [produto, setProduto] = useState('');
    const [unidade, setUnidade] = useState('');
    const [peso, setPeso] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [finalNote, setFinalNote] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectOptions, setSelectOptions] = useState();
    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const nProdutoRef = useRef(null);

    const note = useSelector((state) => state.note);
    const clear = useSelector((state) => state.generic);
    const showNoteFields = useSelector((state) => state.generic);

    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    const buscarProdutoNoLocalStorage = (nomeProduto) => {
        const produtosStorage = localStorage.getItem('Produtos');
        if (!produtosStorage) return null;
        const produtos = JSON.parse(produtosStorage);
        return produtos.find(prod => prod.produto === nomeProduto) || null;
    };

    const gerarObjetoComValoresMaioresQueZero = (data) => {
        const { id, ...resto } = data;
        return Object.entries(resto).reduce((acc, [key, value]) => {
            if (value > 0) acc[key] = value.toString();
            return acc;
        }, {});
    };

    useEffect(() => {
        const produtoEncontrado = buscarProdutoNoLocalStorage(produto);
        if (produtoEncontrado) {
            const novoObjeto = gerarObjetoComValoresMaioresQueZero(produtoEncontrado);
            setSelectOptions(novoObjeto);
        }
    }, [produto]);

    function handleValue(event) {
        if (event.target.placeholder !== 'Produto' && event.target.placeholder !== 'Quantidade') {
            const selectedUnit = event.target.value;
            setUnidade(event.target.value.toUpperCase());
            if (selectOptions && Object.keys(selectOptions).length > 0) {
                const unitWeight = selectOptions[selectedUnit];
                if (unitWeight) {
                    setPeso(unitWeight);
                } else {
                    setPeso('');
                }
            } else {
                setPeso('');
            }
        }

        switch (event.target.placeholder) {
            case 'Produto':
                setProduto(event.target.value);
                break;
            case 'Quantidade':
                setQuantidade(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleFocus = (event) => {
        setFocusedInput(event.target.name);
    };

    function addProduct() {
        if (!produto || !unidade || !quantidade) {
            alert('Por favor, preencha todos os campos do produto antes de adicionar.');
            return;
        }

        if (!note.dataNote || !note.nfNote || !note.personNote || !note.cidadeNote) {
            alert('Por favor, preencha todos os campos da nota antes de adicionar um produto.');
            return;
        }

        const produtosFromStorage = localStorage.getItem('Produtos');
        if (produtosFromStorage) {
            const produtos = JSON.parse(produtosFromStorage);
            const nomesProdutos = produtos.map((prod) => prod.produto);
            if (!nomesProdutos.includes(produto)) {
                alert('Por favor, selecione um produto válido da lista.');
                setError('Produto inválido.');
                return;
            }
        } else {
            alert('Nenhum produto encontrado. Verifique a lista de produtos.');
            setError('Nenhum produto encontrado.');
            return;
        }

        const product = {
            data: note.dataNote,
            numeroNotaFiscal: note.nfNote,
            destino: note.personNote,
            procedencia: note.cidadeNote,
            produto,
            unidade,
            unidade_peso: peso,
            quantidade,
            volume: quantidade * peso,
        };

        setFinalNote(prevFinalNote => {
            const updatedFinalNote = [...prevFinalNote, product];
            console.log(updatedFinalNote); // Log após a atualização
            return updatedFinalNote;
        });

        setProduto('');
        setUnidade('');
        setQuantidade('');
        setError('');
        clearInputProduto();

        if (nProdutoRef.current) {
            nProdutoRef.current.focus();
        }
    }

    function handleFields() {
        dispatch(showNoteFieldsAction(!showNoteFields));
    }

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
                </div>
                <Input
                    inputOptions
                    options={selectOptions}
                    change={handleValue}
                    placeholder="Unidade"
                    size="inputMedium"
                    valor={unidade}
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
