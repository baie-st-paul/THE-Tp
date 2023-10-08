import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerOffreCard = ({ offre , empId }) => {
    const [nbRequest, setNumberRequests] = useState(0);

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
                setNumberRequests(data);
                console.log(nbRequest);
            } else {
                const data = await res.json(); 
                console.log('Erreur', res.status, data);
            }
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }
    
    useEffect(() => {
        console.log(nbRequest);
    }, [nbRequest]);
    
    

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
                <Button className="btn btn-primary">
                    Modifier
                </Button>
                <Button className={"btn btn-danger"}>
                    Supprimer
                </Button>
                <Button className={"btn btn-success"} onClick={handleListePostule}>
                    Voir la liste des personnes postule
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
