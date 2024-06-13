import React from 'react';
import '../styles/PointerRecorderHour.css';
import axios from 'axios';

// Components
import Button from '../components/Button';

function PointerRecorderHour(props) {

    async function postPointer() {
        try {
            const response = await axios.post("http://localhost:8080/pointer/post", {
                name: localStorage.getItem("name"),
                pointer: props.hour
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="pointerRecorderCard">
            <h3>{props.date}</h3>
            <h1>{props.hour}</h1>
            <div className="recorderHourButton">
                <Button click={postPointer} size="buttonExtraBig" buttonType="buttonSuccess" name="Registrar" />
            </div>
            <div className="showRecorder">
                <a onClick={props.click} >Visualizar grade</a>
            </div>
        </div>
    )
}

export default PointerRecorderHour;
