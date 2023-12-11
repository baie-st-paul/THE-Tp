import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React from "react";

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

const GenereContratPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.section}>
                <Text style={styles.title}>ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</Text>

                <Text style={styles.subtitle}>Dans le cadre de la formule ATE, les parties citées ci-dessous :</Text>

                <View style={styles.partiesSection}>
                    <View style={styles.partiesRow}>
                        <Text style={styles.partiesText}>Le gestionnaire de stage, {formData.nomGestionnaire}</Text>
                    </View>
                    <Text style={styles.etText}>et</Text>
                    <View style={styles.partiesRow}>
                        <Text style={styles.partiesText}>L'employeur, {formData.nomEmployeur}</Text>
                    </View>
                    <Text style={styles.etText}>et</Text>
                    <View style={styles.partiesRow}>
                        <Text style={styles.partiesText}>L'étudiant(e), {formData.nomEtudiant}</Text>
                    </View>
                </View>


                <Text style={styles.subtitle}>Conviennent des conditions de stage suivantes :</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>ENDROIT DU STAGE</Text>
                        <Text style={styles.tableCol}>{formData.offreLieuStage}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>DUREE DU STAGE</Text>
                        <Text style={styles.tableCol}>Date de début: {formData.dateDebut}</Text>
                        <Text style={styles.tableCol}>Date de fin: {formData.dateFin}</Text>
                        <Text style={styles.tableCol}>Nombre total de semaines: {formData.nbTotalSemaines}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>HORAIRE DE TRAVAIL</Text>
                        <Text style={styles.tableCol}>Horaire de travail: De {formData.startWorkHours}h à {formData.endWorkHours}h</Text>
                        <Text style={styles.tableCol}>Nombre total d'heures par semaine: {formData.nbTotalHeureParSemaine}h</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>SALAIRE</Text>
                        <Text style={styles.tableCol}>Salaire horaire: {formData.salaireHoraire}$/h</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>TACHES ET RESPONSABILITES DU STAGIAIRE</Text>
                <Text style={styles.text}>Description: {formData.offreDescription}</Text>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>RESPONSABILITES</Text>
                    <Text style={styles.text}>Le Collège s'engage à: {formData.commentaireCollege}</Text>
                    <Text style={styles.text}>L'entreprise s'engage à: {formData.commentaireEntreprise}</Text>
                    <Text style={styles.text}>L'étudiant s'engage à: {formData.commentaireEtudiant}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>SIGNATURES</Text>
                    <Text style={styles.subtitle}>Les parties s’engagent à respecter cette entente de stage</Text>
                    <Text style={styles.text}><b>En foi de quoi les parties ont signé,</b></Text>

                    <Text style={styles.text}><b>L'étudiant(e):</b></Text>
                    {
                        formData.signatureEtudiant && (
                            <Image style={styles.signatureImage} src={formData.signatureEtudiant} />
                        )
                    }
                    <Text style={styles.text}>Date: {formData.dateSignatureEtudiant}</Text>
                    <Text style={styles.text}>Nom: {formData.nomEtudiant}</Text>

                    <Text style={styles.text}><b>L'employeur:</b></Text>
                    {
                        formData.signatureEmployeur && (
                            <Image style={styles.signatureImage} src={formData.signatureEmployeur} />
                        )
                    }
                    <Text style={styles.text}>Date: {formData.dateSignatureEmployeur}</Text>
                    <Text style={styles.text}>Nom: {formData.nomEmployeur}</Text>

                    <Text style={styles.text}><b>Le gestionnaire de stage:</b></Text>
                    {
                        formData.signatureGestionnaire && (
                            <Image style={styles.signatureImage} src={formData.signatureGestionnaire} />
                        )
                    }
                    <Text style={styles.text}>Date: {formData.dateSignatureGestionnaire}</Text>
                    <Text style={styles.text}>Nom: {formData.nomGestionnaire}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default GenereContratPDF;

