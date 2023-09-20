import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const OffreCard = ({ offre }) => {
    return (
        <Card style={{ width: '70rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>
                    <Link to={`/offre/${offre.id}`}>{offre.titre}</Link>
                </Card.Title>
                <Card.Text>
                    Titre: {offre.titre} <br/>
                    Salaire: {offre.salaire} <br/>
                    Salaire: {offre.salaire} <br/>
                    Date de début: {offre.dateDebut}<br/>
                    Date de fin: {offre.dateFin}<br/>
                    description: {offre.description} <br/><br/>
                </Card.Text>
                <Button variant="primary">
                    <Link to={`/postuler/${offre.id}`} style={{ color: 'white' }}>Details...</Link>
                </Button>
            </Card.Body>
        </Card>
    );
}

export default OffreCard;
