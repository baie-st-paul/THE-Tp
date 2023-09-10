import React, {useState} from "react";
import {CurrentEtudiant} from "../../inscription/etudiant/Etudiant";
import {isExpired} from "react-jwt";
import './ConnexionPage.css'
import {Link} from "react-router-dom";
import ConnexionForm from "./ConnexionForm";

const ConnexionPage = () => {
    const [etudiants, setEtudiants] = useState([]);

    async function connexion(etudiant) {
        const res = await fetch(
            'http://localhost:8081/api/v1/stages/loginStudent',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(etudiant)
            }
        )
        const data = await res.json()
        setEtudiants([...etudiants, data])
        const currentEtudiant = new CurrentEtudiant(data)
        localStorage.setItem('currentEtudiant', JSON.stringify(currentEtudiant))
        let jsonCurrentEtudiant = localStorage.getItem('currentEtudiant')
        console.log('is connected ', isConnected(jsonCurrentEtudiant))
        console.log('matricule ', getConnectedEtudiant(jsonCurrentEtudiant))
        console.log('token ', tokenEtudiant(jsonCurrentEtudiant))
    }

    function isConnected(jsonCurrentEtudiant) {
        console.log(jsonCurrentEtudiant)
        if (jsonCurrentEtudiant != null) {
            let currentEtudiant = JSON.parse(jsonCurrentEtudiant)

            if (isExpired(currentEtudiant.props.token)) {
                localStorage.removeItem('currentEtudiant')
            } else {
                return true
            }
        }
        return false
    }

    function getConnectedEtudiant(jsonCurrentEtudiant) {
        if (jsonCurrentEtudiant != null) {
            const currentEtudiant = JSON.parse(jsonCurrentEtudiant)
            return currentEtudiant.props.matricule
        } else {
            return ""
        }
    }

    function tokenEtudiant(jsonCurrentEtudiant) {
        if (jsonCurrentEtudiant != null) {
            const currentEtudiant = JSON.parse(jsonCurrentEtudiant)
            if (isExpired(currentEtudiant.props.token)) {
                localStorage.removeItem('currentEtudiant')
                return "";
            } else {
                return currentEtudiant.props.token
            }
        }
        return ""
    }

    return (
        <div className='bg-light vh-100'>
            {<ConnexionForm onAdd={connexion}/>}
            <Link to='/' className='centrerPage pt-2'>Retour</Link>
            {
                /*etudiants.length > 0 ?
                    <Navigate to="/"/>
                    : console.log('nothing yet')*/
            }
        </div>
    )
}

export default ConnexionPage
