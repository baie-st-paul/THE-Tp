import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerOffreCard = ({ offre , empId }) => {
    const [nbRequest, setNumberRequests] = useState('0')

    useEffect(() => {
        
    }, [])

    function handleListePostule(){
        fetch(
            'http://localhost:8081/api/employers/' + empId + '/offers/' + offre.id + '/applicantsSize',
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
                    setNumberRequests(data);
                    console.log(nbRequest)
                })
      
    }

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
                    Supprimer
                </Button>
                <Button className={"btn btn-success"} onClick={handleListePostule} >
                  <p> Voir la liste des personnes postule  </p> 
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EmployerOffreCard;
