import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock} from "@fortawesome/free-solid-svg-icons";
import FetchsUpdateStatus from "../FetchsUpdateStatus";
import Box from "@mui/material/Box";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons/faEyeSlash";

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
    const [filterOptionVuPasVu, setFilterOptionVuPasVu] = useState("all");

    const token = localStorage.getItem('token');

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

    const handleUpdateStatus = (matricule, status) => {
        FetchsUpdateStatus.updateStatusContratVuG(token, matricule, status)
        console.log(status)
        //window.location.reload()
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOptionVuPasVu") {
            setFilterOptionVuPasVu(value)
        }
    };

    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => filterOptionVuPasVu === "all" || contrat.statusVuPasVuG === filterOptionVuPasVu);

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
                            <div className="row" style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <link href={"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"} rel="stylesheet"/>
                                    <select
                                        style={{fontFamily: 'FontAwesome'}}
                                        className="form-control w-100 d-inline"
                                        name="filterOptionVuPasVu"
                                        value={filterOptionVuPasVu}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="all">
                                            &#xf06e; / &#xf070;
                                        </option>
                                        <option value="vu">Vu</option>
                                        <option value="pasVu">Pas vu</option>
                                    </select>
                                </Grid>
                            </div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                                {filteredContratsList.map((contrat, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <Box>
                                                      <Grid container spacing={1} align="center" direction="row">
                                                          <Grid item xs={6} sm={6} md={6} lg={6}>
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
                                                          </Grid>
                                                          {contrat.statusVuPasVuG === "pasVu" ?
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(contrat.studentId, "vu")
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "80px",
                                                                          height: "30px",
                                                                          backgroundColor: "lightgreen", fontSize: "15px"}}>Je l'ai vu</p>
                                                                  </IconButton>
                                                              </Grid> :
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(contrat.studentId, "pasVu")
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "88px",
                                                                          height: "30px",
                                                                          backgroundColor: "lightgreen", fontSize: "15px"}}>Je l'ai pas vu</p>
                                                                  </IconButton>
                                                              </Grid>
                                                          }
                                                      </Grid>
                                                  </Box>
                                              }>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {contrat.statusVuPasVuG === "vu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </>
                                                )}
                                                {contrat.statusVuPasVuG === "pasVu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </>
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={contrat.statusVuPasVuG === "pasVu" ?
                                            <b> {contrat.prenomEtudiant + ", " + contrat.nomEtudiant} </b> :
                                            contrat.prenomEtudiant + ", " + contrat.nomEtudiant}
                                                      secondary={contrat.nomDePoste} />
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
