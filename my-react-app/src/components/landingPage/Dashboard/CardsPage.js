import {useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardsPage = ({filteredList, titre, url, id, colorAvatar}) => {
    const navigate = useNavigate()

    return (
        <Card id={id} className="container-fluid"
              onClick={() => navigate(url)}>
            <Card.Body style={{padding: "0px"}}>
                <ListItem style={{paddingLeft: "0px"}}>
                    <ListItemAvatar>
                        <Avatar style={{fontFamily: 'FontAwesome', color: colorAvatar, backgroundColor: "transparent"}}>
                            &#xf06a;
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={filteredList.length + " " + titre}
                    />
                </ListItem>
            </Card.Body>
        </Card>
    )
}

export default CardsPage
