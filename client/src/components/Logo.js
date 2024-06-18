import React from 'react'
import '../styles/Logo.css'

// Components

function Logotipo(props) {
    return (
        <div className='LogotipoCeasa'>
            <img src={'./'+props.image}></img>
        </div>
    )
}

export default Logotipo;