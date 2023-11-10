import React, {useEffect, useState} from "react";
import FetchsForDashboard from "./FetchsForDashboard";
import CardPageOffres from "./cards/CardPageOffres";
import Grid from "@mui/material/Grid";

const DashboardPageGestionnaire = () => {
    const [cvList, setCvList] = useState([])

    const [sessions, setSessions] = useState([])
    const [offres, setOffres] = useState([])

    const [candidatures, setCandidatures] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setCvList(FetchsForDashboard.fetchCvList(token, cvList, setCvList))
        setSessions(FetchsForDashboard.fetchSessions(token, sessions, setSessions))
        setOffres(FetchsForDashboard.fetchOffreList(token, offres, setOffres))
        setCandidatures(FetchsForDashboard.getEtudiantsEmbauches(token, candidatures, setCandidatures))
        setContrats(FetchsForDashboard.fetchContrats(token, contrats, setContrats))
    }

    return (
        <div className="m-0 p-0">
            <h1 className="display-4 text-center">Dashboard</h1>
            <Grid container spacing={2}>
                <CardPageOffres sessions={sessions} offres={offres}/>
            </Grid>
        </div>
    )
}

export default DashboardPageGestionnaire
