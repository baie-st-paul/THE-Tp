import React, { useEffect, useState } from 'react';
import EmployerOffreCard from './EmployerOffreCard';
import EmployerOffreStages from "./EmployerOffreStages";
import UpdateOffreForm from "./UpdateOffreForm";

const EmployerStageOffreList = ({employerId}) => {
    const [offres, setOffres] = useState([]);
    const [offre, setOffre] = useState({});
    const [showUpdateOffre, setShowUpdateOffre] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState(null);

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

    const deleteOffre = async (offreId) => {
        await fetch(
            `http://localhost:8081/api/v1/stages/offres/${offreId}`,
            {
                method: 'DELETE'
            }
        )

        setOffres(offres.filter((offre) => offre.id !== offreId));
        setIsLoading(false);
    }

    const updateOffre = async (offre) => {
        console.log(offre)
        const res = await fetch(
            `http://localhost:8081/api/v1/stages/offres/${offre.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(offre)
        })
        const data = await res.json()
        setOffres(
            offres.map(
                (o) => o.id === offre.id ?
                    {...offre,
                        titre: data.titre,
                        description: data.description,
                        salaire: data.salaire,
                        studentProgram: data.studentProgram,
                        dateDebut: data.dateDebut,
                        dateFin: data.dateFin,
                    } : o
            )
        )
    }

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {showUpdateOffre && <UpdateOffreForm offreStage={offre} onUpdate={updateOffre}/>}
            {offres.length === 0 ?
                <div>Aucune offre</div>
                :
                <EmployerOffreStages
                    offreStages={offres}
                    onDelete={deleteOffre}
                    onUpdate={(offre) => {
                        setShowUpdateOffre(!showUpdateOffre)
                        setOffre(offre)
                        console.log("offre",offre)
                    }}
                    showUpdate={showUpdateOffre}
                />
            }
        </div>
    );
};

export default EmployerStageOffreList
