import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/student/candidature/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileUpload, faBriefcase, faPortrait, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import OffreCandidaturePage from "../offresStages/student/candidature/OffreCandidaturePage";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");
    const [cv, setCv] = useState({});
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
        fetchCv()
    }, [loggedInUser, setLoggedInUser]);


    const fetchCv = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/gestionnaire/cvs/${localStorage.getItem("loggedInUserMatricule")}`);
            if (response.ok) {
                const data = await response.json();
                setCv(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
        case "offre-page-candidature":
            contentToRender = <OffreCandidaturePage/>;
            break;
        default:
            contentToRender = <div>Please select a section.</div>;
            break;
    }

    return (
        <div className="student-homepage">
            <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
                <Navbar.Collapse id="basic-navbar-nav">               
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => setActiveContent('file-uploader')}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/> CV
                                </button>
                            </li>
                            { cv.matricule === localStorage.getItem("loggedInUserMatricule") &&
                            <><li className="nav-item navbarbutton">
                                    <button className="nav-link" onClick={() => handleButtonClick('offre-page-student')}>
                                        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }} />Offres
                                    </button>
                                </li><li className="nav-item navbarbutton">
                                        <button className="nav-link" onClick={() => handleButtonClick('offre-page-candidature')}>
                                            <FontAwesomeIcon icon={faPortrait} style={{ marginRight: '10px' }} /> Mes candidatures
                                        </button>
                                    </li><li className="nav-item navbarbutton deconnecter">
                                        <button className="nav-link" onClick={() => handleDisconnect()}>
                                            <FontAwesomeIcon icon={faArrowRight} style={{ marginTop: '5px', marginRight: '10px' }} />
                                            Se déconnecter
                                        </button>
                                    </li></>
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
