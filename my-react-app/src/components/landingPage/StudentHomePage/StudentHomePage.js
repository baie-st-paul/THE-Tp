import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");

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

    let contentToRender = null;

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    switch (activeContent) {
        case "file-uploader":
            contentToRender = <FileUploader matricule={matricule} />;
            break;
        case "offre-page-student":
            contentToRender = <OffresPageStudent/>;
            break;
        default:
            contentToRender = <div>Select an action.</div>;
            break;
    }

    return (
        <div className="student-homepage">
          <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <button className="nav-item nav-button " style={{ marginRight: '20px' }} onClick={() => setActiveContent('file-uploader')}>
                  <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/>CV
                </button>
                <button className="nav-item nav-button mr-3" onClick={() => handleButtonClick('offre-page-student')}>
                  <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/> Offres
                </button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container content-container mt-4">
            <h2>Bienvenue, découvrez vos opportunités</h2>
            {contentToRender}
          </div>
        </div>
      );
};

export default StudentHomePage;
