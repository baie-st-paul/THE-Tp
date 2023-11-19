import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBarStudent from "../../NavBar/student/NavBarStudent";

const OffreCandidaturePage = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRefetch] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
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
                setCandidatures(data)
                setIsLoading(false);
            }
        );

    }, [shouldRefetch]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }


    return (
        <div>
            <NavBarStudent/>
            <div id="Render" className="container content-container mt-4">
                <h1 className="display-4 text-center">Mes candidatures</h1>
                {candidatures.length > 0 ?
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {candidatures.map((candidature, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <Card style={{ width: '30rem', margin: '5px', textAlign: "left"}}>
                                            <Card.Body>
                                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                                    {candidature.offreStageDTO.titre}
                                                </Card.Title>
                                                {candidature.offreStageDTO.description}
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item><b>Salaire:</b> {candidature.offreStageDTO.salaire}$/h</ListGroup.Item>
                                                <ListGroup.Item><b>Programme:</b> {candidature.offreStageDTO.studentProgram}</ListGroup.Item>
                                                <ListGroup.Item><b>Nombre postes disponible:</b> {candidature.offreStageDTO.nbMaxEtudiants}</ListGroup.Item>
                                                <ListGroup.Item><b>Date de début:</b> {candidature.offreStageDTO.dateDebut}</ListGroup.Item>
                                                <ListGroup.Item><b>Date de fin:</b> {candidature.offreStageDTO.dateFin}</ListGroup.Item>
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

export default OffreCandidaturePage;
