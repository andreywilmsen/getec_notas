import React, { useEffect, useState } from 'react';
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

    // Variáveis com valores dos inputs dos produtos
    const [nProduto, setNproduto] = useState('');
    const [produto, setProduto] = useState('');
    const [unidade, setUnidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [finalNote, setFinalNote] = useState([]);
    const [showModal, setShowModal] = useState(false);


    // Valores dos states de nota fiscal que contém os valores dos persons (produtores/atacadistas), e state para alterar entre os fields que vão ser mostrados no front-end (persons/products);
    const note = useSelector((state) => state.note);
    const showNoteFields = useSelector((state) => state.generic);


    useEffect(() => {
        AuthService(navigate, location, dispatch);
    }, [navigate, location, dispatch]);

    // Função para armazenar os valores dos inputs nas suas respectivas variáveis
    function handleValue(event) {
        switch (event.target.placeholder) {
            case 'N° Produto':
                setNproduto(event.target.value);
                break;
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

    function addProduct() {
        let product = { nProduto, produto, unidade, quantidade };
        setFinalNote([...finalNote, product]);
        console.log(finalNote);
        // console.log(note.data, note.nfNote, note.matriculaNote, note.personNote, note.cidadeNote, nProduto, produto, unidade, quantidade)
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
                    <Input change={handleValue} valor={nProduto} placeholder="N° Produto" size="inputMedium" />
                    <Input change={handleValue} valor={produto} placeholder="Produto" size="inputMedium" />
                </div>
                <Input change={handleValue} valor={unidade} placeholder="Unidade" size="inputMedium" />
                <Input change={handleValue} valor={quantidade} placeholder="Quantidade" size="inputMedium" />
                <Button click={addProduct} buttonType="buttonSuccess" name="+" />
            </div>
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
                                {/* <th>TOTAL</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {finalNote.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nProduto}</td>
                                    <td>{item.produto}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
                                    {/* <td>Data 5</td> */}
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
