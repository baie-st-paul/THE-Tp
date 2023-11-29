import React, { useEffect, useRef, useState } from "react";

const EvaluationMilieuStageForm = ({ gestionnaire, contrat, onSubmit }) => {
    const initialState = {
        nomEntreprise: contrat.candidatureDTO.employer.companyName,
        personneContact: contrat.candidatureDTO.employer.firstName + ", " + contrat.candidatureDTO.employer.lastName,
        adresse: "",
        ville: "",
        codePostal: "",
        telephone: "",
        telecopieur: "",

        nomStagiaire: contrat.candidatureDTO.student.firstName + ", " + contrat.candidatureDTO.student.lastName,
        dateDebut: "",
        dateFin: "",
        stage: "",

        tachesConformes: "",
        mesuresAccueil: "",
        tempsConsacreSuffisant: "",
        nbHeuresPremierMois: "",
        nbHeuresDeuxiemeMois: "",
        nbHeuresTroisiemeMois: "",
        environnementRespecteNormes: "",
        climatEstAgreable: "",
        accessibleParTransportEnCommun: "",
        communicationFaciliteDeroulement: "",
        salaireInteressant: "",
        equipementFourniEstAdequat: "",
        volumeDeTravailEstAcceptable: "",
        commentaires: "",

        nbStage: "",
        nbStagiaires: "",
        desireAcueillirMemeStagiaire: "",
        offreQuartsVariables: "",
        premierQuart: "",
        deuxiemeQuart: "",
        troisiemeQuart: "",

        signatureGestionnaire: "",
        dateSignatureGestionnaire: "",
    }

    const [formData, setFormData] = useState(initialState)
    const [signatureGestionnaire, setSignatureGestionnaire] = useState('');
    const token = localStorage.getItem('token');
    const matriculeGes = localStorage.getItem("gestionnaireMatricule")


    const choixStagiaires = ["un stagiaire", "deux stagiaires", "plus de trois"]
    const options = ["Totalement en accord", "Plutôt en accord", "Plutôt en désaccord", "Totalement en désaccord", "N/A"];

    const adresseRef = useRef(null)
    const villeRef = useRef(null)
    const codePostalRef = useRef(null)
    const telephoneRef = useRef(null)
    const dateDebutRef = useRef(null)
    const dateFinRef = useRef(null)
    const numeroStageRef = useRef(null)
    const tachesConformesRef = useRef(null)
    const mesuresAccueilRef = useRef(null)
    const tempsConsacreSuffisantRef = useRef(null)
    const nbHeuresPremierMoisRef = useRef(null)
    const nbHeuresDeuxiemeMoisRef = useRef(null)
    const nbHeuresTroisiemeMoisRef = useRef(null)
    const environnementRespecteNormesRef = useRef(null)
    const climatEstAgreableRef = useRef(null)
    const accessibleParTransportEnCommunRef = useRef(null)
    const communicationFaciliteDeroulementRef = useRef(null)
    const equipementFourniEstAdequatRef = useRef(null)
    const volumeDeTravailEstAcceptableRef = useRef(null)
    const commentairesRef = useRef(null)
    const nbStagesRef = useRef(null)
    const nbStagiairesRef = useRef(null)
    const desireAcueillirMemeStagiaireRef = useRef(null)
    const offreQuartsVariablesRef = useRef(null)
    const premierQuartRef = useRef(null)
    const deuxiemeQuartRef = useRef(null)
    const troisiemeQuartRef = useRef(null)
    const signatureGestionnaireRef = useRef(null)
    const dateSignatureGestionnaireRef = useRef(null);

    useEffect(() => {
        handleSignatureGestionnaire()
    }, []);

    let base64Signature;

    const handleSignatureGestionnaire = async () => {
        try {
            console.log(matriculeGes)
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/gestionnaire/get/${matriculeGes}`,
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
                setSignatureGestionnaire(null)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                            setSignatureGestionnaire(data);
                            base64Signature = data.imageLink;
                            console.log("signatureGestionnaire", data)

                            if (base64Signature && !base64Signature.startsWith('data:image')) {
                                setSignatureGestionnaire(`data:image/png;base64,${base64Signature}`);

                            } else {
                                setSignatureGestionnaire(base64Signature);
                                setFormData(prevState => ({
                                    ...prevState,
                                    signatureGestionnaire: base64Signature
                                }));
                            }
                        } else {
                            console.log("Failed to fetch data");
                            setSignatureGestionnaire(null)
                        }
                    } catch (e) {
                        console.log(e)
                        setSignatureGestionnaire(null)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setSignatureGestionnaire(null)
        }
        console.log(signatureGestionnaire)
    };

    const renderChoices = (name) => (
        <select name={name} value={formData[name]} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {options.map(choice => (
                <option key={choice} value={choice}>{choice}</option>
            ))}
        </select>
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let annuler = false;

        if (formData.adresse.trim() === '') {
            adresseRef.current.innerHTML = " * Veuillez entrer l'adresse de l'entreprise"
        }

        if (formData.ville.trim() === '') {
            villeRef.current.innerHTML = " * Veuillez entrer la ville de l'entreprise"
        }

        if (formData.codePostal.trim() === '') {
            codePostalRef.current.innerHTML = " * Veuillez entrer le code postal de l'entreprise"
        }

        if (formData.telephone.trim() === '') {
            telephoneRef.current.innerHTML = " * Veuillez entrer le numéro de téléphone"
        }

        if (formData.numeroStage.trim() === '') {
            numeroStageRef.current.innerHTML = " * Veuillez indiquer de quel stage il s'agit"
        }

        if (formData.tachesConformes.trim() === '') {
            tachesConformesRef.current.innerHTML = " * Veuillez choisir une option"
        }

        if (formData.mesuresAccueil.trim() === '') {
            mesuresAccueilRef.current.innerHTML = " * Veuillez choisir une option"
        }

        if (formData.tempsConsacreSuffisant.trim() === '') {
            tempsConsacreSuffisantRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.nbHeuresPremierMois.trim() === '') {
            nbHeuresPremierMoisRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.nbHeuresDeuxiemeMois.trim() === '') {
            nbHeuresDeuxiemeMoisRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.nbHeuresTroisiemeMois.trim() === '') {
            nbHeuresTroisiemeMoisRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.environnementRespecteNormes.trim() === '') {
            environnementRespecteNormesRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.climatEstAgreable.trim() === '') {
            climatEstAgreableRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.accessibleParTransportEnCommun.trim() === '') {
            accessibleParTransportEnCommunRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.communicationFaciliteDeroulement.trim() === '') {
            communicationFaciliteDeroulementRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.equipementFourniEstAdequat.trim() === '') {
            equipementFourniEstAdequatRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.volumeDeTravailEstAcceptable.trim() === '') {
            volumeDeTravailEstAcceptableRef.current.innerHTML = " * Veuillez choisir une option";
        }

        if (formData.dateDebut.trim() === '') {
            dateDebutRef.current.innerHTML = " * Veuillez entrer la date de début *"
            annuler = true;
        } else {
            dateDebutRef.current.innerHTML = ""
        }

        if (formData.dateFin.trim() === '') {
            dateFinRef.current.innerHTML = " * Veuillez entrer la date de fin *"
            annuler = true;
        } else {
            dateFinRef.current.innerHTML = ""
        }

        if (formData.dateSignatureGestionnaire.trim() === '') {
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

    const renderTableRow = (question, label) => (
        <tr key={question}>
            <td>{label}</td>
            <td><input type="radio" name={question} value="Totalement en accord" onChange={() => handleChange(question, 'Totalement en accord')} /></td>
            <td><input type="radio" name={question} value="Plutôt en accord" onChange={() => handleChange(question, 'Plutôt en accord')} /></td>
            <td><input type="radio" name={question} value="Plutôt désaccord" onChange={() => handleChange(question, 'Plutôt désaccord')} /></td>
            <td><input type="radio" name={question} value="Totalement désaccord" onChange={() => handleChange(question, 'Totalement désaccord')} /></td>
            <td><input type="radio" name={question} value="Impossible de se prononcer" onChange={() => handleChange(question, 'Impossible de se prononcer')} /></td>
        </tr>
    );

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                    <div>
                        <h2 className="formTitle">ÉVALUATION DU MILIEU DU STAGE</h2>
                        <p className="subTitle">Identification de l'entreprise</p><br />

                        <div className="participant">
                            <h6 className='participant'>Nom de l'entreprise: {contrat.candidatureDTO.employer.companyName}</h6>
                            <h6 className='participant'>Contact de la personne: {contrat.candidatureDTO.employer.firstName + " " + contrat.candidatureDTO.employer.lastName}</h6>
                            <h6 className="participant">Adresse: {formData.adresse}</h6>
                            <h6 className="participant">Ville: {formData.ville}</h6>
                            <h6 className="participant">Code postal: {formData.codePostal}</h6>
                            <h6 className="participant">Téléphone: {contrat.candidatureDTO.employer.phoneNumber}</h6>
                            <h6 className="participant">Télécopieur: {formData.telecopieur}</h6>
                        </div><br />

                        <p className="subTitle">Identification du stagiaire</p><br />
                        <div className="participant">
                            <h6>Nom du stagiaire: {contrat.candidatureDTO.student.firstName + " " + contrat.candidatureDTO.student.lastName}</h6>
                            <h6>Date du stage: {contrat.candidatureDTO.offreStage.dateDebut + " au " + contrat.candidatureDTO.offreStage.dateFin}</h6>
                            <h6>Stage (encercler):
                                <label>
                                    <input
                                        type="radio"
                                        value="1"
                                        checked={formData.stage === "1"}
                                        onChange={formData.stage = 1}
                                    />
                                    1
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="2"
                                        checked={formData.stage === "2"}
                                        onChange={formData.stage = 2}
                                    />
                                    2
                                </label>
                            </h6>
                        </div>

                        <p className="subTitle">Évaluation</p><br />
                    </div>

                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Questions</th>
                                    <th>Totalement en accord</th>
                                    <th>Plutôt en accord</th>
                                    <th>Plutôt désaccord</th>
                                    <th>Totalement désaccord</th>
                                    <th>Impossible de se prononcer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRow('tachesConformes', 'Les tâches confiées au stagiaire sont conformes aux tâches annoncées dans l’entente de stage.')}
                                {renderTableRow('mesuresAccueil', 'Des mesures d’accueil facilitent l’intégration du nouveau stagiaire.')}
                                {renderTableRow('tempsConsacreSuffisant', 'Le temps réel consacré à l\'encadrement du stagiaire est suffisant')}
                                <tr>
                                    <td>Préciser le nombre d'heures par semaine</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nbHeuresPremiereSemaine"
                                            value={formData.nbHeuresPremierMois}
                                            onChange={(e) => handleChange('nbHeuresPremiereSemaine', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nbHeuresDeuxiemeSemaine"
                                            value={formData.nbHeuresDeuxiemeMois}
                                            onChange={(e) => handleChange('nbHeuresDeuxiemeSemaine', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nbHeuresTroisiemeSemaine"
                                            value={formData.nbHeuresTroisiemeMois}
                                            onChange={(e) => handleChange('nbHeuresTroisiemeSemaine', e.target.value)}
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                                {renderTableRow('environnementRespecteNormes', "L'environnement respecte les normes du travail")}
                                {renderTableRow('climatEstAgreable', "Le climat du travail est agréable")}
                                {renderTableRow('accessibleParTransportEnCommun', "Le milieu de stage est accessible par transport en commun")}
                                {renderTableRow('communicationFaciliteDeroulement', "La communication avec le superviseur de stage facilite le déroulement")}
                                {renderTableRow('salaireInteressant', "Le salaire offert est intéressant pour le stagiaire")}
                                {renderTableRow('equipementFourniAdequat', "L'équipement fourni est adéquat pour réaliser les tâches confiées")}
                                {renderTableRow('volumeDeTravailAcceptable', "Le volume de travail est acceptable")}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4">
                        <div>
                            <h4>SIGNATURES</h4>
                            <p><b>Le gestionnaire de stage</b></p>
                            <div className="row">
                                <div className="row">
                                    {
                                        formData.signatureGestionnaire && (
                                            <div>
                                                <img src={formData.signatureGestionnaire} alt="signatureGestionnaire" style={{ width: '50px', height: '20px' }} />
                                            </div>
                                        )
                                    }

                                    <div>
                                        <label htmlFor="dateSignatureGestionnaire" style={{ display: "block", textAlign: "left" }}>Date signature:</label>
                                        <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                            style={{ color: 'grey', fontSize: '20px' }}
                                            id="dateSignatureGestionnaire"
                                            name="dateSignatureGestionnaire"
                                            value={formData.dateSignatureGestionnaire}
                                            onChange={handleChange} />
                                        <span ref={dateSignatureGestionnaireRef} className="error-message"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p>Prénom, Nom: {formData.nomGestionnaire}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            <button type="button" onClick={handleSubmit} className='buttonStyle'>Soumettre le Contrat</button>

            <h5 className="red-italic ">
                il est recommandé de télécharger le formulaire complété avant de le soumettre
            </h5>
            </form>
                    </div >
            </div >
            )
}

export default EvaluationMilieuStageForm
