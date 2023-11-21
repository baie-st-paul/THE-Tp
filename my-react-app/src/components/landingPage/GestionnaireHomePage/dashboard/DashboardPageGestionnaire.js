import React, {useEffect, useState} from "react";
import FetchsForDashboard from "./FetchsForDashboard";
import {List} from "@mui/material";
import AllCardsNotificationsGes from "./cards/AllCardsNotificationsGes";

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
                style={{marginBottom: "2px"}}>Tableau de bord</h1>
            <List style={{justifyContent: "center", display: "flex"}}>
                <div>
                    <AllCardsNotificationsGes
                        sessions={sessions} offres={offres}
                        cvList={cvList}
                        contrats={contrats} candidaturesEmbauches={candidaturesEmbauches}
                        candidaturesEntrevue={candidaturesEntrevue}
                    />
                </div>
            </List>
        </div>
    )
}

export default DashboardPageGestionnaire
