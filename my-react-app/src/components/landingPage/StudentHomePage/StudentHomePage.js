import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";
import OffresPageStudent from "../offresStages/OffrePageStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';


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
          <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <button className="nav-item " style={{ marginRight: '20px' }} onClick={() => setActiveContent('file-uploader')}>
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
