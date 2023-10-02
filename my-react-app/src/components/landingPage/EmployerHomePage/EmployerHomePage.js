import React from "react";
import EmployerStageOffreList from "./EmployerStageOffreList";
import { useState } from "react";
import AjoutOffreForm from "./ajoutOffreForm";

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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>Offres</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("Ajout-offre")}>Ajout Offre</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="Render">
                {contentToRender}
            </div>
           
        </div>
    )
}

export default EmployerHomePage
