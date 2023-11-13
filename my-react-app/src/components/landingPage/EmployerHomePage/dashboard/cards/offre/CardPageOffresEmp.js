import React from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import {List} from "@mui/material";
import CardOffre from "./CardOffre";

const CardPageOffresEmp = ({offres}) => {
    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Offres
                    </h4>
                    {offres.length !== 0 && offres.length !== undefined ?
                        <div>
                            <List style={{padding: "0px", overflow: "auto", maxHeight: "210px"}}>
                                {offres.map((offre, index) => (
                                    <div key={index}>
                                        <CardOffre offre={offre}/>
                                    </div>
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

export default CardPageOffresEmp
