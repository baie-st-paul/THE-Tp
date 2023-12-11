import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBarStudent from "../../NavBar/student/NavBarStudent";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";

const OffreCandidaturePage = () => {
    let {state} = useLocation()
    const [candidatures, setCandidatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRefetch] = useState(false);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (state) {
            setFilter(state.selectVar)
        }
        console.log(state)

        const token = localStorage.getItem('token');
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        fetch(
            `http://localhost:8081/api/v1/student/getCandidatures/${savedMatricule}`,
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
                    console.log(data)
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

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }


    return (
        <div>
            <NavBarStudent/>
            <div id="Render" className="container content-container mt-4">
                <h1 className="display-4 text-center">Mes candidatures</h1>
                <div className="text-center"
                     style={{display: "flex", flexDirection: "row", width: "500px"}}>
                    <h5 style={{width: "40%", justifyContent: "center", display: "flex",
                        alignItems: "center"}}>Filtrer par:</h5>
                    <select
                        style={{width: "50%"}}
                        className="form-control d-inline"
                        value={filter}
                        onChange={handleFilter}
                    >
                        <option value="all">Tout</option>
                        <option value="In_review">En attente</option>
                        <option value="Accepted">Accepté</option>
                        <option value="Refused">Refusé</option>
                    </select>
                </div>
                {candidatures.length > 0 ?
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {candidatures.filter((candidature) => {
                                if (filter === "all") {
                                    return candidature
                                }
                                if (candidature.status === filter){
                                    return candidature
                                }
                            }).map((candidature, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <Card style={{ width: '30rem', margin: '5px', textAlign: "left"}}>
                                            <Card.Body>
                                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                                    {candidature.offreStage.titre}
                                                </Card.Title>
                                                {candidature.offreStage.description}
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item><b>Salaire:</b> {candidature.offreStage.salaire}$/h</ListGroup.Item>
                                                <ListGroup.Item><b>Programme:</b> {candidature.offreStage.studentProgram}</ListGroup.Item>
                                                <ListGroup.Item><b>Nombre postes disponible:</b> {candidature.offreStage.nbMaxEtudiants}</ListGroup.Item>
                                                <ListGroup.Item><b>Date de début:</b> {candidature.offreStage.dateDebut}</ListGroup.Item>
                                                <ListGroup.Item><b>Date de fin:</b> {candidature.offreStage.dateFin}</ListGroup.Item>
                                                {candidature.status === "Accepted" ?
                                                    <ListGroup.Item><b>Statut:</b> Accepté <FontAwesomeIcon icon={faCheck} /></ListGroup.Item> :
                                                    candidature.status === "Refused" ?
                                                        <ListGroup.Item><b>Statut:</b> Refusé <FontAwesomeIcon icon={faTimes} /></ListGroup.Item> :
                                                        <ListGroup.Item><b>Statut:</b> En attente</ListGroup.Item>
                                                }
                                            </ListGroup>
                                        </Card>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                    </Box> :
                    <p>Vous n'avez pas encore postulé sur aucune offre...</p>
                }
            </div>
        </div>
    );
};

export default OffreCandidaturePage;
