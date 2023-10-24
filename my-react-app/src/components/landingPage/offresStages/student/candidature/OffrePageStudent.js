import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import "../../OffrePage.css";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CandidatureModal from "./CandidatureModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const OffresPageStudent = () => {
    const [offres, setOffres] = useState([]);
    const [candidatures, setCandidatures] = useState([]);
    const [filterOption] = useState("Accepted");
    const [shouldRefetch] = useState(false);

    useEffect(() => {
        const fetchOffreList = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/v1/stages/offres/');
                if (response.ok) {
                    const data = await response.json();
                    setOffres(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchCandidatures = async () => {
            try {
                const savedMatricule = localStorage.getItem("loggedInUserMatricule");
                fetch(
                    `http://localhost:8081/api/v1/student/getMesCandidatures/${savedMatricule}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                        setCandidatures(data)
                    }
                );
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        fetchOffreList();
        fetchCandidatures();
    }, [shouldRefetch]);

    const filteredOffreList= offres.filter((offreDto) => offreDto.status === filterOption);

    return (
        <div>
            <h1 className="display-4 text-center">Liste des offres de stage</h1>
            {filteredOffreList.length > 0 ?
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        {filteredOffreList.map((offre, index) => (
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
                                                {candidatures.length > 0 ?
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
    );
};

export default OffresPageStudent;
