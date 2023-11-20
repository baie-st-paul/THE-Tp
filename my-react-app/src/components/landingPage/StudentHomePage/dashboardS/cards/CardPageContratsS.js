import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import FethsUpdateStatusS from "../FetchsUpdateStatusS";
import CardsPage from "../../../Dashboard/CardsPage";

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

const CardPageContratsS = ({contrats}) => {
    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEtudiant === "Pas_Signer");

    return (
        filteredContratsList.length > 0 &&
        <CardsPage nbFilteredList={filteredContratsList.length} titre="signatures de contrats en attente" url="/contratsEtudiant"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageContratsS
