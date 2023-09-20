import React, { useState } from "react";
import VetoSection from "./VetoSection";
import OffrePage from "../offresStages/OffrePage";

const GestionnaireHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    let contentToRender = null;

    switch (activeContent) {
        case "veto-section":
            contentToRender = <VetoSection/>;
            break;
        case "offre-page":
            contentToRender = <OffrePage/>;
            break;
        default:
            contentToRender = <div>Please select a section.</div>;
            break;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>Veto Section</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>Offre Page</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="Render" className="container mt-4">
                <h2>Gestionnaire</h2>
                {contentToRender}
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
