import React, {useState} from "react";
import {CurrentUtilisateur} from "../Utilisateur";
import {isExpired} from "react-jwt";
import './ConnexionPage.css'
import {Navigate} from "react-router-dom";
import ConnexionForm from "./ConnexionForm";

const ConnexionPage = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);

    async function connexion(utilisateur) {
        const res = await fetch(
            'http://localhost:8081/api/v1/stages/loginUtilisateur',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(utilisateur)
            }
        )
        const data = await res.json()
        setUtilisateurs([...utilisateurs, data])
        console.log("data", data)
        const currentUtilisateur = new CurrentUtilisateur(data)
        localStorage.setItem('currentUtilisateur', JSON.stringify(currentUtilisateur))
        let jsonCurrentUtilisateur = localStorage.getItem('currentUtilisateur')
        console.log('is connected ', isConnected(jsonCurrentUtilisateur))
        console.log('email ', getConnectedUtilisateur(jsonCurrentUtilisateur))
        console.log('token ', tokenUtilisateur(jsonCurrentUtilisateur))
    }

    function isConnected(jsonCurrentUtilisateur) {
        console.log("jsonCurrentUtilisateur", jsonCurrentUtilisateur)
        if (jsonCurrentUtilisateur != null) {
            let currentUtilisateur = JSON.parse(jsonCurrentUtilisateur)

            if (isExpired(currentUtilisateur.props.token)) {
                localStorage.removeItem('currentUtilisateur')
            } else {
                return true
            }
        }
        return false
    }

    function getConnectedUtilisateur(jsonCurrentUtilisateur) {
        if (jsonCurrentUtilisateur != null) {
            const currentUtilisateur = JSON.parse(jsonCurrentUtilisateur)
            return currentUtilisateur.props.email
        } else {
            return ""
        }
    }

    function tokenUtilisateur(jsonCurrentUtilisateur) {
        if (jsonCurrentUtilisateur != null) {
            const currentUtilisateur = JSON.parse(jsonCurrentUtilisateur)
            if (isExpired(currentUtilisateur.props.token)) {
                localStorage.removeItem('currentUtilisateur')
                return "";
            } else {
                return currentUtilisateur.props.token
            }
        }
        return ""
    }

    return (
        <div className='bg-light vh-100'>
            {<ConnexionForm onAdd={connexion}/>}
            {
                utilisateurs.length > 0 ?
                    <Navigate to="/"/>
                    : console.log('nothing yet')
            }
        </div>
    )
}

export default ConnexionPage
