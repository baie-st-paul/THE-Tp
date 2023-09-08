import React, {useState} from 'react';
import InscriptionForm from "./InscriptionForm";
import "./InscriptionPage.css"
import al from "../../../../images/al.png";
import {Link, Navigate} from "react-router-dom";

const InscriptionPage = () => {
    const [etudiants, setEtudiants] = useState([])
    const inscription = async (etudiant) => {
        const res = await fetch(
            'http://localhost:8081/api/v1/stages/newStudent',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(etudiant)
            })
        const data = await res.json()
        setEtudiants([...etudiants, data])
    }

    return (
        <div className='bg-light vh-100'>
            <div className='centrerPage pt-5'>
                <img  className='border logoAndre' src={al} alt="logoAndreLaurendeau"></img>
            </div>
            {<InscriptionForm onAdd={inscription}/>}
            <Link to='/' className='centrerPage pt-2'>Retour</Link>
            {
                etudiants.length > 0 ?
                    <Navigate to="/"/>
                    : console.log('nothing yet')
            }
            <div >
                {<InscriptionForm />}
            </div>
        </div>
    );
}

export default InscriptionPage;
