import React from "react";
import DashboardPageGestionnaire from "./dashboard/DashboardPageGestionnaire";
import NavBarGestionnaire from "../NavBar/gestionnaire/NavBarGestionnaire";

const GestionnaireHomePage = () => {
    return (
        <div>
            <NavBarGestionnaire/>

            <div id="Render" className="container content-container mt-4">
                <h2>Gestionnaire</h2>
                <DashboardPageGestionnaire/>
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
