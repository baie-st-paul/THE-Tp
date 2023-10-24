import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaEnvelopeOpen, FaIdCard} from "react-icons/fa";
import Modal from "../Vetocv/Modal";

const EtudiantEmbauchePage = ({listeCandidature}) => {
    const [candidatures, setCandidatures] = useState([])
    const [candidature, setCandidature] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalLettre, setOpenModalLettre] = useState(false);

    useEffect(() => {
        getEtudiantsEmbauches();
    },[])

    async function getEtudiantsEmbauches() {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/candidatures/acceptees`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    const data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setCandidatures(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (candidatures !== undefined){
                setCandidatures(candidatures)
            }
        }
    }

    function handleMontrerCv(candidature){
        setOpenModal(!openModal)
        setCandidature(candidature)
    }

    function handleMontrerLettre(candidature){
        setOpenModalLettre(!openModalLettre)
        setCandidature(candidature)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="display-4 text-center">Liste des candidatures acceptées</h1>
            {candidatures.length > 0 &&
                candidatures.map(
                    (candidature, i) => (
                        <Card key={i} className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title>
                                    <b>Prénom:</b> {candidature.student.firstName}
                                </Card.Title>
                                <Card.Title>
                                    <b>Nom de famille:</b> {candidature.student.lastName}
                                </Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Adresse courriel:</b> {candidature.student.email}</ListGroup.Item>
                                <ListGroup.Item><b>Numéro de téléphone:</b> {candidature.student.phoneNumber}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Button className="btn btn-primary"
                                        onClick={() => handleMontrerCv(candidature)}>
                                    Résumé <FaIdCard
                                    style={{color: 'black'}}
                                />
                                </Button>

                                { candidature.student.fileName !== '' ?
                                    <Button className="btn btn-primary"
                                            onClick={() => handleMontrerLettre(candidature)}>
                                        Lettre de motivation <FaEnvelopeOpen
                                        style={{color: 'black'}}
                                    /></Button>
                                    : <Button className="btn btn-primary disabled"
                                              onClick={() => handleMontrerLettre(candidature)}>
                                        Lettre de motivation <FaEnvelopeOpen
                                        style={{color: 'black'}}
                                    /></Button>
                                }
                            </Card.Body>
                        </Card>
                    )
                )
            }
            {openModal && candidatures.length > 0 &&
                <Modal cv={candidature.cvStudent.file_cv} fileName={candidature.cvStudent.fileName}
                       onClose={handleMontrerCv} />
            }
            {openModalLettre && candidatures.length > 0 &&
                <Modal cv={candidature.lettreMotivation} fileName={candidature.fileName}
                       onClose={handleMontrerLettre} />
            }
        </div>
    )
}

export default EtudiantEmbauchePage
