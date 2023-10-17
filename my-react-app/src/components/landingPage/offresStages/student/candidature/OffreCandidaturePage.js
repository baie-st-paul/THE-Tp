import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import "../../OffrePage.css";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OffreDescription from "../../OffreDescription";

const OffreCandidaturePage = () => {
    const [candidature, setCandidature] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRefetch] = useState(false);

    useEffect(() => {
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
                setCandidature(data)
                setIsLoading(false);
            }
        );

    }, [shouldRefetch]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }


    return (
        <div>
            <div className="custom-jumbotron">
                <Container>
                    <h1 className="display-4 text-center" style={{ color: 'darkgrey' }}>Mes candidatures</h1>
                </Container>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    {candidature.map((candidature, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Card style={{ width: '30rem', margin: '5px' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            {candidature.offreStageDTO.titre}
                                        </Card.Title>
                                        <OffreDescription offre={candidature.offreStageDTO}/>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Salaire: {candidature.offreStageDTO.salaire}$</ListGroup.Item>
                                        <ListGroup.Item>Programme: {candidature.offreStageDTO.studentProgram}</ListGroup.Item>
                                        <ListGroup.Item>Date de début: {candidature.offreStageDTO.dateDebut}</ListGroup.Item>
                                        <ListGroup.Item>Date de fin: {candidature.offreStageDTO.dateFin}</ListGroup.Item>
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
