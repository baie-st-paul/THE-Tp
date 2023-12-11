import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
                <Text style={styles.text}>Nom de l'entreprise: {formData.nomEntreprise}</Text>
                <Text style={styles.text}>Personne contact: {formData.personneContact}</Text>

                <Text style={styles.text}>Adresse: {formData.adresse}</Text>
                <Text style={styles.text}>Ville: {formData.ville}</Text>
                <Text style={styles.text}>Code postal: {formData.codePostal}</Text>

                <Text style={styles.text}>Numéro de téléphone: {formData.telephone}</Text>
                <Text style={styles.text}>Numéro de télécopieur: {formData.telecopieur}</Text>
            </View>
        </Page>
    </Document>
)

export default GenereEvaluationMilieuStagePDF
