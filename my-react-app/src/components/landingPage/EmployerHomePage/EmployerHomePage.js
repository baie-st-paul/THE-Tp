import React from "react";
import EmployerStageOffreList from "./EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./ajoutOffreForm";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons";

const EmployerHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    let contentToRender = null;
    let employerId = localStorage.getItem('employer_id')
    const ajoutOffre = async (offre) => {

        offre["status"] = "In_review"
        offre["employerId"] = employerId
        console.log(JSON.stringify(offre))

        await fetch(
            'http://localhost:8081/api/v1/stages/offres/create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
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
            contentToRender = <EmployerStageOffreList employerId={employerId}></EmployerStageOffreList>;
            break;
        case "Ajout-offre":
            contentToRender = <AjoutOffreForm onAdd={ajoutOffre}></AjoutOffreForm>
            break;
        default:
            contentToRender = <div>Select an action.</div>;
            break;
    }

    return (
        <div>
            <Navbar bg="dark" className="navbar-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Offres
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => handleButtonClick("Ajout-offre")}>
                                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }}/>Ajout Offre
                                </button>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div id="Render" className="container mt-4">
                <h2>Employeur</h2>
                {contentToRender}
            </div>
           
        </div>
    )
}

export default EmployerHomePage
