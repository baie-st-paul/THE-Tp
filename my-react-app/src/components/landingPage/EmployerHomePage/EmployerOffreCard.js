import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const EmployerOffreCard = ({offre}) => {
    const [etudiants, setEtudiants] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleListePostule();
    }, [])

    async function handleListePostule() {
        try {
            const token = localStorage.getItem('token'); 
            const res = await fetch(
                `http://localhost:8081/api/employers/${offre.id}/applicants`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            if (res.ok) {  
                const data = await res.json();
                setEtudiants(data);
                console.log(etudiants);
            } else {
                const data = await res.json(); 
                console.log('Erreur', res.status, data);
                
            }
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setEtudiants([])
        }
    }
    function handleCheckListe(){
        navigate('/infoStudent', {state: {listeEtudiants:etudiants}})
    }

    return (
        <Card className="container-fluid" style={{ margin:"20px" }}>
            <Card.Body>
                <Card.Title>
                    {offre.titre}
                </Card.Title>
                <Card.Text>
                    Salaire: {offre.salaire}$/h <br/>
                    description: {offre.description}<br/>
                    Date de début: {offre.dateDebut}<br/>
                    Date de fin: {offre.dateFin}<br/>
                </Card.Text>
                <Button className="btn btn-danger"
                        onClick={() => onDelete(offre.id)}>
                    Supprimer <FaTimes
                    style={{color: 'black'}}
                />
                </Button>
                <Button className="btn btn-primary"
                        onClick={() => onUpdate(offre)}>
                    Modifier <FaRepeat
                    style={{color: 'black'}}
                />
                </Button>
                { etudiants!== null && etudiants.length > 0 ?
                    <Button className={"btn btn-success"} onClick={handleCheckListe}>
                        Voir la liste des personnes postule ({etudiants.length})
                    </Button> :
                    <Button className={"btn btn-success disabled "}> Voir la liste des personnes postule (0)</Button>
                }
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
