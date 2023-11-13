import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";

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

const CardOffre = ({offre}) => {
    const [showOffreDetailed, setShowOffreDetailed] = useState(false);
    const [nbCandidatures, setNbCandidatures] = useState(null)
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        handleNbListePostule()
    }, []);

    async function handleNbListePostule() {
        try {
            fetch(
                `http://localhost:8081/api/v1/employers/${offre.id}/applicants/nb`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    const data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setNbCandidatures(data);
                    console.log("nbCandidatures",data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setNbCandidatures(0)
        }
    }

    function HandleDetailedOffreE() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
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
                            </ListGroup>
                            <Card.Footer>
                                <Button className="btn btn-danger"
                                        onClick={() => setShowOffreDetailed(false)}>
                                    Fermer
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    function handleCheckListe(){
        navigate('/infoStudent', {state: {offreId : offre.id}})
    }

    return (
        <div>
            {showOffreDetailed && <HandleDetailedOffreE/>}
            <ListItem
                      secondaryAction={
                          <Box>
                              <Grid container spacing={1} align="center" direction="row">
                                  <Grid item xs={6} sm={6} md={6} lg={6}>
                                      <IconButton aria-label="plus"
                                                  onClick={() => {
                                                      setShowOffreDetailed(!showOffreDetailed)
                                                  }}>
                                          <p style={{borderColor: "lightblue",
                                              borderRadius: "4px",
                                              color: "white",
                                              width: "90px",
                                              height: "30px",
                                              backgroundColor: "lightblue", fontSize: "15px"}}>voir plus</p>
                                      </IconButton>
                                  </Grid>
                                  {nbCandidatures > 0 ?
                                      <Grid item xs={6} sm={6} md={6} lg={6}>
                                          <IconButton aria-label="candidatures"
                                                      onClick={() => {
                                                          handleCheckListe()
                                                      }}>
                                              <p style={{borderColor: "lightgreen",
                                                  borderRadius: "4px",
                                                  color: "white",
                                                  width: "120px",
                                                  height: "30px",
                                                  backgroundColor: "lightgreen", fontSize: "15px"}}>candidatures : ({nbCandidatures})</p>
                                          </IconButton>
                                      </Grid> :
                                      <Grid item xs={6} sm={6} md={6} lg={6}>
                                          <IconButton aria-label="candidatures" disabled>
                                              <p style={{borderColor: "lightgreen",
                                                  borderRadius: "4px",
                                                  color: "white",
                                                  width: "120px",
                                                  height: "30px",
                                                  backgroundColor: "lightgreen", fontSize: "15px"}}>candidatures</p>
                                          </IconButton>
                                      </Grid>
                                  }
                              </Grid>
                          </Box>
                      }>
                <ListItemAvatar>
                    <Avatar>
                        {offre.status === "In_review" && (
                            <>
                                <FontAwesomeIcon icon={faClock} />
                            </>
                        )}
                        {offre.status === "Accepted" && (
                            <>
                                <FontAwesomeIcon icon={faCheck} />
                            </>
                        )}
                        {offre.status === "Refused" && (
                            <>
                                <FontAwesomeIcon icon={faTimes} />
                            </>
                        )}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={offre.titre} secondary={offre.salaire + "$/h"} />
            </ListItem>
        </div>
    )
}

export default CardOffre
