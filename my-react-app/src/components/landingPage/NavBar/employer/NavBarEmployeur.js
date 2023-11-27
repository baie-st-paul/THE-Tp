import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import FetchsEmployer from "./FetchsEmployer";
import {Nav, Navbar} from "react-bootstrap";
import {faBriefcase,
    faPlus,
    faFile,
    faHome,
    faFileArchive
} from "@fortawesome/free-solid-svg-icons";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import profile from "../../../../images/profile.jpg";
import Modal from "react-bootstrap/Modal";
import ProfileEmp from "../../EmployerHomePage/profile/ProfileEmp";

const NavBarEmployeur = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [signature, setSignature] = useState(null)
    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setSignature(FetchsEmployer.fetchSignature(token, employerId, signature, setSignature))
    }

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
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
                <ProfileEmp/>
            </Modal>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <ul className="navbar-nav px-2">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/EmployeurHomePage")}>
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                            </button>
                        </li>
                    </ul>
                    {
                        signature !== null &&
                        <>
                            <ul className="navbar-nav px-2">
                                <li className="nav-item navbarbutton">
                                    <button className="nav-link" onClick={() => navigate("/offres")}>
                                        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres
                                    </button>
                                </li>
                                <li className="nav-item navbarbutton">
                                    <button className="nav-link" onClick={() => navigate("/ajoutOffre")}>
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }}/>Ajout Offre
                                    </button>
                                </li>
                                <li className="nav-item navbarbutton">
                                    <button className="nav-link" onClick={() => navigate("/contrats-emp")}>
                                        <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }}/>Mes contrats
                                    </button>
                                </li>
                                <li className="nav-item navbarbutton">
                                    <button className="nav-link" onClick={() => navigate("/candidatures")}>
                                        <FontAwesomeIcon icon={faFileArchive} style={{ marginRight: '10px' }}/> Candidatures
                                    </button>
                                </li>
                            </ul>
                        </>
                    }
                    <ul className="navbar-nav px-2">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/signature")}>
                                <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                            </button>
                        </li>
                    </ul>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarEmployeur
