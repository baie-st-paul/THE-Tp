import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faClock } from "@fortawesome/free-solid-svg-icons";
import {List, Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const CardPageOffres = ({sessions, offres}) => {
    const [filterOption, setFilterOption] = useState("all");
    const [selectedTagName, setSelectedTagName] = useState("");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOption") {
            setFilterOption(value);
        } else if (event.target.name === "tagName") {
            setSelectedTagName(value);
        }
    };

    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => filterOption === "all" || offreDto.status === filterOption)
        .filter((offreDto) => !selectedTagName || offreDto.tag === selectedTagName);

    return (
        <Grid item xs={10} sm={12} md={6} lg={5}>
            <Card>
                {sessions.length !== 0 && sessions.length !== undefined &&
                    offres.length !== 0 && offres.length !== undefined &&
                    <div className="col">
                        <h4 style={{textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>Section : Offres Véto</h4>
                        <div className="row" style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                            <Grid item xs={6} sm={6} md={5} lg={6}>
                                <select
                                    className="form-control w-100 d-inline"
                                    name="tagName"
                                    value={selectedTagName}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Toutes les sessions</option>
                                    {sessions.map((session, index) => (
                                        <option key={index} value={session.tagName}>
                                            {session.tagName}
                                        </option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid item xs={6} sm={6} md={5} lg={6}>
                                <select
                                    className="form-control w-100 d-inline"
                                    name="filterOption"
                                    value={filterOption}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">Tous les états</option>
                                    <option value="In_review">En attente</option>
                                    <option value="Accepted">Accepté</option>
                                    <option value="Refused">Refusé</option>
                                </select>
                            </Grid>
                        </div>
                        <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                            {filteredOffreList.map((offre, index) => (
                                <ListItem key={index}>
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
                            ))}
                        </List>
                    </div>
                }
            </Card>
        </Grid>
    )
}

export default CardPageOffres
