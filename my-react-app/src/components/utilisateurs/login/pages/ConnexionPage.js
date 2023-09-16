import React, {useState} from "react";
import {CurrentUtilisateur} from "../Utilisateur";
import {isExpired} from "react-jwt";
import './ConnexionPage.css'
import {Navigate} from "react-router-dom";
import ConnexionForm from "./ConnexionForm";
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

const ConnexionPage = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [erreur, setErreur] = useState(false);

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

        try {
            console.log(res.status)
            if (res.status === 400) {
                console.log(res.status)
                setErreur(true)
                throw new Error('Cet Email n\'est pas associé à un compte');
            } else {
                setErreur(false)
            }
        } catch (e) {
            console.log(e)
        }

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

    return (
        <div className='bg-light vh-100'>
            {<ConnexionForm onAdd={connexion}/>}
            {
                utilisateurs.length > 0 ?
                    <Navigate to="/landingPage"/>
                    : console.log('nothing yet')
            }
            { erreur === true &&
                <div className='w-100 vh-100'>
                    <div className="modal show bg-dark bg-opacity-75"
                         style={{ display: 'flex', position: 'fixed', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Dialog className='w-auto h-auto'>
                            <Modal.Header className='border-0 '>
                                <Modal.Title className=' font'><span className='font h4'>Erreur de connexion</span></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='text-danger'>
                                <h4 className='font h5'>CET EMAIL</h4>
                                <h4 className='font h5'>N'EST PAS ASSOCIÉ À UN COMPTE</h4>
                            </Modal.Body>

                            <Modal.Footer className='border-0'>
                                <Button className='w-100 btn button' onClick={()=> setErreur(!erreur)} variant='success'>Okay</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
            }
        </div>
    )
}

export function isConnected(jsonCurrentUtilisateur) {
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

export default ConnexionPage
