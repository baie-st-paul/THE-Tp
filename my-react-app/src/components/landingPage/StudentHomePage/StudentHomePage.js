import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/student/candidature/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileUpload, faBriefcase, faEnvelope, faHome} from '@fortawesome/free-solid-svg-icons';
import SectionEntrevue from "./SectionViewEntrevue/SectionEntrevue";
import Dashboard from "./DashBoard/Dashboard";
import OffreCandidaturePage from "../offresStages/student/candidature/OffreCandidaturePage";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");
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
    }, [loggedInUser, setLoggedInUser]);

    let contentToRender;

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

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
        default:
            contentToRender = (
                <Dashboard/>);

            break;
    }

    return (
        <div className="student-homepage">
            <Navbar bg="dark" className="navbar-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <li className="nav-item ml-1">
                            <button className="nav-link" onClick={() => handleButtonClick('default')}>
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '2px' }}/> Dashboard
                            </button>
                        </li>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => setActiveContent('file-uploader')}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '2px' }}/>CV
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick('offre-page-student')}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '2px' }}/> Offres
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick('section-entrevue')}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '2px' }}/> Section Entrevue
                                </button>
                            </li>
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
