import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React from "react";

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

    signatureImage: {
        width: 100,
        height: 50,
        margin: '10px 0',
    }
});

const GenereContratPDF = ({formData}) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.title}>ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Dans le cadre de la formule ATE, les parties citées ci-dessous :</Text>

                <Text style={styles.text}>Le gestionnaire de stage, {formData.nomGestionnaire}</Text>
                <Text style={styles.text}>et</Text>
                <Text style={styles.text}>L'employeur, {formData.nomEmployeur}</Text>
                <Text style={styles.text}>et</Text>
                <Text style={styles.text}>L'étudiant(e)', {formData.nomEtudiant}</Text>

                <Text style={styles.subtitle}>Conviennent des conditions de stage suivantes :</Text>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>ENDROIT DU STAGE</Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>DUREE DU STAGE</Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>HORAIRE DE TRAVAIL</Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>SALAIRE</Text>
                </View>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Adresse: {formData.offreLieuStage}</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Date de début: {formData.dateDebut}</Text>
                        <Text style={styles.tableCell}>Date de fin: {formData.dateFin}</Text>
                        <Text style={styles.tableCell}>Nombre total de semaines: {formData.nbTotalSemaines}</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Horaire de travail: {`${formData.startWorkHours} à ${formData.endWorkHours}`}</Text>
                        <Text style={styles.tableCell}>Nombre total d'heures par semaine: {formData.nbTotalHeureParSemaine}</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Salaire horaire: {formData.salaireHoraire}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>TACHES ET RESPONSABILITES DU STAGIAIRE</Text>

                <Text style={styles.text}>Description: {formData.offreDescription}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>RESPONSABILITES</Text>

                <Text style={styles.text}>Le Collège s'engage à:
                    <br/>
                    {formData.commentaireCollege}
                </Text>
                <Text style={styles.text}>L'entreprise s'engage à:
                    <br/>
                    {formData.commentaireEntreprise}
                </Text>
                <Text style={styles.text}>L'étudiant s'engage à:
                    <br/>
                    {formData.commentaireEtudiant}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>SIGNATURES</Text>
                <Text style={styles.subtitle}>Les parties s’engagent à respecter cette entente de stage</Text>
                <Text style={styles.text}><b>En foi de quoi les parties ont signé,</b></Text>

                <Text style={styles.text}><b>L'étudiant(e):</b></Text>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {
                                formData.signatureEtudiant && (
                                    <div>
                                        <Image style={styles.signatureImage} src={formData.signatureEtudiant} />
                                    </div>
                                )
                            }
                        </Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{formData.dateSignatureEtudiant}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{formData.nomEtudiant}</Text>
                        </View>

                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.text}><b>L'employeur:</b></Text>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {
                                formData.signatureEmployeur && (
                                    <div>
                                        <Image style={styles.signatureImage} src={formData.signatureEmployeur} />
                                    </div>
                                )
                            }
                        </Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{formData.dateSignatureEmployeur}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{formData.nomEmployeur}</Text>
                        </View>

                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.text}><b>Le gestionnaire de stage:</b></Text>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {
                                formData.signatureGestionnaire && (
                                    <div>
                                        <Image style={styles.signatureImage} src={formData.signatureGestionnaire} />
                                    </div>
                                )
                            }
                        </Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{formData.dateSignatureGestionnaire}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{formData.nomGestionnaire}</Text>
                        </View>

                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default GenereContratPDF
