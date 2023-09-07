import React, {useState} from 'react';
import InscriptionForm from "./InscriptionForm";
import "./InscriptionPage.css"
import al from "../../../../images/al.png";
import {Link} from "react-router-dom";

const InscriptionPage = () => {
    return (
        <div className='bg-light vh-100'>
            <div className='centrerPage pt-5'>
                <img  className='border logoAndre' src={al} alt="logoAndreLaurendeau"></img>
            </div>
            {<InscriptionForm />}
            <Link to='/' className='centrerPage pt-2'>Retour</Link>
        </div>
    )
}

export default InscriptionPage
