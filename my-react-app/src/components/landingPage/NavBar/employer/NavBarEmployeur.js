import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FetchsEmployer from "./FetchsEmployer";
import {Nav, Navbar} from "react-bootstrap";
import {faArrowRight, faBriefcase, faPlus, faFile, faHome, faBookmark, faFileArchive} from "@fortawesome/free-solid-svg-icons";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavBarEmployeur = () => {
    const navigate = useNavigate()
    const [signature, setSignature] = useState(null)

    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
        console.log(signature)
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
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="px-2">
                    {
                        signature !== null &&
                        <>
                            <ul className="navbar-nav">
                                <li className="nav-item navbarbutton">
                                    <button className="nav-link " onClick={() => navigate("/EmployeurHomePage")}>
                                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                                    </button>
                                </li>
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
                    <ul className="navbar-nav">
                        <li className="nav-item navbarbutton">
                            <button className="nav-link" onClick={() => navigate("/signature")}>
                                <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
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

export default NavBarEmployeur
