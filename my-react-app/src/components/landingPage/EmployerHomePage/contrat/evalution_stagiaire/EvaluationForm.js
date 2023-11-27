import React, {useRef, useState} from 'react';
import "./EvaluationForm.css";
import EvaluationPDF from './EvaluationPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FaqAccordion from './FaqAccordion';
import PhoneInput from "react-phone-number-input";

const EvaluationForm = ({contrat, onSubmit}) => {
    const initialState = {
        nomEleve: '',
        programmeEtudes: '',
        nomEntreprise: '',
        nomSuperviseur: '',
        fonctionSuperviseur: '',
        telephoneSuperviseur: '',
        productivity: '',
        qualityOfWork: '',
        interpersonalSkills: '',
        personalAbilities: '',
        comments: '',
        // Productivité
        planifierEtOrganiser: '',
        comprendreDirectives: '',
        maintenirRythme: '',
        etablirPriorites: '',
        respecterEcheanciers: '',
        commentairesProductivite: '',
    
        // Qualité du travail
        respecterMandats: '',
        attentionDetails: '',
        verifierTravail: '',
        perfectionner: '',
        analyseProblemes: '',
        commentairesQualite: '',
    
        // Relations interpersonnelles
        etablirContacts: '',
        travailEquipe: '',
        adapterCulture: '',
        accepterCritiques: '',
        respecterGens: '',
        ecouteActive: '',
        commentairesRelations: '',
    
        // Habiletés personnelles
        interetMotivation: '',
        exprimerIdees: '',
        initiative: '',
        travaillerSecuritaire: '',
        sensResponsabilites: '',
        ponctuelAssidu: '',
        commentairesHabiletes: '',
    
        // appréciation globale du stagiaire
        appreciationGlobale: '',
        discussionStagiaire: '',
        heuresEncadrement: '',
        accueilProchainStage: '',
        commentaireAppreciation: '',
        accord: '',

        //Acceuil prochain stage
        accueilPourProchainStage: '',
        commentaireAccueilProchain: '',
        formationTechniqueSuffisante: '',
        nomSignataire: '',
        fonctionSignataire: '',
        signature: '',
        dateSignature: ''
    };

    const [evaluationData, setEvaluationData] = useState(initialState);
    const options = ["Totalement en accord", "Plutôt en accord", "Plutôt en désaccord", "Totalement en désaccord", "N/A"] ;
    const choices = ["Oui", "Non"];
    const programmeEtude = ["Techniques de l’informatique", "Techniques de l’architecture"];
    const [signature, setSignature] = useState('');
    const employerId = localStorage.getItem('employer_id');
    const token = localStorage.getItem('token');

    
    const nomEleveRef = useRef(null);
    const programmeEtudesRef = useRef(null);
    const nomEntrepriseRef = useRef(null);
    const nomSuperviseurRef = useRef(null);
    const fonctionSuperviseurRef = useRef(null);
    const telephoneSuperviseurRef = useRef(null);
    const planifierEtOrganiserRef = useRef(null);
    const comprendreDirectivesRef = useRef(null);
    const maintenirRythmeRef = useRef(null);
    const etablirPrioritesRef = useRef(null);
    const respecterEcheanciersRef = useRef(null);
   // const commentairesProductiviteRef = useRef(null);
    const respecterMandatsRef = useRef(null);
    const attentionDetailsRef = useRef(null);
    const verifierTravailRef = useRef(null);
    const perfectionnerRef = useRef(null);
    const analyseProblemesRef = useRef(null);
   // const commentairesQualiteRef = useRef(null);
    const etablirContactsRef = useRef(null);
    const travailEquipeRef = useRef(null);
    const adapterCultureRef = useRef(null);
    const accepterCritiquesRef = useRef(null);
    const respecterGensRef = useRef(null);
    const ecouteActiveRef = useRef(null);
    //const commentairesRelationsRef = useRef(null);
    const interetMotivationRef = useRef(null);
    const exprimerIdeesRef = useRef(null);
    const initiativeRef = useRef(null);
    const travaillerSecuritaireRef = useRef(null);
    const sensResponsabilitesRef = useRef(null);
    const ponctuelAssiduRef = useRef(null);
   // const commentairesHabiletesRef = useRef(null);
    const appreciationGlobaleRef = useRef(null);
    const discussionStagiaireRef = useRef(null);
    const heuresEncadrementRef = useRef(null);
    const accueilProchainStageRef = useRef(null);
    //const commentaireAppreciationRef = useRef(null);
    const accordRef = useRef(null);
    const accueilPourProchainStageRef = useRef(null);
   // const formationTechniqueSuffisanteRef = useRef(null);
    const nomSignataireRef = useRef(null);
    const fonctionSignataireRef = useRef(null);
    const signatureRef = useRef(null);
    const dateSignatureRef = useRef(null);
    const habileteNeRepondPasRef = useRef(null);
   
    const handleSignature = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/stages/signatures/employer/get/${employerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });
    
            if (!response.ok) {
                throw new Error('Erreur de réseau ou réponse non-OK du serveur');
            }
    
            const data = await response.json();
            const base64Signature = data.imageLink;
    
            if (base64Signature && !base64Signature.startsWith('data:image')) {
                setSignature(`data:image/png;base64,${base64Signature}`);
            } else {
                setSignature(base64Signature);
                setEvaluationData(prevState => ({
                    ...prevState,
                    signature: base64Signature
                }));
            }
    
        } catch (error) {
            console.error('Erreur lors de la récupération de la signature:', error);
            setSignature(null);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEvaluationData(prevState =>({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let annuler = false;

        if (evaluationData.nomEleve.trim() === '') {
            annuler = true;
            nomEleveRef.current.innerHTML = "* Veuillez entrer le nom de l'élève *";
        } else {
            nomEleveRef.current.innerHTML = "";
        }

        if (evaluationData.programmeEtudes.trim() === '') {
            programmeEtudesRef.current.innerHTML = "* Veuillez entrer le programme d'études *";
            annuler = true;
        } else {
            programmeEtudesRef.current.innerHTML = "";
        }

        if (evaluationData.nomEntreprise.trim() === '') {
            nomEntrepriseRef.current.innerHTML = "* Veuillez entrer le nom de l'entreprise *";
            annuler = true;
        } else {
            nomEntrepriseRef.current.innerHTML = "";
        }

        if (evaluationData.nomSuperviseur.trim() === '') {
            nomSuperviseurRef.current.innerHTML = "* Veuillez entrer le nom du superviseur *";
            annuler = true;
        } else {
            nomSuperviseurRef.current.innerHTML = "";
        }

        if (evaluationData.fonctionSuperviseur.trim() === '') {
            fonctionSuperviseurRef.current.innerHTML = "* Veuillez entrer la fonction du superviseur *";
            annuler = true;
        } else {
            fonctionSuperviseurRef.current.innerHTML = "";
        }

        if (evaluationData.telephoneSuperviseur.trim() === '') {
            telephoneSuperviseurRef.current.innerHTML = "* Veuillez entrer le numéro de téléphone du superviseur *";
            annuler = true;
        } else {
            telephoneSuperviseurRef.current.innerHTML = "";
        }

        if (evaluationData.planifierEtOrganiser.trim() === '') {
            planifierEtOrganiserRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            planifierEtOrganiserRef.current.innerHTML = "";
        }

       /*  if (evaluationData.comprendreDirectives.trim() === '') {
            comprendreDirectivesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            comprendreDirectivesRef.current.innerHTML = "";
        }
 */
        if (evaluationData.maintenirRythme.trim() === '') {
            maintenirRythmeRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            maintenirRythmeRef.current.innerHTML = "";
        }

        if (evaluationData.etablirPriorites.trim() === '') {
            etablirPrioritesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            etablirPrioritesRef.current.innerHTML = "";
        }

        if (evaluationData.respecterEcheanciers.trim() === '') {
            respecterEcheanciersRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            respecterEcheanciersRef.current.innerHTML = "";
        }

       /*  if (evaluationData.commentairesProductivite.trim() === '') {
            commentairesProductiviteRef.current.innerHTML = "* Veuillez entrer un commentaire *";
            annuler = true;
        } else {
            commentairesProductiviteRef.current.innerHTML = "";
        } */

        if (evaluationData.respecterMandats.trim() === '') {
            respecterMandatsRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            respecterMandatsRef.current.innerHTML = "";
        }

        if (evaluationData.attentionDetails.trim() === '') {
            attentionDetailsRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            attentionDetailsRef.current.innerHTML = "";
        }

        if (evaluationData.verifierTravail.trim() === '') {
            verifierTravailRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            verifierTravailRef.current.innerHTML = "";
        }

        if (evaluationData.perfectionner.trim() === '') {
            perfectionnerRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            perfectionnerRef.current.innerHTML = "";
        }

        if (evaluationData.analyseProblemes.trim() === '') {
            analyseProblemesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            analyseProblemesRef.current.innerHTML = "";
        }
        /* 
        if (evaluationData.commentairesQualite.trim() === '') {
            commentairesQualiteRef.current.innerHTML = "* Veuillez entrer un commentaire *";
            annuler = true;
        } else {
            commentairesQualiteRef.current.innerHTML = "";
        } */

        if (evaluationData.etablirContacts.trim() === '') {
            etablirContactsRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            etablirContactsRef.current.innerHTML = "";
        }

        if (evaluationData.travailEquipe.trim() === '') {
            travailEquipeRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            travailEquipeRef.current.innerHTML = "";
        }

        if (evaluationData.adapterCulture.trim() === '') {
            adapterCultureRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            adapterCultureRef.current.innerHTML = "";
        }

        if (evaluationData.accepterCritiques.trim() === '') {
            accepterCritiquesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            accepterCritiquesRef.current.innerHTML = "";
        }

        if (evaluationData.respecterGens.trim() === '') {
            respecterGensRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            respecterGensRef.current.innerHTML = "";
        }

        if (evaluationData.ecouteActive.trim() === '') {
            ecouteActiveRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            ecouteActiveRef.current.innerHTML = "";
        }

        /* if (evaluationData.commentairesRelations.trim() === '') {
            commentairesRelationsRef.current.innerHTML = "* Veuillez entrer un commentaire *";
            annuler = true;
        } else {
            commentairesRelationsRef.current.innerHTML = "";
        } */

        if (evaluationData.interetMotivation.trim() === '') {
            interetMotivationRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            interetMotivationRef.current.innerHTML = "";
        }

        if (evaluationData.exprimerIdees.trim() === '') {
            exprimerIdeesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            exprimerIdeesRef.current.innerHTML = "";
        }

        if (evaluationData.initiative.trim() === '') {
            initiativeRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            initiativeRef.current.innerHTML = "";
        }

        if (evaluationData.travaillerSecuritaire.trim() === '') {
            travaillerSecuritaireRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            travaillerSecuritaireRef.current.innerHTML = "";
        }

        if (evaluationData.sensResponsabilites.trim() === '') {
            sensResponsabilitesRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            sensResponsabilitesRef.current.innerHTML = "";
        }

        if (evaluationData.ponctuelAssidu.trim() === '') {
            ponctuelAssiduRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            ponctuelAssiduRef.current.innerHTML = "";
        }

        /* 
        if (evaluationData.commentairesHabiletes.trim() === '') {
            commentairesHabiletesRef.current.innerHTML = "* Veuillez entrer un commentaire *";
            annuler = true;
        } else {
            commentairesHabiletesRef.current.innerHTML = "";
        } */

        if (evaluationData.discussionStagiaire.trim() === '') {
            discussionStagiaireRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            discussionStagiaireRef.current.innerHTML = "";
        }

        if (evaluationData.heuresEncadrement.trim() === '') {
            heuresEncadrementRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            heuresEncadrementRef.current.innerHTML = "";
        }

        if (evaluationData.accueilProchainStage.trim() === '') {
            accueilProchainStageRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            accueilProchainStageRef.current.innerHTML = "";
        }

       /*  if (evaluationData.commentaireAppreciation.trim() === '') {
            commentaireAppreciationRef.current.innerHTML = "* Veuillez entrer un commentaire *";
            annuler = true;
        } else {
            commentaireAppreciationRef.current.innerHTML = "";
        } */

        if (evaluationData.accord.trim() === '') {
            accordRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            accordRef.current.innerHTML = "";
        }

        if (evaluationData.accueilPourProchainStage.trim() === '') {
            accueilPourProchainStageRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            accueilPourProchainStageRef.current.innerHTML = "";
        }

       /*  if (evaluationData.formationTechniqueSuffisante.trim() === '') {
            formationTechniqueSuffisanteRef.current.innerHTML = "* Veuillez choisir une option *";
            annuler = true;
        } else {
            formationTechniqueSuffisanteRef.current.innerHTML = "";
        } */

        if (evaluationData.nomSignataire.trim() === '') {
            nomSignataireRef.current.innerHTML = "* Veuillez entrer le nom du signataire *";
            annuler = true;
        } else {
            nomSignataireRef.current.innerHTML = "";
        }

        if (evaluationData.fonctionSignataire.trim() === '') {
            fonctionSignataireRef.current.innerHTML = "* Veuillez entrer la fonction du signataire *";
            annuler = true;
        } else {
            fonctionSignataireRef.current.innerHTML = "";
        }

        if (evaluationData.signature.trim() === '') {
            signatureRef.current.innerHTML = "* Veuillez apposer la signature *";
            annuler = true;
        } else {
            signatureRef.current.innerHTML = "";
        }

        if (evaluationData.dateSignature.trim() === '') {
            dateSignatureRef.current.innerHTML = "* Veuillez entrer la date de signature *";
            annuler = true;
        } else {
            dateSignatureRef.current.innerHTML = "";
        }

        if (annuler === true) {
        } else {
            console.log(contrat)
            onSubmit(contrat, evaluationData);
        }
    }

    const renderDropdown = (name) => (
        <select name={name} value={evaluationData[name]} onChange={handleChange} className='dropdownStyle'>
            <option value="">Sélectionner</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );

    const renderChoices = (name) => (
        <select name={name} value={evaluationData[name]} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {choices.map(choice => (
                <option key={choice} value={choice}>{choice}</option>
            ))} 
        </select>
    );

    const renderProgrammeEtude = (name) => (
        <select id="planifierOrganiser" name={name} value={evaluationData[name]} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {programmeEtude.map(programme => (
                <option key={programme} value={programme}>{programme}</option>
            ))}
        </select>
    );

   

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5><br />
                    <h1><strong>FICHE D’ÉVALUATION DU STAGIAIRE</strong></h1>
                    <div className='sectionStyle'>
                        <div className='questionStyle'>
                            <label htmlFor="eleve" className='questionStyle label'>Nom de l’élève :</label>
                            <input id="eleve" className= 'questionStyle input' type="text" name="nomEleve" value={evaluationData.nomEleve} onChange={handleChange} />
                        <span ref={nomEleveRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="planifierOrganiser" className='questionStyle label'>Programme d'étude :</label>
                            {renderProgrammeEtude("programmeEtudes")}
                            <span ref={programmeEtudesRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="nomEntreprise" className='questionStyle label'>Nom de l’entreprise :</label>
                            <input id="nomEntreprise" className= 'questionStyle input' type="text" name="nomEntreprise" value={evaluationData.nomEntreprise} onChange={handleChange} />
                            <span ref={nomEntrepriseRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="nomSuperviseur" className='questionStyle label'>Nom du superviseur :</label>
                            <input id="nomSuperviseur" className= 'questionStyle input' type="text" name="nomSuperviseur" value={evaluationData.nomSuperviseur} onChange={handleChange} />
                            <span ref={nomSuperviseurRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="fonctionSuperviseur" className='questionStyle label'>Fonction du superviseur :</label>
                            <input id="fonctionSuperviseur" className= 'questionStyle input' type="text" name="fonctionSuperviseur" value={evaluationData.fonctionSuperviseur} onChange={handleChange} />
                            <span ref={fonctionSuperviseurRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="telephoneSuperviseur" className='questionStyle label'>Téléphone :</label>
                            <PhoneInput
                                id="telephoneSuperviseur"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="CA"
                                value={evaluationData.telephoneSuperviseur}
                                onChange={value => setEvaluationData({ ...evaluationData, telephoneSuperviseur: value })}
                            />
                            <span ref={telephoneSuperviseurRef} className="error-message"></span>
                        </div>

                    </div>

                    <div className='sectionStyle'>
                        <strong>1. PRODUCTIVITÉ</strong><br />
                        Capacité d’optimiser son rendement au travail
                    </div>

                    <div className='sectionStyle'>
                        <p>Le stagiaire a été en mesure de :</p>
                        <div className='questionStyle'>
                            <label htmlFor="planifierOrganiser">a) Planifier et organiser son travail de façon efficace :</label>
                            {renderDropdown("planifierEtOrganiser")}
                            <span ref={planifierEtOrganiserRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="comprendreDirectives">b) Comprendre rapidement les directives relatives à son travail :</label>
                            {renderDropdown("comprendreDirectives")}
                            <span ref={comprendreDirectivesRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="maintenirRythme">c) Maintenir un rythme de travail soutenu :</label>
                            {renderDropdown("maintenirRythme")}
                            <span ref={maintenirRythmeRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="etablirPriorites">d) Établir ses priorités :</label>
                            {renderDropdown("etablirPriorites")}
                            <span ref={etablirPrioritesRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="respecterEcheanciers">e) Respecter ses échéanciers :</label>
                            {renderDropdown("respecterEcheanciers")}
                            <span ref={respecterEcheanciersRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="commentairesProductivite">Commentaires :</label>
                            <textarea id="commentairesProductivite" name="commentairesProductivite" value={evaluationData.commentairesProductivite} onChange={handleChange} />
                            {/* <span ref={commentairesProductiviteRef} className="error-message"></span> */}
                        </div>
                    </div>

                    <div className='sectionStyle'>
                        <strong>2. QUALITÉ DU TRAVAIL</strong><br />
                        Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant personnellement des normes de qualité
                    </div>

                    <div className='sectionStyle'>
                        <p>Le stagiaire a été en mesure de :</p>
                        <div className='questionStyle'>
                            <label htmlFor="respecterMandats">a) Respecter les mandats qui lui ont été confiés :</label>
                            {renderDropdown("respecterMandats")}
                            <span ref={respecterMandatsRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor="attentionDetails">b) Porter attention aux détails dans la réalisation de ses tâches :</label>
                            {renderDropdown("attentionDetails")}
                            <span ref={attentionDetailsRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="verifierTravail">c) Vérifier son travail, s’assurer que rien n’a été oublié :</label>
                            {renderDropdown("verifierTravail")}
                            <span ref={verifierTravailRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="perfectionner">d) Rechercher des occasions de se perfectionner :</label>
                            {renderDropdown("perfectionner")}
                            <span ref={perfectionnerRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="analyseProblemes">e) Faire une bonne analyse des problèmes rencontrés :</label>
                            {renderDropdown("analyseProblemes")}
                            <span ref={analyseProblemesRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="commentairesQualite">Commentaires :</label>
                            <textarea id="commentairesQualite" name="commentairesQualite" value={evaluationData.commentairesQualite} onChange={handleChange} />
                            {/* <span ref={commentairesQualiteRef} className="error-message"></span> */}
                        </div>
                    </div>

                    <div className='sectionStyle'>
                        <strong>3. RELATIONS INTERPERSONNELLES</strong><br />
                        <p>Capacité à établir de bonnes relations interpersonnelles au travail</p>
                    </div>
                    <div className='sectionStyle'>
                        <p>Le stagiaire a été en mesure de :</p>
                        <div className='questionStyle'>
                            <label htmlFor="etablirContacts">a) Établir facilement des contacts avec les gens :</label>
                            {renderDropdown("etablirContacts")}
                            <span ref={etablirContactsRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="travailEquipe">b) Contribuer activement au travail d’équipe :</label>
                            {renderDropdown("travailEquipe")}
                            <span ref={travailEquipeRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="adapterCulture">c) S’adapter facilement à la culture de l’entreprise :</label>
                            {renderDropdown("adapterCulture")}
                            <span ref={adapterCultureRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="accepterCritiques">d) Accepter les critiques constructives :</label>
                            {renderDropdown("accepterCritiques")}
                            <span ref={accepterCritiquesRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="respecterGens">e) Être respectueux envers les gens :</label>
                            {renderDropdown("respecterGens")}
                            <span ref={respecterGensRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="ecouteActive">f) Faire preuve d’écoute active en essayant de comprendre le point de vue de l’autre :</label>
                            {renderDropdown("ecouteActive")}
                            <span ref={ecouteActiveRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="commentairesRelations">Commentaires :</label>
                            <textarea id="commentairesRelations" name="commentairesRelations" value={evaluationData.commentairesRelations} onChange={handleChange} />
                           {/*  <span ref={commentairesRelationsRef} className="error-message"></span> */}
                        </div>
                    </div>

                    <div className='sectionStyle'>
                        <strong>4. HABILETÉS PERSONNELLES</strong><br />
                        Capacité de faire preuve d’attitudes ou de comportements matures et responsables
                    </div>
                    <div className='sectionStyle'>
                        <p>Le stagiaire a été en mesure de :</p>
                        <div className='questionStyle'>
                            <label htmlFor="interetMotivation">a) Démontrer de l’intérêt et de la motivation au travail :</label>
                            {renderDropdown("interetMotivation")}
                            <span ref={interetMotivationRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="exprimerIdees">b) Exprimer clairement ses idées :</label>
                            {renderDropdown("exprimerIdees")}
                            <span ref={exprimerIdeesRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="initiative">c) Faire preuve d’initiative :</label>
                            {renderDropdown("initiative")}
                            <span ref={initiativeRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="travaillerSecuritaire">d) Travailler de façon sécuritaire :</label>
                            {renderDropdown("travaillerSecuritaire")}
                            <span ref={travaillerSecuritaireRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="sensResponsabilites">e) Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision :</label>
                            {renderDropdown("sensResponsabilites")}
                            <span ref={sensResponsabilitesRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="ponctuelAssidu">f) Être ponctuel et assidu à son travail :</label>
                            {renderDropdown("ponctuelAssidu")}
                            <span ref={ponctuelAssiduRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="commentairesHabiletes">Commentaires :</label>
                            <textarea id="commentairesHabiletes" name="commentairesHabiletes" value={evaluationData.commentairesHabiletes} onChange={handleChange} />
                           {/*  <span ref={commentairesHabiletesRef} className="error-message"></span> */}
                        </div>
                    </div>


                    <div className='sectionStyle'>
                        <strong>APPRECIATION GLOBALE DU STAGIAIRE</strong>
                        <p>Le stagiaire a été en mesure de :</p>
                        <div className='questionStyle'>
                            <label htmlFor="appreciationGlobale">Les habiletés démontrées dépassent de beaucoup les attentes :</label>
                            {renderDropdown("appreciationGlobale")}
                            <span ref={appreciationGlobaleRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="discussionStagiaire">Les habiletés démontrées dépassent les attentes :</label>
                            {renderDropdown("discussionStagiaire")}
                            <span ref={discussionStagiaireRef} className="error-message"></span>

                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="heuresEncadrement">Les habiletés démontrées répondent pleinement aux attentes :</label>
                            {renderDropdown("heuresEncadrement")}
                            <span ref={heuresEncadrementRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="accueilProchainStage">Les habiletés démontrées répondent partiellement aux attentes :</label>
                            {renderDropdown("accueilProchainStage")}
                            <span ref={accueilProchainStageRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="autreElement">Les habiletés démontrées ne répondent pas aux attentes :</label>
                            {renderDropdown("autreElement")}
                            <span ref={habileteNeRepondPasRef} className="error-message"></span>
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="commentaireAppreciation">PRÉCISEZ VOTRE APPRÉCIATION :</label>
                            <textarea id="commentaireAppreciation" name="commentaireAppreciation" value={evaluationData.commentaireAppreciation} onChange={handleChange} />
                           {/*  <span ref={commentaireAppreciationRef} className="error-message"></span> */}
                        </div>
                        <div className='questionStyle'>
                            <label htmlFor="accord">Cette évaluation a été discutée avec le stagiaire :</label>
                            {renderChoices("accord")}
                            <span ref={accordRef} className="error-message"></span>
                        </div>
                    </div>


                    <div className='sectionStyle'>
                        <strong>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE :</strong><br />
                        <div className='radioGroup'>
                            <label >
                                <input  type="radio" name="accueilPourProchainStage" value="Oui" onChange={handleChange}/>
                                Oui
                            </label>
                            <label >
                                <input  type="radio" name="accueilPourProchainStage" value="Non" onChange={handleChange} />
                                Non
                            </label>
                            <label >
                                <input  type="radio" name="accueilPourProchainStage" value="Peut-être" onChange={handleChange} />
                                Peut-être
                            </label><br />
                            <span ref={accueilPourProchainStageRef} className="error-message"></span>
                        </div>

                        <div className='questionStyle'>
                            <label htmlFor='formationTechniqueSuffisante'>La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage?</label><br />
                            <textarea id='formationTechniqueSuffisante' name="formationTechniqueSuffisante" value={evaluationData.formationTechniqueSuffisante} onChange={handleChange} />
                           {/*  <span ref={formationTechniqueSuffisanteRef} className="error-message"></span> */}
                        </div>

                        <div className='questionStyle'>
                            <label className='questionStyle label'>Nom (en lettres moulées):</label><br />
                            <input className= 'questionStyle input' type="text" name="nomSignataire" value={evaluationData.nomSignataire} onChange={handleChange} /><br />
                            <div><span ref={nomSignataireRef} className="error-message"></span></div>
                        </div>

                        <div className='questionStyle'>
                            <label className='questionStyle label'>Fonction :</label><br />
                            <input className= 'questionStyle input' type="text" name="fonctionSignataire" value={evaluationData.fonctionSignataire} onChange={handleChange} /><br />
                            <span ref={fonctionSignataireRef} className="error-message"></span>
                        </div>

                        <div className='signatureDateContainer'>
                            <div className='signatureContainer'>
                                <div>
                                    {signature ? (
                                        <img src={signature} alt="Signature" style={{ width: '50px', height: '20px' }} />
                                    ) : (
                                        <button type="button" onClick={handleSignature} className='signatureContainer buttonStyleSignature'>
                                            Signer
                                        </button>
                                    )}
                                    <span ref={signatureRef} className="signatureError "></span>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='questionStyle label'
                                       style={{display: "block", textAlign: "left"}}>Date :</label>
                                <input className='form-control saisie saisie-user px-3 m-0
                                questionStyle input' type='date' name="dateSignature"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       value={evaluationData.dateSignature}
                                       onChange={handleChange}/>
                                <span ref={dateSignatureRef} className="error-message"></span>
                            </div>
                        </div>



                    </div>
                    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
                        <strong>Veuillez retourner ce formulaire à :</strong><br />
                        Patrice Brodeur<br />
                        Cégep André-Laurendeau<br />
                        1111, rue Lapierre<br />
                        LASALLE (Québec)<br />
                        H8N 2J4<br />
                        <strong>Numéro de télécopieur :</strong> (514) 364-7130
                    </div>

                    <div style={{ textAlign: 'left', fontSize: 'small', marginTop: '10px' }}>
                        <strong>Nous vous remercions de votre appui !</strong><br />
                        Collège André-Laurendeau<br />
                        ALTERNANCE TRAVAIL-ÉTUDES<br />
                        2010-09-21
                    </div>
                    <button type="button" onClick={handleSubmit} className='buttonStyle'>Soumettre l'Évaluation en PDF</button>
                   

                    <PDFDownloadLink
                        document={<EvaluationPDF evaluationData={evaluationData} />}
                        fileName="evaluation-form.pdf">
                        {({ blob, url, loading, error }) =>
                            (loading ? 'Chargement du document...' : 'Télécharger en PDF')}
                    </PDFDownloadLink>

                    <FaqAccordion />
                        <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                        </h5>
                </form>
            </div>
        </div>
    );
}
export default EvaluationForm;
