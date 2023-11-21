import React, {useEffect, useState} from "react";
import FetchsForDashboardStudent from "./FetchsForDashboardStudent";
import {List} from "@mui/material";
import AllCardsNotificationsEtudiant from "./cards/AllCardsNotificationsEtudiant";

const DashboardPageStudent = () => {
    const [offres, setOffres] = useState([])
    const [candidaturesOffreId, setCandidaturesOffreId] = useState([])
    const [candidatures, setCandidatures] = useState([])

    const [entrevues, setEntrevues] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setOffres(FetchsForDashboardStudent.fetchOffresStudent(token, offres, setOffres))
        setCandidaturesOffreId(FetchsForDashboardStudent.fetchCandidaturesOffreId(token, candidaturesOffreId, setCandidaturesOffreId))
        setCandidatures(FetchsForDashboardStudent.fetchMesCandidatures(token, candidatures, setCandidatures))
        setEntrevues(FetchsForDashboardStudent.fetchStudentEntrevues(token, entrevues, setEntrevues))
        setContrats(FetchsForDashboardStudent.fetchContrats(token, contrats, setContrats))
    }

    return (
        <div>
            <h1 className="display-4 text-center"
                style={{marginBottom: "2px"}}>Tableau de bord</h1>
            <List style={{justifyContent: "center", display: "flex"}}>
                <div>
                    <AllCardsNotificationsEtudiant entrevues={entrevues}
                                                   contrats={contrats}
                                                   offres={offres} candidaturesOffreId={candidaturesOffreId} candidatures={candidatures}/>
                </div>
            </List>
        </div>
    )
}

export default DashboardPageStudent
