import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";

const EmployerOffreCard = ({ offre, onDelete, onUpdate }) => {
    return (
        <Card className="container-fluid" style={{ margin:"20px" }}>
            <Card.Body>
                <Card.Title>
                    <Card.Title>{offre.titre}</Card.Title>
                </Card.Title>
                <Card.Text>
                    Salaire: {offre.salaire}$/h <br/>
                    description: {offre.description}<br/>
                    Date de début: {offre.dateDebut}  <></>
                    Date de fin: {offre.dateFin}<br/>
                </Card.Text>
                <Button className="btn btn-danger"
                        onClick={() => onDelete(offre.id)}>
                    Supprimer <FaTimes
                    style={{color: 'black'}}
                />
                </Button>
                <Button className="btn btn-primary"
                        onClick={() => onUpdate(offre.id, offre)}>
                    Modifier <FaRepeat
                    style={{color: 'black'}}
                />
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
