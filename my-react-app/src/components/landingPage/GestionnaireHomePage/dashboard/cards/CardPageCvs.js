import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Modal from "../../Vetocv/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";
import FetchsUpdateStatus from "../FetchsUpdateStatus";
import Box from "@mui/material/Box";

const CardPageCvs = ({cvList}) => {
    const [filterOption, setFilterOption] = useState("all");
    const [filterOptionVuPasVu, setFilterOptionVuPasVu] = useState("all");
    const [openModal, setOpenModal] = useState(false);
    const [selectedCv, setSelectedCv] = useState(null);

    const token = localStorage.getItem('token');

    const handleUpdateStatus = (matricule, status) => {
        FetchsUpdateStatus.updateStatusCvVuG(token, matricule, status)
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

    const filteredCvList = cvList.length !== 0 && cvList.length !== undefined &&
        cvList.filter((cvDto) => filterOption === "all" || cvDto.status === filterOption)
                .filter((cvDto) => filterOptionVuPasVu === "all" || cvDto.statusVuPasVuG === filterOptionVuPasVu);

    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            {openModal && selectedCv && (
                <Modal cv={selectedCv.file_cv} fileName={selectedCv.fileName} onClose={() => setOpenModal(false)} />
            )}
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Cv Véto
                    </h4>
                    {cvList.length !== 0 && cvList.length !== undefined ?
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
                                        <option value="In_review">En attente</option>
                                        <option value="Accepted">Accepté</option>
                                        <option value="Refused">Refusé</option>
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
                                {filteredCvList.map((cv, index) => (
                                    <ListItem key={index}
                                              secondaryAction={
                                                  <Box>
                                                      <Grid container spacing={1} align="center" direction="row">
                                                          <Grid item xs={6} sm={6} md={6} lg={6}>
                                                              <IconButton aria-label="plus"
                                                                          onClick={() => {
                                                                              setOpenModal(true)
                                                                              setSelectedCv(cv)
                                                                          }}>
                                                                  <p style={{borderColor: "lightblue",
                                                                      borderRadius: "4px",
                                                                      color: "white",
                                                                      width: "80px",
                                                                      height: "30px",
                                                                      backgroundColor: "lightblue", fontSize: "15px"}}>voir plus</p>
                                                              </IconButton>
                                                          </Grid>
                                                          {cv.statusVuPasVuG === "pasVu" ?
                                                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                  <IconButton aria-label="update"
                                                                              onClick={() => {
                                                                                  handleUpdateStatus(cv.matricule, "vu")
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
                                                                                  handleUpdateStatus(cv.matricule, "pasVu")
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
                                        <ListItemText
                                            secondaryTypographyProps={{fontSize: "10px"}}
                                            primary={cv.statusVuPasVuG === "pasVu" ? <b>{cv.matricule}</b> :
                                            cv.matricule} secondary={cv.fileName} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        : <p>Aucun cv disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageCvs
