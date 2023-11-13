import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import {List} from "@mui/material";
import CardOffre from "./CardOffre";

const CardPageOffresEmp = ({offres}) => {
    const [filterOption, setFilterOption] = useState("all");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOption") {
            setFilterOption(value);
        }
    };

    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => filterOption === "all" || offreDto.status === filterOption);

    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
                <div className="col">
                    <h4 style={{width: "60%", textAlign: "left", marginLeft: "1.5rem", marginTop: "10px"}}>
                        Section : Offres
                    </h4>
                    {offres.length !== 0 && offres.length !== undefined ?
                        <div>
                            <div className="row" style={{marginTop: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
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
