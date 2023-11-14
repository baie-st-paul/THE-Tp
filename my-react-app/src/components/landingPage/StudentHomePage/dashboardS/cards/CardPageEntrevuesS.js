import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Grid from "@mui/material/Grid";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FethsUpdateStatusS from "../FetchsUpdateStatusS";

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

const CardPageEntrevuesS = ({entrevues}) => {
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
                                    {entrevue.dateHeure}
                                </Card.Title>
                                {entrevue.description}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Nom de la compagnie:</b> {entrevue.companyName}$/h</ListGroup.Item>
                                <ListGroup.Item><b>Matricule de l'étudiant:</b> {entrevue.idEtudiant}</ListGroup.Item>
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
        FethsUpdateStatusS.updateStatusEntrevueVuS(token, matricule, status)
        console.log(status)
        console.log(matricule)
        window.location.reload()
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOptionVuPasVu") {
            setFilterOptionVuPasVu(value)
        }
    };

    const filteredEntrevuesEnAttente = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "EnAttente")
            .filter((entrevue) => filterOptionVuPasVu === "all" || entrevue.statusVuPasVuS === filterOptionVuPasVu);

    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            {showEntrevueDetailed && <HandleDetailedEntrevue/>}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Entrevues
                    </h4>
                    <div style={{textAlign: "left", marginLeft: "1.5rem", fontSize: "12px"}}><b>À accepter ou refuser</b></div>
                    {entrevues.length !== 0 && entrevues.length !== undefined ?
                        <div>
                            <div className="row" style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
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
                                {filteredEntrevuesEnAttente.map((entrevue, index) => (
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
                                                                      width: "80px",
                                                                      height: "30px",
                                                                      backgroundColor: "lightblue", fontSize: "15px"}}>voir plus</p>
                                                              </IconButton>
                                                          </Grid>
                                                          {entrevue.statusVuPasVuS === "pasVu" ?
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(entrevue.idEtudiant, "vu")
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
                                                                                  handleUpdateStatus(entrevue.idEtudiant, "pasVu")
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "80px",
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
                                                {entrevue.statusVuPasVuS === "vu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </>
                                                )}
                                                {entrevue.statusVuPasVuS === "pasVu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </>
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={entrevue.statusVuPasVuS === "pasVu" ? <b>{entrevue.dateHeure}</b> :
                                            entrevue.dateHeure} secondary={entrevue.companyName} />
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

export default CardPageEntrevuesS
