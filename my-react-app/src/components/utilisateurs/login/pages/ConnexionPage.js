import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ConnexionForm from "./ConnexionForm";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { useUser } from "../../../../Providers/UserProvider";

const ConnexionPage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();

    const [erreur, setErreur] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        if (loggedInUser) {
            console.log(loggedInUser);
        }
    }, [loggedInUser]);

    async function connexion(utilisateur) {
        try {
            const res = await fetch(
                'http://localhost:8081/api/v1/utilisateur/loginUtilisateur',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(utilisateur)
                }
            );

            if (res.status === 400) {
                setErreur(true);
                throw new Error('Cet Email n\'est pas associé à un compte');
            } else {
                setErreur(false);
            }

            const data = await res.json();
            setLoggedInUser(data);
            localStorage.setItem('token', JSON.stringify(data.data.token));
            localStorage.setItem('user_type', JSON.stringify(data.user_type))
            if (data.user_type) {
                switch (data.user_type) {
                    case 'Student':
                        setRedirectTo("/StudentHomePage");
                        break;
                    case 'Gestionnaire':
                        setRedirectTo("/GestionnaireHomePage");
                        break;
                    case 'Employeur':
                        setRedirectTo("/EmployeurHomePage");
                        break;
                    default:
                        // Handle unknown user_type
                        break;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className='bg-light '>
            <ConnexionForm onAdd={connexion} />
            {erreur && (
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
                                <Button className='w-100 btn button' onClick={() => setErreur(false)} variant='success'>Okay</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnexionPage;
