import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CandidatureModal from "./CandidatureModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import NavBarStudent from "../../NavBar/student/NavBarStudent";

const OffresPageStudent = () => {
    const [offres, setOffres] = useState([]);
    const [candidaturesOffreId, setCandidaturesOffreId] = useState([]);
    const [shouldRefetch] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchOffreList();
        fetchCandidatures();
    }, [shouldRefetch]);

    async function fetchOffreList() {
        try {
            fetch(
                'http://localhost:8081/api/v1/stages/offres/',
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
                    let data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    data = data.filter((offre) => {
                        return offre.status === "Accepted"
                    })
                    setOffres(data);
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (offres !== undefined){
                setOffres(offres)
            }
        }
    }

    const fetchCandidatures = async () => {
        try {
            const savedMatricule = localStorage.getItem("loggedInUserMatricule");
            fetch(
                `http://localhost:8081/api/v1/student/getMesCandidatures/${savedMatricule}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch((error) => {
                console.error("Error:", error);
            }).then(
                async (response) => {
                    const data = await response.json();
                    console.log(response.status)
                    try{
                        console.log(response.status)
                    }
                    catch (e) {
                        console.log(e)
                    }
                    setCandidaturesOffreId(data.map(
                        (candidature) => {
                            return candidature.offreStageDTO.id
                        }))
                });
        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

    return (
        <div>
            <NavBarStudent/>
            <div id="Render" className="container content-container mt-4">
                <h1 className="display-4 text-center">Liste des offres de stage</h1>
                {offres.length > 0 ?
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {offres.map((offre, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <Card style={{ width: '30rem', margin: '5px', textAlign: "left"}}>
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

                                                <ListGroup.Item>
                                                    { candidaturesOffreId.length > 0 &&
                                                    candidaturesOffreId.includes(offre.id) ?
                                                        (
                                                            <>
                                                                <FontAwesomeIcon icon={faCheck} /> Vous avez postulé
                                                            </>
                                                        ) :
                                                        <CandidatureModal id={offre.id}/>
                                                    }
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                    </Box> :
                    <p>Il n'y a pas encore d'offres de stage...</p>
                }
            </div>
        </div>
    );
};

export default OffresPageStudent;
