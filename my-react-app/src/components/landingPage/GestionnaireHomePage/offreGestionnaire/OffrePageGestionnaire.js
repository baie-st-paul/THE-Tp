import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faClock } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import ReactModal from 'react-modal';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";

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

export default function OffresPageGestionnaire({ listeOffres }) {
    const [offres, setOffres] = useState([]);
    const [sessions, setSession] = useState([]);
    const [filterOption, setFilterOption] = useState("In_review");
    const [selectedTagName, setSelectedTagName] = useState("AU23");
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [selectedOffre, setSelectedOffre] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchSessions();
        fetchOffreList();
    }, [shouldRefetch]);

    async function fetchSessions() {
        try {
            fetch(
                'http://localhost:8081/api/v1/gestionnaire/getSessions',
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
                    setSession(data);
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (sessions !== undefined){
                setSession(sessions)
            }
        }
    }

    async function fetchOffreList() {
        try {
            fetch(
                'http://localhost:8081/api/v1/gestionnaire/offres',
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
                    setOffres(data);
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (offres !== undefined){
                setOffres(offres)
            }
        }
    }

    async function updateStatus(titre, status) {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/offres/accept/${titre}/${status}`,
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
            console.log('Une erreur est survenue:', error);
        }
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "filterOption") {
            setFilterOption(value);
        } else if (event.target.name === "tagName") {
            setSelectedTagName(value);
        }
    };

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleAcceptConfirmation = () => {
        updateStatus(selectedOffre.titre, "Accepted");
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        updateStatus(selectedOffre.titre, "Refused");
        setIsConfirmationModalOpen(false);
    };

    const filteredOffreList = offres
        .filter((offreDto) => filterOption === "all" || offreDto.status === filterOption)
        .filter((offreDto) => !selectedTagName || offreDto.tag === selectedTagName);

    console.log(sessions)
    console.log(offres)

    return (
        <div>
            <NavBarGestionnaire/>
            <div id="Render" className="container content-container mt-4">
                <h1 className="display-4 text-center">Liste des offres de stage</h1>
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <h3 className="mb-0">Filtrer par</h3>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-control w-100 d-inline"
                            name="filterOption"
                            value={filterOption}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Tous les états</option>
                            <option value="In_review">En attente</option>
                            <option value="Accepted">Accepté</option>
                            <option value="Refused">Refusé</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-control w-100 d-inline"
                            name="tagName"
                            value={selectedTagName}
                            onChange={handleFilterChange}
                        >
                            <option value="">Toutes les sessions</option>
                            {sessions.map((session, index) => (
                                <option key={index} value={session.tagName}>
                                    {session.tagName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {filteredOffreList.length > 0 ?
                    <div>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container>
                                {filteredOffreList.map((offre, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <Card onClick={() => setSelectedOffre(offre)}
                                                  style={{ width: '30rem', margin: '5px', textAlign: "left" }}>
                                                <Card.Body>
                                                    <Card.Title style={{ textDecorationLine: 'underline' }}>
                                                        {offre.titre}
                                                    </Card.Title>
                                                    {offre.description}
                                                </Card.Body>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroup.Item><b>Salaire:</b> {offre.salaire}$/h</ListGroup.Item>
                                                    <ListGroup.Item><b>Programme:</b> {offre.studentProgram}</ListGroup.Item>
                                                    <ListGroup.Item><b>Nombre postes disponibles:</b> {offre.nbMaxEtudiants}</ListGroup.Item>
                                                    <ListGroup.Item><b>Date de début:</b> {offre.dateDebut}</ListGroup.Item>
                                                    <ListGroup.Item><b>Date de fin:</b> {offre.dateFin}</ListGroup.Item>
                                                    <ListGroup.Item>
                                                        {offre.status === "In_review" && (
                                                            <>
                                                                <FontAwesomeIcon icon={faClock} /> En attente
                                                            </>
                                                        )}
                                                        {offre.status === "Accepted" && (
                                                            <>
                                                                <FontAwesomeIcon icon={faCheck} /> Accepté
                                                            </>
                                                        )}
                                                        {offre.status === "Refused" && (
                                                            <>
                                                                <FontAwesomeIcon icon={faTimes} /> Refusé
                                                            </>
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        {offre.status === "In_review" && (
                                                            <>
                                                                <button className="btn btn-success" onClick={() => openConfirmationModal("accept")}>
                                                                    <FontAwesomeIcon icon={faCheck} /> Accepter
                                                                </button>
                                                                <button className="btn btn-danger" onClick={() => openConfirmationModal("refuse")}>
                                                                    <FontAwesomeIcon icon={faTimes} /> Refuser
                                                                </button>
                                                            </>
                                                        )}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </Grid>
                                    </div>
                                ))}
                            </Grid>
                        </Box>
                    </div> :
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        AUCUNE OFFRE À AFFICHER
                    </div>
                }
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
                            <p>Êtes-vous sûr de vouloir accepter cette offre ?</p>
                            <button className="btn btn-success" onClick={handleAcceptConfirmation}>
                                Oui
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Êtes-vous sûr de vouloir refuser cette offre ?</p>
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
}
