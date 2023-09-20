import React, { useEffect, useState } from 'react';
import EmployerOffreCard from './EmployerOffreCard';
import AjoutOffreForm from './ajoutOffreForm';

const EmployerStageOffreList = () => {
    const [offres, setOffres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeContent, setActiveContent] = useState("none");
    useEffect(() => {
        fetch('http://localhost:8081/api/v1/utilisateur/employer/offreStage/' )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des offres.');
                }
                return response.json();
            })
            .then(data => {
                setOffres(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                console.error('Erreur lors de la récupération des offres:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    switch (activeContent){
        case "offre-page":
            contentToRender = <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {offres.map((offre) => (
                    <EmployerOffreCard key={offre.id} offre={offre} />
                ))}
            </div>;
            break;
        case "Ajout-offre":
            <AjoutOffreForm></AjoutOffreForm>
        default:
            contentToRender = <div>Select an action.</div>;
            break;
    }

    return (
        <div >
            
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
                            <button className="nav-link" onClick={() => handleButtonClick("veto-section")}>Offres</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => handleButtonClick("offre-page")}>Ajout Offre</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="Render">
                {contentToRender}
            </div>
        </div>
    );
};

export default EmployerStageOffreList