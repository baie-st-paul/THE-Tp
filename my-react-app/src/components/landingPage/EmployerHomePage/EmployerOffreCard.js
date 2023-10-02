import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EmployerOffreCard = ({ offre }) => {
    return (
        <Card style={{ width: '70rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>
                    <Card.Title>{offre.titre}</Card.Title>
                </Card.Title>
                <Card.Text>
                    Titre: {offre.titre} <br/>
                    Salaire: {offre.salaire} <br/>
                    Programme: {offre.studentProgram} <br/>
                    Date de début: {offre.dateDebut}<br/>
                    Date de fin: {offre.dateFin}<br/>
                    Status: {offre.status} <br/>
                    description: {offre.description} <br/><br/>
                </Card.Text>
                <Button variant="primary">
                    <Link >Modifier</Link>

                </Button>
                <Button variant="danger">
                    <Link >Supprimer</Link>
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
