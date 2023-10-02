import React, { useEffect, useState } from 'react';
import EmployerOffreCard from './EmployerOffreCard';

const EmployerStageOffreList = ({employerId}) => {
    const [offres, setOffres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(
        'http://localhost:8081/api/v1/stages/offres/employer' + employerId,
        {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }
            }
        ).catch(error => {
            console.log(error)
        }).then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Aucune offre trouvée.');
                } else {
                    throw new Error('Erreur réseau.');
                }
            }
            setOffres(response.json());
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {offres.map((offre) => (
                <EmployerOffreCard key={offre.id} offre={offre} />
            ))}
        </div>
    );
};

export default EmployerStageOffreList