import InscriptionFormEmp from "./InscriptionFormEmp";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const InscriptionPageEmp = () => {
    const [employeurs, setEmployeurs] = useState([]);
    const [erreur, setErreur] = useState(false);

    async function inscription(employeur) {
        try {
            console.log(erreur)
            fetch(
                'http://localhost:8081/api/v1/utilisateur/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    withCredentials: true,
                    body: JSON.stringify(employeur)
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        const data = await res.json()
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                            throw new Error('Cet Email est déjà associé à un compte');
                        }
                        setErreur(false)
                        setEmployeurs([...employeurs, data])
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
            {<InscriptionFormEmp onAdd={inscription}/>}
            {
                employeurs.length > 0 ?
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
                                <h4 className='font h5'>CET EMAIL</h4>
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

export default InscriptionPageEmp;
