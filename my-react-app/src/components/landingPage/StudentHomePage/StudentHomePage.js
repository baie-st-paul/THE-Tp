import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/student/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileUpload, faBriefcase, faPortrait, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import OffreCandidaturePage from "../offresStages/student/OffreCandidaturePage";
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

    let contentToRender = null;

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const articles = [
    "Les avantages des stages",
    "Comment réussir votre entretien",
    "Les meilleures entreprises pour les stages à Montréal",
    "Développer vos compétences en programmation",
    "Comprendre les bases de l'IA",
    "La cybersécurité : Ce que chaque étudiant devrait savoir",
    "Travailler dans un environnement Agile",
    "Comment préparer un portfolio de développeur",
    "Éviter le burnout pendant un stage",
    "Networking : Pourquoi et comment"
];


    switch (activeContent) {
        case "file-uploader":
            contentToRender = <FileUploader matricule={matricule} />;
            break;
        case "offre-page-student":
            contentToRender = <OffresPageStudent/>;
            break;
        case "offre-page-candidature":
            contentToRender = <OffreCandidaturePage/>
            break;
        case "disconnect":
          localStorage.clear()
          navigate('/');
        default:
          contentToRender = (
            <Container fluid>
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
          );
          break;
    }

    return (
        <div className="student-homepage">
            <Navbar  className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid " />
                <Navbar.Collapse id="basic-navbar-nav">               
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link text-dark " onClick={() => setActiveContent('file-uploader')}>
                                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }}/> CV
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link text-dark" onClick={() => handleButtonClick('offre-page-student')}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link text-dark" onClick={() => handleButtonClick('offre-page-candidature')}>
                                    <FontAwesomeIcon icon={faPortrait} style={{ marginRight: '10px' }}/> Mes candidatures
                                </button>
                            </li>
                            <li className="nav-item  navbarbutton deconnecter"><button className="nav-link text-dark" onClick={() => handleButtonClick('disconnect')}> <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/> Se déconnecter</button> </li>
                        </ul>
                       
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
