import React from 'react'
import { useState , useEffect } from "react";
import ReactModal from "react-modal";
import NavBarStudent from "../../NavBar/student/NavBarStudent";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EtudiantMesContrats({contratsTest}) {
    const [contrats, setContrats] = useState(contratsTest)
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [contrat, setContrat] = useState(null)
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

    useEffect(() => {
        fetchContrats()
    } , [])

    const fetchContrats = async () => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        try {
            fetch(
                `http://localhost:8081/api/v1/student/student-contracts/${savedMatricule}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization : 'Bearer ' + localStorage.getItem('token')
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    console.log(res.status)
                    try {
                        if (res.ok) {
                            const data = await res.json();
                            setContrats(data)
                            console.log("contrats",data)
                        } else {
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
                `http://localhost:8081/api/v1/student/signerContrat`,
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

    const handleAcceptConfirmation = () => {
        setIsConfirmationModalOpen(false);
        console.log("Accepted")
        let arrTmp = [...contrats]
        let idx = arrTmp.findIndex((x) => x.id === contrat.id)
        arrTmp[idx].statutEtudiant = 'Signer'
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
            <NavBarStudent/>
            <div style={{margin: "30px"}}>
                <div>
                    <div>
                        <h1 className="display-5 text-center"
                        style={{marginBottom: "100px"}}>Mes Contrats</h1>
                    </div>
                    {contrats !== undefined && contrats.length > 0  ?
                        <div>
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contrats.length > 0  && contrats
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
                                                    {
                                                        contrat.statutEtudiant === 'Pas_Signer' ?
                                                            <StyledTableCell align="center" data-label="Signé par étudiant">
                                                                <button className='m-0 text-center btn btn-primary' onClick={() =>
                                                                    openConfirmationModal('accept', contrat)}><span className='h6'>Signer le contrat</span></button></StyledTableCell>
                                                            :
                                                            <StyledTableCell align="center" data-label="Signé par étudiant">Signé</StyledTableCell>
                                                    }
                                                    <StyledTableCell align="center" data-label="Signé par employeur">
                                                        {contrat.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" data-label="Signé par gestionnaire">{contrat.statutGestionnaire === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        : <div>AUCUN CONTRAT A AFFICHER</div> }
                </div>
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
