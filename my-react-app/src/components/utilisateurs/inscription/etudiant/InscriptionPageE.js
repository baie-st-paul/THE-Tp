import React, {useState} from 'react';
import InscriptionFormE from "./InscriptionFormE";
import "../InscriptionPage.css"
import {Navigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

const InscriptionPageE = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [erreur, setErreur] = useState(false);

    async function inscription(etudiant) {
        try {
            fetch(
                'http://localhost:8081/api/v1/utilisateur/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    withCredentials: true,
                    body: JSON.stringify(etudiant)
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        const data = await res.json()
                        console.log(res.status)
                        if (res.status !== 200) {
                            console.log(res.status)
                            throw new Error('Cette matricule ou Email est déjà associé à un compte');
                        }
                        setErreur(false)
                        setEtudiants([...etudiants, data])
                        console.log(data)
                    } catch (e) {
                        console.log(e)
                        setErreur(true)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

    return (
        <div className='bg-light vh-100'>
            {<InscriptionFormE onAdd={inscription}/>}
            {
                etudiants.length > 0 ?
                    <Navigate to="/utilisateurConnexion"/>
                    : console.log('nothing yet')
            }
            { erreur === true &&
                <div className='w-100 vh-100'>
                    <div className="modal show bg-dark bg-opacity-75"
                         style={{ display: 'flex', position: 'fixed', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Dialog className='w-auto h-auto'>
                            <Modal.Header className='border-0 '>
                                <Modal.Title className=' font'><span className='font h4'>Erreur d'inscription</span></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='text-danger'>
                                <h4 className='font h5'>CETTE MATRICULE OU EMAIL</h4>
                                <h4 className='font h5'>EST DÉJÀ ASSOCIÉ À UN COMPTE</h4>
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

export default InscriptionPageE
