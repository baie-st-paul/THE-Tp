import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import 'react-datepicker/dist/react-datepicker.css';
import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";
import {pdf} from "@react-pdf/renderer";
import GenereContratPDF from "./genereContrat/GenereContratPDF";
import GenereContratForm from "./genereContrat/GenereContratForm";
import Modal from "../Vetocv/Modal";
import FetchsGestionnaire from "../../NavBar/gestionnaire/FetchsGestionnaire";

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
                        //window.location.reload()
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

    return (
        <div>
            <NavBarGestionnaire/>
            {showGenerateContrat && <ModalGenerateContrat/>}
            <div id="render" className="container w-100">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="display-4 text-center">Liste de tous les contrats</h1>
                    </div>
                    {contrats.length > 0  ?
                        <div className="table-responsive table-container">
                            <div className='text-start mt-3 mb-2'> <label ><h4>Trouver par matricule &nbsp; </h4></label>
                                <input data-testid="input" onChange={ (event)=> setFiltre(event.target.value)}></input>
                            </div>
                            <table className="table w-100 text-start">
                                <thead>
                                <tr>
                                    <th className="header-cell h5">Nom, Prénom</th>
                                    <th className="header-cell h5">Matricule</th>
                                    <th className="header-cell h5">Nom de compagnie</th>
                                    <th className='header-cell h5'>Poste</th>
                                    <th className="header-cell h5">Signé par étudiant</th>
                                    <th className="header-cell h5">Signé par employeur</th>
                                    <th className="header-cell h5" >Signé par gestionnaire</th>
                                    <th className="header-cell h5" >Contrat PDF</th>
                                </tr>
                                </thead>
                                <tbody className='w-100'>
                                {contrats.length > 0  && contrats.filter(contrat => contrat?.candidatureDTO?.student?.matricule?.includes(filtre))
                                    .map((contrat, index) => (
                                        <tr key={index} className="table-row align-middle">
                                            <td data-label="Nom, Prénom" className="fw-semibold">{contrat.candidatureDTO.student.lastName + ', ' + contrat.candidatureDTO.student.firstName}</td>
                                            <td data-label="Matricule" className="fw-semibold">{contrat.candidatureDTO.student.matricule}</td>
                                            <td data-label="Nom de compagnie" className="fw-semibold">{contrat.candidatureDTO.employer.companyName}</td>
                                            <td data-label="Poste" className="fw-semibold">{contrat.candidatureDTO.offreStage.titre}</td>
                                            <td data-label="Signé par étudiant" className="fw-semibold">{contrat.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                            <td data-label="Signé par employeur" className="fw-semibold">{contrat.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                            {
                                                contrat.statutGestionnaire === 'Pas_Signer' ?
                                                    <td data-label="Signé par Gestionnaire">
                                                        <button className='m-0 text-center btn btn-primary'
                                                                onClick={()=> openConfirmationModal('accept', contrat)}>
                                                        <span className='h6'>Signer le contrat</span></button></td>
                                                    :
                                                    <td data-label="Signé par Gestionnaire" className="fw-semibold">Signé</td>
                                            }
                                            {
                                                contrat.statutEtudiant === 'Signer' &&
                                                contrat.statutGestionnaire === 'Signer' &&
                                                contrat.statutEmployeur === 'Signer' ?
                                                    <td data-label="Contrat PDF">
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
                                                    </td> :
                                                    <td data-label="Contrat PDF">
                                                        <p>En attente des signatures</p>
                                                    </td>
                                            }
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                   
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
