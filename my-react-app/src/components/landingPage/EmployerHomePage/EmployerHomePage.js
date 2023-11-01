import React, {useEffect} from "react";
import EmployerStageOffreList from "./offres/EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./offres/offre/ajoutOffreForm";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBriefcase, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CreateSignature from "./signature/CreateSignature";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";

const EmployerHomePage = () => {
    const [activeContent, setActiveContent] = useState("none");
    const navigate = useNavigate()
    const [signature, setSignature] = useState(null)

    let contentToRender;
    let employerId = localStorage.getItem('employer_id')

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                let employerId = localStorage.getItem('employer_id')
                fetch(
                    `http://localhost:8081/api/v1/stages/signatures/employers/${employerId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        }
                    }
                ).catch(error => {
                    console.log(error)
                    setSignature([])
                }).then(
                    async (res) => {
                        const data = []
                        try {
                            data = await res.json()
                            console.log(res.status)
                            if (res.status === 400) {
                                console.log(res.status)
                            }
                        } catch (e) {
                            console.log(e)
                        }
                        console.log(data.length)
                        console.log(data.map((dataS) => dataS))
                        if(data.length === 0) {
                            setSignature(null)
                        } else {
                            setSignature(
                                data.map((dataS) => dataS
                                ));
                        }
                    })
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSignature()
    }, []);

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

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
            contentToRender = <EmployerStageOffreList employerId={employerId}></EmployerStageOffreList>
        break;
        case "Ajout-offre":
            contentToRender = <AjoutOffreForm onAdd={ajoutOffre}></AjoutOffreForm>
        break;
        case "signature":
            contentToRender = <CreateSignature employerId={employerId}></CreateSignature>
            break;
        default:
            contentToRender = <div>Choisir une section.</div>
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
                                <button className="nav-link" onClick={() => handleButtonClick("signature")}>
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                                </button>
                            </li>
                            <li className="nav-item navbarbutton deconnecter">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/>
                                    Se déconnecter
                                </button>
                            </li>
                        </ul>
                        {
                            signature !== null &&
                            <>
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
                                </ul>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container content-container mt-4">
                <h2>Employeur</h2>
                {contentToRender}
            </div>
        </div>
    )
}

export default EmployerHomePage
