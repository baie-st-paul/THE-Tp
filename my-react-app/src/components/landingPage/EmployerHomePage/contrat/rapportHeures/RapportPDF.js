import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: { padding: 10 },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
    subtitle: { fontSize: 15, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
    text: { margin: 10, fontSize: 11, textAlign: 'justify' },
    section: { marginBottom: 25, textAlign: 'left' },
    signatureImage: { width: 100, height: 50, margin: '10px 0' },
    errorMessage: { color: 'red', fontSize: 10, marginTop: 5 },
});

const RapportPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.title}>Rapport des heures de stage</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Information de l'employeur</Text>
                <Text style={styles.text}>Nom de l'employeur: {formData.nomEmployeur}</Text>
                <Text style={styles.text}>Nom du superviseur: {formData.nomSuperviseur}</Text>
                <Text style={styles.text}>Titre: {formData.titre}</Text>
                <Text style={styles.text}>Nom du stagiaire: {formData.nomStagiaire}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Rapport des semaines travaillées</Text>
                {formData.semaines.map((rowData, rowIndex) => (
                    rowData.semaineDe === '' ? null :
                    <View key={rowIndex} style={styles.tableRow}>
                        <Text style={styles.subtitle}>{`Semaine de: ${rowData.semaineDe} à ${rowData.semaineAu}`}</Text>
                        <Text style={styles.text}>{`Heures réelles travaillées: ${rowData.heuresReelles}`}</Text>
                        <Text style={styles.text}>{`Heures réelles de supervision directe: ${rowData.heuresSupervision}`}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Signature</Text>
                {formData.signature ? (
                    <div>
                        <Image style={styles.signatureImage} src={formData.signature} />
                        <Text style={styles.text}>Fonction: {formData.fonction}</Text>
                    </div>
                ) : (
                    <Text style={styles.errorMessage}>La signature est requise</Text>
                )}
            </View>
        </Page>
    </Document>
);

export default RapportPDF;
