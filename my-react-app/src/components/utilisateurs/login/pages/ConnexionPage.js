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
            await fetch(
                'http://localhost:8081/api/v1/utilisateur/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(utilisateur)
                }
            ).catch((error) => {
                console.error(error);
                setErreur(true);
            }).then(async (res) => {
                if(res.status === 404){
                    setErreur(true);
                }
                else {
                    const data = await res.json();
                    console.log(data)
                    localStorage.clear()
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_type', data.role);
                }
            });
            if (!erreur){
                const role = localStorage.getItem('user_type').replace(/["]/g, '');
                const token = localStorage.getItem('token');
                console.log(token)
                console.log(role)

                if (role) {
                    switch (role) {
                        case "Student":
                            await fetch(
                                'http://localhost:8081/api/v1/student/getstudent',
                                {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': 'Bearer ' + token
                                    },
                                    withCredentials: true

                                }
                            ).catch((error) => {
                                console.error(error);

                            }).then(async (res) => {
                                const dataStudentGetDTO = await res.json();
                                console.log(dataStudentGetDTO)
                                setLoggedInUser(dataStudentGetDTO);
                                setRedirectTo("/StudentHomePage");
                            });
                            break;
                        case 'Gestionnaire':
                            await fetch(
                                'http://localhost:8081/api/v1/gestionnaire/getGestionnaire',
                                {
                                    method: 'GET',
                                    headers: {
                                        Authorization: 'Bearer ' + token
                                    },
                                    withCredentials: true
                                }
                            ).catch((error) => {
                                console.error(error);
                                setErreur(true);
                            }).then(async (res) => {
                                const dataGestionnaireGetDTO = await res.json();
                                console.log(dataGestionnaireGetDTO)
                                setLoggedInUser(dataGestionnaireGetDTO);
                                setRedirectTo("/GestionnaireHomePage");
                            });
                            break;
                        case 'Employeur':
                            await fetch(
                                'http://localhost:8081/api/v1/employers/getEmployer',
                                {
                                    method: 'GET',
                                    headers: {
                                        Authorization: 'Bearer ' + token
                                    },
                                    withCredentials: true
                                }
                            ).catch((error) => {
                                console.error(error);
                                setErreur(true);
                            }).then(async (res) => {
                                const dataEmployeurGetDTO = await res.json();
                                console.log(dataEmployeurGetDTO)
                                setLoggedInUser(dataEmployeurGetDTO);
                                localStorage.setItem("employer_id", JSON.stringify(dataEmployeurGetDTO.id));
                                setRedirectTo("/EmployeurHomePage");
                            });
                            break;
                        default:
                            break;
                    }
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
            {erreur ?
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
            : null}
        </div>
    );
};

export default ConnexionPage;
