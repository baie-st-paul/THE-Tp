import React from "react";
import EmployerStageOffreList from "./offres/EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./offres/offre/ajoutOffreForm";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBriefcase, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EmployerHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");
    const navigate = useNavigate()

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    let contentToRender;
    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');
    const ajoutOffre = async (offre) => {

        offre["status"] = "In_review"
        offre["employerId"] = employerId
        console.log(JSON.stringify(offre))
        console.log(token)
        await fetch(
            'http://localhost:8081/api/v1/stages/offres/create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                body: JSON.stringify(offre)
            }
        ).catch((err) => {
            console.log(err)
        }).then(
            (res) => {
                const data= res.json()
                try{
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }

                setActiveContent("offre-page")
                console.log(data)
            }
        )
    }

    switch (activeContent){
        case "offre-page":
            contentToRender = <EmployerStageOffreList></EmployerStageOffreList>;
        break;
        case "Ajout-offre":
            contentToRender = <AjoutOffreForm onAdd={ajoutOffre}></AjoutOffreForm>;
        break;
        default:
            contentToRender = <div>Choisir une section.</div>;
        break;
    }

    return (
        <div>
            <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("Ajout-offre")}>
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }}/>Ajout Offre
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

            <div className="container content-container mt-4">
                {contentToRender}
            </div>
        </div>
    )
}

export default EmployerHomePage
