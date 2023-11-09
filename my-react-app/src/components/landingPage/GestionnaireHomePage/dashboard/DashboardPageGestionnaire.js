import React, {useEffect, useState} from "react";
import FetchsForDashboard from "./FetchsForDashboard";

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
        await FetchsForDashboard.fetchCvList(token, cvList, setCvList)
        await FetchsForDashboard.fetchSessions(token, sessions, setSessions)
        await FetchsForDashboard.fetchOffreList(token, offres, setOffres)
        await FetchsForDashboard.getEtudiantsEmbauches(token, candidatures, setCandidatures)
        await FetchsForDashboard.fetchContrats(token, contrats, setContrats)
    }

    return (
        <div>
            <h1 className="display-4 text-center">Dashboard</h1>
        </div>
    )
}

export default DashboardPageGestionnaire
