import React, { useState, useEffect } from "react";
import "./VetoSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faClock } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import ReactModal from 'react-modal';

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

const VetoSection = () => {
    const [cvList, setCvList] = useState([]);
    const [filterOption, setFilterOption] = useState("all");
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCv, setSelectedCv] = useState(null);
    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    useEffect(() => {
        const fetchCvList = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/v1/gestionnaire/cvs");
                if (response.ok) {
                    const data = await response.json();
                    setCvList(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCvList();
    }, [shouldRefetch]);

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleAcceptConfirmation = () => {
        updateStatus(selectedCv.matricule, "Accepted");
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        updateStatus(selectedCv.matricule, "Refused");
        setIsConfirmationModalOpen(false);
    };

    const updateStatus = async (matricule, status) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/gestionnaire/cvs/accept/${matricule}/${status}`, {
                method: 'POST',
            });

            if (response.ok) {
                setShouldRefetch(!shouldRefetch);
            } else {
                console.error("Failed to accept/refuse CV");
            }
        } catch (error) {
            console.error("Error accepting/refusing CV:", error);
        }
    };

    const filteredCvList =
        filterOption === "all"
            ? cvList
            : cvList.filter((cvDto) => cvDto.status === filterOption);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-12">
                    <h1 className="display-4 text-center m-2">CV des étudiants</h1>
                </div>
                <div className="col-lg-6 align-items-center">
                    <div className="text-center">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <h3 className="mb-0">Filtrer par</h3>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-control w-100 d-inline"
                                    value={filterOption}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">Tout</option>
                                    <option value="In_review">En attente</option>
                                    <option value="Accepted">Accepté</option>
                                    <option value="Refused">Refusé</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive table-container">
                <table className="table custom-table">
                    <thead>
                    <tr>
                        <th className="header-cell display-4">Matricule</th>
                        <th className="header-cell display-4">Nom de fichier</th>
                        <th className="header-cell display-4">Statut</th>
                        <th className="header-cell display-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCvList.map((cvDto, index) => (
                        <tr key={index} className="table-row align-middle" onClick={() => setSelectedCv(cvDto)}>
                            <td className="fw-semibold" onClick={() => setOpenModal(true)}>{cvDto.matricule}</td>
                            <td className="fw-semibold" onClick={() => setOpenModal(true)}>{cvDto.fileName}</td>
                            <td className="fw-semibold" onClick={() => setOpenModal(true)}>
                                {cvDto.status === "In_review" && (
                                    <>
                                        <FontAwesomeIcon icon={faClock} /> En attente
                                    </>
                                )}
                                {cvDto.status === "Accepted" && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} /> Accepté
                                    </>
                                )}
                                {cvDto.status === "Refused" && (
                                    <>
                                        <FontAwesomeIcon icon={faTimes} /> Refusé
                                    </>
                                )}
                            </td>
                            <td>
                                {cvDto.status === "In_review" && (
                                    <>
                                        <button className="btn btn-success" onClick={() => openConfirmationModal("accept")}>
                                            <FontAwesomeIcon icon={faCheck} /> Accepter
                                        </button>
                                        <button className="btn btn-danger" onClick={() => openConfirmationModal("refuse")}>
                                            <FontAwesomeIcon icon={faTimes} /> Refuser
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {openModal && selectedCv && (
                <Modal cv={selectedCv.file_cv} fileName={selectedCv.fileName} onClose={() => setOpenModal(false)} />
            )}
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
                        <p>Etes-vous sûr de vouloir accepter ce CV ?</p>
                        <button className="btn btn-success" onClick={handleAcceptConfirmation}>
                            Oui
                        </button>
                    </>
                ) : (
                    <>
                        <p>Etes-vous sûr de vouloir refuser ce CV ?</p>
                        <button className="btn btn-danger" onClick={handleRefuseConfirmation}>
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
};

export default VetoSection;
