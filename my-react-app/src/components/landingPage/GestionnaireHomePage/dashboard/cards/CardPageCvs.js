import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Modal from "../../Vetocv/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";

const CardPageCvs = ({cvList}) => {
    const [filterOption, setFilterOption] = useState("all");
    const [openModal, setOpenModal] = useState(false);
    const [selectedCv, setSelectedCv] = useState(null);

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filteredCvList =
        filterOption === "all"
            ? cvList
            : cvList.filter((cvDto) => cvDto.status === filterOption);

    return (
        <Grid item xs={10} sm={12} md={6} lg={5}>
            {openModal && selectedCv && (
                <Modal cv={selectedCv.file_cv} fileName={selectedCv.fileName} onClose={() => setOpenModal(false)} />
            )}
            <Card>
                {cvList.length !== 0 && cvList.length !== undefined &&
                    <div className="col">
                        <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                            Section : Cv Véto
                        </h4>
                        <div style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                            <Grid item xs={6} sm={6} md={5} lg={6}>
                                <select
                                    className="form-control w-100 d-inline"
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
                            {filteredCvList.map((cv, index) => (
                                <ListItem key={index}
                                          secondaryAction={
                                              <IconButton edge="end" aria-label="plus"
                                                          onClick={() => {
                                                              setOpenModal(true)
                                                              setSelectedCv(cv)
                                                          }}>
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
                                            {cv.status === "In_review" && (
                                                <>
                                                    <FontAwesomeIcon icon={faClock} />
                                                </>
                                            )}
                                            {cv.status === "Accepted" && (
                                                <>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </>
                                            )}
                                            {cv.status === "Refused" && (
                                                <>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </>
                                            )}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={cv.matricule} secondary={cv.fileName} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                }
            </Card>
        </Grid>
    )
}

export default CardPageCvs
