import React, { useState, useEffect } from "react";
import "./VetoSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faClock } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import ReactModal from 'react-modal';
import NavBarGestionnaire from "../../NavBar/NavBarGestionnaire";

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

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCvList();
    }, [shouldRefetch]);

    async function fetchCvList() {
        try {
            fetch(
                "http://localhost:8081/api/v1/gestionnaire/cvs",
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
                    setCvList(data);
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (cvList !== undefined){
                setCvList(cvList)
            }
        }
    }

    async function updateStatus(matricule, status) {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/cvs/accept/${matricule}/${status}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setShouldRefetch(!shouldRefetch);
                })
        } catch (error) {
            console.error("Error accepting/refusing CV:", error);
        }
    }

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

    const filteredCvList =
        filterOption === "all"
            ? cvList
            : cvList.filter((cvDto) => cvDto.status === filterOption);

    return (
        <div>
            <NavBarGestionnaire/>
            <div id="Render" className="container content-container mt-4">
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
                            <p>Êtes-vous sûr de vouloir accepter ce CV ?</p>
                            <button className="btn btn-success" onClick={handleAcceptConfirmation}>
                                Oui
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Êtes-vous sûr de vouloir refuser ce CV ?</p>
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
        </div>
    );
};

export default VetoSection;
