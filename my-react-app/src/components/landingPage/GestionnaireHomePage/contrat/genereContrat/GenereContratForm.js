import DatePicker from "react-datepicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import React, {useRef, useState} from "react";
import FetchsGestionnaire from "../../../NavBar/gestionnaire/FetchsGestionnaire";
import FetchsEmployer from "../../../NavBar/employer/FetchsEmployer";
import FetchsStudent from "../../../NavBar/student/FetchsStudent";

const GenereContratForm = ({gestionnaire, contrat, onSubmit}) => {
    const initialState = {
        nomGestionnaire: gestionnaire.firstName + ", " + gestionnaire.lastName,
        nomEmployeur: contrat.candidatureDTO.employer.firstName + ", " + contrat.candidatureDTO.employer.lastName,
        nomEtudiant: contrat.candidatureDTO.student.firstName + ", " + contrat.candidatureDTO.student.lastName,
        offreLieuStage: "N/A",
        dateDebut: "",
        dateFin: "",
        nbTotalSemaines: "",
        horaireTravail: "",
        nbTotalHeureParSemaine: "",
        salaireHoraire: "",

        offreDescription: contrat.candidatureDTO.offreStage.description,
        commentaireCollege: "Aucun commentaire",
        commentaireEntreprise: "Aucun commentaire",
        commentaireEtudiant: "Aucun commentaire",

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

    const matriculeGes = localStorage.getItem("gestionnaireMatricule")
    console.log(matriculeGes)
    const token = localStorage.getItem('token');

    const dateDebutRef = useRef(null)
    const dateFinRef = useRef(null)

    const nbTotalSemainesRef = useRef(null)
    const horaireTravailRef = useRef(null)
    const nbTotalHeureParSemaineRef = useRef(null)
    const salaireHoraireRef = useRef(null)

    const signatureEtudiantRef = useRef(null);
    const signatureEmployeurRef = useRef(null);
    const signatureGestionnaireRef = useRef(null);

    const dateSignatureEtudiantRef = useRef(null);
    const dateSignatureEmployeurRef = useRef(null);
    const dateSignatureGestionnaireRef = useRef(null);

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

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h2 className="mb-4">ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</h2>
                    <p>Dans le cadre de la formule ATE, les parties citées ci-dessous :</p>

                    <div className="mb-3">
                        <label className="form-label">Le gestionnaire de stage:</label>
                        <input type="text" className="form-control"
                               id="nomGestionnaire" name="nomGestionnaire"/>
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
                    <button type="button" onClick={handleSubmit} className='buttonStyle'>Générer le PDF</button>
                </form>
            </div>
        </div>
    )
}

export default GenereContratForm
