import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FetchsUpdateStatus from "../FetchsUpdateStatus";
import Box from "@mui/material/Box";

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

const CardPageCandidaturesEntrevue = ({candidaturesEntrevue}) => {
    const [filterOption, setFilterOption] = useState("all");
    const [filterOptionVuPasVu, setFilterOptionVuPasVu] = useState("all");
    const [showEntrevueDetailed, setShowEntrevueDetailed] = useState(false);
    const [entrevue, setEntrevue] = useState(null);

    const token = localStorage.getItem('token');

    function HandleDetailedEntrevue() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title style={{textDecorationLine: 'underline'}}>
                                    {entrevue.offreStage.titre}
                                </Card.Title>
                                {entrevue.dateHeure}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Nom de l'entreprise:</b> {entrevue.employer.companyName}</ListGroup.Item>
                                <ListGroup.Item><b>Prénom de l'étudiant:</b> {entrevue.student.firstName}</ListGroup.Item>
                                <ListGroup.Item><b>Nom de l'étudiant:</b> {entrevue.student.lastName}</ListGroup.Item>
                                <ListGroup.Item><b>Matricule:</b> {entrevue.student.matricule}</ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button className="btn btn-danger"
                                        onClick={() => setShowEntrevueDetailed(false)}>
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
        FetchsUpdateStatus.updateStatusEntrevueVuG(token, matricule, status)
        console.log(status)
        window.location.reload()
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOption") {
            setFilterOption(value);
        } else if (event.target.name === "filterOptionVuPasVu") {
            setFilterOptionVuPasVu(value)
        }
    };

    const filteredEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => filterOption === "all" || entrevue.status === filterOption)
            .filter((entrevue) => filterOptionVuPasVu === "all" || entrevue.statusVuPasVuG === filterOptionVuPasVu);

    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            {showEntrevueDetailed && <HandleDetailedEntrevue/>}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Entrevue
                    </h4>
                    {candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined ?
                        <div>
                            <div className="row" style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <select
                                        className="form-control w-100 d-inline"
                                        name="filterOption"
                                        value={filterOption}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="all">Tous les états</option>
                                        <option value="EnAttente">En attente</option>
                                        <option value="Acceptee">Accepté</option>
                                        <option value="Refusee">Refusé</option>
                                    </select>
                                </Grid>
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
                                {filteredEntrevues.map((entrevue, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <Box>
                                                      <Grid container spacing={1} align="center" direction="row">
                                                          <Grid item xs={6} sm={6} md={6} lg={6}>
                                                              <IconButton aria-label="plus"
                                                                          onClick={() => {
                                                                              setShowEntrevueDetailed(!showEntrevueDetailed)
                                                                              setEntrevue(entrevue)
                                                                          }}>
                                                                  <p style={{borderColor: "lightblue",
                                                                      borderRadius: "4px",
                                                                      color: "white",
                                                                      width: "88px",
                                                                      height: "30px",
                                                                      backgroundColor: "lightblue", fontSize: "15px"}}>voir plus</p>
                                                              </IconButton>
                                                          </Grid>
                                                          {entrevue.statusVuPasVuG === "pasVu" ?
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(entrevue.student.matricule, 'vu')
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "88px",
                                                                          height: "30px",
                                                                          backgroundColor: "lightgreen", fontSize: "15px"}}>Je l'ai vu</p>
                                                                  </IconButton>
                                                              </Grid> :
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(entrevue.student.matricule, 'pasVu')
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
                                                {entrevue.status === "EnAttente" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faClock} />
                                                    </>
                                                )}
                                                {entrevue.status === "Acceptee" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </>
                                                )}
                                                {entrevue.status === "Refusee" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </>
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={entrevue.statusVuPasVuG === "pasVu" ? <b>{entrevue.dateHeure}</b> :
                                            entrevue.dateHeure} secondary={entrevue.offreStage.titre} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        : <p>Aucune entrevue disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageCandidaturesEntrevue
