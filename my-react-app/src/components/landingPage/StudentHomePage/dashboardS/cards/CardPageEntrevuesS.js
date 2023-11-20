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

const CardPageEntrevuesS = ({entrevues}) => {
    const filteredEntrevuesEnAttente = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "EnAttente");

    return (
        <CardsPage nbFilteredList={filteredEntrevuesEnAttente.length} titre="entrevues en attente" url="/entrevuesEtudiant"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageEntrevuesS
