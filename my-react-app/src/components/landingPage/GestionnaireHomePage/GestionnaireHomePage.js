import React, { useState } from "react";
import VetoSection from "./Vetocv/VetoSection";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageGestionnaire from "../offresStages/gestionnaire/OffrePageGestionnaire";
import {
    faArrowRight,
    faBriefcase,
    faFileUpload,
    faCalendarDay,
    faHandshake,
    faFile
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import EtudiantsConvoquesEntrevue from "./entrevue/EtudiantsConvoquesEntrevue";
import EtudiantEmbauchePage from "./embauche/EtudiantEmbauchePage";
import ListContratsGestionnaire from "./contrat/ListContratsGestionnaire";

const GestionnaireHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");
    const navigate = useNavigate()

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    let contentToRender;

    switch (activeContent) {
        case "veto-section":
            contentToRender = <VetoSection/>
            break;
        case "offre-page-ges":
            contentToRender = <OffresPageGestionnaire/>
            break;
        case "entrevues":
            contentToRender = <EtudiantsConvoquesEntrevue/>
            break;
        case "candidatures-acceptees":
            contentToRender = <EtudiantEmbauchePage/>
            break;
        case "contrats":
            contentToRender = <ListContratsGestionnaire contratsTest={[]}/>
            break;
        default:
            contentToRender = <div>Choisir une section.</div>;
            break;
    }

    return (
        <div>
            <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/>CV Veto
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page-ges")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres Veto
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("entrevues")}>
                                    <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '10px' }}/>Entrevues
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("candidatures-acceptees")}>
                                    <FontAwesomeIcon icon={faHandshake} style={{ marginRight: '10px' }}/>Embauchés
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("contrats")}>
                                    <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }}/>Contrats
                                </button>
                            </li>
                            <li className="nav-item navbarbutton deconnecter">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/>
                                    Se déconnecter
                                </button>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div id="Render" className="container content-container mt-4">
                <h2>Gestionnaire</h2>
                {contentToRender}
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
