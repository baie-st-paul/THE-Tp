import React, { useEffect, useState } from 'react';
import EmployerOffreCard from './EmployerOffreCard';

const EmployerStageOffreList = ({employerId}) => {
    const [offres, setOffres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(
        'http://localhost:8081/api/v1/stages/offres/employer/' + employerId,
        {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setOffres(data);
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