import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    body: { padding: 10 },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
    subtitle: { fontSize: 15, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
    header: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
    text: { margin: 5, fontSize: 12, textAlign: 'justify' },
    section: { marginBottom: 10, textAlign: 'center', border: '1px solid black', padding: 10, fontSize: 15 },
    footer: { fontSize: 7, textAlign: 'left', marginTop: 10 },
    input: { marginBottom: 3 },
    textarea: { marginBottom: 3, height: 100 },
    checkbox: { margin: 3 },
    radio: { margin: 3 },
    select: { marginBottom: 3 },
    button: { marginTop: 10 },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableColHeader: { width: "25%", borderStyle: "solid", borderBottomWidth: 1, borderLeftWidth: 1 },
    tableCol: { width: "25%", borderStyle: "solid", borderLeftWidth: 1 },

    footerInfo: {
      textAlign: 'center',
      fontSize: 10,  
      marginTop: 20, 
  },

      boldText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    
    /* labelStyle: {
      fontSize: 12,
      fontWeight: 'normal',
  },
    responseStyle: {
        fontSize: 12,
        fontWeight: 'bold',
    }, */
});

const EvaluationPDF = ({ evaluationData }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.title}>FICHE D’ÉVALUATION DU STAGIAIRE</Text>
      
      {/* Section Informations générales */}
      <View style={styles.section}>
        <Text style={styles.text}>Nom de l’élève: {evaluationData.nomEleve}</Text>
        <Text style={styles.text}>Programme d'étude: {evaluationData.programmeEtudes}</Text>
        <Text style={styles.text}>Nom de l’entreprise: {evaluationData.nomEntreprise}</Text>
        <Text style={styles.text}>Nom du superviseur: {evaluationData.nomSuperviseur}</Text>
        <Text style={styles.text}>Fonction: {evaluationData.fonctionSuperviseur}</Text>
        <Text style={styles.text}>Numéro de téléphone: {evaluationData.numeroTelephone}</Text>
      </View>

      {/* Section Productivité */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>1. PRODUCTIVITÉ</Text>
        <Text style={styles.text}>a) Planifier et organiser son travail de façon efficace: {evaluationData.planifierEtOrganiser}</Text>
        <Text style={styles.text}>b) Comprendre rapidement les directives relatives à son travail: {evaluationData.comprendreDirectives}</Text>
        <Text style={styles.text}>c) Maintenir un rythme de travail soutenu: {evaluationData.maintenirRythme}</Text>
        <Text style={styles.text}>d) Établir ses priorités: {evaluationData.etablirPriorites}</Text>
        <Text style={styles.text}>e) Respecter ses échéanciers: {evaluationData.respecterEcheanciers}</Text>
        <Text style={styles.text}>Commentaires: {evaluationData.commentairesProductivite}</Text>
      </View>

       {/* Section Qualité du travail */}
       <View style={styles.section}>
        <Text style={styles.subtitle}>2. QUALITÉ DU TRAVAIL</Text>
        <Text style={styles.text}>a) Respecter les mandats qui lui ont été confiés: {evaluationData.respecterMandats}</Text>
        <Text style={styles.text}>b) Porter attention aux détails dans la réalisation de ses tâches: {evaluationData.attentionDetails}</Text>
        <Text style={styles.text}>c) Vérifier son travail, s’assurer que rien n’a été oublié: {evaluationData.verifierTravail}</Text>
        <Text style={styles.text}>d) Rechercher des occasions de se perfectionner: {evaluationData.perfectionner}</Text>
        <Text style={styles.text}>e) Faire une bonne analyse des problèmes rencontrés: {evaluationData.analyseProblemes}</Text>
        <Text style={styles.text}>Commentaires: {evaluationData.commentairesQualite}</Text>
      </View>

        {/* Section Relations interpersonnelles */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>3. RELATIONS INTERPERSONNELLES</Text>
        <Text style={styles.text}>a) Établir des contacts aisément: {evaluationData.etablirContacts}</Text>
        <Text style={styles.text}>b) Travailler en équipe: {evaluationData.travailEquipe}</Text>
        <Text style={styles.text}>c) S'adapter à la culture de l'entreprise: {evaluationData.adapterCulture}</Text>
        <Text style={styles.text}>d) Accepter les critiques constructives: {evaluationData.accepterCritiques}</Text>
        <Text style={styles.text}>e) Respecter les gens: {evaluationData.respecterGens}</Text>
        <Text style={styles.text}>f) Écoute active: {evaluationData.ecouteActive}</Text>
        <Text style={styles.text}>Commentaires: {evaluationData.commentairesRelations}</Text>
      </View>


        {/* Section Habiletés personnelles */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>4. HABILETÉS PERSONNELLES</Text>
        <Text style={styles.text}>a) Démontrer de l’intérêt et de la motivation au travail: {evaluationData.interetMotivation}</Text>
        <Text style={styles.text}>b) Exprimer clairement ses idées: {evaluationData.exprimerIdees}</Text>
        <Text style={styles.text}>c) Faire preuve d’initiative: {evaluationData.initiative}</Text>
        <Text style={styles.text}>d) Travailler de façon sécuritaire: {evaluationData.travaillerSecuritaire}</Text>
        <Text style={styles.text}>e) Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision: {evaluationData.sensResponsabilites}</Text>
        <Text style={styles.text}>f) Être ponctuel et assidu à son travail: {evaluationData.ponctuelAssidu}</Text>
        <Text style={styles.text}>Commentaires: {evaluationData.commentairesHabiletes}</Text>
      </View>


        {/* Section Habiletés techniques */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>APPRECIATION GLOBALE DU STAGIAIRE</Text>
        <Text style={styles.text}>Les habiletés démontrées dépassent de beaucoup les attentes: {evaluationData.appreciationGlobale}</Text>
        <Text style={styles.text}>Les habiletés démontrées dépassent les attentes: {evaluationData.discussionStagiaire}</Text>
        <Text style={styles.text}>Les habiletés démontrées répondent pleinement aux attentes: {evaluationData.heuresEncadrement}</Text>
        <Text style={styles.text}>Les habiletés démontrées répondent partiellement aux attentes: {evaluationData.accueilProchainStage}</Text>
        <Text style={styles.text}>Les habiletés démontrées ne répondent pas aux attentes: {evaluationData.autreElement}</Text>
        <Text style={styles.text}>PRÉCISEZ VOTRE APPRÉCIATION: {evaluationData.commentaireAppreciation}</Text>
        <Text style={styles.text}>Cette évaluation a été discutée avec le stagiaire: {evaluationData.accord}</Text>
      </View>


        {/* Section Signature */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE</Text>
        <Text style={styles.text}>Accueil pour le prochain stage: {evaluationData.accueilProchainStage}</Text>
        <Text style={styles.text}>La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage? {evaluationData.formationTechniqueSuffisante}</Text>
        
        <Text style={styles.text}>Nom (en lettres moulées): {evaluationData.nomSignataire}</Text>
        <Text style={styles.text}>Fonction: {evaluationData.fonctionSignataire}</Text>
        <Text style={styles.text}>Signature: {evaluationData.signature}</Text>
        <Text style={styles.text}>Date: {evaluationData.dateSignature}</Text>
      </View>

        <Text style={styles.footerInfo}>
          <Text style={styles.boldText}>Veuillez retourner ce formulaire à :</Text>{"\n"}
            Patrice Brodeur{"\n"}
            Cégep André-Laurendeau{"\n"}
            1111, rue Lapierre{"\n"}
            LASALLE (Québec){"\n"}
            H8N 2J4{"\n"}
            Numéro de télécopieur : (514) 364-7130
        </Text>

        <Text style={styles.footer}>Nous vous remercions de votre appui !{"\n"}
            Collège André-Laurendeau{"\n"}
            ALTERNANCE TRAVAIL-ÉTUDES{"\n"}
            2010-09-21
        </Text>
    </Page>
  </Document>
);

export default EvaluationPDF;
