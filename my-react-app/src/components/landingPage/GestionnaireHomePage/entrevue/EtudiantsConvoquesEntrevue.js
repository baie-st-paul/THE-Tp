import React, { useEffect } from 'react'
import { useState } from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "../Vetocv/Modal";
import {FaEnvelopeOpen, FaIdCard} from "react-icons/fa";
import NavBarGestionnaire from "../../NavBar/NavBarGestionnaire";

const OVERLAY_STYLE = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto"
};

export default function EtudiantsConvoquesEntrevue() {
    const [candidatures, setCandidatures] = useState([])
    const [offre, setOffre] = useState(null);
    const [filtre, setFiltre] = useState('')
    const [showOffreDetailed, setShowOffreDetailed] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getEtudiants();
    },[])

    async function getEtudiants() {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/studentsWithEntrevue`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (candidatures !== undefined){
                setCandidatures(candidatures)
            }
        }
    }

    function HandleOffreDetailed() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                    {offre.titre}
                                </Card.Title>
                                {offre.description}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Salaire:</b> {offre.salaire}$/h</ListGroup.Item>
                                <ListGroup.Item><b>Programme:</b> {offre.studentProgram}</ListGroup.Item>
                                <ListGroup.Item><b>Nombre postes disponible:</b> {offre.nbMaxEtudiants}</ListGroup.Item>
                                <ListGroup.Item><b>Date de début:</b> {offre.dateDebut}</ListGroup.Item>
                                <ListGroup.Item><b>Date de fin:</b> {offre.dateFin}</ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button className="btn btn-danger"
                                        onClick={() => setShowOffreDetailed(false)}>
                                    Fermer
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBarGestionnaire/>
            <div id="Render" className="container content-container mt-4">
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className="display-4 text-center">Liste des candidatures convoqué(es) à l'entrevue</h1>
                    <div className='text-start mt-3'> <label ><h3>Trouver par matricule &nbsp; </h3></label>
                        <input onChange={ (event)=> setFiltre(event.target.value)}></input>
                    </div>
                    {showOffreDetailed && <HandleOffreDetailed />}
                    {candidatures.length > 0 &&
                        candidatures.filter(candidatureNf => candidatureNf.student?.matricule?.includes(filtre))
                            .map((candidature, i) => (
                                <Card key={i} className="container-fluid" style={{ width: '85%', margin:"20px", textAlign: "left"}}>
                                    <Card.Body>
                                        <Card.Title data-testid={candidature.offreStage.titre}>
                                            <b>Nom de l'offre:</b> {candidature.offreStage.titre} <br/>
                                        </Card.Title>
                                        <Button className="btn btn-primary"
                                                onClick={() => {
                                                    setShowOffreDetailed(!showOffreDetailed)
                                                    setOffre(candidature.offreStage)
                                                }}>
                                            Plus de détails
                                        </Button>
                                        <br/> <b>Date, heure de l'entrevue:</b> {candidature.dateHeure} <br/>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item data-testid={candidature.employer.companyName}>
                                            <b>Nom de l'entreprise:</b> {candidature.employer.companyName}
                                        </ListGroup.Item>
                                        <ListGroup.Item data-testid={candidature.student.firstName}>
                                            <b>Prénom de l'étudiant:</b> {candidature.student.firstName}
                                        </ListGroup.Item>
                                        <ListGroup.Item data-testid={candidature.student.lastName}>
                                            <b>Nom de famille de l'étudiant:</b> {candidature.student.lastName}
                                        </ListGroup.Item>
                                        <ListGroup.Item data-testid={candidature.student.matricule}>
                                            <b>Matricule de l'étudiant:</b> {candidature.student.matricule}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}
