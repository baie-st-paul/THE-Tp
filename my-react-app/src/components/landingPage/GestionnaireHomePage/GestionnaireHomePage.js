import React, {useEffect, useState} from "react";
import DashboardPageGestionnaire from "./dashboard/DashboardPageGestionnaire";
import NavBarGestionnaire from "../NavBar/gestionnaire/NavBarGestionnaire";
import FetchsGestionnaire from "../NavBar/gestionnaire/FetchsGestionnaire";
import CardPageSignature from "../EmployerHomePage/dashboard/cards/signature/CardPageSignature";

const GestionnaireHomePage = () => {
    const [signature, setSignature] = useState(null)
    const token = localStorage.getItem('token');
    const [gestionnaire, setGestionnaire] = useState(null);

    useEffect(() => {
        setGestionnaire(FetchsGestionnaire.fetchGestionnaire(token, gestionnaire, setGestionnaire))
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setSignature(FetchsGestionnaire.fetchSignature(token, signature, setSignature))
    }

    return (
        <div>
            <NavBarGestionnaire/>
            <div id="Render" className="container content-container mt-4">
                <h2>Gestionnaire</h2>
                {
                    signature !== null ? <DashboardPageGestionnaire/> : <CardPageSignature/>
                }
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
