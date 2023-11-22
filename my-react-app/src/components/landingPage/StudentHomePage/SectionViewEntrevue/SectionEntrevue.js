import React, {useEffect, useState} from 'react';
import "./SectionEntrevue.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { format } from 'date-fns';
import NavBarStudent from "../../NavBar/student/NavBarStudent";

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

const SectionEntrevue = ({entrevueTest}) => {
    const [entrevues, setEntrevues] = useState(entrevueTest);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedEntrevue, setSelectedEntrevue] = useState(null);
    const [filterSelection, setFilterSelection] = useState("Toutes");
    const token = localStorage.getItem('token');
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");

    useEffect(() => {
        getStudentEntrevues()
    }, [shouldRefetch]);

    async function getStudentEntrevues() {
        try {
            fetch(
                `http://localhost:8081/api/v1/stages/entrevues/students/${savedMatricule}`,
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
                    setEntrevues(data)
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (entrevues !== undefined){
                setEntrevues(entrevues)
            }
        }
    }

    const handleAcceptConfirmation = () => {
        fetch(
            `http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${selectedEntrevue.id}/Acceptee`,
            {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (response) => {
                console.log(response.status)
                setEntrevues(entrevues.map(entrevue => {
                    if (entrevue.id === selectedEntrevue.id) {
                        entrevue.status = "Acceptee";
                    }
                    return entrevue;
                }));
                setShouldRefetch(true);
            })
        setIsConfirmationModalOpen(false);
    };

    const handleRefuseConfirmation = () => {
        fetch(
            `http://localhost:8081/api/v1/stages/entrevues/manageStatusByMatricule/${selectedEntrevue.id}/Refusee`,
            {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (response) => {
                console.log(response.status)
                setEntrevues(entrevues.map(entrevue => {
                    if (entrevue.id === selectedEntrevue.id) {
                        entrevue.status = "Refusee";
                    }
                    return entrevue;
                }));
                setShouldRefetch(true);
            }
        )
        setIsConfirmationModalOpen(false);
    };

    const openConfirmationModal = (type) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const toggleDescriptionExpansion = (index) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [index]: !expandedDescriptions[index],
        });
    };

    const entrevuesFiltred = () => {
        if (filterSelection === "Toutes") return entrevues;
        return entrevues.filter(entrevue => entrevue.status === filterSelection);
    }

    return (
        <div>
            <NavBarStudent/>
            <div id="Render" className="container-lg mt-4">
                <h1 className="display-4 text-center">Liste des Entrevues</h1>
                <select
                    className="form-select mx-auto w-25"
                    aria-label="Default select example"
                    onChange={(e) => setFilterSelection(e.target.value)}
                >
                    <option value="Toutes">Toutes</option>
                    <option value="EnAttente">En Attente</option>
                    <option value="Acceptee">Acceptée</option>
                    <option value="Refusee">Refusée</option>
                </select>
                {entrevuesFiltred().length > 0 ?
                    <div className="table-container mt-5">
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
                            {entrevuesFiltred().map((entrevue, index) => (
                                <tr key={index} onClick={() => setSelectedEntrevue(entrevue)}>
                                    <td className="align-middle text-center w-5">{entrevue.companyName}</td>
                                    <td className="fw-bolder align-middle text-center">
                                        {format(new Date(entrevue.dateHeure), "yyyy-MM-dd HH:mm")}
                                    </td>
                                    <td className="align-middle text-center ">
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
                                        { entrevue.status === "EnAttente" ?
                                        <div>
                                            <button data-testid="accept-button-1" className="btn btn-success" onClick={() => openConfirmationModal("accept")}>
                                                <FontAwesomeIcon icon={faCheck} /> Accepter
                                            </button>
                                            <button data-testid="refuser-button-1" className="btn btn-danger" onClick={() => openConfirmationModal("refuse")}>
                                                <FontAwesomeIcon icon={faTimes} /> Refuser
                                            </button>
                                        </div>
                                        :
                                        <>
                                            { entrevue.status === "Acceptee" ?
                                                <>Acceptée <FontAwesomeIcon className="text-success" icon={faCheck} /></>
                                                :
                                                <>Refusée <FontAwesomeIcon className="text-danger" icon={faTimes} /></>
                                            }
                                        </>
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div> :
                    <p className="align-middle text-center mt-5">Il n'y a pas d'entrevues...</p>
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
                            <p>Êtes-vous sûr de vouloir accepter cette entrevue ?</p>
                            <button data-testid="accept-button-2" className="btn btn-success" onClick={handleAcceptConfirmation}>
                                Oui
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Êtes-vous sûr de vouloir refuser cette entrevue ?</p>
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
        </div>
    );
}

export default SectionEntrevue;
