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
import CandidatureModal from "../../candidature/CandidatureModal";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

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

const CardPageOffresS = ({offres, candidaturesOffreId}) => {
    const [filterOptionVuPasVu, setFilterOptionVuPasVu] = useState("all");
    const [showOffreDetailed, setShowOffreDetailed] = useState(false);
    const [offre, setOffre] = useState(null);

    const token = localStorage.getItem('token');

    function HandleDetailedOffreS() {
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

    const handleUpdateStatus = (titre, status) => {
        //FethsUpdateStatusS.updateStatusOffreVuS(token, titre, status)
        console.log(status)
        console.log(titre)
        //window.location.reload()
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOptionVuPasVu") {
            setFilterOptionVuPasVu(value)
        }
    };

    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => filterOptionVuPasVu === "all" || offreDto.statusVuPasVuS === filterOptionVuPasVu);

    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            {showOffreDetailed && <HandleDetailedOffreS/>}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Offres
                    </h4>
                    {offres.length !== 0 && offres.length !== undefined ?
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
                                {filteredOffreList.map((offre, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <Box>
                                                      <Grid container spacing={1} align="center" direction="row">
                                                          <Grid item xs={4} sm={4} md={4} lg={4}>
                                                              <IconButton aria-label="plus"
                                                                          onClick={() => {
                                                                              setShowOffreDetailed(!showOffreDetailed)
                                                                              setOffre(offre)
                                                                          }}>
                                                                  <p style={{borderColor: "lightblue",
                                                                      borderRadius: "4px",
                                                                      color: "white",
                                                                      width: "60px",
                                                                      height: "30px",
                                                                      backgroundColor: "lightblue", fontSize: "12px"}}>voir plus</p>
                                                              </IconButton>
                                                          </Grid>
                                                          {offre.statusVuPasVuS === "pasVu" ?
                                                              <Grid item xs={4} sm={4} md={4} lg={4}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(offre.titre, "vu")
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "80px",
                                                                          height: "30px",
                                                                          backgroundColor: "lightgreen", fontSize: "12px"}}>Je l'ai vu</p>
                                                                  </IconButton>
                                                              </Grid> :
                                                              <Grid item xs={4} sm={4} md={4} lg={4}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(offre.titre, "pasVu")
                                                                              }}>
                                                                      <p style={{borderColor: "lightgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "80px",
                                                                          height: "30px",
                                                                          backgroundColor: "lightgreen", fontSize: "12px"}}>Je l'ai pas vu</p>
                                                                  </IconButton>
                                                              </Grid>
                                                          }
                                                          { candidaturesOffreId.length > 0 &&
                                                          candidaturesOffreId.includes(offre.id) ?
                                                              <Grid item xs={4} sm={4} md={4} lg={4}>
                                                                  <IconButton aria-label="postule" disabled>
                                                                      <p style={{borderColor: "darkgreen",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "85px",
                                                                          height: "30px",
                                                                          backgroundColor: "darkgreen", fontSize: "12px"}}>
                                                                          <>
                                                                              <FontAwesomeIcon icon={faCheck} /> postulé
                                                                          </>
                                                                      </p>
                                                                  </IconButton>
                                                              </Grid> :
                                                              <Grid item xs={4} sm={4} md={4} lg={4}>
                                                                  <IconButton aria-label="pasPostule" disabled>
                                                                      <p style={{borderColor: "darkred",
                                                                          borderRadius: "4px",
                                                                          color: "white",
                                                                          width: "85px",
                                                                          height: "30px",
                                                                          backgroundColor: "darkred", fontSize: "12px"}}>
                                                                          <>
                                                                              <FontAwesomeIcon icon={faTimes} /> pas postulé
                                                                          </>
                                                                      </p>
                                                                  </IconButton>
                                                              </Grid>
                                                          }
                                                      </Grid>
                                                  </Box>
                                              }>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {offre.statusVuPasVuS === "vu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </>
                                                )}
                                                {offre.statusVuPasVuS === "pasVu" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </>
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={offre.statusVuPasVuS === "pasVu" ? <b>{offre.titre}</b> :
                                            offre.titre} secondary={offre.salaire + "$/h"} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        : <p>Aucune offre disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageOffresS
