import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import CardPageOffresS from "./cards/CardPageOffresS";
import CardPageEntrevuesS from "./cards/CardPageEntrevuesS";
import CardPageContratsS from "./cards/CardPageContratsS";
import FetchsForDashboardStudent from "./FetchsForDashboardStudent";

const DashboardPageStudent = () => {
    const [offres, setOffres] = useState([])
    const [candidaturesOffreId, setCandidaturesOffreId] = useState([])

    const [entrevues, setEntrevues] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setOffres(FetchsForDashboardStudent.fetchOffresStudent(token, offres, setOffres))
        setCandidaturesOffreId(FetchsForDashboardStudent.fetchCandidatures(token, candidaturesOffreId, setCandidaturesOffreId))
        setEntrevues(FetchsForDashboardStudent.fetchStudentEntrevues(token, entrevues, setEntrevues))
        setContrats(FetchsForDashboardStudent.fetchContrats(token, contrats, setContrats))
    }

    return (
        <div>
            <h1 className="display-4 text-center"
                style={{marginBottom: "20px"}}>Tableau de bord</h1>
            <Grid container spacing={2}>
                <CardPageOffresS offres={offres} candidaturesOffreId={candidaturesOffreId}/>
                <CardPageEntrevuesS entrevues={entrevues}/>
                <CardPageContratsS contrats={contrats}/>
            </Grid>
        </div>
    )
}

export default DashboardPageStudent
