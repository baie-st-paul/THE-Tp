import React from 'react'
import NavBarEmployeur from "../../NavBar/employer/NavBarEmployeur";
import { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './infoStudentOffre/InformationEtudiantPostule.css'
import { useNavigate  } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Modal from "../../GestionnaireHomePage/Vetocv/Modal";
import ReactModal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faTimes} from "@fortawesome/free-solid-svg-icons";
import "../../../StylesGenerales.css"
import ButtonConvoquer from '../../EmployerHomePage/candidature/infoStudentOffre/ButtonConvoquer';
import CreateEntrevueForm from "./Entrevue/CreateEntrevueForm";
export default function Candidatures({listeEtudiant}) {

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

    const location = useLocation();
    const navigate = useNavigate();
    const [listeCandidature, setlisteCandidature] = useState([]);
    const [entrevues, setEntrevues] = useState([]);
    const [showConvoquer, setShowConvoquer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalLettre, setOpenModalLettre] = useState(false);
    const [student, setStudent] = useState(null);
    const [confirmationType, setConfirmationType] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [finFetch, setfinFetch ]= useState(false);
    const [select, setSelect] = useState('')
    const [listeCandidatureFiltered, setListeCandidatureFiltered] = useState([]);
    const [selectedCandidatureId, setSelectedCandidatureId] = useState(null);
    useEffect(() => {
      fetchAll()
    }, [])

    
    function fetchAll(){
        getAllCandidatures() 
        allEntrevuesStudentMatricule()
    }


    const getAllCandidatures = async() => {
        const token = localStorage.getItem('token');
        try {
            fetch(
                'http://localhost:8081/api/v1/employers/candidatures',
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
                    setListeCandidatureFiltered(data)
                    setlisteCandidature(data);
                    
                    console.log("candidatures",data)
                }).then(allEntrevuesStudentMatricule).then(setfinFetch(true))
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (listeCandidature !== undefined){
                setlisteCandidature(listeEtudiant)
            }
        }
    }

    const allEntrevuesStudentMatricule = async ()=> {
        const token = localStorage.getItem('token');
        try {
            await fetch(
                'http://localhost:8081/api/v1/gestionnaire/studentsWithEntrevue',
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
                    setEntrevues(data)
                    
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
        navigate('/offres');
    }

    const updateStatus = async (matricule, status) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:8081/api/v1/employers/candidature/accept/${matricule}/${status}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }).catch(error => {
                console.log(error)
                console.error("Failed to accept/refuse etudiant");
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
                    setShouldRefetch(!shouldRefetch);
                })
        } catch (error) {
            console.error("Error accepting/refusing etudiant:", error);
        }
        window.location.reload();
    }

    const setModal = (candidatureId) => {
        setShowConvoquer(!showConvoquer);
        console.log(candidatureId.candidatureId)
        if (candidatureId.candidatureId !== undefined) setSelectedCandidatureId(candidatureId);
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
            console.log("got there")
            console.log("candidature_id",selectedCandidatureId)
            const candidature = listeCandidature.filter(candidature => candidature.id === selectedCandidatureId.candidatureId)[0]
            const matricule = candidature.student.matricule
            const offreId = candidature.offreStage.id
            const token = localStorage.getItem('token');

            console.log(matricule)
            console.log(candidature.offreStage)
            console.log(offreId)

            let employerId = localStorage.getItem('employer_id')

            entrevue["status"] = "EnAttente"
            entrevue["statusVuPasVuG"] = "pasVu"
            entrevue["statusVuPasVuS"] = "pasVu"
            entrevue["idEmployeur"] = employerId
            entrevue["idEtudiant"] = matricule
            entrevue["idOffre"] = offreId
            console.log(JSON.stringify(entrevue))

            fetch(
                'http://localhost:8081/api/v1/stages/entrevues',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
                    setSelectedCandidatureId(null)
                    window.location.reload()
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
            
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <CreateEntrevueForm onAdd={createEntrevue} setShow={setModal}/>
                    </div>
                </div>
            </div>
        )
    }

    function handleSelect(e){
        if (e.target.value === 'null'){
        setListeCandidatureFiltered(listeCandidature)
        }
        if (e.target.value === 'accepte'){
        setListeCandidatureFiltered(listeCandidature.filter(x => x.status === 'Accepted'))
        }
        if (e.target.value === 'convoquer'){
            let arr = []
        for (let x = 0; x < listeCandidature.length; x++){
            for (let x1 = 0; x1 < entrevues.length; x1++){
            if (listeCandidature[x].cvStudent.matricule === entrevues[x1].student.matricule  && entrevues[x1].offreStage.titre === listeCandidature[x].offreStage.titre && listeCandidature[x].status === 'In_review' ){
                arr.push(listeCandidature[x]);
                continue;
             }
            }    
        }        
        setListeCandidatureFiltered(arr)
        }
    setSelect(e.target.value)
    }

    return (
        <div>
        <NavBarEmployeur/>
        <div className='mt-5'>
            
            <div className='rootInfo font'>
                <div className='divFormInfo'>
                    <h1 className='text-center text-dark'>LISTE D'ÉTUDIANTS POSTULÉS</h1> 
                    <label htmlFor="choix" className='h5 px-3 text-primary '>FILTRER PAR : </label>
        <select className='h5 text-primary' id="choix" value={select} onChange={e => handleSelect(e)}>
        <option value="null"></option>
        <option value="convoquer">Convoqué</option>
        <option value="accepte">Accepté</option>
        </select>
                    {showConvoquer && <ModalConvoquerCreateEntrevue />}
                    <table>     
                        <thead>
                        <tr>
                            <th scope='col' className='headerElement w-25'>PRENOM</th>
                            <th scope="col" className='headerElement w-25'>NOM</th>
                            <th scope="col" className='headerElement w-25'>Poste</th>
                            <th scope='col' className='headerElement w-25'>ADRESSE COURRIEL</th>
                            <th scope='col' className='headerElement'>NUMERO DE TELEPHONE</th>
                            <th scope='col' className='headerElement'>RESUME</th>
                            <th scope='col' className='headerElement'>LETTRE DE MOTIVATION</th>
                            <th scope='col' className='headerElement '>ENTREVUE</th>
                            <th scope='col' className='headerElement text-center'>STATUT</th>
                            <th scope='col' className='headerElement text-center'>ACTION</th>
                        </tr>
                        </thead>
                        <tbody className='bg-light border'>
                        {listeCandidatureFiltered.length > 0 &&
                            listeCandidatureFiltered.map((candidature, i) => (
                                <tr key={i} className=''>
                                     <td  data-label="PRENOM" className='headerElement  text-break h6'>
                                        {candidature.student.lastName}
                                    </td>
                                    <td data-label="NOM" scope="row" className='headerElement text-break  h6'>
                                        {candidature.student.firstName}
                                    </td>
                                    <td data-label="Poste" className=' headerElement h6'>
                                        {candidature.offreStage.titre}
                                    </td>
                                    <td data-label="ADRESSE COURRIEL" className=' headerElement h6'>
                                        {candidature.student.email}
                                    </td>
                                    <td data-label="NUMERO DE TELEPHONE" className=' headerElement h6'>
                                        {candidature.student.phoneNumber}
                                    </td>
                                    <td data-label="RESUME" className='headerElement h6 px-3 pe-0 '>
                                        <button style={{height : "58px", width: '105px' }} className='btn btn-primary pt-0 text-start'
                                                onClick={()=>handleMontrerCv(candidature)}><p>Curriculum Vitae</p>
                                        </button>
                                    </td>
                                    { candidature.student.fileName !== '' ?
                                        <td data-label="LETTRE DE MOTIVATION" className='headerElement h6 px-3 pe-0 '>
                                            <button style={{height : "58px", width: '105px' }} className='btn btn-primary pt-0 text-start'
                                                    onClick={()=> handleMontrerLettre(candidature)}> <p className='h6'>Lettre de motivation</p>
                                            </button>
                                        </td>
                                        :   <td data-label="LETTRE DE MOTIVATION" className='headerElement h4 px-0'>
                                            <button title="Lettre de motivation" style={{height : "58px", width: '105px' }} className='btn btn-primary disabled'
                                                    onClick={()=> handleMontrerLettre(candidature)}> <p className='h6'>Lettre de motivation</p>
                                            </button>
                                        </td>
                                    }
                                    { finFetch === true &&
                                        <ButtonConvoquer matricule={candidature.student.matricule} offre={candidature.offreStage.titre}
                                                         entrevues={entrevues} setModal={setModal} candidatureId={candidature.id}/>
                                    }
                                    <td data-label="Statut ÉTUDIANT" scope="row" className='headerElement breakWord h6 pe-3'>
                                        {candidature.status === "In_review" && (
                                            <>
                                                <FontAwesomeIcon icon={faClock} /> <span className='h6'><h6>En attente</h6></span>
                                            </>
                                        )}
                                        {candidature.status === "Accepted" && (
                                            <>
                                                <FontAwesomeIcon icon={faCheck} /> Accepté
                                            </>
                                        )}
                                        {candidature.status === "Refused" && (
                                            <>
                                                <FontAwesomeIcon icon={faTimes} /> Refusé
                                            </>
                                        )}
                                    </td>
                                    <td data-label="ACTION" scope="row" className='headerElement breakWord h6 pe-3' aria-label='veto'>
                                        {candidature.status === "In_review" ? (
                                            <div className='d-flex justify-content-end me-0 pe-0'>
                                                <button title="Accepter" className="btn btn-success p-1   " onClick={() => openConfirmationModal("accept", candidature.student)}>
                                                    <FontAwesomeIcon icon={faCheck} /> EMBAUCHER
                                                </button>
                                                <button title="Refuser" className="btn btn-danger px-3 pt-1 pb-1 " onClick={() => openConfirmationModal("refuse", candidature.student)}>
                                                    <FontAwesomeIcon icon={faTimes} /> REFUSER
                                                </button>
                                                </div>
                                        ) :<br></br>}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {openModal && listeCandidature.length > 0 &&
                        <Modal cv={student.cvStudent.file_cv} fileName={student.cvStudent.fileName} onClose={handleMontrerCv} />
                    }
                    {openModalLettre && listeCandidature.length > 0 &&
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
        </div>
    )
}

