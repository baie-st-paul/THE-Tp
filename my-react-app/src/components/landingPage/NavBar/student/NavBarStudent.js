import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileUpload,
    faBriefcase,
    faEnvelope,
    faHome,
    faArrowRight,
    faPortrait
} from '@fortawesome/free-solid-svg-icons';
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import FetchsStudent from "./FetchsStudent";

const NavBarStudent = () => {
    const navigate = useNavigate()
    const [signature, setSignature] = useState(null)
    const [cv, setCv] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
        console.log(signature)
        console.log(cv)
    }, []);

    const getFetchs = async () => {
        setSignature(FetchsStudent.fetchSignature(token, signature, setSignature))
        setCv(FetchsStudent.fetchCv(token, cv, setCv))
    }

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
                        {
                            signature !== null && cv !== null && cv.status === "Accepted" && (
                                <div>
                                    {
                                        cv.matricule === localStorage.getItem("loggedInUserMatricule") &&
                                        <>
                                            <ul className="navbar-nav ml-auto px-1">
                                                <li className="nav-item navbarbutton">
                                                    <button className="nav-link" onClick={() => navigate("/StudentHomePage")}>
                                                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                                                    </button>
                                                </li>
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
                            <li className="nav-item navbarbutton deconnecter">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ marginTop: '5px', marginRight: '10px' }} />
                                    Se déconnecter
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
