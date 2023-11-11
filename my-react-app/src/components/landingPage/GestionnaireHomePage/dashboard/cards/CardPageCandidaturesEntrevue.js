import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";

const CardPageCandidaturesEntrevue = ({candidaturesEntrevue}) => {
    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Entrevue
                    </h4>
                    {candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined ?
                        <div>
                            <div style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}></div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                                {candidaturesEntrevue.map((entrevue, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <IconButton edge="end" aria-label="plus">
                                                      <p style={{borderColor: "gray",
                                                          borderRadius: "4px",
                                                          color: "white",
                                                          width: "80px",
                                                          height: "30px",
                                                          backgroundColor: "gray", fontSize: "15px"}}>voir plus</p>
                                                  </IconButton>
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
                                        <ListItemText primary={entrevue.dateHeure} secondary={entrevue.offreStage.titre} />
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
