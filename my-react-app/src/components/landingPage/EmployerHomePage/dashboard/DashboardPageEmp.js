import React, {useEffect, useState} from "react";
import CardPageContratsEmp from "./cards/CardPageContratsEmp";
import FetchsForDashboardEmp from "./FetchsForDashboardEmp";
import CardPageCandidatures from "./cards/CardPageCandidatures";
import {List} from "@mui/material";

const DashboardPageEmp = () => {
    const [offres, setOffres] = useState([])
    const [candidatures, setCandidatures] = useState([])
    const [entrevues, setEntrevues] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setOffres(FetchsForDashboardEmp.fetchOffresEmp(token, offres, setOffres))
        setCandidatures(FetchsForDashboardEmp.fetchAllCandidatures(token, candidatures, setCandidatures))
        setEntrevues(FetchsForDashboardEmp.fetchAllEntrevues(token, entrevues, setEntrevues))
        setContrats(FetchsForDashboardEmp.fetchContratsEmp(token, contrats, setContrats))
    }

    return (
        <div>
            <h1 className="display-4 text-center"
                style={{marginBottom: "2px"}}>Tableau de bord</h1>
            <List style={{justifyContent: "center", display: "flex"}}>
                <div>
                    <CardPageContratsEmp contrats={contrats}/>
                    <CardPageCandidatures offres={offres} candidatures={candidatures} entrevues={entrevues}/>
                </div>
            </List>
        </div>
    )
}

export default DashboardPageEmp
