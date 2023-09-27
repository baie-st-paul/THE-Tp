import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {ListGroup} from "react-bootstrap";
import ReactModal from "react-modal";

// Function to style the confirmation modal
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const OffreCard = ({ offre }) => {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleAcceptConfirmation = () => {
        updateStatus(offre.titre, "Accepted");
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        updateStatus(offre.titre, "Refused");
        setIsConfirmationModalOpen(false);
    };

    const updateStatus = async (titre, status) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/gestionnaire/offres/accept/${titre}/${status}`, {
                method: 'POST',
            });

            if (response.ok) {
                setShouldRefetch(!shouldRefetch);
            } else {
                console.error("Failed to accept/refuse offre");
            }
        } catch (error) {
            console.error("Error accepting/refusing offre:", error);
        }
    };

    return (
        <Card style={{ width: '30rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>
                    {offre.titre}
                </Card.Title>
                <Card.Text>
                    description: {offre.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Salaire: {offre.salaire}</ListGroup.Item>
                <ListGroup.Item>Programme: {offre.studentProgram}</ListGroup.Item>
                <ListGroup.Item>Date de début: {offre.dateDebut}</ListGroup.Item>
                <ListGroup.Item>Date de fin: {offre.dateFin}</ListGroup.Item>
                <ListGroup.Item>Status: {offre.status}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default OffreCard;
