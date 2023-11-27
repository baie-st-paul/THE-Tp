import {useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardsPage = ({nbFilteredList, titre, url, id, colorAvatar, filter}) => {
    const navigate = useNavigate()

    return (
        <Card id={id} className="container-fluid"
              onClick={() => navigate(url, {state: {selectVar : filter}})}>
            <Card.Body style={{padding: "0px"}}>
                <ListItem style={{paddingLeft: "0px"}}>
                    <ListItemAvatar>
                        <Avatar style={{fontFamily: 'FontAwesome', color: colorAvatar, backgroundColor: "transparent"}}>
                            &#xf06a;
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={nbFilteredList + " " + titre}
                    />
                </ListItem>
            </Card.Body>
        </Card>
    )
}

export default CardsPage
