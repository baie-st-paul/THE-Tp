import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileUpload,
    faBriefcase,
    faEnvelope,
    faHome,
    faPortrait
} from '@fortawesome/free-solid-svg-icons';
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import FetchsStudent from "./FetchsStudent";
import profile from "../../../../images/profile.jpg";
import Modal from "react-bootstrap/Modal";
import ProfileEtudiant from "../../StudentHomePage/profile/ProfileEtudiant";

const NavBarStudent = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [signature, setSignature] = useState(null)
    const [cv, setCv] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setSignature(FetchsStudent.fetchSignature(token, signature, setSignature))
        setCv(FetchsStudent.fetchCv(token, cv, setCv))
    }

    return (
        <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>

            <Navbar.Brand className="profile">
                <img src={profile} style={{marginLeft: "10px"}}
                     onClick={handleShow}
                     alt="profile" className="rounded-circle" width="30"/>
            </Navbar.Brand>

            <Modal show={show} onHide={handleClose} contentClassName="my-modal" dialogClassName="dialog-modal">
                <ProfileEtudiant/>
            </Modal>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <ul className="navbar-nav px-2">
                        <ul className="navbar-nav ml-auto px-1">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => navigate("/StudentHomePage")}>
                                    <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                                </button>
                            </li>
                        </ul>
                        {
                            signature !== null && cv !== null && cv.status === "Accepted" && (
                                <div>
                                    {
                                        cv.matricule === localStorage.getItem("loggedInUserMatricule") &&
                                        <>
                                            <ul className="navbar-nav ml-auto px-1">
                                                <li className="nav-item navbarbutton px-1">
                                                    <button className="nav-link" onClick={() => navigate("/offresEtudiant")}>
                                                        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '2px' }}/> Offres
                                                    </button>
                                                </li>
                                                <li className="nav-item navbarbutton px-1">
                                                    <button className="nav-link" onClick={() => navigate("/candidaturesEtudiant")}>
                                                        <FontAwesomeIcon icon={faPortrait} style={{ marginRight: '2px' }}/> Mes candidatures
                                                    </button>
                                                </li>
                                                <li className="nav-item navbarbutton px-1">
                                                    <button className="nav-link" onClick={() => navigate("/entrevuesEtudiant")}>
                                                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '2px' }}/> Mes Entrevues
                                                    </button>
                                                </li>
                                                <li className="nav-item navbarbutton px-1">
                                                    <button className="nav-link" onClick={() => navigate("/contratsEtudiant")}>
                                                        <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '2px' }}/> Mes Contrats
                                                    </button>
                                                </li>
                                            </ul>
                                        </>
                                    }
                                </div>
                            )
                        }
                        <ul className="navbar-nav ml-auto px-1">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => navigate("/signatureEtudiant")}>
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                                </button>
                            </li>
                            <li className="nav-item navbarbutton px-1">
                                <button className="nav-link" onClick={() => navigate("/cvEtudiant")}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '2px' }}/> CV
                                </button>
                            </li>
                        </ul>
                    </ul>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarStudent
