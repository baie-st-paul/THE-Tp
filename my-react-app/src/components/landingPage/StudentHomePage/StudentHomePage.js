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

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");
    const [cvs, setCvs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");

        if (savedMatricule) {
            setMatricule(savedMatricule);
        }

        if (loggedInUser && loggedInUser.matricule) {
            setMatricule(loggedInUser.matricule);
            localStorage.setItem("loggedInUserMatricule", loggedInUser.matricule);
        }
        const fetchCv = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/gestionnaire/cvs`);
                if (response.ok) {
                    const data = await response.json();
                    setCvs(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCv()
    }, [loggedInUser, setLoggedInUser]);

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
            contentToRender = <FileUploader matricule={matricule}/>;
            break;
        case "offre-page-student":
            contentToRender = <OffresPageStudent/>;
            break;
        case "section-entrevue":
            contentToRender = <SectionEntrevue/>
            break;
        case "offre-page-candidature":
            contentToRender = <OffreCandidaturePage/>;
            break;
        case "dashboard":
            contentToRender = <Dashboard/>;
            break;
        default:
            contentToRender = <div>Choisir une section.</div>;
            break;
    }

    return (
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
                <h2>Étudiant</h2>
                {contentToRender}
            </div>
        </div>
    );
};

export default StudentHomePage;
