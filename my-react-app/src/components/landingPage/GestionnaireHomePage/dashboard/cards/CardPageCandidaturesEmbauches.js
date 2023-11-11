import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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

const CardPageCandidaturesEmbauches = ({candidaturesEmbauches}) => {
    const [showCandidatureEmbaucheDetailed, setShowCandidatureEmbaucheDetailed] = useState(false);
    const [candidatureEmbauche, setCandidatureEmbauche] = useState(null);

    function HandleDetailedCandidatureEmbauche() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                    {candidatureEmbauche.offreStage.titre}
                                </Card.Title>
                                {candidatureEmbauche.employer.companyName}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Prénom de l'étudiant:</b> {candidatureEmbauche.student.firstName}</ListGroup.Item>
                                <ListGroup.Item><b>Nom de l'étudiant:</b> {candidatureEmbauche.student.lastName}</ListGroup.Item>
                                <ListGroup.Item><b>Matricule:</b> {candidatureEmbauche.student.matricule}</ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button className="btn btn-danger"
                                        onClick={() => setShowCandidatureEmbaucheDetailed(false)}>
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
            {showCandidatureEmbaucheDetailed && <HandleDetailedCandidatureEmbauche/>}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Embauchés
                    </h4>
                    {candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined ?
                        <div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                                {candidaturesEmbauches.map((candidatureEmbauche, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <IconButton edge="end" aria-label="plus"
                                                              onClick={() => {
                                                                  setShowCandidatureEmbaucheDetailed(!showCandidatureEmbaucheDetailed)
                                                                  setCandidatureEmbauche(candidatureEmbauche)
                                                              }}>
                                                      <p style={{borderColor: "gray",
                                                          borderRadius: "4px",
                                                          color: "white",
                                                          width: "80px",
                                                          height: "30px",
                                                          backgroundColor: "gray", fontSize: "15px"}}>voir plus</p>
                                                  </IconButton>
                                              }>
                                        <ListItemText primary={candidatureEmbauche.student.firstName + ", " +
                                            candidatureEmbauche.student.lastName} secondary={candidatureEmbauche.offreStage.titre} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        : <p>Aucune candidature embauchée disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageCandidaturesEmbauches
