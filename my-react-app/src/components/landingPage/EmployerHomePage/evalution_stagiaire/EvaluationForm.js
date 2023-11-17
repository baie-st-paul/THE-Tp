import React, { useState } from 'react';
import "./EvaluationForm.css";
import EvaluationPDF from './EvaluationPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { set } from 'date-fns';


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

    return (
        <form onSubmit={handleSubmit} className='formStyle'>
            <h1><strong>FICHE D’ÉVALUATION DU STAGIAIRE</strong></h1>
            <div className='sectionStyle'>
                <div className='questionStyle'>
                    <label className='questionStyle label'>Nom de l’élève :</label>
                    <input className= 'questionStyle input' type="text" name="nomEleve" value={evaluationData.nomEleve} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label className='questionStyle label' questionStyle label>Programme d’études :</label>
                    <input className= 'questionStyle input' type="text" name="programmeEtudes" value={evaluationData.programmeEtudes} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label className='questionStyle label'>Nom de l’entreprise :</label>
                    <input className= 'questionStyle input' type="text" name="nomEntreprise" value={evaluationData.nomEntreprise} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label className='questionStyle label'>Nom du superviseur :</label>
                    <input className= 'questionStyle input' type="text" name="nomSuperviseur" value={evaluationData.nomSuperviseur} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label className='questionStyle label'>Fonction :</label>
                    <input className= 'questionStyle input' type="text" name="fonctionSuperviseur" value={evaluationData.fonctionSuperviseur} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label className='questionStyle label'>Téléphone :</label>
                    <input className= 'questionStyle input' type="text" name="telephoneSuperviseur" value={evaluationData.telephoneSuperviseur} onChange={handleChange} />
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
                    {renderDropdown("planifierOrganiser")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="comprendreDirectives">b) Comprendre rapidement les directives relatives à son travail :</label>
                    {renderDropdown("comprendreDirectives")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="maintenirRythme">c) Maintenir un rythme de travail soutenu :</label>
                    {renderDropdown("maintenirRythme")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="etablirPriorites">d) Établir ses priorités :</label>
                    {renderDropdown("etablirPriorites")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="respecterEcheanciers">e) Respecter ses échéanciers :</label>
                    {renderDropdown("respecterEcheanciers")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="commentairesProductivite">Commentaires :</label>
                    <textarea id="commentairesProductivite" name="commentairesProductivite" value={evaluationData.commentairesProductivite} onChange={handleChange} />
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
                </div>
                <div className='questionStyle'>
                    <label htmlFor="attentionDetails">b) Porter attention aux détails dans la réalisation de ses tâches :</label>
                    {renderDropdown("attentionDetails")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="verifierTravail">c) Vérifier son travail, s’assurer que rien n’a été oublié :</label>
                    {renderDropdown("verifierTravail")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="perfectionner">d) Rechercher des occasions de se perfectionner :</label>
                    {renderDropdown("perfectionner")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="analyseProblemes">e) Faire une bonne analyse des problèmes rencontrés :</label>
                    {renderDropdown("analyseProblemes")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="commentairesQualite">Commentaires :</label>
                    <textarea id="commentairesQualite" name="commentairesQualite" value={evaluationData.commentairesQualite} onChange={handleChange} />
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
                </div>
                <div className='questionStyle'>
                    <label htmlFor="exprimerIdees">b) Exprimer clairement ses idées :</label>
                    {renderDropdown("exprimerIdees")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="initiative">c) Faire preuve d’initiative :</label>
                    {renderDropdown("initiative")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="travaillerSecuritaire">d) Travailler de façon sécuritaire :</label>
                    {renderDropdown("travaillerSecuritaire")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="sensResponsabilites">e) Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision :</label>
                    {renderDropdown("sensResponsabilites")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="ponctuelAssidu">f) Être ponctuel et assidu à son travail :</label>
                    {renderDropdown("ponctuelAssidu")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="commentairesHabiletes">Commentaires :</label>
                    <textarea id="commentairesHabiletes" name="commentairesHabiletes" value={evaluationData.commentairesHabiletes} onChange={handleChange} />
                </div>
            </div>


            <div className='sectionStyle'>
                <strong>APPRECIATION GLOBALE DU STAGIAIRE</strong>
                <p>Le stagiaire a été en mesure de :</p>
                <div className='questionStyle'>
                    <label htmlFor="appreciationGlobale">Les habiletés démontrées dépassent de beaucoup les attentes :</label>
                    {renderDropdown("appreciationGlobale")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="discussionStagiaire">Les habiletés démontrées dépassent les attentes :</label>
                    {renderDropdown("discussionStagiaire")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="heuresEncadrement">Les habiletés démontrées répondent pleinement aux attentes :</label>
                    {renderDropdown("heuresEncadrement")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="accueilProchainStage">Les habiletés démontrées répondent partiellement aux attentes :</label>
                    {renderDropdown("accueilProchainStage")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="autreElement">Les habiletés démontrées ne répondent pas aux attentes :</label>
                    {renderDropdown("autreElement")}
                </div>
                <div className='questionStyle'>
                    <label htmlFor="commentaireAppreciation">PRÉCISEZ VOTRE APPRÉCIATION :</label>
                    <textarea id="commentaireAppreciation" name="commentaireAppreciation" value={evaluationData.commentaireAppreciation} onChange={handleChange} />
                </div>
                <div className='questionStyle'>
                    <label htmlFor="accord">Cette évaluation a été discutée avec le stagiaire :</label>
                    {renderChoices("accord")}
                </div>
            </div>


            <div className='sectionStyle'>
                <strong>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE :</strong><br />
                <label > 
                    <input className= 'questionStyle input[type="radio"]' type="radio" name="accueilProchainStage" value="Oui" onChange={handleChange}/>
                    Oui
                </label>
                <label >
                    <input className= 'questionStyle input[type="radio"]' type="radio" name="accueilProchainStage" value="Non" onChange={handleChange} />
                    Non
                </label>
                <label >
                    <input className= 'questionStyle input[type="radio"]' type="radio" name="accueilProchainStage" value="Peut-être" onChange={handleChange} />
                    Peut-être
                </label><br />

                <label >La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage?</label><br />
                <div className='questionStyle textarea'><br /><textarea name="commentairesHabiletes" value={evaluationData.commentairesHabiletes} onChange={handleChange} /></div>

                <label className='questionStyle label'>Nom (en lettres moulées):</label><br />
                <input className= 'questionStyle input' type="text" name="nomSignataire" value={evaluationData.nomSignataire} onChange={handleChange} /><br />

                <label className='questionStyle label'>Fonction :</label><br />
                <input className= 'questionStyle input' type="text" name="fonctionSignataire" value={evaluationData.fonctionSignataire} onChange={handleChange} /><br />

                <label className='questionStyle label'>Signature :</label><br />
                <input className= 'questionStyle input' type="text" name="signature" value={evaluationData.signature} onChange={handleChange} /><br />

                <label className='questionStyle label'>Date :</label><br />
                <input className= 'questionStyle input' type="date" name="dateSignature" value={evaluationData.dateSignature} onChange={handleChange} />
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

            <PDFDownloadLink document={<EvaluationPDF evaluationData={evaluationData} />} fileName="evaluation-form.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Chargement du document...' : 'Télécharger en PDF')}
            </PDFDownloadLink>
    </form>
    );
}


export default EvaluationForm;
