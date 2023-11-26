import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";

const ListContratsGestionnaire = ({contratsTest}) => {
    const [contrats, setContrats] = useState(contratsTest)
    const [filtre, setFiltre] = useState('')
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [contrat, setContrat] = useState(null)
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [selectedDateDebut, setSelectedDateDebut] = useState(null);
    const [selectedDateFin, setSelectedDateFin] = useState(null);
    const [startWorkHours, setStartWorkHours] = useState('09:00');
    const [endWorkHours, setEndWorkHours] = useState('17:00');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchContrats()
    }, []);

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

    const handleDateChangeDebut = (date) => {
        setSelectedDateDebut(date);
    };

    const handleDateChangeFin = (date) => {
        setSelectedDateFin(date);
    };

    const openConfirmationModal = (type, contrat1) => {
        setIsConfirmationModalOpen(true);
        setContrat(contrat1)
        setConfirmationType(type)

    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleGeneratePdf = () => {
        setIsPdfModalOpen(true);
    };

    const closePdfModal = () => {
        setIsPdfModalOpen(false);
    };

    const handleStartWorkHoursChange = (value) => {
        setStartWorkHours(value);
    };

    const handleEndWorkHoursChange = (value) => {
        setEndWorkHours(value);
    };

   


    return (
        <div>
            <NavBarGestionnaire/>
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
                                    <th className="header-cell h5" >Evaluation</th>
                                </tr>
                                </thead>
                                <tbody className='w-100'>
                                {contrats.length > 0  && contrats.filter(contrat => contrat?.candidatureDTO?.student?.matricule?.includes(filtre))
                                    .map((contrat, index) => (
                                        <tr key={index} className="table-row align-middle">
                                            <td data-label="Nom" className="fw-semibold">{contrat.candidatureDTO.student.lastName + ', ' + contrat.candidatureDTO.student.firstName}</td>
                                            <td data-label="Matricule" className="fw-semibold">{contrat.candidatureDTO.student.matricule}</td>
                                            <td data-label="Nom de compagnie" className="fw-semibold">{contrat.candidatureDTO.employer.companyName}</td>
                                            <td data-label="Poste" className="fw-semibold">{contrat.candidatureDTO.offreStage.titre}</td>
                                            <td data-label="Signé par étudiant" className="fw-semibold">{contrat.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                            <td data-label="Signé par employeur" className="fw-semibold">{contrat.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                            {
                                                contrat.statutGestionnaire === 'Pas_Signer' ?
                                                    <td data-label="Signé par Gestionnaire"><button className='m-0 text-center btn btn-primary' onClick={()=>openConfirmationModal('accept',contrat)}><span className='h6'>Signer le contrat</span></button></td>
                                                    :
                                                    <td data-label="Signé par Gestionnaire" className="fw-semibold">Signé</td>
                                            }
                                            {contrat.statutEtudiant === 'Pas_Signer' && contrat.statutEmployeur === 'Pas_Signer'?
                                                <td data-label="Contrat PDF"><button className='m-0 text-center btn btn-primary' onClick={() => handleGeneratePdf()}><span className='h7'>Générer Contrat</span></button></td>
                                                :
                                                <td data-label="Contrat PDF"><button className='m-0 text-center btn btn-primary'><span className='h7'>Voir  Contrat</span></button></td>
                                            }
                                          

                                           
                                            <ReactModal
                                                isOpen={isPdfModalOpen}
                                                onRequestClose={closePdfModal}
                                                ariaHideApp={false}
                                                contentLabel="PDF Generation Modal"
                                            >
                                                <form id="pdfForm">
                                                    <h2 className="mb-4">ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</h2>
                                                    <p>Dans le cadre de la formule ATE, les parties citées ci-dessous :</p>

                                                    <div className="mb-3">
                                                        <label className="form-label">Le gestionnaire de stage:</label>
                                                        <input type="text" className="form-control" id="nomGestionnaire" name="nomGestionnaire"/>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label  className="form-label">L’employeur:</label>
                                                        <h2 className="text-capitalize">{contrat.candidatureDTO.employer.companyName}</h2>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label  className="form-label">L’étudiant(e):</label>
                                                        <h2 className="text-capitalize">{contrat.candidatureDTO.student.lastName + ', ' + contrat.candidatureDTO.student.firstName}</h2>
                                                    </div>
                                                    <hr/>
                                                    <h2 className="mt-4">Conviennent des conditions de stage suivantes</h2>
                                                    <div className="mt-4">
                                                        <div>
                                                            <h4>ENDROIT DU STAGE</h4>
                                                            <label className="form-label">Adresse:</label>
                                                            <input type="text" className="form-control" id="adresseStage" name="adresseStage"/>
                                                        </div>
                                                        <div>
                                                            <h4>DUREE DU STAGE</h4>
                                                            <div>
                                                                <h6>Date de début de stage:</h6>
                                                                <DatePicker
                                                                    selected={selectedDateDebut}
                                                                    onChange={handleDateChangeDebut}
                                                                    className="form-control"
                                                                    dateFormat="MM/dd/yyyy"
                                                                />
                                                                <h6>Date de fin de stage:</h6>
                                                                <DatePicker
                                                                    selected={selectedDateFin}
                                                                    onChange={handleDateChangeFin}
                                                                    className="form-control"
                                                                    dateFormat="MM/dd/yyyy"
                                                                />
                                                                <h6>Nombre total de semaines :</h6>
                                                                <input
                                                                    type="number"
                                                                    className="form-control w-25"
                                                                    placeholder="Entrez un chiffre"
                                                                />
                                                                <h4>HORAIRE DE TRAVAIL</h4>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                        <TimePicker
                                                                            label="De:"
                                                                            value={startWorkHours}
                                                                            onChange={handleStartWorkHoursChange}
                                                                            format="HH:mm"
                                                                        />
                                                                        <TimePicker
                                                                            label="À:"
                                                                            value={endWorkHours}
                                                                            onChange={handleEndWorkHoursChange}
                                                                            format="HH:mm"
                                                                        />
                                                                    </DemoContainer>
                                                                </LocalizationProvider>
                                                                <h6 className="mt-3">Nombre total d’heures par semaine :</h6>
                                                                <input
                                                                    type="number"
                                                                    className="form-control w-25"
                                                                    placeholder="Entrez un chiffre"
                                                                />
                                                                <h4 className="mt-3">Salaire (Taux horaire):</h4>
                                                                <input
                                                                    type="number"
                                                                    className="form-control w-50"
                                                                    placeholder="Entrez un salaire taux horaire"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <hr/>
                                                    <h3 className="mt-5">SIGNATURES</h3>

                                                    <div className="mb-3">
                                                        <label className="form-label">L’étudiant(e) :</label>
                                                        <input type="text" className="form-control" id="signatureEtudiant" name="signatureEtudiant"/>
                                                        <label className="form-label">Date :</label>
                                                        <input type="text" className="form-control" id="dateSignatureEtudiant" name="dateSignatureEtudiant"/>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">L’employeur :</label>
                                                        <input type="text" className="form-control" id="signatureEmployeur" name="signatureEmployeur"/>
                                                        <label className="form-label">Date :</label>
                                                        <input type="text" className="form-control" id="dateSignatureEmployeur" name="dateSignatureEmployeur"/>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Le gestionnaire de stage :</label>
                                                        <input type="text" className="form-control" id="signatureGestionnaire" name="signatureGestionnaire"/>
                                                        <label className="form-label">Date :</label>
                                                        <input type="text" className="form-control" id="dateSignatureGestionnaire" name="dateSignatureGestionnaire"/>
                                                    </div>
                                                    <button className="btn btn-primary" >Generate PDF</button>
                                                    <button className="btn btn-primary" onClick={closePdfModal}>
                                                        Annuler
                                                    </button>
                                                </form>
                                            </ReactModal>
                                        </tr>
                                        
                                    ))
                                }
                                </tbody>
                            </table>
                   
                        </div>
                        : <div>AUCUN CONTRAT À AFFICHER</div> }
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

export default ListContratsGestionnaire
