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
    faFile,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import EtudiantsConvoquesEntrevue from "./entrevue/EtudiantsConvoquesEntrevue";
import EtudiantEmbauchePage from "./embauche/EtudiantEmbauchePage";
import ListContratsGestionnaire from "./contrat/ListContratsGestionnaire";
import DashboardPageGestionnaire from "./dashboard/DashboardPageGestionnaire";

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
            contentToRender =
                <div className="container content-container mt-4">
                    <VetoSection/>
                </div>
            break;
        case "offre-page-ges":
            contentToRender =
                <div className="container content-container mt-4">
                    <h2>Gestionnaire</h2>
                    <OffresPageGestionnaire/>
                </div>
            break;
        case "entrevues":
            contentToRender =
                <div className="container content-container mt-4">
                    <h2>Gestionnaire</h2>
                    <EtudiantsConvoquesEntrevue/>
                </div>
            break;
        case "candidatures-acceptees":
            contentToRender =
                <div className="container content-container mt-4">
                    <h2>Gestionnaire</h2>
                    <EtudiantEmbauchePage/>
                </div>
            break;
        case "contrats":
            contentToRender =
                <div className="container content-container mt-4">
                    <h2>Gestionnaire</h2>
                    <ListContratsGestionnaire contratsTest={[]}/>
                </div>
            break;
        case "dashboard":
            contentToRender =
                <div className="container content-container m-4">
                    <h2>Gestionnaire</h2>
                    <DashboardPageGestionnaire/>
                </div>
            break;
        default:
            contentToRender =
                <div className="container content-container m-4">
                    <h2>Gestionnaire</h2>
                    <DashboardPageGestionnaire/>
                </div>
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
                                <button className="nav-link" onClick={() => handleButtonClick("dashboard")}>
                                    <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/>Cv Véto
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page-ges")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres Véto
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

            <div id="Render">
                {contentToRender}
            </div>
        </div>
    );
}

export default GestionnaireHomePage;
