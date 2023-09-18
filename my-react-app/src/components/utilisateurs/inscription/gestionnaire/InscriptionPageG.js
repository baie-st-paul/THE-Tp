import InscriptionFormG from "./InscriptionFormG";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const InscriptionPageG = () => {
    const[gestionnaires, setGestionnaires] = useState([]);
    const [erreur, setErreur] = useState(false);

    const inscription = async (gestionnaire) => {
        console.log(erreur)
        const res = await fetch(
            'http://localhost:8081/api/v1/utilisateur/newAdmin',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(gestionnaire)
            }
        )

        try {
            console.log(res.status)
            if (res.status === 400) {
                console.log(res.status)
                setErreur(true)
                throw new Error('Cette matricule ou Email est déjà associé à un compte');
            } else {
                setErreur(false)
            }
        } catch (e) {
            console.log(e)
        }

        const data = await res.json()
        setGestionnaires([...gestionnaires, data])
        console.log(data)
    }

    return (
        <div className='bg-light vh-100'>
            {<InscriptionFormG onAdd={inscription}/>}
            {
                gestionnaires.length > 0 ?
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

export default InscriptionPageG;
