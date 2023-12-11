import React from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: { padding: 10 },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
    subtitle: { fontSize: 15, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
    text: { margin: 10, fontSize: 11, textAlign: 'left' },
    section: { marginBottom: 25 },
    signatureImage: { width: 100, height: 50, margin: '10px 0' },
    table: {
        marginBottom: 15,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    },
    tableColHeader: {
        width: '50%',
        padding: '8px',
        backgroundColor: '#eee',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '50%',
        padding: '8px',
    },
    textarea: { marginBottom: 3, height: 100 },

    partiesSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 15,
    },
    partiesRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 4,
    },
    partiesText: {
        width: "33%",
        margin: 3,
    },
    etText: {
        margin: 3,
        textAlign: "center",
    },


});

const GenereEvaluationMilieuStagePDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.title}>ÉVALUATION DU MILIEU DE STAGE</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>IDENTIFICATION DE L’ENTREPRISE</Text>

                <Text style={styles.text}>Nom de l'entreprise: {formData.nomEntreprise}</Text>
                <Text style={styles.text}>Personne contact: {formData.personneContact}</Text>

                <Text style={styles.text}>Adresse: {formData.adresse}</Text>
                <Text style={styles.text}>Ville: {formData.ville}</Text>
                <Text style={styles.text}>Code postal: {formData.codePostal}</Text>

                <Text style={styles.text}>Numéro de téléphone: {formData.telephone}</Text>
                <Text style={styles.text}>Numéro de télécopieur: {formData.telecopieur}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>IDENTIFICATION DU STAGIAIRE</Text>

                <Text style={styles.text}>Nom du stagiaire: {formData.nomStagiaire}</Text>
                <Text style={styles.text}>Date du stage: {formData.dateStage}</Text>
                <Text style={styles.text}>Stage: {formData.stage}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>ÉVALUATION</Text>

                <Text style={styles.text}>Les tâches confiées au stagiaire sont conformes aux tâches annoncées dans
                    l’entente de stage: {formData.tachesConformes}</Text>
                <Text style={styles.text}>Des mesures d’accueil facilitent l’intégration du nouveau stagiaire:
                    {formData.mesuresAccueil}</Text>
                <Text style={styles.text}>Le temps réel consacré à l’encadrement du stagiaire est suffisant:
                    {formData.tempsConsacreSuffisant}</Text>

                <Text style={styles.text}>Préciser le nombre d’heures/semaine :</Text>
                <Text style={styles.text}>Premier mois : {formData.nbHeuresPremierMois}</Text>
                <Text style={styles.text}>Deuxième mois : {formData.nbHeuresDeuxiemeMois}</Text>
                <Text style={styles.text}>Troisième mois : {formData.nbHeuresTroisiemeMois}</Text>

                <Text style={styles.text}>L’environnement de travail respecte les
                    normes d’hygiène et de sécurité au travail: {formData.environnementRespecteNormes}</Text>
                <Text style={styles.text}>Le climat de travail est agréable:
                    {formData.climatEstAgreable}</Text>
                <Text style={styles.text}>Le milieu de stage est accessible par transport
                    en commun: {formData.accessibleParTransportEnCommun}</Text>

                <Text style={styles.text}>Le salaire offert est intéressant pour le
                    stagiaire: {formData.salaireInteressant}</Text>
                <Text style={styles.text}>Préciser: {formData.preciserSalaire}$/l'heure</Text>

                <Text style={styles.text}>La communication avec le superviseur de
                    stage facilite le déroulement du stage: {formData.communicationFaciliteDeroulement}</Text>
                <Text style={styles.text}>L’équipement fourni est adéquat pour réaliser
                    les tâches confiées: {formData.equipementFourniEstAdequat}</Text>
                <Text style={styles.text}>Le volume de travail est acceptable: {formData.volumeDeTravailEstAcceptable}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>COMMENTAIRES</Text>

                <Text style={styles.text}>{formData.commentaires}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>OBSERVATIONS GÉNÉRALES</Text>

                <Text style={styles.text}>Ce milieu est à privilégier pour le: {formData.nbStage}</Text>
                <Text style={styles.text}>Ce milieu est ouvert à accueillir: {formData.nbStagiaires}</Text>

                <Text style={styles.text}>Ce milieu désire accueillir le même stagiaire pour un prochain stage:
                    {formData.desireAcueillirMemeStagiaire}</Text>

                <Text style={styles.text}>Ce milieu offre des quarts de travail variables:
                    {formData.offreQuartsVariables}</Text>

                <Text style={styles.text}>De {formData.premierQuartDebut}h à {formData.premierQuartFin}h</Text>
                <Text style={styles.text}>De {formData.deuxiemeQuartDebut}h à {formData.deuxiemeQuartFin}h</Text>
                <Text style={styles.text}>De {formData.troisiemeQuartDebut}h à {formData.troisiemeQuartFin}h</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.text}>Signature de l’enseignant responsable du stagiaire</Text>
                {
                    formData.signatureGestionnaire && (
                        <Image style={styles.signatureImage} src={formData.signatureGestionnaire} />
                    )
                }
                <Text style={styles.text}>Date: {formData.dateSignatureGestionnaire}</Text>
            </View>
        </Page>
    </Document>
)

export default GenereEvaluationMilieuStagePDF
