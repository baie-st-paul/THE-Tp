import {Nav, Navbar} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faBriefcase,
    faCalendarDay,
    faFile,
    faFileUpload,
    faHandshake,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";

const NavBarGestionnaire = () => {
    const navigate = useNavigate()

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <ul className="navbar-nav px-2">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/GestionnaireHomePage")}>
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                            </button>
                        </li>
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/CV-veto")}>
                                <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/>Cv Véto
                            </button>
                        </li>
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/Offres-veto")}>
                                <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres Véto
                            </button>
                        </li>
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/entrevues")}>
                                <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '10px' }}/>Entrevues
                            </button>
                        </li>
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/embauchés")}>
                                <FontAwesomeIcon icon={faHandshake} style={{ marginRight: '10px' }}/>Embauchés
                            </button>
                        </li>
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/contrats")}>
                                <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }}/>Contrats
                            </button>
                        </li>
                        <li className="nav-item navbarbutton profile">
                            <button className="nav-link" onClick={() => navigate("/profileGestionnaire")}>
                                <FontAwesomeIcon icon={faUser} style={{marginTop:'5px', marginRight: '10px' }}/>
                                Profile
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
    )
}

export default NavBarGestionnaire
