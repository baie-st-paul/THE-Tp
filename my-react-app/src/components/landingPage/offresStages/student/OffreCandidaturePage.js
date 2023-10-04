import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import "../OffrePage.css";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OffreDescription from "../OffreDescription";

const OffreCandidaturePage = () => {
    const [offres, setOffres] = useState([]);
    const [shouldRefetch] = useState(false);

    useEffect(() => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        const fetchOffreList = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/stages/getMesCandidatures?matricule=${savedMatricule}`);
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

        fetchOffreList();
    }, [shouldRefetch]);

    return (
        <div>
            <div className="custom-jumbotron">
                <Container>
                    <h1 className="display-4 text-center" style={{ color: 'darkgrey' }}>Mes candidatures</h1>
                </Container>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    {offres.map((offre, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Card style={{ width: '30rem', margin: '5px' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            {offre.titre}
                                        </Card.Title>
                                        <OffreDescription offre={offre}/>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Salaire: {offre.salaire}$</ListGroup.Item>
                                        <ListGroup.Item>Programme: {offre.studentProgram}</ListGroup.Item>
                                        <ListGroup.Item>Date de début: {offre.dateDebut}</ListGroup.Item>
                                        <ListGroup.Item>Date de fin: {offre.dateFin}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default OffreCandidaturePage;
