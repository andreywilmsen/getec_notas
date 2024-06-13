import React from 'react';
import '../styles/ToDoListItem.css'

// Components
import Button from '../components/Button';

function ToDoListItem() {
    return (
        <div className="toDoList">
            <div className="toDoListItem">
                <div className="toDoListItemHead">
                    <h2 className="toDoListItemHeadTitle" >Implementação de Back-end</h2>
                    <p className="toDoListItemHeadTag">Programação</p>
                    <p className="toDoListItemHeadDate"> 25/04/2024 </p>
                </div>
                <div className="toDoListItemBody">
                    <p className="toDoListItemBodyDescription">Criação de modelo MVC e Banco de Dados</p>
                    <div className="toDoListItemBodyButtons">
                        <Button buttonType="buttonEdit buttonGenericToDo" name="Editar" />
                        <Button buttonType="buttonDelete buttonGenericToDo" name="Remover" />
                        <Button buttonType="buttonCheck buttonGenericToDo" name="Concluir" />
                    </div>
                </div>
                <hr></hr>
            </div>
            
            
        </div>
    )
}

export default ToDoListItem;