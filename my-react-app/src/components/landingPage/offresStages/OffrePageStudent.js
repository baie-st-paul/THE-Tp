import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";

const OffresPageStudent = () => {
    const [offres, setOffres] = useState([]);
    const [filterOption, setFilterOption] = useState("In_review");
    const [shouldRefetch] = useState(false);

    useEffect(() => {
        const fetchOffreList = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/v1/gestionnaire/offres');
                if (response.ok) {
                    const data = await response.json();
                    setOffres(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOffreList();
    }, [shouldRefetch]);

    const filteredOffreList = offres.filter((offreDto) => offreDto.status === filterOption);

    return (
        <div>
            <h1 className="display-4 text-center">Liste des offres de stage</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {filteredOffreList.map((offre, index) => (
                    <Card key={index} style={{ width: '30rem', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>
                                {offre.titre}
                            </Card.Title>
                            <Card.Text>
                                description: {offre.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Salaire: {offre.salaire}$</ListGroup.Item>
                            <ListGroup.Item>Programme: {offre.studentProgram}</ListGroup.Item>
                            <ListGroup.Item>Date de début: {offre.dateDebut}</ListGroup.Item>
                            <ListGroup.Item>Date de fin: {offre.dateFin}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OffresPageStudent;
