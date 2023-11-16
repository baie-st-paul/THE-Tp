import React, { useState } from 'react';
import "./EvaluationForm.css";

const EvaluationForm = ({ onSubmit }) => {
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
        accueilProchainStage: '',
        formationTechniqueSuffisante: '',
        nomSignataire: '',
        fonctionSignataire: '',
        signature: '',
        dateSignature: ''
    };

    const [evaluationData, setEvaluationData] = useState(initialState);

    const options = ["Totalement en accord", "Plutôt en accord", "Plutôt en désaccord", "Totalement en désaccord", "N/A"] ;
    const choices = ["Oui", "Non"];

   


    const handleChange = (e) => {
        const {name, value} = e.target;
        setEvaluationData(prevState =>({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(evaluationData);
    };

    const renderDropdown = (name) => (
        <select name={name} value={evaluationData[name]} onChange={handleChange}>
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

    return (
        <form onSubmit={handleSubmit} className='formStyle'>
            <h1><strong>FICHE D’ÉVALUATION DU STAGIAIRE</strong></h1>
            <div className='sectionStyle'>
                <div className='questionStyle'>
                    <label>Nom de l’élève :</label>
                    <input type="text" name="nomEleve" value={evaluationData.nomEleve} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label>Programme d’études :</label>
                    <input type="text" name="programmeEtudes" value={evaluationData.programmeEtudes} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label>Nom de l’entreprise :</label>
                    <input type="text" name="nomEntreprise" value={evaluationData.nomEntreprise} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label>Nom du superviseur :</label>
                    <input type="text" name="nomSuperviseur" value={evaluationData.nomSuperviseur} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label>Fonction :</label>
                    <input type="text" name="fonctionSuperviseur" value={evaluationData.fonctionSuperviseur} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label>Téléphone :</label>
                    <input type="text" name="telephoneSuperviseur" value={evaluationData.telephoneSuperviseur} onChange={handleChange} />
                </div>
            </div>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }} className='sectionStyle'>
                <strong>1. PRODUCTIVITÉ</strong><br />
                Capacité d’optimiser son rendement au travail
            </div>
            <div style={{ border: '1px solid black', padding: '10px' }} className='sectionStyle'>
                Le stagiaire a été en mesure de :<br />
                <div>a) Planifier et organiser son travail de façon efficace: {renderDropdown("planifierOrganiser")}</div>
                <div>b) Comprendre rapidement les directives relatives à son travail: {renderDropdown("comprendreDirectives")}</div>
                <div>c) Maintenir un rythme de travail soutenu: {renderDropdown("maintenirRythme")}</div>
                <div>d) Établir ses priorités: {renderDropdown("etablirPriorites")}</div>
                <div>e) Respecter ses échéanciers: {renderDropdown("respecterEcheanciers")}</div>
                <div>Commentaires:<br /><textarea name="commentairesProductivite" value={evaluationData.commentairesProductivite} onChange={handleChange} /></div>
            </div>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                <strong>2. QUALITÉ DU TRAVAIL</strong><br />
                Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant personnellement des normes de qualité
            </div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                Le stagiaire a été en mesure de :<br />
                <div>a) respecter les mandats qui lui ont été confiés: {renderDropdown("respecterMandats")}</div>
                <div>b) porter attention aux détails dans la réalisation de ses
                    tâches: {renderDropdown("attentionDetails")}</div>
                <div>c) vérifier son travail, s’assurer que rien n’a été oublié: {renderDropdown("verifierTravail")}</div>
                <div>d) rechercher des occasions de se perfectionner: {renderDropdown("perfectionner")}</div>
                <div>e) faire une bonne analyse des problèmes rencontrés: {renderDropdown("analyseProblemes")}</div>
                <div>Commentaires:<br /><textarea name="commentairesQualite" value={evaluationData.commentairesProductivite} onChange={handleChange} /></div>
            </div>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                <strong>3. QUALITÉS DES RELATIONS INTERPERSONNELLES</strong><br />
                Capacité d’établir des interrelations harmonieuses dans son milieu de travail
            </div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                Le stagiaire a été en mesure de :<br />
                <div>a) Établir facilement des contacts avec les gens : {renderDropdown("etablirContacts")}</div>
                <div>b) Contribuer activement au travail d’équipe : {renderDropdown("travailEquipe")}</div>
                <div>c) S’adapter facilement à la culture de l’entreprise : {renderDropdown("adapterCulture")}</div>
                <div>d) Accepter les critiques constructives : {renderDropdown("accepterCritiques")}</div>
                <div>e) Être respectueux envers les gens : {renderDropdown("respecterGens")}</div>
                <div>Commentaires:<br /><textarea name="commentairesRelations" value={evaluationData.commentairesRelations} onChange={handleChange} /></div>
            </div>

            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                <strong>4. HABILETÉS PERSONNELLES</strong><br />
                Capacité de faire preuve d’attitudes ou de comportements matures et responsables
            </div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                Le stagiaire a été en mesure de :<br />
                <div>a) Démontrer de l’intérêt et de la motivation au travail : {renderDropdown("interetMotivation")}</div>
                <div>b) Exprimer clairement ses idées : {renderDropdown("exprimerIdees")}</div>
                <div>c) Faire preuve d’initiative : {renderDropdown("initiative")}</div>
                <div>d) Travailler de façon sécuritaire : {renderDropdown("travaillerSecuritaire")}</div>
                <div>e) Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision : {renderDropdown("sensResponsabilites")}</div>
                <div>f) Être ponctuel et assidu à son travail : {renderDropdown("ponctuelAssidu")}</div>
                <div>Commentaires:<br /><textarea name="commentairesHabiletes" value={evaluationData.commentairesHabiletes} onChange={handleChange} /></div>
            </div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                APPRÉCIATION GLOBALE DU STAGIAIRE<br />
                <div>Les habiletés démontrées dépassent de beaucoup les attentes : {renderDropdown("appreciationGlobale")}</div>
                <div>Les habiletés démontrées dépassent les attentes : {renderDropdown("discussionStagiaire")}</div>
                <div>Les habiletés démontrées répondent pleinement aux attentes : {renderDropdown("heuresEncadrement")}</div>
                <div>Les habiletés démontrées répondent partiellement aux attentes : {renderDropdown("accueilProchainStage")}</div>
                <div>Les habiletés démontrées ne répondent pas aux attentes : {renderDropdown("autreElement")}</div>
                <div>PRÉCISEZ VOTRE APPRÉCIATION:<br /><textarea name="commentaireAppreciation" value={evaluationData.commentairesHabiletes} onChange={handleChange} /></div>
                <div>Cette évaluation a été discutée avec le stagiaire :{renderChoices( "accord")}</div>
            </div>
            <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
            <strong>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE :</strong><br />
            <label>
                <input type="radio" name="accueilProchainStage" value="Oui" onChange={handleChange} />
                Oui
            </label>
            <label>
                <input type="radio" name="accueilProchainStage" value="Non" onChange={handleChange} />
                Non
            </label>
            <label>
                <input type="radio" name="accueilProchainStage" value="Peut-être" onChange={handleChange} />
                Peut-être
            </label><br />

            <label>La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage?</label><br />
            <div><br /><textarea name="commentairesHabiletes" value={evaluationData.commentairesHabiletes} onChange={handleChange} /></div>


            <label>Nom (en lettres moulées):</label><br />
            <input type="text" name="nomSignataire" value={evaluationData.nomSignataire} onChange={handleChange} /><br />

            <label>Fonction :</label><br />
            <input type="text" name="fonctionSignataire" value={evaluationData.fonctionSignataire} onChange={handleChange} /><br />

            <label>Signature :</label><br />
            <input type="text" name="signature" value={evaluationData.signature} onChange={handleChange} /><br />

            <label>Date :</label><br />
            <input type="date" name="dateSignature" value={evaluationData.dateSignature} onChange={handleChange} />
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
            <button type="submit">Soumettre l'Évaluation</button>
        </form>
    );
}


export default EvaluationForm;
