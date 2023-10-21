import React, {useEffect, useState} from 'react';
import "./SectionEntrevue.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { format } from 'date-fns';
import axios from "axios";

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
    const [entrevues, setEntrevues] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedEntrevue, setSelectedEntrevue] = useState(null);

    useEffect(() => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        fetch(
            `http://localhost:8081/api/v1/stages/entrevues/students/${savedMatricule}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).catch((error) => {
            console.error("Error:", error);
        }).then(
            async (response) => {
                const data = await response.json();
                setEntrevues(data)
                console.log(response.status)
                try{
                    console.log(response.status)
                }
                catch (e) {
                    console.log(e)
                }
                setIsLoading(false);
            }
        );

    }, [shouldRefetch]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleAcceptConfirmation = () => {
        axios
            .put(`http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${selectedEntrevue.idEtudiant}/Acceptee`, {
            })
            .then((response) => {
                setShouldRefetch(true);
            })
            .catch((error) => {
            });
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        axios
            .put(`http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${selectedEntrevue.idEtudiant}/Refusee`, {
            })
            .then((response) => {
                setShouldRefetch(true);
            })
            .catch((error) => {
            });
        setIsConfirmationModalOpen(false);
    };

    const toggleDescriptionExpansion = (index) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [index]: !expandedDescriptions[index],
        });
    };

    const entrevuesEnAttente = entrevues.filter(entrevue => entrevue.status === "EnAttente");

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
                    {entrevuesEnAttente.map((entrevue, index) => (
                        <tr key={index} onClick={() => setSelectedEntrevue(entrevue)}>
                            <td className="align-middle text-center w-5">{entrevue.comanyName}</td>
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
                                            Plus
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
                                                Moins
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
