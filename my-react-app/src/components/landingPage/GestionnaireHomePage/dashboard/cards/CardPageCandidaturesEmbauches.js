import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FetchsUpdateStatus from "../FetchsUpdateStatus";
import Box from "@mui/material/Box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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

const CardPageCandidaturesEmbauches = ({candidaturesEmbauches}) => {
    const [showCandidatureEmbaucheDetailed, setShowCandidatureEmbaucheDetailed] = useState(false);
    const [candidatureEmbauche, setCandidatureEmbauche] = useState(null);
    const [filterOptionVuPasVu, setFilterOptionVuPasVu] = useState("all");

    const token = localStorage.getItem('token');

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

    const handleUpdateStatus = (matricule, status) => {
        console.log(matricule)
        FetchsUpdateStatus.updateStatusCandidatureEmbaucheVuG(token, matricule, status)
        console.log(status)
        window.location.reload()
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOptionVuPasVu") {
            setFilterOptionVuPasVu(value)
        }
    };

    const filteredEmbauchesList = candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined &&
        candidaturesEmbauches.filter((embauche) => filterOptionVuPasVu === "all" || embauche.statusVuPasVuG === filterOptionVuPasVu);

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
                                {filteredEmbauchesList.map((candidatureEmbauche, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <Box>
                                                      <Grid container spacing={1} align="center" direction="row">
                                                          <Grid item xs={6} sm={6} md={6} lg={6}>
                                                              <IconButton edge="end" aria-label="plus"
                                                                          onClick={() => {
                                                                              setShowCandidatureEmbaucheDetailed(!showCandidatureEmbaucheDetailed)
                                                                              setCandidatureEmbauche(candidatureEmbauche)
                                                                          }}>
                                                                  <p style={{borderColor: "lightblue",
                                                                      borderRadius: "4px",
                                                                      color: "white",
                                                                      width: "80px",
                                                                      height: "30px",
                                                                      backgroundColor: "lightblue", fontSize: "15px"}}>voir plus</p>
                                                              </IconButton>
                                                          </Grid>
                                                          {candidatureEmbauche.statusVuPasVuG === "pasVu" ?
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(candidatureEmbauche.student.matricule, 'vu')
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
                                                                                  handleUpdateStatus(candidatureEmbauche.student.matricule, 'pasVu')
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
                                                {candidatureEmbauche.statusVuPasVuG === "vu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </>
                                                )}
                                                {candidatureEmbauche.statusVuPasVuG === "pasVu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </>
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={candidatureEmbauche.statusVuPasVuG === "pasVu" ?
                                            <b> {candidatureEmbauche.student.firstName + ", " +
                                                candidatureEmbauche.student.lastName} </b> :
                                            candidatureEmbauche.student.firstName + ", " +
                                            candidatureEmbauche.student.lastName}
                                                      secondary={candidatureEmbauche.offreStage.titre} />
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
