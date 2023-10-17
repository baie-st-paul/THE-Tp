import React, { useState } from 'react';
import "./SectionEntrevue.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { format } from 'date-fns';

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

const SectionEntrevue = () => {
    const [entrevues, setEntrevues] = useState([
        {
            entreprise: "Entreprise A",
            dateHeure: "2023-10-15T14:00:00", // Use a proper date format
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
                "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only " +
                "five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
                "It was popularised in the 1960s with the release of Letraset sheets containing " +
                "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker " +
                "including versions of Lorem Ipsum."
        },
        {
            entreprise: "Entreprise B",
            dateHeure: "2023-10-20T10:30:00", // Use a proper date format
            description: "Entrevue pour un poste de designer",
            statut: "Accepté",
        },
        {
            entreprise: "Entreprise C",
            dateHeure: "2023-10-25T15:45:00", // Use a proper date format
            description: "Entrevue pour un poste de marketing",
            statut: "Refusé",
        },
    ]);

    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleAcceptConfirmation = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        setIsConfirmationModalOpen(false);
    };

    const toggleDescriptionExpansion = (index) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [index]: !expandedDescriptions[index],
        });
    };

    return (
        <div>
            <h1>Liste des Entrevues</h1>
            <div className="table-container mt-3">
                <table className="table table-hover">
                    <thead>
                    <tr className="h3">
                        <th className="text-center">Entreprise</th>
                        <th className="text-center">Date et Heure</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entrevues.map((entrevue, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center w-5">{entrevue.entreprise}</td>
                            <td className="fw-bolder align-middle text-center">
                                {format(new Date(entrevue.dateHeure), "yyyy-MM-dd HH:mm")}
                            </td>
                            <td className="align-middle text-center w-50">
                                {entrevue.description.length > 200  && !expandedDescriptions[index] ? (
                                    <>
                                        {entrevue.description.slice(0, 200)}...
                                        <button
                                            className="btn btn-primary btn-sm m-1"
                                            onClick={() => toggleDescriptionExpansion(index)}
                                        >
                                            More
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {entrevue.description}
                                        {entrevue.description.length > 200 && (
                                            <button
                                                className="btn btn-primary btn-sm m-1"
                                                onClick={() => toggleDescriptionExpansion(index)}
                                            >
                                                Less
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>
                            <td className="align-middle text-center">
                                <button data-testid="accept-button-1" className="btn btn-success" onClick={() => openConfirmationModal("accept")}>
                                    <FontAwesomeIcon icon={faCheck} /> Accepter
                                </button>
                                <button data-testid="refuser-button-1" className="btn btn-danger" onClick={() => openConfirmationModal("refuse")}>
                                    <FontAwesomeIcon icon={faTimes} /> Refuser
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ReactModal
                isOpen={isConfirmationModalOpen}
                onRequestClose={closeConfirmationModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Confirmation Modal"
            >
                <h2>Confirmation</h2>
                {confirmationType === "accept" ? (
                    <>
                        <p>Etes-vous sûr de vouloir accepter cette entrevue ?</p>
                        <button data-testid="accept-button-2" className="btn btn-success" onClick={handleAcceptConfirmation}>
                            Oui
                        </button>
                    </>
                ) : (
                    <>
                        <p>Etes-vous sûr de vouloir refuser cette entrevue ?</p>
                        <button data-testid="refuser-button-2" className="btn btn-danger" onClick={handleRefuseConfirmation}>
                            Oui
                        </button>
                    </>
                )}
                <button className="btn btn-secondary" onClick={closeConfirmationModal}>
                    Non
                </button>
            </ReactModal>
        </div>
    );
}

export default SectionEntrevue;
