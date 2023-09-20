import React, { useState, useEffect } from 'react';
import OffreCard from './OffreCard';

const OffresPage = () => {
    const [offres, setOffres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/api/v1/gestionnaire/offres')
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {offres.map((offre) => (
                <OffreCard key={offre.id} offre={offre} />
            ))}
        </div>
    );
};

export default OffresPage;
