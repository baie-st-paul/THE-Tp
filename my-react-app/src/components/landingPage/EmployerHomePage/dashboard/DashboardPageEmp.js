import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import CardPageOffresEmp from "./cards/offre/CardPageOffresEmp";
import CardPageContratsEmp from "./cards/CardPageContratsEmp";
import FetchsForDashboardEmp from "./FetchsForDashboardEmp";

const DashboardPageEmp = () => {
    const [offres, setOffres] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setOffres(FetchsForDashboardEmp.fetchOffresEmp(token, offres, setOffres))
        setContrats(FetchsForDashboardEmp.fetchContratsEmp(token, contrats, setContrats))
    }

    return (
        <div>
            <h1 className="display-4 text-center"
                style={{marginBottom: "20px"}}>Tableau de bord</h1>
            <Grid container spacing={2}>
                <CardPageOffresEmp offres={offres}/>
                <CardPageContratsEmp contrats={contrats}/>
            </Grid>
        </div>
    )
}

export default DashboardPageEmp
