import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/student/candidature/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import {faFileUpload, faBriefcase, faEnvelope, faHome} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import SectionEntrevue from "./SectionViewEntrevue/SectionEntrevue";
import Dashboard from "./DashBoard/Dashboard";

=======
import {faFileUpload, faBriefcase, faPortrait, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import OffreCandidaturePage from "../offresStages/student/candidature/OffreCandidaturePage";
import { useNavigate } from "react-router-dom";
>>>>>>> origin/EQ2-17-employeur_convoquer_etudiant_entrevue

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
<<<<<<< HEAD
        case "section-entrevue":
            contentToRender = <SectionEntrevue/>
            break;
        default:
          contentToRender = (
              <Dashboard/>);
            /*<Container fluid>
              <Row>
                <Col xs={4}>
                  <div className="sidebar">
                    <ListGroup>
                      {articles.map((article, index) => (
                        <ListGroup.Item action href={`#article-${index + 1}`} key={index}>
                          {article}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
                <Col xs={8}>
                  {articles.map((article, index) => (
                    <Card className="mb-4" key={index} id={`article-${index + 1}`}>
                      <Card.Header as="h1">{article}</Card.Header>
                      <Card.Body>
                        <Card.Title as="h3">Introduction</Card.Title>
                        <Card.Text className="light-bg">
                          Contenu de {article}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Container>
          );*/
          break;
=======
        case "offre-page-candidature":
            contentToRender = <OffreCandidaturePage/>;
            break;
        default:
            contentToRender = <div>Please select a section.</div>;
            break;
>>>>>>> origin/EQ2-17-employeur_convoquer_etudiant_entrevue
    }

    return (
        <div className="student-homepage">
<<<<<<< HEAD
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
=======
            <Navbar  className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid " />
                <Navbar.Collapse id="basic-navbar-nav">               
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => setActiveContent('file-uploader')}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/> CV
>>>>>>> origin/EQ2-17-employeur_convoquer_etudiant_entrevue
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick('offre-page-student')}>
<<<<<<< HEAD
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '2px' }}/> Offres
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick('section-entrevue')}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '2px' }}/> Section Entrevue
=======
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick('offre-page-candidature')}>
                                    <FontAwesomeIcon icon={faPortrait} style={{ marginRight: '10px' }}/> Mes candidatures
                                </button>
                            </li>
                            <li className="nav-item navbarbutton deconnecter">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/>
                                    Se déconnecter
>>>>>>> origin/EQ2-17-employeur_convoquer_etudiant_entrevue
                                </button>
                            </li>
                        </ul>   
                    </Nav>
                </Navbar.Collapse>
          </Navbar>
          <div className="container content-container mt-4">
<<<<<<< HEAD
=======
            <h2>Étudiant</h2>
>>>>>>> origin/EQ2-17-employeur_convoquer_etudiant_entrevue
            {contentToRender}
          </div>
        </div>
      );
};

export default StudentHomePage;
