import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import 'react-datepicker/dist/react-datepicker.css';
import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";
import {pdf} from "@react-pdf/renderer";
import GenereContratPDF from "./genereContrat/GenereContratPDF";
import GenereContratForm from "./genereContrat/GenereContratForm";
import Modal from "../Vetocv/Modal";
import FetchsGestionnaire from "../../NavBar/gestionnaire/FetchsGestionnaire";
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

const ListContratsGestionnaire = ({contratsTest}) => {
    const [contrats, setContrats] = useState(contratsTest)
    const [filtre, setFiltre] = useState('')
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [contrat, setContrat] = useState(null)

    const [showGenerateContrat, setShowGenerateContrat] = useState(false)
    const [generateContrats, setGenerateContrats] = useState([])
    const [openModalGenerateContrat, setOpenModalGenerateContrat] = useState(false)

    const token = localStorage.getItem('token');
    const [gestionnaire, setGestionnaire] = useState(null);

    useEffect(() => {
        setGestionnaire(FetchsGestionnaire.fetchGestionnaire(token, gestionnaire, setGestionnaire))
        fetchContrats()
    }, []);

    const fetchContrats = async () => {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/getContratsDetails`,
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
                            console.log(data)
                            setContrats(data)
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
        try{
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/signContract`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                    body : JSON.stringify(contrat)
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            await res.json();
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

    const handleAcceptConfirmation = () => {
        setIsConfirmationModalOpen(false);
        console.log("Accepted")
        let arrTmp = [...contrats]
        let idx = arrTmp.findIndex((x) => x.id === contrat.id)
        arrTmp[idx].statutGestionnaire = 'Signer'
        setContrats(arrTmp)
        handleSignerContrat(contrat)
    };

    const openConfirmationModal = (type, contrat1) => {
        setIsConfirmationModalOpen(true);
        setContrat(contrat1)
        setConfirmationType(type)

    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleGenerateContratSubmit = async (contrat, contratGenerateData) => {
        const token = localStorage.getItem('token');
        console.log(contrat)
        try {
            pdf(<GenereContratPDF formData={contratGenerateData}/>).toBlob().then(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'contrat-genere.pdf');

                fetch(
                    `http://localhost:8081/api/v1/gestionnaire/upload_contrat/${contrat.id}`,
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
                                setGenerateContrats([...generateContrats, data])
                                console.log("contratGenere",data)
                                setShowGenerateContrat(false)
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
            if (generateContrats !== undefined){
                setGenerateContrats(generateContrats)
            }
        }
    }

    function ModalGenerateContrat() {
        return (
            <div>
                <div style={OVERLAY_STYLE}>
                    <div style={MODAL_STYLES}>
                        <div className="titleCloseBtn">
                            <button onClick={() => setShowGenerateContrat(false)}>X</button>
                        </div>
                        <div className="body">
                            <GenereContratForm
                                gestionnaire={gestionnaire}
                                contrat={contrat}
                                onSubmit={handleGenerateContratSubmit}
                            />
                        </div>
                        <div className="footer">
                            <button id="cancelBtn" onClick={() => setShowGenerateContrat(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function handleMontrerGenerateContrat(contrat) {
        setOpenModalGenerateContrat(!openModalGenerateContrat)
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
            <NavBarGestionnaire/>
            {showGenerateContrat && <ModalGenerateContrat/>}
            <div style={{margin: "30px"}}>
                <div>
                    <div className="col-lg-12">
                        <h1 className="display-5 text-center m-2 mb-5">Liste de tous les contrats</h1>
                    </div>
                    {contrats.length > 0  ?
                        <div>
                            <div className='text-center mt-3 mb-2'>
                                <label ><h4>Trouver par matricule &nbsp; </h4></label>
                                <input data-testid="input" onChange={ (event)=>
                                    setFiltre(event.target.value)}></input>
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
                                            <StyledTableCell align="center">Contrat PDF</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contrats.length > 0  && contrats.filter(contrat => contrat?.candidatureDTO?.student?.matricule?.includes(filtre))
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
                                                    <StyledTableCell align="center" data-label="Signé par employeur">
                                                        {contrat.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'}
                                                    </StyledTableCell>
                                                    {
                                                        contrat.statutGestionnaire === 'Pas_Signer' ?
                                                            <StyledTableCell align="center" data-label="Signé par gestionnaire">
                                                                <button className='m-0 text-center btn btn-primary' onClick={() =>
                                                                    openConfirmationModal('accept', contrat)}><span className='h6'>Signer le contrat</span></button></StyledTableCell>
                                                            :
                                                            <StyledTableCell align="center" data-label="Signé par gestionnaire">Signé</StyledTableCell>
                                                    }
                                                    {
                                                        contrat.statutEtudiant === 'Signer' &&
                                                        contrat.statutGestionnaire === 'Signer' &&
                                                        contrat.statutEmployeur === 'Signer' ?
                                                            <StyledTableCell align="center" data-label="Contrat PDF">
                                                                {contrat.generateContrat !== null ? (
                                                                    <button className='m-0 text-center btn btn-secondary'
                                                                            onClick={() => handleMontrerGenerateContrat(contrat)}>
                                                                        <span className='h7'>Voir Contrat</span>
                                                                    </button>
                                                                ) : (
                                                                    <button className='m-0 text-center btn btn-primary' onClick={() => {
                                                                        setShowGenerateContrat(!showGenerateContrat)
                                                                        setContrat(contrat)
                                                                        console.log("contratGenerate", contrat)
                                                                    }}>
                                                                        <span className='h7'>Générer le contrat</span>
                                                                    </button>
                                                                )}
                                                            </StyledTableCell> :
                                                            <StyledTableCell align="center" data-label="Contrat PDF">
                                                                <p>En attente des signatures</p>
                                                            </StyledTableCell>
                                                    }
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        : <div>AUCUN CONTRAT À AFFICHER</div> }
                </div>
                {openModalGenerateContrat && contrats.length > 0 &&
                    <Modal fichier={contrat.generateContrat.content} fileName="PDF du contrat" onClose={handleMontrerGenerateContrat} />
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
                            <p>Êtes-vous sûr de vouloir signer le contrat ?</p>
                            <button title="ConfirmAccept" className="btn btn-success" onClick={handleAcceptConfirmation}>
                                Oui
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Êtes-vous sûr de vouloir refuser  ?</p>
                            <button title="ConfirmRefuse" className="btn btn-danger" >
                                Oui
                            </button>
                        </>
                    )}
                    <button title="ConfirmNon" className="btn btn-secondary" onClick={closeConfirmationModal}>
                        Non
                    </button>
                </ReactModal>
            </div>
        </div>
    )
}

export default ListContratsGestionnaire
