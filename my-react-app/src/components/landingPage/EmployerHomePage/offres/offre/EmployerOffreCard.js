import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";
import {ListGroup} from "react-bootstrap";

const EmployerOffreCard = ({offre, onDelete, onUpdate}) => {
    const [etudiantsNb, setEtudiantsNb] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        handleListePostule();
    }, [])

    async function handleListePostule() {
        try {
            fetch(
                `http://localhost:8081/api/v1/employers/${offre.id}/applicants/nb`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
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
                    setEtudiantsNb(data);
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setEtudiantsNb(0)
        }
    }

    function handleCheckListe(){
        navigate('/infoStudent', {state: {offreId : offre.id}})
    }

    return (
        <Card className="container-fluid" style={{ width: '30rem', margin:"20px", textAlign: "left"}}>
            <Card.Body>
                <Card.Title style={{textDecorationLine: 'underline'}}>
                    {offre.titre}
                </Card.Title>
                {offre.description}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><b>Salaire:</b> {offre.salaire}$/h</ListGroup.Item>
                <ListGroup.Item><b>Programme:</b> {offre.studentProgram}</ListGroup.Item>
                <ListGroup.Item><b>Nombre postes disponible:</b> {offre.nbMaxEtudiants}</ListGroup.Item>
                <ListGroup.Item><b>Date de début:</b> {offre.dateDebut}</ListGroup.Item>
                <ListGroup.Item><b>Date de fin:</b> {offre.dateFin}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
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
                { etudiantsNb!== 0  ?
                    <Button className={"btn btn-success"} onClick={handleCheckListe}>
                        Candidatures ({etudiantsNb})
                    </Button> :
                    <Button className={"btn btn-success disabled "}>Candidatures (0)</Button>
                }
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
