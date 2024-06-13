import React, { useState, useEffect } from 'react';
import '../styles/PointerRecorderTable.css';

// Components
import Table from '../components/Table';

function PointerRecorderTable(props) {

    return (
        <div className="tableRecorderCard">
            <Table date={props.date} />
            <div className="showRecorder">
                <a onClick={props.click} >Voltar</a>
            </div>

        </div>
    )
}

export default PointerRecorderTable;
