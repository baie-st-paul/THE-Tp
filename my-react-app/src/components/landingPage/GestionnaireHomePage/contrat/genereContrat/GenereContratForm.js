import DatePicker from "react-datepicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import React, {useEffect, useRef, useState} from "react";
import FetchsGestionnaire from "../../../NavBar/gestionnaire/FetchsGestionnaire";
import FetchsEmployer from "../../../NavBar/employer/FetchsEmployer";
import FetchsStudent from "../../../NavBar/student/FetchsStudent";
import {PDFDownloadLink} from "@react-pdf/renderer";
import GenereContratPDF from "./GenereContratPDF";

const GenereContratForm = ({gestionnaire, contrat, onSubmit}) => {
    const initialState = {
        nomGestionnaire: gestionnaire.firstName + ", " + gestionnaire.lastName,
        nomEmployeur: contrat.candidatureDTO.employer.firstName + ", " + contrat.candidatureDTO.employer.lastName,
        nomEtudiant: contrat.candidatureDTO.student.firstName + ", " + contrat.candidatureDTO.student.lastName,
        offreLieuStage: "",

        dateDebut: "",
        dateFin: "",
        nbTotalSemaines: "",

        startWorkHours: "",
        endWorkHours: "",

        nbTotalHeureParSemaine: "",
        salaireHoraire: "",

        offreDescription: contrat.candidatureDTO.offreStage.description,
        commentaireCollege: "Aucun engagement",
        commentaireEntreprise: "Aucun engagement",
        commentaireEtudiant: "Aucun engagement",

        signatureEtudiant: "",
        dateSignatureEtudiant: "",

        signatureEmployeur: "",
        dateSignatureEmployeur: "",

        signatureGestionnaire: "",
        dateSignatureGestionnaire: "",
    }

    const [formData, setFormData] = useState(initialState)
    const [signatureEtudiant, setSignatureEtudiant] = useState('');
    const [signatureEmployeur, setSignatureEmployeur] = useState('');
    const [signatureGestionnaire, setSignatureGestionnaire] = useState('');

    const token = localStorage.getItem('token');
    const matriculeGes = localStorage.getItem("gestionnaireMatricule")
    console.log(matriculeGes)

    const offreStageLieuRef = useRef(null)
    const dateDebutRef = useRef(null)
    const dateFinRef = useRef(null)

    const nbTotalSemainesRef = useRef(null)

    const startWorkHoursRef = useRef(null)
    const endWorkHoursRef = useRef(null)

    const nbTotalHeureParSemaineRef = useRef(null)
    const salaireHoraireRef = useRef(null)

    const dateSignatureEtudiantRef = useRef(null);
    const dateSignatureEmployeurRef = useRef(null);
    const dateSignatureGestionnaireRef = useRef(null);

    useEffect(() => {
        handleSignatureEtudiant()
        handleSignatureEmployer()
        handleSignatureGestionnaire()
    }, []);

    const handleSignatureEtudiant = async () => {
        try {
            setSignatureEtudiant(FetchsStudent.fetchSignature(token, contrat.candidatureDTO.student.matricule, signatureEtudiant, setSignatureEtudiant))
            const base64Signature = signatureEtudiant.imageLink;

            if (base64Signature && !base64Signature.startsWith('data:image')) {
                setSignatureEtudiant(`data:image/png;base64,${base64Signature}`);
            } else {
                setSignatureEtudiant(base64Signature);
                setFormData(prevState => ({
                    ...prevState,
                    signatureEtudiant: base64Signature
                }));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la signature:', error);
            setSignatureEtudiant(null);
        }
    };

    const handleSignatureEmployer = async () => {
        try {
            setSignatureEmployeur(FetchsEmployer.fetchSignature(token, contrat.candidatureDTO.employer.id, signatureEmployeur, setSignatureEmployeur))
            const base64Signature = signatureEmployeur.imageLink;

            if (base64Signature && !base64Signature.startsWith('data:image')) {
                setSignatureEmployeur(`data:image/png;base64,${base64Signature}`);
            } else {
                setSignatureEmployeur(base64Signature);
                setFormData(prevState => ({
                    ...prevState,
                    signatureEmployeur: base64Signature
                }));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la signature:', error);
            setSignatureEmployeur(null);
        }
    };

    const handleSignatureGestionnaire = async () => {
        try {
            setSignatureGestionnaire(FetchsGestionnaire.fetchSignature(token, signatureGestionnaire, setSignatureGestionnaire))
            const base64Signature = signatureGestionnaire.imageLink;

            if (base64Signature && !base64Signature.startsWith('data:image')) {
                setSignatureGestionnaire(`data:image/png;base64,${base64Signature}`);
            } else {
                setSignatureGestionnaire(base64Signature);
                setFormData(prevState => ({
                    ...prevState,
                    signatureGestionnaire: base64Signature
                }));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la signature:', error);
            setSignatureGestionnaire(null);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let annuler = false;

        if(formData.offreLieuStage.trim() === ''){
            offreStageLieuRef.current.innerHTML = " * Veuillez entrer le lieu du stage *"
            annuler = true;
        } else {
            offreStageLieuRef.current.innerHTML = ""
        }

        if(formData.dateDebut.trim() === ''){
            dateDebutRef.current.innerHTML = " * Veuillez entrer la date de début *"
            annuler = true;
        } else {
            dateDebutRef.current.innerHTML = ""
        }

        if(formData.dateFin.trim() === ''){
            dateFinRef.current.innerHTML = " * Veuillez entrer la date de fin *"
            annuler = true;
        } else {
            dateFinRef.current.innerHTML = ""
        }

        if(formData.nbTotalSemaines.trim() === ''){
            nbTotalSemainesRef.current.innerHTML = " * Veuillez entrer le nombre total de semaines *"
            annuler = true;
        } else {
            nbTotalSemainesRef.current.innerHTML = ""
        }

        if(formData.startWorkHours.trim() === ''){
            startWorkHoursRef.current.innerHTML = " * Veuillez entrer debut de l'horaire de travail *"
            annuler = true;
        } else {
            startWorkHoursRef.current.innerHTML = ""
        }

        if(formData.endWorkHours.trim() === ''){
            endWorkHoursRef.current.innerHTML = " * Veuillez entrer fin de l'horaire de travail *"
            annuler = true;
        } else {
            endWorkHoursRef.current.innerHTML = ""
        }

        if(formData.nbTotalHeureParSemaine.trim() === ''){
            nbTotalHeureParSemaineRef.current.innerHTML = " * Veuillez entrer le nombre total d'heures par semaine *"
            annuler = true;
        } else {
            nbTotalHeureParSemaineRef.current.innerHTML = ""
        }

        if(formData.salaireHoraire.trim() === ''){
            salaireHoraireRef.current.innerHTML = " * Veuillez entrer le salaire horaire *"
            annuler = true;
        } else {
            salaireHoraireRef.current.innerHTML = ""
        }

        if(formData.dateSignatureEtudiant.trim() === ''){
            dateSignatureEtudiantRef.current.innerHTML = " * Veuillez entrer la date de la signature de l'étudiant *"
            annuler = true;
        } else {
            dateSignatureEtudiantRef.current.innerHTML = ""
        }

        if(formData.dateSignatureEmployeur.trim() === ''){
            dateSignatureEmployeurRef.current.innerHTML = " * Veuillez entrer la date de la signature de l'employeur *"
            annuler = true;
        } else {
            dateSignatureEmployeurRef.current.innerHTML = ""
        }

        if(formData.dateSignatureGestionnaire.trim() === ''){
            dateSignatureGestionnaireRef.current.innerHTML = " * Veuillez entrer la date de la signature du gestionnaire *"
            annuler = true;
        } else {
            dateSignatureGestionnaireRef.current.innerHTML = ""
        }

        if (annuler === true) {
        } else {
            console.log(contrat)
            onSubmit(contrat, formData)
        }
    }

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                    <div>
                        <h2 className="mb-4">ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</h2>
                        <p>Dans le cadre de la formule ATE, les parties citées ci-dessous :</p>

                        <div className="questionStyle">
                            <h6 className='questionStyle'>Le gestionnaire de stage, {formData.nomGestionnaire}</h6>
                        </div>

                        <div className="questionStyle">
                            <h6 className='questionStyle'>L'employeur, {formData.nomEmployeur}</h6>
                        </div>

                        <div className="questionStyle">
                            <h6 className='questionStyle'>L'étudiant(e), {formData.nomEtudiant}</h6>
                        </div>

                        <h6 className="mt-4">Conviennent des conditions de stage suivantes:</h6>
                    </div>

                    <div className="mt-4">
                        <div>
                            <h4>ENDROIT DU STAGE</h4>

                            <label htmlFor="adresseStage" className='questionStyle label'>Adresse:</label>
                            <input id="adresseStage" className= 'questionStyle input'
                                   type="text" name="adresseStage" value={formData.offreLieuStage}
                                   onChange={handleChange} />
                            <span ref={offreStageLieuRef} className="error-message"></span>
                        </div>

                        <div>
                            <h4>DUREE DU STAGE</h4>

                            <div className='form-group'>
                                <label htmlFor="dateDebut" style={{display: "block", textAlign: "left"}}>Date de début:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date debut"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       id="dateDebut"
                                       value={formData.dateDebut}
                                       onChange={handleChange}/>
                                <span ref={dateDebutRef} className="error-message"></span>

                                <label htmlFor="dateFin" style={{display: "block", textAlign: "left"}}>Date de fin:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date fin"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       id="dateFin"
                                       value={formData.dateFin}
                                       onChange={handleChange}/>
                                <span ref={dateFinRef} className="error-message"></span>
                            </div>

                            <div className='questionStyle'>
                                <label htmlFor="nbTotalSemaines" className='questionStyle label'>Nombre total de semaines :</label>
                                <input id="nbTotalSemaines" className= 'questionStyle input' type="number" name="nbTotalSemaines"
                                       value={formData.nbTotalSemaines} onChange={handleChange} />
                                <span ref={nbTotalSemainesRef} className="error-message"></span>
                            </div>
                        </div>

                        <div>
                            <h4>HORAIRE DE TRAVAIL</h4>

                            <div className='questionStyle'>
                                <label className='questionStyle label'>Horaire de travail :</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                        <TimePicker
                                            label="De:"
                                            value={formData.startWorkHours}
                                            onChange={handleChange}
                                            format="HH:mm"
                                        />
                                        <TimePicker
                                            label="À:"
                                            value={formData.endWorkHours}
                                            onChange={handleChange}
                                            format="HH:mm"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>

                            <div className='questionStyle'>
                                <label htmlFor="nbTotalHeureParSemaine" className='questionStyle label'>Nombre total d’heures par semaine :</label>
                                <input id="nbTotalHeureParSemaine" className='questionStyle input' type="number" name="nbTotalHeureParSemaine"
                                       value={formData.nbTotalHeureParSemaine} onChange={handleChange} />
                                <span ref={nbTotalHeureParSemaineRef} className="error-message"></span>
                            </div>
                        </div>

                        <div>
                            <h4>SALAIRE</h4>

                            <div className='questionStyle'>
                                <label htmlFor="salaireHoraire" className='questionStyle label'>Salaire (Taux horaire):</label>
                                <input id="salaireHoraire" className='questionStyle input' type="number" name="salaireHoraire"
                                       value={formData.salaireHoraire} onChange={handleChange} />
                                <span ref={salaireHoraireRef} className="error-message"></span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <h4>TACHES ET RESPONSABILITES DU STAGIAIRE</h4>

                            <div>
                                {formData.offreDescription}
                            </div>

                            <h4>RESPONSABILITES</h4>
                            <div>
                                <p>Le Collège s'engage à:</p>
                                <textarea id="commentaireCollege" name="commentaireCollege"
                                          value={formData.commentaireCollege}
                                          onChange={handleChange} />

                                <p>L'entreprise s'engage à:</p>
                                <textarea id="commentaireEntreprise" name="commentaireEntreprise"
                                          value={formData.commentaireEntreprise}
                                          onChange={handleChange} />

                                <p>L'étudiant s'engage à:</p>
                                <textarea id="commentaireEtudiant" name="commentaireEtudiant"
                                          value={formData.commentaireEtudiant}
                                          onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <h4>SIGNATURES</h4>
                            <h5><b>Les parties s'engagent à respecter cette entente de stage</b></h5>
                            <p><b>En foi de quoi les parties ont signé,</b></p>

                            <div>
                                <p><b>L'étudiant(e)</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            signatureEtudiant !== null && (
                                                <div>
                                                    <img src={signatureEtudiant} alt="signatureEtudiant" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureEtudiant" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureEtudiant"
                                                   value={formData.dateSignatureEtudiant}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureEtudiantRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomEtudiant}</p>
                                        <p>Date</p>
                                    </div>
                                </div>

                                <p><b>L'employeur</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            signatureEmployeur !== null && (
                                                <div>
                                                    <img src={signatureEmployeur} alt="signatureEmployeur" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureEmployeur" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureEmployeur"
                                                   value={formData.dateSignatureEmployeur}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureEmployeurRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomEmployeur}</p>
                                        <p>Date</p>
                                    </div>
                                </div>

                                <p><b>Le gestionnaire de stage</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            signatureGestionnaire !== null && (
                                                <div>
                                                    <img src={signatureGestionnaire} alt="signatureGestionnaire" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureGestionnaire" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureGestionnaire"
                                                   value={formData.dateSignatureGestionnaire}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureGestionnaireRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomGestionnaire}</p>
                                        <p>Date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSubmit} className='buttonStyle'>Générer le PDF</button>

                    <PDFDownloadLink
                        document={<GenereContratPDF formData={formData}/>}
                        fileName="contrat-genere.pdf">
                        {({ blob, url, loading, error }) =>
                            (loading ? 'Chargement du document...' : 'Télécharger en PDF')}
                    </PDFDownloadLink>

                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                </form>
            </div>
        </div>
    )
}

export default GenereContratForm
