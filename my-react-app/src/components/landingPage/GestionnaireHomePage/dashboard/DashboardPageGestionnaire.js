import React, {useEffect, useState} from "react";
import FetchsForDashboard from "./FetchsForDashboard";
import CardPageOffres from "./cards/CardPageOffres";
import Grid from "@mui/material/Grid";
import CardPageCvs from "./cards/CardPageCvs";
import CardPageCandidaturesEntrevue from "./cards/CardPageCandidaturesEntrevue";
import CardPageCandidaturesEmbauches from "./cards/CardPageCandidaturesEmbauches";
import CardPageContrats from "./cards/CardPageContrats";

const DashboardPageGestionnaire = () => {
    const [cvList, setCvList] = useState([])

    const [sessions, setSessions] = useState([])
    const [offres, setOffres] = useState([])

    const [candidaturesEntrevue, setCandidaturesEntrevue] = useState([])
    const [candidaturesEmbauches, setCandidaturesEmbauches] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setCvList(FetchsForDashboard.fetchCvList(token, cvList, setCvList))
        setSessions(FetchsForDashboard.fetchSessions(token, sessions, setSessions))
        setOffres(FetchsForDashboard.fetchOffreList(token, offres, setOffres))
        setCandidaturesEntrevue(FetchsForDashboard.getEtudiantsEntrevue(token, candidaturesEntrevue, setCandidaturesEntrevue))
        setCandidaturesEmbauches(FetchsForDashboard.getEtudiantsEmbauches(token, candidaturesEmbauches, setCandidaturesEmbauches))
        setContrats(FetchsForDashboard.fetchContrats(token, contrats, setContrats))
    }

    return (
        <div>
            <h1 className="display-4 text-center"
                style={{marginBottom: "20px"}}>Tableau de bord</h1>
            <Grid container spacing={2}>
                <CardPageOffres sessions={sessions} offres={offres}/>
                <CardPageCvs cvList={cvList}/>
                <CardPageContrats contrats={contrats}/>
                <CardPageCandidaturesEmbauches candidaturesEmbauches={candidaturesEmbauches}/>
                <CardPageCandidaturesEntrevue candidaturesEntrevue={candidaturesEntrevue}/>
            </Grid>
        </div>
    )
}

export default DashboardPageGestionnaire
