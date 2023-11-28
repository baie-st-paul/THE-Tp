import React from 'react'
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import NavBarEmployeur from "../../NavBar/employer/NavBarEmployeur";
import { useNavigate } from "react-router-dom";
import EvaluationForm from "./evalution_stagiaire/EvaluationForm"
import Modal from "../../GestionnaireHomePage/Vetocv/Modal";
import EvaluationPDF from "./evalution_stagiaire/EvaluationPDF";
import {pdf} from "@react-pdf/renderer";
import RapportPDF from "./rapportHeures/RapportPDF";
import RapportForm from "./rapportHeures/RapportForm";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function EmployeurMesContrats({ contratsTest }) {
    const [contrats, setContrats] = useState(contratsTest)
    const [filtre, setFiltre] = useState('')
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [contrat, setContrat] = useState(null)

    const [showEvaluation, setShowEvaluation] = useState(false)
    const [evaluations, setEvaluations] = useState([])
    const [openModalEvaluation, setOpenModalEvaluation] = useState(false);

    const [showRapportHeure, setShowRapportHeure] = useState(false)
    const [rapportsHeure, setRapportsHeure] = useState([])
    const [openModalRapportHeure, setOpenModalRapportHeure] = useState(false);

    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        fetchContrats()
    }, [])

    const fetchContrats = async () => {
        try {
            console.log(employerId)
            fetch(
                `http://localhost:8081/api/v1/employers/employer-contracts/${employerId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json()
                            setContrats(data)
                            console.log(data)
                        }
                        else {
                            const data = await res.json();
                            console.log('Erreur', res.status, data);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setContrats(contratsTest)
            console.log(contrats)
        }
    }

    const handleSignerContrat = async (contrat) => {
        console.log(contrat)
        const token = localStorage.getItem('token');
        try {
            fetch(
                `http://localhost:8081/api/v1/employers/signerContrat`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                    body: JSON.stringify(contrat)
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                        } else {
                            console.error("Failed to fetch data");
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

    const handleAcceptConfirmation = (action) => {
        setIsConfirmationModalOpen(false);
        console.log("Accepted")
        let arrTmp = [...contrats]
        let idx = arrTmp.findIndex((x) => x.id === contrat.id)
        if (action === "generate") {
            navigate('/rapportHeures/' + contrat.id);
          } else {
            arrTmp[idx].statutEmployeur = 'Signer';
            handleSignerContrat(contrat);
          }
        setContrats(arrTmp)
    };

    const openConfirmationModal = (type, contrat1) => {
        setIsConfirmationModalOpen(true);
        setContrat(contrat1)
        setConfirmationType(type)

    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleEvaluationSubmit = async (contrat, evaluationData) => {
        const token = localStorage.getItem('token');
        console.log(contrat)
        try {
            pdf(<EvaluationPDF evaluationData={evaluationData} />).toBlob().then(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'evaluation.pdf');

                fetch(
                    `http://localhost:8081/api/v1/employers/upload_evaluation/${contrat.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        withCredentials: true,
                        body: formData,
                    }
                ).catch((err) => {
                    console.log(err)
                }).then(
                    (res) => {
                        try{
                            console.log(res.status)
                            if (res.ok) {
                                const data= res.json()
                                console.log("PDF envoyé avec succès");
                                setEvaluations([...evaluations, data])
                                console.log("evaluation",data)
                                setShowEvaluation(false)
                            } else {
                                console.log("Erreur lors de l'envoi du PDF");
                                throw new Error("Erreur lors de l'envoi");
                            }
                        } catch (e) {
                            console.log(e)
                        }
                        window.location.reload()
                    }
                )
            }).catch(error => {
                console.error("Erreur lors de la génération du PDF:", error);
            });
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (evaluations !== undefined){
                setEvaluations(evaluations)
            }
        }
    }

    function ModalEvaluation() {
        return (
            <div>
                <div style={OVERLAY_STYLE}>
                    <div style={MODAL_STYLES}>
                        <div className="titleCloseBtn">
                            <button onClick={() => setShowEvaluation(false)}>X</button>
                        </div>
                        <div className="body">
                            <EvaluationForm
                                contrat={contrat}
                                onSubmit={handleEvaluationSubmit}
                            />
                        </div>
                        <div className="footer">
                            <button id="cancelBtn" onClick={() => setShowEvaluation(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function handleMontrerEvaluation(contrat) {
        setOpenModalEvaluation(!openModalEvaluation)
        setContrat(contrat)
    }

    const handleRapportHeureSubmit = async (contrat, rapportData) => {
        const token = localStorage.getItem('token');
        console.log(contrat)
        try {
            pdf(<RapportPDF formData={rapportData} />).toBlob().then(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'rapport-heures.pdf');

                fetch(
                    `http://localhost:8081/api/v1/employers/contracts/${contrat.id}/rapport_heures`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        withCredentials: true,
                        body: formData,
                    }
                ).catch((err) => {
                    console.log(err)
                }).then(
                    (res) => {
                        try{
                            console.log(res.status)
                            if (res.ok) {
                                const data= res.json()
                                console.log("PDF envoyé avec succès");
                                setRapportsHeure([...rapportsHeure, data])
                                console.log("rapport",data)
                                setShowRapportHeure(false)
                            } else {
                                console.log("Erreur lors de l'envoi du PDF");
                                throw new Error("Erreur lors de l'envoi");
                            }
                        } catch (e) {
                            console.log(e)
                        }
                        window.location.reload()
                    }
                )
            }).catch(error => {
                console.error("Erreur lors de la génération du PDF:", error);
            });
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (rapportsHeure !== undefined){
                setRapportsHeure(rapportsHeure)
            }
        }
    }

    function ModalRapportHeure() {
        return (
            <div>
                <div style={OVERLAY_STYLE}>
                    <div style={MODAL_STYLES}>
                        <div className="titleCloseBtn">
                            <button onClick={() => setShowRapportHeure(false)}>X</button>
                        </div>
                        <div className="body">
                            <RapportForm
                                contrat={contrat}
                                onSubmit={handleRapportHeureSubmit}
                            />
                        </div>
                        <div className="footer">
                            <button id="cancelBtn" onClick={() => setShowRapportHeure(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function handleMontrerRapportHeure(contrat) {
        setOpenModalRapportHeure(!openModalRapportHeure)
        setContrat(contrat)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            <NavBarEmployeur/>
            {showEvaluation && <ModalEvaluation/>}
            {showRapportHeure && <ModalRapportHeure/>}
            <div style={{margin: "30px"}}>
                <div>
                    <div className="col-lg-12">
                        <h1 className="display-5 text-center m-2 mb-5">Mes Contrats</h1>
                    </div>
                    {contrats.length > 0 ?
                        <div>
                            <div className='text-center mt-3 mb-2'>
                                <label ><h4>Trouver par matricule &nbsp; </h4></label>
                                <input data-testid="input" onChange={(event) => setFiltre(event.target.value)}></input>
                            </div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Prénom, Nom</StyledTableCell>
                                            <StyledTableCell align="center">Matricule</StyledTableCell>
                                            <StyledTableCell align="center">Compagnie</StyledTableCell>
                                            <StyledTableCell align="center">Poste</StyledTableCell>
                                            <StyledTableCell align="center">Signé par étudiant</StyledTableCell>
                                            <StyledTableCell align="center">Signé par gestionnaire</StyledTableCell>
                                            <StyledTableCell align="center">Signé par employeur</StyledTableCell>
                                            <StyledTableCell align="center">Rapport des heures</StyledTableCell>
                                            <StyledTableCell align="center">Évaluation</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contrats.length > 0 && contrats.filter(contrat => contrat?.candidatureDTO?.student?.matricule?.includes(filtre))
                                            .map((contrat, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center" data-label="Prénom, Nom">
                                                        {contrat.candidatureDTO.student.lastName + ', ' + contrat.candidatureDTO.student.firstName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" data-label="Matricule">
                                                        {contrat.candidatureDTO.student.matricule}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" data-label="Compagnie">
                                                        {contrat.candidatureDTO.employer.companyName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" data-label="Poste">
                                                        {contrat.candidatureDTO.offreStage.titre}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" data-label="Signé par étudiant">
                                                        {contrat.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'}
                                                    </StyledTableCell>
                                                    {
                                                        contrat.statutEmployeur === 'Pas_Signer' ?
                                                            <StyledTableCell align="center" data-label="Signé par employeur"><button className='m-0 text-center btn btn-primary' onClick={() => openConfirmationModal('accept', contrat)}><span className='h6'>Signer le contrat</span></button></StyledTableCell>
                                                            :
                                                            <StyledTableCell align="center" data-label="Signé par employeur">Signé</StyledTableCell>
                                                    }
                                                    <StyledTableCell align="center" data-label="Signé par gestionnaire">{contrat.statutGestionnaire === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </StyledTableCell>
                                                    {
                                                        contrat.statutEtudiant === 'Signer' &&
                                                        contrat.statutGestionnaire === 'Signer' &&
                                                        contrat.statutEmployeur === 'Signer' ?
                                                            <StyledTableCell align="center" data-label="Rapport des heures">
                                                                {contrat.rapportFile !== null ? (
                                                                    <button className='m-0 text-center btn btn-secondary'
                                                                            onClick={() => handleMontrerRapportHeure(contrat)}>
                                                                        <span className='h7'>Voir Rapport</span>
                                                                    </button>
                                                                ) : (
                                                                    <button className='m-0 text-center btn btn-primary' onClick={() => {
                                                                        setShowRapportHeure(!showRapportHeure)
                                                                        setContrat(contrat)
                                                                        console.log("contratRapport", contrat)
                                                                    }}>
                                                                        <span className='h7'>Générer Rapport</span>
                                                                    </button>
                                                                )}
                                                            </StyledTableCell> :
                                                            <StyledTableCell align="center" data-label="Rapport des heures">
                                                                <p>En attente des signatures</p>
                                                            </StyledTableCell>
                                                    }
                                                    {
                                                        contrat.statutEtudiant === 'Signer' &&
                                                        contrat.statutGestionnaire === 'Signer' &&
                                                        contrat.statutEmployeur === 'Signer' ?
                                                            <StyledTableCell align="center" data-label="Évaluation">
                                                                {contrat.evaluationPDF !== null ? (
                                                                    <button className='m-0 text-center btn btn-secondary'
                                                                            onClick={() => handleMontrerEvaluation(contrat)}>
                                                                        <span className='h7'>Voir Évaluation</span>
                                                                    </button>
                                                                ) : (
                                                                    <button className='m-0 text-center btn btn-primary' onClick={() => {
                                                                        setShowEvaluation(!showEvaluation)
                                                                        setContrat(contrat)
                                                                        console.log("contratEvaluation", contrat)
                                                                    }}>
                                                                        <span className='h7'>Évaluer</span>
                                                                    </button>
                                                                )}
                                                            </StyledTableCell> :
                                                            <StyledTableCell align="center" data-label="Évaluation">
                                                                <p>En attente des signatures</p>
                                                            </StyledTableCell>
                                                    }
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        : <div>AUCUN CONTRAT À AFFICHER</div>}
                </div>
                {openModalEvaluation && contrats.length > 0 &&
                    <Modal fichier={contrat.evaluationPDF.content} fileName="PDF de l'évaluation" onClose={handleMontrerEvaluation} />
                }
                {openModalRapportHeure && contrats.length > 0 &&
                    <Modal fichier={contrat.rapportFile.data} fileName="PDF du rapport" onClose={handleMontrerRapportHeure} />
                }
                <ReactModal
                    isOpen={isConfirmationModalOpen}
                    onRequestClose={closeConfirmationModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Confirmation Modal"
                >
                    <h2 title="Confirmation modal">Confirmation</h2>
                    {
                        confirmationType === "accept" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir signer le contrat ?</p>
                                <button title="ConfirmAccept" className="btn btn-success" onClick={() => handleAcceptConfirmation(confirmationType)}>
                                    Oui
                                </button>
                            </>
                        ) : confirmationType === "refuse" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir refuser ?</p>
                                <button title="ConfirmRefuse" className="btn btn-danger">
                                    Oui
                                </button>
                            </>
                        ) : confirmationType === "generate" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir générer le rapport? Vous ne pouvez le faire qu'une seule fois.</p>
                                <button title="ConfirmGenerate" className="btn btn-success" onClick={() => handleAcceptConfirmation(confirmationType)}>
                                    Oui
                                </button>
                            </>
                        ) : null
                    }
                    <button title="ConfirmNon" className="btn btn-secondary" onClick={closeConfirmationModal}>
                        Non
                    </button>
                </ReactModal>
            </div>
        </div>
    )
}

