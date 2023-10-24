import React from 'react'
import { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './informationEtudiantPostule.css'
import { useNavigate  } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Modal from "../../../GestionnaireHomePage/Vetocv/Modal";
import ReactModal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";
import "../../../../stylesGenerales.css"
import CreateEntrevueForm from "../../../Entrevue/CreateEntrevueForm";

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

export default function InformationEtudiantPostule({listeEtudiant}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [listeEtudiants, setListeEtudiants] = useState([]);
    const [entrevues, setEntrevues] = useState([]);
    const [showConvoquer, setShowConvoquer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalLettre, setOpenModalLettre] = useState(false);
    const [student, setStudent] = useState(null);
    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    useEffect(() => {
        handleListePostule();
        allEntrevuesStudentMatricule();
    }, [])

    async function handleListePostule() {
        try {
            const token = localStorage.getItem('token');
            fetch(
                `http://localhost:8081/api/employers/${location.state.offreId}/applicants`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
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
                    setListeEtudiants(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (listeEtudiant !== undefined){
                setListeEtudiants(listeEtudiant)
            }
        }
    }

    async function allEntrevuesStudentMatricule() {
        try {
            listeEtudiants.map(async (candidature) => {
                const matricule = candidature.student.matricule
                console.log(matricule)

                fetch(
                    `http://localhost:8081/api/v1/stages/entrevues/${matricule}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        }
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
                    })
            })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (entrevues !== undefined){
                setEntrevues(entrevues)
            }
        }
    }

    function handleMontrerCv(student){
        setOpenModal(!openModal)
        setStudent(student)
    }

    function handleMontrerLettre(student){
        setOpenModalLettre(!openModalLettre)
        setStudent(student)
    }

    function handleRetour(){
        navigate('/EmployeurHomePage');
    }

    const updateStatus = async (matricule, status) => {
        try {
            fetch(
                `http://localhost:8081/api/employers/candidature/accept/${matricule}/${status}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            ).catch(error => {
                console.log(error)
                console.error("Failed to accept/refuse etudiant");
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
            console.error("Error accepting/refusing etudiant:", error);
        }
    }

    const handleAcceptConfirmation = () => {
        updateStatus(student.matricule, "Accepted");
        setIsConfirmationModalOpen(false);
        console.log("Accepted")
    };

    const handleRefuseConfirmation = () => {
        updateStatus(student.matricule, "Refused");
        setIsConfirmationModalOpen(false);
    };

    const openConfirmationModal = (type, student) => {
        setConfirmationType(type);
        setIsConfirmationModalOpen(true);
        setStudent(student)
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const createEntrevue = async (entrevue) => {
        try {
            listeEtudiants.map(async (candidature) => {
                const matricule = candidature.student.matricule
                console.log(matricule)

                let employerId = localStorage.getItem('employer_id')

                entrevue["status"] = "EnAttente"
                entrevue["idEmployeur"] = employerId
                entrevue["idEtudiant"] = matricule
                console.log(JSON.stringify(entrevue))

                fetch(
                    'http://localhost:8081/api/v1/stages/entrevues',
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(entrevue)
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
                        setEntrevues([...entrevues, data])
                        console.log(data)
                        setShowConvoquer(false)
                    })
            })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (entrevues !== undefined){
                setEntrevues(entrevues)
            }
        }
    }

    function ModalConvoquerCreateEntrevue() {
        return (
            <div style={OVERLAY_STYLE}>
                <div style={MODAL_STYLES}>
                    <div className="titleCloseBtn">
                        <button onClick={() => setShowConvoquer(false)}>X</button>
                    </div>
                    <div className="title">
                        <h1>Convoquer un étudiant</h1>
                    </div>
                    <div className="body">
                        <CreateEntrevueForm onAdd={createEntrevue}/>
                    </div>
                    <div className="footer">
                        <button id="cancelBtn" onClick={() => setShowConvoquer(false)}>Fermer</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='mt-5'>
            <div className='rootInfo font'>
                <div className='divFormInfo'>
                    {showConvoquer && <ModalConvoquerCreateEntrevue />}
                    <table>
                        <caption> <h1 className='text-center text-dark'>LISTE D'ÉTUDIANTS POSTULÉS</h1> </caption>
                        <thead>
                        <tr>
                            <th scope="col" className='headerElement w-25'>NOM</th>
                            <th scope='col' className='headerElement w-25'>PRENOM</th>
                            <th scope='col' className='headerElement w-25'>ADRESSE COURRIEL</th>
                            <th scope='col' className='headerElement'>NUMERO DE TELEPHONE</th>
                            <th scope='col' className='headerElement'>RESUME</th>
                            <th scope='col' className='headerElement'>LETTRE DE MOTIVATION</th>
                            <th scope='col' className='headerElement '>ACTION</th>
                            <th scope='col' className='headerElement text-center'>STATUT</th>
                            <th scope='col' className='headerElement text-center'></th>
                        </tr>
                        </thead>
                        <tbody className='bg-light border'>
                        {listeEtudiants.length > 0 &&
                            listeEtudiants.map((etudiant, i) => (
                                <tr key={i} className=''>
                                    <td data-label="NOM" scope="row" className='headerElement text-break  h4'>
                                        {etudiant.student.firstName}
                                    </td>
                                    <td  data-label="PRENOM" className='headerElement  text-break h4'>
                                        {etudiant.student.lastName}
                                    </td>
                                    <td data-label="ADRESSE COURRIEL" className=' headerElement text-break h4'>
                                        {etudiant.student.email}
                                    </td>
                                    <td data-label="NUMERO DE TELEPHONE" className=' headerElement h4'>
                                        {etudiant.student.phoneNumber}
                                    </td>
                                    <td data-label="RESUME" className='headerElement h4 px-0 '>
                                        <button style={{height : "60px", width: '120px' }} className='btn btn-primary '
                                                onClick={()=>handleMontrerCv(etudiant)}>Cv
                                        </button>
                                    </td>
                                    { etudiant.student.fileName !== '' ?
                                        <td data-label="LETTRE DE MOTIVATION" className='headerElement h4 px-0'>
                                            <button style={{height : "60px", width: '120px' }} className='btn btn-primary'
                                                    onClick={()=> handleMontrerLettre(etudiant)}>Lettre de motivation
                                            </button>
                                        </td>
                                        :   <td data-label="LETTRE DE MOTIVATION" className='headerElement h4 px-0'>
                                            <button style={{height : "60px", width: '120px' }} className='btn btn-primary disabled'
                                                    onClick={()=> handleMontrerLettre(etudiant)}>Lettre de motivation
                                            </button>
                                        </td>
                                    }

                                    {entrevues.length > 0 ?
                                        entrevues.map((entrevue, i) => (
                                            <td key={i} data-label="ENTREVUE PRÉVUE" scope="row" className='headerElement breakWord h4 pe-3'>
                                                {entrevue.dateHeure}
                                            </td>
                                        )) :
                                        <td className='headerElement h4'>
                                            <button title="CONVOQUER" className='btn btn-primary' style={{height : "60px", width: '120px' }}
                                                    onClick={()=> setShowConvoquer(!showConvoquer)}>
                                                Convoquer
                                            </button>
                                        </td>
                                    }


                                    <td data-label="Statut ÉTUDIANT" scope="row" className='headerElement breakWord h4 pe-3'>
                                        {etudiant.status === "In_review" && (
                                            <>
                                                <FontAwesomeIcon icon={faClock} /> En attente
                                            </>
                                        )}
                                        {etudiant.status === "Accepted" && (
                                            <>
                                                <FontAwesomeIcon icon={faCheck} /> Accepté
                                            </>
                                        )}
                                        {etudiant.status === "Refused" && (
                                            <>
                                                <FontAwesomeIcon icon={faTimes} /> Refusé
                                            </>
                                        )}
                                    </td>
                                    <td aria-label='veto'>
                                        {etudiant.status === "In_review" && (
                                            <div className='d-flex justify-content-end me-0 pe-0'>
                                                <button title="Accepter" className="btn btn-success p-1   " onClick={() => openConfirmationModal("accept", etudiant.student)}>
                                                    <FontAwesomeIcon icon={faCheck} /> EMBAUCHER
                                                </button>
                                                <button title="Refuser" className="btn btn-danger px-3 pt-1 pb-1 " onClick={() => openConfirmationModal("refuse", etudiant.student)}>
                                                    <FontAwesomeIcon icon={faTimes} /> REFUSER
                                                </button>
                                                </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {openModal && listeEtudiants.length > 0 &&
                        <Modal cv={student.cvStudent.file_cv} fileName={student.cvStudent.fileName} onClose={handleMontrerCv} />
                    }
                    {openModalLettre && listeEtudiants.length > 0 &&
                        <Modal cv={student.lettreMotivation} fileName={student.fileName} onClose={handleMontrerLettre} />
                    }
                    <ReactModal
                        isOpen={isConfirmationModalOpen}
                        onRequestClose={closeConfirmationModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Confirmation Modal"
                    >
                        <h2 title="Confirmation modal">Confirmation</h2>
                        {confirmationType === "accept" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir accepter cet étudiant ?</p>
                                <button title="ConfirmAccept" className="btn btn-success" onClick={handleAcceptConfirmation}>
                                    Oui
                                </button>
                            </>
                        ) : (
                            <>
                                <p>Êtes-vous sûr de vouloir refuser cet étudiant ?</p>
                                <button title="ConfirmRefuse" className="btn btn-danger" onClick={handleRefuseConfirmation}>
                                    Oui
                                </button>
                            </>
                        )}
                        <button title="ConfirmNon" className="btn btn-secondary" onClick={closeConfirmationModal}>
                            Non
                        </button>
                    </ReactModal>
                    <div className='d-flex justify-content-end mt-5 '>
                        <button className='btn btn-dark p-2 ' onClick={handleRetour}>RETOUR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
