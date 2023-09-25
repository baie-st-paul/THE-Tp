import React from "react";
import EmployerStageOffreList from "./EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./ajoutOffreForm";

const EmployeurHomePage = ({employerId}) => {
    const [activeContent, setActiveContent] = useState("none");

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    let contentToRender = null;

    switch (activeContent){
        case "offre-page":
            contentToRender = <EmployerStageOffreList employerId={employerId}></EmployerStageOffreList>;
            break;
        case "Ajout-offre":
            contentToRender = <AjoutOffreForm></AjoutOffreForm>
            break;
        default:
            contentToRender = <div>Select an action.</div>;
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
                            <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>Offres</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("Ajout-offre")}>Ajout Offre</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="Render">
                {contentToRender}
            </div>
           
        </div>
    )
}

export default EmployeurHomePage
