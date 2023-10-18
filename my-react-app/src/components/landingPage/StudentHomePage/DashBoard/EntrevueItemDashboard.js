import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle, faTimes} from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import {format} from "date-fns"
import axios from "axios";
const EntrevueItemDashboard = ({ nomEntreprise, entrevue , setShouldRefetch}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAcceptConfirmation = () => {
        axios
            .put(`http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${entrevue.idEtudiant}/Acceptee`, {
            })
            .then((response) => {
                closeModal()
                setShouldRefetch(true);
            })
            .catch((error) => {
            });
        closeModal()
    };

    const handleRefuseConfirmation = () => {
        axios
            .put(`http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${entrevue.idEtudiant}/Refusee`, {
            })
            .then((response) => {
                closeModal()
                setShouldRefetch(true);
            })
            .catch((error) => {
            });
        closeModal()
    };

    return (
        <div className="list-group-item list-group-item-action list-group-item-warning entrevue">
            <div className="d-flex justify-content-between align-items-center">
                <div className="text-center">
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="beat"
                        size="lg"
                        style={{ color: "#e51010" }}
                    />
                </div>
                <div className="flex-grow-1">
                    <span
                        className="fs-5 fw-bold"
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {nomEntreprise}
                    </span>
                    <span className="fw-semibold"> vous a convoqué à une entrevue</span>
                </div>
                <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>
                    Voir entrevue
                </button>
            </div>
                <ReactModal
                    data-testid="modal"
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={{
                        overlay: {
                            zIndex: 1000,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        content: {
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "70%",
                        },
                    }}
                >
                    <button className="btn" onClick={closeModal} style={{ position: "absolute", top: "10px", right: "10px" }}>
                        x
                    </button>
                    <div className="Entrevue text-center">
                        <h1>Entrevue</h1>
                    </div>
                    <div>
                        <p><strong>Nom de l'entreprise: </strong>{entrevue.comanyName}</p>
                        <p><strong>Date et Heure de l'entrevue: </strong>{format(new Date(entrevue.dateHeure), "dd-MM-yyyy HH:mm")}</p>
                        <p><strong>Descripton: </strong>{entrevue.description}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-8"></div>
                        <div className="col-lg-4">
                            <button className="btn btn-success" onClick={() => handleAcceptConfirmation()}>
                                <FontAwesomeIcon icon={faCheck} /> Accepter
                            </button>
                            <button className="btn btn-danger" onClick={() => handleRefuseConfirmation()}>
                                <FontAwesomeIcon icon={faTimes} /> Refuser
                            </button>
                        </div>
                    </div>
                </ReactModal>
        </div>
    );
};

export default EntrevueItemDashboard;
