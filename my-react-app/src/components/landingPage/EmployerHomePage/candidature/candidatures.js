import React from 'react'
import NavBarEmployeur from "../../NavBar/employer/NavBarEmployeur";
import { useState , useEffect,useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './infoStudentOffre/InformationEtudiantPostule.css'
import { useLocation, useNavigate  } from "react-router-dom";
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

    const navigate = useNavigate();
    let {state} = useLocation()
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
    const [select, setSelect] = useState("all")
    const [listeCandidatureFiltered, setListeCandidatureFiltered] = useState([]);
    const [selectedCandidatureId, setSelectedCandidatureId] = useState(null);
    const [refreshed, setRefreshed] = useState(true)
    const [selectDisabled, setSelectDisabled] = useState(false)
    const [selectedEntrevueToModify, setSelectedEntrevueToModify] = useState(null)
    const [reload, setReload] = useState(false)
    const data2Ref = useRef(null);
    const data1Ref = useRef(null);
    useEffect(() => {
        fetchAll()  
    }, [reload])

   async function fetchAll(){
     Promise.all([allEntrevuesStudentMatricule(),getAllCandidatures()]).then(()=> checkRefused())
    }


    function checkRefused(){
        if (state!== null) {
        if (state.selectVar === 'refused'){
            setSelect('Refused_student')
            setSelectDisabled(true)
                let entr = data2Ref.current.filter(candidature => candidature.status === 'Refusee' && candidature.status !== 'In_review');
                for (let i=0; i< entr.length; i++){
                    let candidature = data1Ref.current.filter(x => x.cvStudent.matricule === entr[i].student.matricule)[0];
                    console.log(candidature);
                    entr[i]["cvStudent"] = candidature.cvStudent ;
                    entr[i]["lettreMotivation"] = candidature.lettreMotivation;
                }
                setListeCandidatureFiltered(entr)
                }
        
        if (state.selectVar === 'In_review'){
            setSelectDisabled(true)
            setSelect('In_review')
            setListeCandidatureFiltered(data1Ref.current.filter(candidature => candidature.status === 'In_review'))
            }
            if (state.selectVar === 'need-action'){
            setSelectDisabled(true)
            setSelect('need-action')
            setListeCandidatureFiltered(data1Ref.current.filter(candidature => candidature.status === 'In_review' || candidature.status === 'Interview'  ))
            } 
        }  
      
    }

    const getAllCandidatures = async() => {
        const token = localStorage.getItem('token');
        const employerId = localStorage.getItem('employer_id');
        try {
           await fetch(
                'http://localhost:8081/api/v1/employers/candidatures/' + employerId,
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
                        data1Ref.current = data
                        console.log(data)
                        if (select === 'all' ){
                        setListeCandidatureFiltered(data);
                        }
                        setlisteCandidature(data);
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
                        data2Ref.current = data
                    })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (entrevues !== undefined) {
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
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:8081/api/v1/employers/candidature/accept/${matricule}/${status}`,
                {
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
        if (selectedEntrevueToModify !== null) {
            return modalConvoquerModifierEntrevue()
        }
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

    const updateEntrevue = async(entrevue) =>{
        console.log(entrevue)
        console.log(selectedEntrevueToModify)

        try{
            entrevue["id"] = selectedEntrevueToModify.id
            entrevue["statusVuPasVuG"] = selectedEntrevueToModify.statusVuPasVuG
            entrevue["statusVuPasVuS"] = selectedEntrevueToModify.statusVuPasVuS
            entrevue["status"] = "EnAttente"
            const token = localStorage.getItem('token');

            console.log(JSON.stringify(entrevue))

            fetch(
            "http://localhost:8081/api/v1/stages/entrevues/update",
             {
                    method: 'PUT',
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
                 () => {
                    setShowConvoquer(false)
                    setSelectedCandidatureId(null)
                    window.location.reload()
                }
            )
        }
        catch (e) {
            console.log(e)
        }

        setSelectedEntrevueToModify(null)
    }

    function modalConvoquerModifierEntrevue() {
        return (
            <div style={OVERLAY_STYLE} className='w-100' >
                <div style={{backgroundColor: 'transparent' , width: '100%'}} className='d-flex align-items-center justify-content-center h-100 w-100 '>
                    <div className=" opacity-100 bg-body p-3 fullscr">
                        <CreateEntrevueForm onAdd={updateEntrevue} setShow={setModal}/>
                    </div>
                </div>
            </div>
        )
    }

    function handleSelect(e){
        console.log(e)
        console.log(e.target.value)
        setSelect(e.target.value);
        if (e.target.value === 'all'){
            setListeCandidatureFiltered(listeCandidature)
        }
        if (e.target.value === 'Accepted'){
            setListeCandidatureFiltered(listeCandidature.filter(candidature => candidature.status === e.target.value))
        }
        if (e.target.value === 'Refused'){
            setListeCandidatureFiltered(listeCandidature.filter(candidature => candidature.status === e.target.value))
        }
        if (e.target.value === 'Interview'){
            let arr = []
            for (let x = 0; x < listeCandidature.length; x++){
                if  (listeCandidature[x].status === e.target.value){
                    arr.push(listeCandidature[x]);
                }
            }
            console.log(arr)
            console.log(entrevues)
            setListeCandidatureFiltered(arr)
            setRefreshed(true)
        }
        if (e.target.value === 'In_review'){
            setListeCandidatureFiltered(listeCandidature.filter(candidature => candidature.status === e.target.value))
        }
        if (e.target.value === 'Refused_student'){
            let entr = entrevues.filter(candidature => candidature.status === 'Refusee'); 
            let entrevuesNew = entrevues;
            for (let i=0; i< entr.length; i++){
                let index = entrevuesNew.findIndex(x => x.id === entr[i].id)
                console.log(index)
                let candidature = listeCandidature.filter(x => x.cvStudent.matricule === entr[i].student.matricule && x.offreStage.id === entr[i].offreStage.id)[0];
                entr[i]["cvStudent"] = candidature.cvStudent;
                entr[i]["lettreMotivation"] = candidature.lettreMotivation; 
                
                entrevuesNew[index]["status"] = "Refusee"
                entr[i]["status"] = candidature.status;
            }
            console.log(entrevuesNew) 
            setEntrevues(entrevuesNew)      
            setListeCandidatureFiltered(entr)
            console.log(entr)
            console.log(entrevues) 
        } 

        if (e.target.value === 'need-action'){
            setListeCandidatureFiltered(listeCandidature.filter(candidature => candidature.status === 'In_review' || candidature.status === 'Interview'  ))
        }
        setReload(!reload)
    }

    return (
        <div>
            <NavBarEmployeur/>
            <div className='mt-5'>
                <div className='rootInfo font'>
                    <div className='divFormInfo'>
                        <h1 className='text-center text-dark'>LISTE D'ÉTUDIANTS POSTULÉS</h1>
                        <div className="text-center"
                             style={{display: "flex", flexDirection: "row", width: "500px"}}>
                            <h5 style={{width: "40%", justifyContent: "center", display: "flex",
                                alignItems: "center"}}>Filtrer par:</h5>
                            <select
                                style={{width: "50%"}} 
                                className="form-control d-inline"
                                value={select}
                                onChange={handleSelect}
                                disabled= {selectDisabled}
                            >
                                <option value="all">Tous</option>
                                <option value="Accepted">Embauché(es)</option>
                                <option value="need-action">En attente</option>
                                <option value="Refused">Refusé(es)</option>
                                <option value="Interview">Convoqué(es)</option>
                                <option value="In_review">Non Convoqué(es) </option>
                                <option value="Refused_student">Entrevue refusé par étudiant(e)</option>
                            </select>
                        </div>
                        {showConvoquer && <ModalConvoquerCreateEntrevue />}
                        {listeCandidatureFiltered.length > 0 && refreshed ?
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
                                {listeCandidatureFiltered.length > 0 && refreshed &&
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
                                                : <td data-label="LETTRE DE MOTIVATION" className='headerElement h4 px-0'>
                                                    <button title="Lettre de motivation" style={{height : "58px", width: '105px' }} className='btn btn-primary disabled'
                                                            onClick={()=> handleMontrerLettre(candidature)}> <p className='h6'>Lettre de motivation</p>
                                                    </button>
                                                </td>
                                            }
                                            { finFetch === true &&
                                                <ButtonConvoquer matricule={candidature.student.matricule} offre={candidature}
                                                                 entrevues={entrevues} setModal={setModal} candidatureId={candidature.id} entrevueToModify={setSelectedEntrevueToModify}/>
                                            }
                                            <td data-label="Statut ÉTUDIANT" scope="row" className='headerElement breakWord h6 pe-3'>
                                                {candidature.status === "In_review" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faClock} /> <span className='h6'><h6>En attente</h6></span>
                                                    </>
                                                )}
                                                {candidature.status === "Accepted" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faCheck} /> Embauché
                                                    </>
                                                )}
                                                {candidature.status === "Refused" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faTimes} /> Refusé
                                                    </>
                                                )}
                                                {candidature.status === "Interview" && (
                                                    <>
                                                        <FontAwesomeIcon icon={faClock} /> Convoqué
                                                    </>
                                                )}
                                            </td>
                                            <td data-label="ACTION" scope="row" className='headerElement breakWord h6 pe-3' aria-label='veto'>
                                                {candidature.status === "In_review" || candidature.status === "Interview" ? (
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
                                    ))}
                                </tbody>
                            </table> :
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                AUCUNES CANDIDATURES À AFFICHER
                            </div>
                        }
                        {openModal && listeCandidatureFiltered.length > 0 &&
                            <Modal fichier={student.cvStudent.file_cv} fileName={student.cvStudent.fileName} onClose={handleMontrerCv} />
                        }
                        {openModalLettre && listeCandidatureFiltered.length > 0 &&
                            <Modal fichier={student.lettreMotivation} fileName={student.fileName} onClose={handleMontrerLettre} />
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
                        <div className='d-flex justify-content-end mt-5'>
                            <button className='btn btn-dark p-2 ' onClick={handleRetour}>RETOUR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
