import React, { useState } from "react";
import VetoSection from "./Vetocv/VetoSection";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageGestionnaire from "../offresStages/OffrePageGestionnaire";
import {faBriefcase, faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GestionnaireHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    let contentToRender;

    switch (activeContent) {
        case "veto-section":
            contentToRender = <VetoSection/>;
            break;
        case "offre-page-ges":
            contentToRender = <OffresPageGestionnaire/>;
            break;
        default:
            contentToRender = <div>Please select a section.</div>;
            break;
    }

    return (
        <div>
            <Navbar bg="dark" className="navbar-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/>CV Veto
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page-ges")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres Veto
                                </button>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div id="Render" className="container mt-4">
                <h2>Gestionnaire</h2>
                {contentToRender}
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
