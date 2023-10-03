import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {FaTimes} from "react-icons/fa";

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
                <Button className="btn btn-primary">
                    Modifier
                </Button>
                <Button className={"btn btn-danger"}>
                    Supprimer <FaTimes
                    style={{color: 'red', cursor: 'pointer'}}
                    onClick={() => onDelete(offre.id)}/>
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
