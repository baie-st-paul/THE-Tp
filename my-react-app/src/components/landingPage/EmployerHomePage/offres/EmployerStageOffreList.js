import React, { useEffect, useState } from 'react';
import EmployerOffreStages from "./EmployerOffreStages";
import UpdateOffreForm from "./offre/update/UpdateOffreForm";
import "./offre/update/ModalUpdate.css"
import NavBarEmployeur from "../../NavBar/employer/NavBarEmployeur";

const MODAL_STYLES = {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: "15px",
    zIndex: "1000",
    width: "70%",
    borderRadius: ".5em"
};

const OVERLAY_STYLE = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto"
};

const EmployerStageOffreList = () => {
    const [filterOption, setFilterOption] = useState("In_review");
    const [offres, setOffres] = useState([]);
    const [offre, setOffre] = useState({});
    const [showUpdateOffre, setShowUpdateOffre] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getOffres()
    }, []);

    async function getOffres() {
        try {
            fetch(
                'http://localhost:8081/api/v1/stages/offres/employer',
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
                    console.log(data)
                    setOffres(data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (offres !== undefined){
                setOffres(offres)
            }
        }
    }

    async function deleteOffre(offreId) {
        try {
            fetch(
                `http://localhost:8081/api/v1/stages/offres/${offreId}`,
                {
                    method: 'DELETE',
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
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setOffres(offres.filter((offre) => offre.id !== offreId));
                    setIsLoading(false);
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (offres !== undefined){
                setOffres(offres)
            }
        }
    }

    async function updateOffre(offre) {
        try {
            fetch(
                `http://localhost:8081/api/v1/stages/offres/${offre.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                    body: JSON.stringify(offre)
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
                    console.log(data)
                    setOffres(
                        offres.map(
                            (o) => o.id === offre.id ?
                                {...offre,
                                    titre: data.titre,
                                    description: data.description,
                                    salaire: data.salaire,
                                    studentProgram: data.studentProgram,
                                    dateDebut: data.dateDebut,
                                    dateFin: data.dateFin,
                                    nbMaxStudiants: data.nbMaxStudiants
                                } : o
                        )
                    )
                    setShowUpdateOffre(false)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (offres !== undefined){
                setOffres(offres)
            }
        }
    }

    function ModalUpdate() {
        return (
            <div style={OVERLAY_STYLE}>
                <div style={MODAL_STYLES}>
                    <div className="titleCloseBtn">
                        <button onClick={() => setShowUpdateOffre(false)}>X</button>
                    </div>
                    <div className="title">
                        <h1>Modifier l'offre</h1>
                    </div>
                    <div className="body">
                        <UpdateOffreForm offreStage={offre} onUpdate={updateOffre}/>
                    </div>
                    <div className="footer">
                        <button id="cancelBtn" onClick={() => setShowUpdateOffre(false)}>Fermer</button>
                    </div>
                </div>
            </div>
        )
    }

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filteredOffresList =
        filterOption === "all"
            ? offres
            : offres.filter((offre) => offre.status === filterOption);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <NavBarEmployeur/>
            <div id="Render" className="container content-container mt-4">
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className="display-4 text-center">Liste des offres de stage</h1>
                    <div className="text-center"
                        style={{display: "flex", flexDirection: "row", width: "500px"}}>
                        <h5 style={{width: "40%", justifyContent: "center", display: "flex",
                        alignItems: "center"}}>Filtrer par:</h5>
                        <select
                            style={{width: "50%"}}
                            className="form-control d-inline"
                            value={filterOption}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Tout</option>
                            <option value="In_review">En attente</option>
                            <option value="Accepted">Accepté</option>
                            <option value="Refused">Refusé</option>
                        </select>
                    </div>
                    {showUpdateOffre && <ModalUpdate />}
                    {filteredOffresList.length === 0 ?
                        <div>Aucune offre</div>
                        :
                        <EmployerOffreStages
                            offreStages={filteredOffresList}
                            onDelete={deleteOffre}
                            onUpdate={(offre) => {
                                setShowUpdateOffre(!showUpdateOffre)
                                setOffre(offre)
                                console.log("offre",offre)
                            }}
                            showUpdate={showUpdateOffre}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default EmployerStageOffreList
