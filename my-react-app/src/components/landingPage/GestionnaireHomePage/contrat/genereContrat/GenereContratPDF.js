/* import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
    body: { padding: 10 },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
    littleTitle: { fontSize: 12, textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 15, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
    text: { margin: 10, fontSize: 11, textAlign: 'center' },
    section: { marginBottom: 25, textAlign: 'center' },
    signatureImage: { width: 100, height: 50, margin: '10px 0' },
    errorMessage: { color: 'red', fontSize: 10, marginTop: 5 },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    },
    header: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
    footer: { fontSize: 7, textAlign: 'left', marginTop: 10 },
    input: { marginBottom: 3 },
    textarea: { marginBottom: 3, height: 100 },
    checkbox: { margin: 3 },
    radio: { margin: 3 },
    select: { marginBottom: 3 },
    button: { marginTop: 10 },
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

    
});

const GenereContratPDF = ({formData}) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.table}>
                <Text style={styles.title}>ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</Text>

                <Text style={styles.subtitle}>Dans le cadre de la formule ATE, les parties citées ci-dessous :</Text>

                <Text style={styles.littleTitle}>Le gestionnaire de stage, <b>{formData.nomGestionnaire}</b></Text>
                <Text style={styles.littleTitle}><b>et</b></Text>
                <Text style={styles.littleTitle}>L'employeur, <b>{formData.nomEmployeur}</b></Text>
                <Text style={styles.littleTitle}><b>et</b></Text>
                <Text style={styles.littleTitle}>L'étudiant(e)', <b>{formData.nomEtudiant}</b></Text>

                <Text style={styles.subtitle}>Conviennent des conditions de stage suivantes :</Text>

                <View style={styles.section}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}><b>ENDROIT DU STAGE</b></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Adresse: {formData.offreLieuStage}</Text>
                        </View>
                    </View>


                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}><b>DUREE DU STAGE</b></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date de début: {formData.dateDebut}</Text>
                            <Text style={styles.tableCell}>Date de fin: {formData.dateFin}</Text>
                            <Text style={styles.tableCell}>Nombre total de semaines: {formData.nbTotalSemaines}</Text>
                        </View>
                    </View>


                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}><b>HORAIRE DE TRAVAIL</b></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Horaire de travail: {`De ${formData.startWorkHours}h à ${formData.endWorkHours}h`}</Text>
                            <Text style={styles.tableCell}>Nombre total d'heures par semaine{formData.nbTotalHeureParSemaine}h</Text>
                        </View>
                    </View>


                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}><b>SALAIRE</b></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Salaire horaire: {formData.salaireHoraire}$/h</Text>
                        </View>
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
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default GenereContratPDF
 */



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

