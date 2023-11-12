import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/student/candidature/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileUpload,
    faBriefcase,
    faEnvelope,
    faHome,
    faArrowRight,
    faPortrait
} from '@fortawesome/free-solid-svg-icons';
import SectionEntrevue from "./SectionViewEntrevue/SectionEntrevue";
import Dashboard from "./DashBoard/Dashboard";
import OffreCandidaturePage from "../offresStages/student/candidature/OffreCandidaturePage";
import { useNavigate } from "react-router-dom";
import CreateStudentSignature from "./signature/CreateStudentSignature";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import SessionCotroller from "./SessionController";
import EtudiantMesContrats from "./contrat/EtudiantMesContrats";


const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");
    const [cvs, setCvs] = useState([]);
    const [signature, setSignature] = useState(null);
    const [session, setSession] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");

        if (savedMatricule) {
            setMatricule(savedMatricule);
        }

        if (loggedInUser && loggedInUser.matricule) {
            setMatricule(loggedInUser.matricule);
            localStorage.setItem("loggedInUserMatricule", loggedInUser.matricule);
        }

        fetchCv()
        fetchCurrentSession()
        fetchSignature()
    }, [loggedInUser, setLoggedInUser]);

    async function fetchCv() {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/cvs`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    const data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setCvs(data)
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

    async function fetchCurrentSession() {
        try {
            const m = localStorage.getItem("loggedInUserMatricule")
            console.log(m)
            fetch(
                `http://localhost:8081/api/v1/student/getSessions/${m}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                            console.log(data)
                            setSession(data);
                        } else {
                            console.error("Failed to fetch data");
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

    async function fetchSignature() {
        try {
            const m = localStorage.getItem("loggedInUserMatricule")
            console.log(m)
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/student/get/${m}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                            setSignature(data);
                            console.log(data)
                        } else {
                            console.log("Failed to fetch data");
                            setSignature(null)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setSignature(null)
        }
    }

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    let contentToRender;

    switch (activeContent) {
        case "file-uploader":
            contentToRender = <FileUploader matricule={matricule}/>
            break;
        case "offre-page-student":
            contentToRender = <OffresPageStudent/>
            break;
        case "section-entrevue":
            contentToRender = <SectionEntrevue entrevueTest={[]}/>
            break;
        case "offre-page-candidature":
            contentToRender = <OffreCandidaturePage/>
            break;
        case "dashboard":
            contentToRender = <Dashboard entrevuesTest={[]}/>
            break;
        case "signature":
            contentToRender = <CreateStudentSignature signature={signature} matricule={matricule}/>
            break;
        case "mes-contrats":
            contentToRender = <EtudiantMesContrats matricule={matricule} contratsTest={[]} ></EtudiantMesContrats>
            break;
        default:
            contentToRender = <div>Choisir une section.</div>
            break;
    }

    return (
        <div>
            {session.at(2) ?  (
                    <div className="student-homepage">
                        <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <ul className="navbar-nav px-2">
                                        <ul className="navbar-nav ml-auto px-1">
                                            <li className="nav-item navbarbutton deconnecter">
                                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                                    <FontAwesomeIcon icon={faArrowRight} style={{ marginTop: '5px', marginRight: '10px' }} />
                                                    Se déconnecter
                                                </button>
                                            </li>
                                            <li className="nav-item navbarbutton">
                                                <button className="nav-link" onClick={() => handleButtonClick("signature")}>
                                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                                                </button>
                                            </li>
                                            <li className="nav-item navbarbutton px-1">
                                                <button className="nav-link" onClick={() => setActiveContent('file-uploader')}>
                                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '2px' }}/> CV
                                                </button>
                                            </li>
                                        </ul>
                                        {
                                            cvs.map((cv, index) => (
                                                <div key={index}>
                                                    {
                                                        cv.matricule === localStorage.getItem("loggedInUserMatricule") &&
                                                        <>
                                                            <ul className="navbar-nav ml-auto px-1">
                                                                <li className="nav-item navbarbutton px-1">
                                                                    <button className="nav-link" onClick={() => handleButtonClick('dashboard')}>
                                                                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '2px' }}/> Dashboard
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item navbarbutton px-1">
                                                                    <button className="nav-link" onClick={() => handleButtonClick('offre-page-student')}>
                                                                        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '2px' }}/> Offres
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item navbarbutton px-1">
                                                                    <button className="nav-link" onClick={() => handleButtonClick('offre-page-candidature')}>
                                                                        <FontAwesomeIcon icon={faPortrait} style={{ marginRight: '2px' }}/> Mes candidatures
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item navbarbutton px-1">
                                                                    <button className="nav-link" onClick={() => handleButtonClick('section-entrevue')}>
                                                                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '2px' }}/> Section Entrevue
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item navbarbutton px-1">
                                                <button className="nav-link" onClick={() => setActiveContent('mes-contrats')}>
                                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '2px' }}/> Mes Contrats
                                                </button>
                                            </li>
                                                            </ul>
                                                            
                                                        </>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div className="container content-container mt-4">
                            {contentToRender}
                        </div>
                    </div>
                ) : (
                <SessionCotroller sessionTag={session.at(0)} studentTag={session.at(1)}/>
            )}
        </div>
    );
};

export default StudentHomePage;
