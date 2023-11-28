import React, {useEffect, useRef, useState} from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import GenereContratPDF from "./GenereContratPDF";
import './GenereContratForm.css'

const GenereContratForm = ({gestionnaire, contrat, onSubmit}) => {
    const initialState = {
        nomGestionnaire: gestionnaire.firstName + ", " + gestionnaire.lastName,
        nomEmployeur: contrat.candidatureDTO.employer.firstName + ", " + contrat.candidatureDTO.employer.lastName,
        nomEtudiant: contrat.candidatureDTO.student.firstName + ", " + contrat.candidatureDTO.student.lastName,
        offreLieuStage: "",

        dateDebut: "",
        dateFin: "",
        nbTotalSemaines: "",

        startWorkHours: "",
        endWorkHours: "",

        nbTotalHeureParSemaine: "", 
        salaireHoraire: "",

        offreDescription: contrat.candidatureDTO.offreStage.description,
        commentaireCollege: "Aucun engagement",
        commentaireEntreprise: "Aucun engagement",
        commentaireEtudiant: "Aucun engagement",

        signatureEtudiant: "",
        dateSignatureEtudiant: "",

        signatureEmployeur: "",
        dateSignatureEmployeur: "",

        signatureGestionnaire: "",
        dateSignatureGestionnaire: "",
    }

    const [formData, setFormData] = useState(initialState)
    const [signatureEtudiant, setSignatureEtudiant] = useState('');
    const [signatureEmployeur, setSignatureEmployeur] = useState('');
    const [signatureGestionnaire, setSignatureGestionnaire] = useState('');

    const token = localStorage.getItem('token');
    const matriculeGes = localStorage.getItem("gestionnaireMatricule")
    console.log(matriculeGes)

    const offreStageLieuRef = useRef(null)
    const dateDebutRef = useRef(null)
    const dateFinRef = useRef(null)

    const nbTotalSemainesRef = useRef(null)

    const startWorkHoursRef = useRef(null)
    const endWorkHoursRef = useRef(null)

    const nbTotalHeureParSemaineRef = useRef(null)
    const salaireHoraireRef = useRef(null)

    const dateSignatureEtudiantRef = useRef(null);
    const dateSignatureEmployeurRef = useRef(null);
    const dateSignatureGestionnaireRef = useRef(null);

    useEffect(() => {
        handleSignatureEtudiant()
        handleSignatureEmployer()
        handleSignatureGestionnaire()  
    }, []);

    let base64Signature;
    const handleSignatureEtudiant = async () => {
            try {
                fetch(
                    `http://localhost:8081/api/v1/stages/signatures/student/get/${contrat.candidatureDTO.student.matricule}`, 
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        withCredentials: true,
                    }
                ).catch(error => {
                    console.log(error)
                    setSignatureEtudiant(null)
                }).then(
                    async (res) => {
                        try {
                            console.log(res.status)
                            if (res.ok) {
                                const data = await res.json();
                                setSignatureEtudiant(data); 
                                base64Signature = data.imageLink; 
                                console.log("signatureEtudiant",data)
                                 
                                if (base64Signature && !base64Signature.startsWith('data:image')) {
                                    setSignatureEtudiant(`data:image/png;base64,${base64Signature}`);
                                    
                                } else {
                                    setSignatureEtudiant(base64Signature);
                                    setFormData(prevState => ({
                                        ...prevState,
                                        signatureEtudiant: base64Signature
                                    }));
                                }
                            } else {
                                console.log("Failed to fetch data");
                                setSignatureEtudiant(null)
                            }
                        } catch (e) {
                            console.log(e)
                            setSignatureEtudiant(null)
                        }
                    })
            } catch (error) {
                console.log('Une erreur est survenue:', error); 
                setSignatureEtudiant(null)
            } 
            console.log(signatureEtudiant)
    };

    const handleSignatureEmployer = async () => {
        try {
            console.log(contrat.candidatureDTO.employer.id)
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/employer/get/${contrat.candidatureDTO.employer.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
                setSignatureEmployeur(null)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                            setSignatureEmployeur(data);
                            base64Signature = data.imageLink;
                            console.log("signatureEmployeur",data)

                            if (base64Signature && !base64Signature.startsWith('data:image')) {
                                setSignatureEmployeur(`data:image/png;base64,${base64Signature}`);

                            } else {
                                setSignatureEmployeur(base64Signature);
                                setFormData(prevState => ({
                                    ...prevState,
                                    signatureEmployeur: base64Signature
                                }));
                            }
                        } else {
                            console.log("Failed to fetch data");
                            setSignatureEmployeur(null)
                        }
                    } catch (e) {
                        console.log(e)
                        setSignatureEmployeur(null)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setSignatureEmployeur(null)
        }
        console.log(signatureEmployeur)
    };

    const handleSignatureGestionnaire = async () => {
        try {
            console.log(matriculeGes)
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/gestionnaire/get/${matriculeGes}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
                setSignatureGestionnaire(null)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                            setSignatureGestionnaire(data);
                            base64Signature = data.imageLink;
                            console.log("signatureGestionnaire",data)

                            if (base64Signature && !base64Signature.startsWith('data:image')) {
                                setSignatureGestionnaire(`data:image/png;base64,${base64Signature}`);

                            } else {
                                setSignatureGestionnaire(base64Signature);
                                setFormData(prevState => ({
                                    ...prevState,
                                    signatureGestionnaire: base64Signature
                                }));
                            }
                        } else {
                            console.log("Failed to fetch data");
                            setSignatureGestionnaire(null)
                        }
                    } catch (e) {
                        console.log(e)
                        setSignatureGestionnaire(null)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setSignatureGestionnaire(null)
        }
        console.log(signatureGestionnaire)
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let annuler = false;

        if(formData.offreLieuStage.trim() === ''){
            offreStageLieuRef.current.innerHTML = " * Veuillez entrer le lieu du stage *"
            annuler = true;
        } else {
            offreStageLieuRef.current.innerHTML = ""
        }

        if(formData.dateDebut.trim() === ''){
            dateDebutRef.current.innerHTML = " * Veuillez entrer la date de début *"
            annuler = true;
        } else {
            dateDebutRef.current.innerHTML = ""
        }

        if(formData.dateFin.trim() === ''){
            dateFinRef.current.innerHTML = " * Veuillez entrer la date de fin *"
            annuler = true;
        } else {
            dateFinRef.current.innerHTML = ""
        }

        if(formData.nbTotalSemaines.trim() === ''){
            nbTotalSemainesRef.current.innerHTML = " * Veuillez entrer le nombre total de semaines *"
            annuler = true;
        } else {
            nbTotalSemainesRef.current.innerHTML = ""
        }

        if(formData.startWorkHours.trim() === ''){
            startWorkHoursRef.current.innerHTML = " * Veuillez entrer debut de l'horaire de travail *"
            annuler = true;
        } else {
            startWorkHoursRef.current.innerHTML = ""
        }

        if(formData.endWorkHours.trim() === ''){
            endWorkHoursRef.current.innerHTML = " * Veuillez entrer fin de l'horaire de travail *"
            annuler = true;
        } else {
            endWorkHoursRef.current.innerHTML = ""
        }

        if(formData.nbTotalHeureParSemaine.trim() === ''){
            nbTotalHeureParSemaineRef.current.innerHTML = " * Veuillez entrer le nombre total d'heures par semaine *"
            annuler = true;
        } else {
            nbTotalHeureParSemaineRef.current.innerHTML = ""
        }

        if(formData.salaireHoraire.trim() === ''){
            salaireHoraireRef.current.innerHTML = " * Veuillez entrer le salaire horaire *"
            annuler = true;
        } else {
            salaireHoraireRef.current.innerHTML = ""
        }

        if(formData.dateSignatureEtudiant.trim() === ''){
            dateSignatureEtudiantRef.current.innerHTML = " * Veuillez entrer la date de la signature de l'étudiant *"
            annuler = true;
        } else {
            dateSignatureEtudiantRef.current.innerHTML = ""
        }

        if(formData.dateSignatureEmployeur.trim() === ''){
            dateSignatureEmployeurRef.current.innerHTML = " * Veuillez entrer la date de la signature de l'employeur *"
            annuler = true;
        } else {
            dateSignatureEmployeurRef.current.innerHTML = ""
        }

        if(formData.dateSignatureGestionnaire.trim() === ''){
            dateSignatureGestionnaireRef.current.innerHTML = " * Veuillez entrer la date de la signature du gestionnaire *"
            annuler = true;
        } else {
            dateSignatureGestionnaireRef.current.innerHTML = ""
        }

        if (annuler === true) {
        } else {
            console.log(contrat)
            onSubmit(contrat, formData)
        }
    }

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                    <div>
                        <h2 className="formTitle">ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES</h2>
                        <p className="subTitle">Dans le cadre de la formule ATE, les parties citées ci-dessous :</p><br/>

                        <div className="participant">
                            <h6 className='participant'>Le gestionnaire de stage, {formData.nomGestionnaire}</h6>
                        </div><br/>

                        <div className="et"><strong>Et</strong></div><br/>

                        <div className="participant">
                            <h6 className='participant'>L'employeur, {formData.nomEmployeur}</h6>
                        </div><br/>

                        <div className="et"><strong>Et</strong></div><br/>

                        <div className="participant">
                            <h6 className='participant'>L'étudiant(e), {formData.nomEtudiant}</h6>
                        </div><br/>


                        <h6 className="mt-4">Conviennent des conditions de stage suivantes:</h6>
                    </div>

                    <div>
                        <table className="infoTable">
                            <tbody>
                                <tr>
                                    <td colSpan="2"><strong>ENDROIT DU STAGE</strong></td>
                                </tr>
                                <tr>
                                    <td>Adresse :</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="offreLieuStage" 
                                            value={formData.offreLieuStage} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={offreStageLieuRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Date de début :</td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="dateDebut" 
                                            value={formData.dateDebut} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={dateDebutRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Date de fin :</td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="dateFin" 
                                            value={formData.dateFin} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={dateFinRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Nombre total de semaines :</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="nbTotalSemaines" 
                                            value={formData.nbTotalSemaines} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={nbTotalSemainesRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Horaire de travail :</td>
                                    <td>
                                        <input 
                                            type="time" 
                                            name="startWorkHours" 
                                            value={formData.startWorkHours} 
                                            onChange={handleChange} 
                                        />
                                        À
                                        <input 
                                            type="time" 
                                            name="endWorkHours" 
                                            value={formData.endWorkHours} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={startWorkHoursRef} className="error-message"></span>
                                        <span ref={endWorkHoursRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Nombre total d’heures par semaine :</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="nbTotalHeureParSemaine" 
                                            value={formData.nbTotalHeureParSemaine} 
                                            onChange={handleChange} 
                                        />h
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={nbTotalHeureParSemaineRef} className="error-message"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Salaire horaire :</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="salaireHoraire" 
                                            value={formData.salaireHoraire} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span ref={salaireHoraireRef} className="error-message"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <strong>TACHES ET RESPONSABILITES DU STAGIAIRE</strong>
                        <p>
                            {formData.offreDescription}
                        </p>
                    </div>

                    <div className="responsibilities">
                        <strong>RESPONSABILITES</strong>
                    </div>
                    <div>
                        <p>Le Collège s’engage à :</p>
                        <textarea
                            name="commentaireCollege"
                            value={formData.commentaireCollege}
                            onChange={handleChange}
                            className="textareaStyle"
                        />
                    </div>

                    <div>
                        <p>L’entreprise s’engage à :</p>
                        <textarea
                            name="commentaireEntreprise"
                            value={formData.commentaireEntreprise}
                            onChange={handleChange}
                            className="textareaStyle"
                        />
                    </div>

                    <div>
                        <p>L’étudiant s’engage à :</p>
                        <textarea
                            name="commentaireEtudiant"
                            value={formData.commentaireEtudiant}
                            onChange={handleChange}
                            className="textareaStyle"
                        />
                    </div>
                    <div className="mt-4">
                        <div>
                            <h4>SIGNATURES</h4>
                            <h5><b>Les parties s'engagent à respecter cette entente de stage</b></h5>
                            <p><b>En foi de quoi les parties ont signé,</b></p>

                            <div>
                                <p><b>L'étudiant(e)</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            formData.signatureEtudiant && (
                                                <div>
                                                    <img src={formData.signatureEtudiant} alt="signatureEtudiant" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureEtudiant" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureEtudiant"
                                                   name="dateSignatureEtudiant"
                                                   value={formData.dateSignatureEtudiant}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureEtudiantRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomEtudiant}</p>
                                    </div>
                                </div>

                                <p><b>L'employeur</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            formData.signatureEmployeur && (
                                                <div>
                                                    <img src={formData.signatureEmployeur} alt="signatureEmployeur" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureEmployeur" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureEmployeur"
                                                   name="dateSignatureEmployeur"
                                                   value={formData.dateSignatureEmployeur}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureEmployeurRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomEmployeur}</p>
                                    </div>
                                </div>

                                <p><b>Le gestionnaire de stage</b></p>
                                <div className="row">
                                    <div className="row">
                                        {
                                            formData.signatureGestionnaire && (
                                                <div>
                                                    <img src={formData.signatureGestionnaire} alt="signatureGestionnaire" style={{ width: '50px', height: '20px' }} />
                                                </div>
                                            )
                                        }
                                        <div>
                                            <label htmlFor="dateSignatureGestionnaire" style={{display: "block", textAlign: "left"}}>Date signature:</label>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date signature"
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="dateSignatureGestionnaire"
                                                   name="dateSignatureGestionnaire"
                                                   value={formData.dateSignatureGestionnaire}
                                                   onChange={handleChange}/>
                                            <span ref={dateSignatureGestionnaireRef} className="error-message"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>Prénom, Nom: {formData.nomGestionnaire}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSubmit} className='buttonStyle'>Soumettre le Contrat</button>

                    <PDFDownloadLink
                        document={<GenereContratPDF formData={formData}/>}
                        fileName="contrat-genere.pdf">
                        {({ blob, url, loading, error }) =>
                            (loading ? 'Chargement du document...' : 'Télécharger en PDF')}
                    </PDFDownloadLink>

                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                </form>
            </div>
        </div>
    )
}

export default GenereContratForm
