import React, { useState } from "react";
import VetoSection from "./VetoSection";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageGestionnaire from "../offresStages/OffrePageGestionnaire";

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
                                <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>Veto Section</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page-ges")}>Offre Page</button>
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
