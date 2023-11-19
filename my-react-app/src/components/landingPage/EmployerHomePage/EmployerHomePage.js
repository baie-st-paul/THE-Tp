import React, {useEffect} from "react";
import EmployerStageOffreList from "./offres/EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./offres/offre/AjoutOffreForm";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBriefcase, faPlus, faFile, faHome, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CreateSignature from "./signature/CreateSignature";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import EmployeurMesContrats from "./contrat/EmployeurMesContrats";
import DashboardPageEmp from "./dashboard/DashboardPageEmp";
import CardPageSignature from "./dashboard/cards/signature/CardPageSignature";
import EvaluationForm from "./evalution_stagiaire/EvaluationForm";
import { pdf } from '@react-pdf/renderer';
import EvaluationPDF from "./evalution_stagiaire/EvaluationPDF";

const EmployerHomePage = () => {
    const [activeContent, setActiveContent] = useState("none"); 
    const navigate = useNavigate()  // ligne 18
    const [signature, setSignature] = useState(null)
    

    let contentToRender;
    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchSignature()
    }, []);

    const fetchSignature = async () => {
        try {
            console.log(employerId)
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/employer/get/${employerId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json()
                            setSignature(data)
                            console.log(data)
                        }
                        else {
                            console.log("Failed to fetch data")
                            setSignature(null)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.error("Error fetching data:", error);
            setSignature(null)
        }
    }

    const ajoutOffre = async (offre) => {

        offre["status"] = "In_review"
        offre["statusVuPasVuG"] = "pasVu"
        offre["statusVuPasVuE"] = "pasVu"
        offre["statusVuPasVuS"] = "pasVu"
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

    const handleEvaluationSubmit = async (evaluationData) => {
        pdf(<EvaluationPDF evaluationData={evaluationData} />).toBlob().then(blob => {
            const formData = new FormData();
            formData.append('file', blob, 'evaluation.pdf');

            fetch('http://localhost:8081/api/v1/employers/upload_evaluation', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    console.log("PDF envoyé avec succès");
                    setActiveContent("evaluation-page");
                    return response.json(); // ou .text() si la réponse n'est pas en JSON
                } else {
                    console.log("Erreur lors de l'envoi du PDF");
                    throw new Error('Erreur lors de l\'envoi');
                }
            })
            .then(data => {
                console.log("Réponse du serveur:", data);
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi:", error);
            });
        }).catch(error => {
            console.error("Erreur lors de la génération du PDF:", error);
        });
    };

    

    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    switch (activeContent){
        case "offre-page":
            contentToRender = <EmployerStageOffreList></EmployerStageOffreList>
        break;
        case "Ajout-offre":
            contentToRender = <AjoutOffreForm onAdd={ajoutOffre}></AjoutOffreForm>
        break;
        case "signature":
            contentToRender = <CreateSignature employerId={employerId}></CreateSignature>
            break;
        case "mes-contrats":
            contentToRender = <EmployeurMesContrats employerId={employerId} contratsTest={[]}> </EmployeurMesContrats>
            break;
        case "dashboard":
            contentToRender = <DashboardPageEmp/>
            break;
        
        
        case "evaluation":
            contentToRender = <EvaluationForm onSubmit={handleEvaluationSubmit}/>
            break;

        default:
            signature !== null ?
                contentToRender = <DashboardPageEmp/>
                : contentToRender = <CardPageSignature/>
        break;
    }

    return (
        <div>
            <Navbar className="navbar-dark navbarClass border border-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav navbar-fluid"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <ul className="navbar-nav px-2">
                            <li className="nav-item navbarbutton deconnecter">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/>
                                    Se déconnecter
                                </button>
                            </li>
                            <li className="nav-item navbarbutton">
                                <button className="nav-link" onClick={() => handleButtonClick("signature")}>
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }}/>Signature
                                </button>
                            </li>
                        </ul>
                        {
                            signature !== null &&
                            <>
                                <ul className="navbar-nav px-2">
                                    <li className="nav-item navbarbutton">
                                        <button className="nav-link" onClick={() => handleButtonClick("dashboard")}>
                                            <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }}/>Accueil
                                        </button>
                                    </li>
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
                                    <li className="nav-item navbarbutton">
                                        <button className="nav-link" onClick={() => handleButtonClick("mes-contrats")}>
                                            <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }}/>Mes contrats
                                        </button>
                                    </li>
                                
                                    <li className="nav-item navbarbutton">
                                        <button className="nav-link" onClick={() => handleButtonClick("evaluation")}>
                                            <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '10px' }}/>Évaluation
                                        </button>
                                    </li>

                                </ul>
                            </>
                        }
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
