import {useLocation} from "react-router-dom";
import React from "react";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {ListGroup} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const LandingCreatedEntrevue = () => {
    const location = useLocation();
    let entrevues = location.state;

    return (
        <div>
            <h1 className="display-4 text-center" style={{ color: 'darkgrey' }}>Entrevues prévues</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    {entrevues.map((entrevue) => (
                        <div key={entrevue.id} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Card style={{ width: '30rem', margin: '5px' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            L'étudiant de la matricule {entrevue.idEtudiant} est convoqué
                                        </Card.Title>
                                        <Card.Body>
                                            <Card.Text>
                                                {entrevue.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Date et heure: {entrevue.dateHeure}</ListGroup.Item>
                                        <ListGroup.Item>Statut:
                                            {entrevue.status === "EnAttente" && (
                                                <>
                                                    <FontAwesomeIcon icon={faClock} /> En attente
                                                </>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default LandingCreatedEntrevue
