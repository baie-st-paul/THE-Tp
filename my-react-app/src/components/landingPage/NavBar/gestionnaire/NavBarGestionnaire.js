import {Nav, Navbar} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCalendarDay,
    faFile,
    faFileUpload,
    faHandshake,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import profile from "../../../../images/profile.jpg"
import ProfilePageGes from "../../GestionnaireHomePage/profile/ProfilePageGes";
import Modal from "react-bootstrap/Modal";
import FetchsGestionnaire from "./FetchsGestionnaire";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";

const NavBarGestionnaire = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [signature, setSignature] = useState(null)
    const token = localStorage.getItem('token');

    useEffect(() => {
        setSignature(FetchsGestionnaire.fetchSignature(token, signature, setSignature))
    }, []);

    return (
        <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>

            <Navbar.Brand className="profile">
                <img src={profile} style={{marginLeft: "10px"}}
                     onClick={handleShow}
                     alt="profile" className="rounded-circle" width="30"/>
            </Navbar.Brand>

            <Modal show={show} onHide={handleClose} contentClassName="my-modal" dialogClassName="dialog-modal">
                <ProfilePageGes/>
            </Modal>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <ul className="navbar-nav px-2">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/GestionnaireHomePage")}>
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                            </button>
                        </li>
                    </ul>
                    {
                        signature !== null &&
                        <>
                            <ul className="navbar-nav px-2">
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
                            </ul>
                        </>
                    }
                    <ul className="navbar-nav px-2">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/signatureGes")}>
                                <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                            </button>
                        </li>
                    </ul>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarGestionnaire
