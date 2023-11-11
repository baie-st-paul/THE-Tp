import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock} from "@fortawesome/free-solid-svg-icons";

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

const CardPageContrats = ({contrats}) => {
    const [showContratDetailed, setShowContratDetailed] = useState(false);
    const [contrat, setContrat] = useState(null);

    function HandleDetailedContrat() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                    {contrat.prenomEtudiant + ", " + contrat.nomEtudiant}
                                </Card.Title>
                                {contrat.nomDePoste}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Matricule:</b> {contrat.studentId}</ListGroup.Item>
                                <ListGroup.Item><b>Signé par étudiant: </b>
                                    {contrat.statutEtudiant === "Pas_Signer" ?
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faClock} /> Signature requise
                                            </>
                                        ) :
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faCheck} /> Signé
                                            </>
                                        )
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item><b>Signé par employeur: </b>
                                    {contrat.statutEmployeur === "Pas_Signer" ?
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faClock} /> Signature requise
                                            </>
                                        ) :
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faCheck} /> Signé
                                            </>
                                        )
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item><b>Signé par gestionnaire: </b>
                                    {contrat.statutGestionnaire === "Pas_Signer" ?
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faClock} /> Signature requise
                                            </>
                                        ) :
                                        (
                                            <>
                                                <FontAwesomeIcon icon={faCheck} /> Signé
                                            </>
                                        )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button className="btn btn-danger"
                                        onClick={() => setShowContratDetailed(false)}>
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
        <Grid item xs={10} sm={12} md={6} lg={6}>
            {showContratDetailed && <HandleDetailedContrat/>}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Contrats
                    </h4>
                    {contrats.length !== 0 && contrats.length !== undefined ?
                        <div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                                {contrats.map((contrat, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <IconButton edge="end" aria-label="plus"
                                                              onClick={() => {
                                                                  setShowContratDetailed(!showContratDetailed)
                                                                  setContrat(contrat)
                                                              }}>
                                                      <p style={{borderColor: "gray",
                                                          borderRadius: "4px",
                                                          color: "white",
                                                          width: "80px",
                                                          height: "30px",
                                                          backgroundColor: "gray", fontSize: "15px"}}>voir plus</p>
                                                  </IconButton>
                                              }>
                                        <ListItemText primary={contrat.prenomEtudiant + ", " + contrat.nomEtudiant} secondary={contrat.nomDePoste} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        : <p>Aucun contrats disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageContrats
