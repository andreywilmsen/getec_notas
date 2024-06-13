import React, { useState, useEffect } from 'react';
import '../styles/Table.css'
import axios from 'axios';

function Table(props) {
    let actualMonth = new Date().getMonth() + 1;

    const [month, setMonth] = useState(actualMonth);
    const [pointers, setPointers] = useState([]);

    async function handleMonth(e) {
        setMonth(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("http://localhost:8080/pointer/get", {
                    name: localStorage.getItem("name"),
                    month: Number(month)
                });
                setPointers(response.data.registros[0].days);
            } catch (err) {
                setPointers([])
                console.log(err);
            }
        }

        fetchData();
    }, [month])

    function sumHours(hours) {
        let totalMinutes = 0;
        hours.forEach(hour => {
            const [hourPart, minutePart, secondPart] = hour.split(':').map(Number);
            totalMinutes += hourPart * 60 + minutePart + secondPart / 60;
        });
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = Math.floor(totalMinutes % 60);
        return `${totalHours < 10 ? '0' : ''}${totalHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;    
    }

    return (
        <div className="Table">
            <span>Selecione o mês aqui</span>
            <select defaultValue={actualMonth} onChange={handleMonth}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Entrada</th>
                        <th>Saida</th>
                        <th>Entrada</th>
                        <th>Saida</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {pointers && (pointers.map(pointer => (
                        <tr key={pointer._id}>
                            <td>{pointer.data}</td>
                            <td>{pointer.pointers[0]}</td>
                            <td>{pointer.pointers[1]}</td>
                            <td>{pointer.pointers[2]}</td>
                            <td>{pointer.pointers[3]}</td>
                            <td>{sumHours(pointer.pointers)}</td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
