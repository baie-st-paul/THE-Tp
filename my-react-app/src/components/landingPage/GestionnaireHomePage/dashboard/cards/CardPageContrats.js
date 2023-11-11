import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import React from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const CardPageContrats = ({contrats}) => {
    return (
        <Grid item xs={10} sm={12} md={6} lg={6}>
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Contrats
                    </h4>
                    {contrats.length !== 0 && contrats.length !== undefined ?
                        <div>
                            <div style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}></div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}></List>
                        </div>
                        : <p>Aucun contrats disponible</p>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default CardPageContrats
