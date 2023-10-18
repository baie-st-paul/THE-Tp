import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import "../../OffrePage.css";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OffreDescription from "../../OffreDescription";
import CandidatureModal from "./CandidatureModal";

const OffresPageStudent = () => {
    const [offres, setOffres] = useState([]);
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

        fetchOffreList();
    }, [shouldRefetch]);

    const filteredOffreList = offres.filter((offreDto) => offreDto.status === filterOption);

    return (
        <div>
            <h1 className="display-4 text-center">Liste des offres de stage</h1>
            {filteredOffreList.length > 0 ?
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        {filteredOffreList.map((offre, index) => (
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
                                            <ListGroup.Item>Nombre postes disponible: {offre.nbMaxEtudiants}</ListGroup.Item>
                                            <ListGroup.Item>Date de début: {offre.dateDebut}</ListGroup.Item>
                                            <ListGroup.Item>Date de fin: {offre.dateFin}</ListGroup.Item>

                                            <ListGroup.Item>
                                                <CandidatureModal id={offre.id}/>
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
