import React, { useEffect, useRef, useState } from "react";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import {PDFDownloadLink} from "@react-pdf/renderer";
import GenereEvaluationMilieuStagePDF from "./GenereEvaluationMilieuStagePDF";

const EvaluationMilieuStageForm = ({ contrat, onSubmit }) => {
    const initialState = {
        nomEntreprise: contrat.candidatureDTO.employer.companyName,
        personneContact: contrat.candidatureDTO.employer.firstName + ", " + contrat.candidatureDTO.employer.lastName,

        adresse: "",
        ville: "",
        codePostal: "",
        telephone: contrat.candidatureDTO.employer.phoneNumber,
        telecopieur: "",

        nomStagiaire: contrat.candidatureDTO.student.firstName + ", " + contrat.candidatureDTO.student.lastName,
        dateStage: contrat.candidatureDTO.offreStage.dateDebut + " au " + contrat.candidatureDTO.offreStage.dateFin,
        stage: "",

        tachesConformes: "",
        mesuresAccueil: "",
        tempsConsacreSuffisant: "",

        nbHeuresPremierMois: "",
        nbHeuresDeuxiemeMois: "",
        nbHeuresTroisiemeMois: "",

        environnementRespecteNormes: "",
        climatEstAgreable: "",
        accessibleParTransportEnCommun: "",

        salaireInteressant: "",
        preciserSalaire: 0,

        communicationFaciliteDeroulement: "",
        equipementFourniEstAdequat: "",
        volumeDeTravailEstAcceptable: "",

        commentaires: "Aucun commentaires",

        nbStage: "",
        nbStagiaires: "",

        desireAcueillirMemeStagiaire: "",

        offreQuartsVariables: "",
        premierQuartDebut: "",
        deuxiemeQuartDebut: "",
        troisiemeQuartDebut: "",
        premierQuartFin: "",
        deuxiemeQuartFin: "",
        troisiemeQuartFin: "",

        signatureGestionnaire: "",
        dateSignatureGestionnaire: "",
    }

    const [formData, setFormData] = useState(initialState)
    const [signatureGestionnaire, setSignatureGestionnaire] = useState('');
    const token = localStorage.getItem('token');
    const matriculeGes = localStorage.getItem("gestionnaireMatricule")

    const options = ["Totalement en accord", "Plutôt en accord", "Plutôt en désaccord", "Totalement en désaccord", "N/A"];
    const choixNbStages = ["premier stage", "deuxième stage"]
    const choixStagiaires = ["un stagiaire", "deux stagiaires", "plus de trois"]

    const adresseRef = useRef(null)
    const villeRef = useRef(null)
    const codePostalRef = useRef(null)
    const telecopieurRef = useRef(null)

    const stageRef = useRef(null)

    const tachesConformesRef = useRef(null)
    const mesuresAccueilRef = useRef(null)
    const tempsConsacreSuffisantRef = useRef(null)

    const nbHeuresPremierMoisRef = useRef(null)
    const nbHeuresDeuxiemeMoisRef = useRef(null)
    const nbHeuresTroisiemeMoisRef = useRef(null)

    const environnementRespecteNormesRef = useRef(null)
    const climatEstAgreableRef = useRef(null)
    const accessibleParTransportEnCommunRef = useRef(null)

    const salaireInteressantRef = useRef(null)
    const preciserSalaireHeureRef = useRef(null)

    const communicationFaciliteDeroulementRef = useRef(null)
    const equipementFourniEstAdequatRef = useRef(null)
    const volumeDeTravailEstAcceptableRef = useRef(null)

    const nbStagesRef = useRef(null)
    const nbStagiairesRef = useRef(null)

    const desireAcueillirMemeStagiaireRef = useRef(null)

    const offreQuartsVariablesRef = useRef(null)
    const premierQuartDebutRef = useRef(null)
    const deuxiemeQuartDebutRef = useRef(null)
    const troisiemeQuartDebutRef = useRef(null)
    const premierQuartFinRef = useRef(null)
    const deuxiemeQuartFinRef = useRef(null)
    const troisiemeQuartFinRef = useRef(null)

    const dateSignatureGestionnaireRef = useRef(null);

    useEffect(() => {
        handleSignatureGestionnaire()
    }, []);

    let base64Signature;

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
                            console.log("signatureGestionnaire", data)

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
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let annuler = false;

        if (formData.adresse.trim() === '') {
            adresseRef.current.innerHTML = " * Veuillez entrer l'adresse de l'entreprise"
            annuler = true;
        } else {
            adresseRef.current.innerHTML = "";
        }

        if (formData.ville.trim() === '') {
            villeRef.current.innerHTML = " * Veuillez entrer la ville de l'entreprise *"
            annuler = true;
        } else {
            villeRef.current.innerHTML = "";
        }

        if (formData.codePostal.trim() === '') {
            codePostalRef.current.innerHTML = " * Veuillez entrer le code postal de l'entreprise *"
            annuler = true;
        } else {
            codePostalRef.current.innerHTML = "";
        }

        if (formData.telecopieur.trim() === '') {
            telecopieurRef.current.innerHTML = '* Veuillez entrer le numéro du télécopieur *'
            annuler = true;
        } else if (!isValidPhoneNumber(formData.telecopieur.trim())) {
            telecopieurRef.current.innerHTML = '* Le numero de télécopieur n\'est pas valide *'
            annuler = true;
        } else {
            telecopieurRef.current.innerHTML = "";
        }


        if (formData.stage.trim() === '') {
            stageRef.current.innerHTML = '* Veuillez indiquer de quel stage il s\'agit *'
            annuler = true;
        } else {
            stageRef.current.innerHTML = "";
        }


        if (formData.tachesConformes.trim() === '') {
            tachesConformesRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            tachesConformesRef.current.innerHTML = ""
        }

        if (formData.mesuresAccueil.trim() === '') {
            mesuresAccueilRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            mesuresAccueilRef.current.innerHTML = ""
        }

        if (formData.tempsConsacreSuffisant.trim() === '') {
            tempsConsacreSuffisantRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            tempsConsacreSuffisantRef.current.innerHTML = ""
        }


        if (formData.nbHeuresPremierMois.trim() === '') {
            nbHeuresPremierMoisRef.current.innerHTML = " * Veuillez entrer le nombre d'heures *"
            annuler = true;
        } else {
            nbHeuresPremierMoisRef.current.innerHTML = ""
        }

        if (formData.nbHeuresDeuxiemeMois.trim() === '') {
            nbHeuresDeuxiemeMoisRef.current.innerHTML = " * Veuillez entrer le nombre d'heures *"
            annuler = true;
        } else {
            nbHeuresDeuxiemeMoisRef.current.innerHTML = ""
        }

        if (formData.nbHeuresTroisiemeMois.trim() === '') {
            nbHeuresTroisiemeMoisRef.current.innerHTML = " * Veuillez entrer le nombre d'heures *"
            annuler = true;
        } else {
            nbHeuresTroisiemeMoisRef.current.innerHTML = ""
        }


        if (formData.environnementRespecteNormes.trim() === '') {
            environnementRespecteNormesRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            environnementRespecteNormesRef.current.innerHTML = ""
        }

        if (formData.climatEstAgreable.trim() === '') {
            climatEstAgreableRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            climatEstAgreableRef.current.innerHTML = ""
        }

        if (formData.accessibleParTransportEnCommun.trim() === '') {
            accessibleParTransportEnCommunRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            accessibleParTransportEnCommunRef.current.innerHTML = ""
        }


        if (formData.salaireInteressant.trim() === '') {
            salaireInteressantRef.current.innerHTML = " * Veuillez choisir une option *"
            annuler = true;
        } else {
            salaireInteressantRef.current.innerHTML = ""
        }

        if (formData.preciserSalaire === 0) {
            preciserSalaireHeureRef.current.innerHTML = "* Veuillez préciser le salaire *"
            annuler = true;
        } else {
            preciserSalaireHeureRef.current.innerHTML = ""
        }


        if (formData.communicationFaciliteDeroulement.trim() === '') {
            communicationFaciliteDeroulementRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            communicationFaciliteDeroulementRef.current.innerHTML = ""
        }

        if (formData.equipementFourniEstAdequat.trim() === '') {
            equipementFourniEstAdequatRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            equipementFourniEstAdequatRef.current.innerHTML = ""
        }

        if (formData.volumeDeTravailEstAcceptable.trim() === '') {
            volumeDeTravailEstAcceptableRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            volumeDeTravailEstAcceptableRef.current.innerHTML = ""
        }


        if (formData.nbStage.trim() === '') {
            nbStagesRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            nbStagesRef.current.innerHTML = ""
        }

        if (formData.nbStagiaires.trim() === '') {
            nbStagiairesRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            nbStagiairesRef.current.innerHTML = ""
        }


        if (formData.desireAcueillirMemeStagiaire.trim() === '') {
            desireAcueillirMemeStagiaireRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            desireAcueillirMemeStagiaireRef.current.innerHTML = ""
        }


        if (formData.offreQuartsVariables.trim() === '') {
            offreQuartsVariablesRef.current.innerHTML = " * Veuillez choisir une option *";
            annuler = true;
        } else {
            offreQuartsVariablesRef.current.innerHTML = ""
        }


        if (formData.premierQuartDebut.trim() === '') {
            premierQuartDebutRef.current.innerHTML = " * Veuillez entrer le début du premier quart d'heure *";
            annuler = true;
        } else {
            premierQuartDebutRef.current.innerHTML = ""
        }

        if (formData.premierQuartFin.trim() === '') {
            premierQuartFinRef.current.innerHTML = " * Veuillez entrer la fin du premier quart d'heure *";
            annuler = true;
        } else {
            premierQuartFinRef.current.innerHTML = ""
        }


        if (formData.deuxiemeQuartDebut.trim() === '') {
            deuxiemeQuartDebutRef.current.innerHTML = " * Veuillez entrer le début du deuxième quart d'heure *";
            annuler = true;
        } else {
            deuxiemeQuartDebutRef.current.innerHTML = ""
        }

        if (formData.deuxiemeQuartFin.trim() === '') {
            deuxiemeQuartFinRef.current.innerHTML = " * Veuillez entrer la fin du deuxième quart d'heure *";
            annuler = true;
        } else {
            deuxiemeQuartFinRef.current.innerHTML = ""
        }


        if (formData.troisiemeQuartDebut.trim() === '') {
            troisiemeQuartDebutRef.current.innerHTML = " * Veuillez entrer le début du troisième quart d'heure *";
            annuler = true;
        } else {
            troisiemeQuartDebutRef.current.innerHTML = ""
        }

        if (formData.troisiemeQuartFin.trim() === '') {
            troisiemeQuartFinRef.current.innerHTML = " * Veuillez entrer la fin du troisième quart d'heure *";
            annuler = true;
        } else {
            troisiemeQuartFinRef.current.innerHTML = ""
        }


        if (formData.dateSignatureGestionnaire.trim() === '') {
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

    const renderDropdown = (name) => (
        <select name={name} value={formData[name]} onChange={handleChange} className='dropdownStyle'>
            <option value="">Sélectionner</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );

    const renderChoixNbStages = (name) => (
        <select name={name} value={formData[name]} onChange={handleChange} className='dropdownStyle'>
            <option value="">Sélectionner</option>
            {choixNbStages.map(choice => (
                <option key={choice} value={choice}>{choice}</option>
            ))}
        </select>
    );

    const renderChoixStagiaires = (name) => (
        <select name={name} value={formData[name]} onChange={handleChange} className='dropdownStyle'>
            <option value="">Sélectionner</option>
            {choixStagiaires.map(choice => (
                <option key={choice} value={choice}>{choice}</option>
            ))}
        </select>
    );

    return (
        <div>
            <div id="Render" className="container content-container mt-4">
                <form onSubmit={onSubmit} className='formStyle'>
                    <h5 className="red-italic ">
                        il est recommandé de télécharger le formulaire complété avant de le soumettre
                    </h5>
                    <div>
                        <h2 className="formTitle">ÉVALUATION DU MILIEU DU STAGE</h2>

                        <label style={{display: "block", textAlign: "left"}}><b>Identification de l'entreprise</b></label>
                        <div className="participant">
                            <div>
                                <label htmlFor="nomEntreprise" style={{display: "block", textAlign: "left"}}>Nom de l'entreprise:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       disabled={true}
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="nomEntreprise"
                                       name="nomEntreprise"
                                       value={formData.nomEntreprise}/>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="personneContact" style={{display: "block", textAlign: "left"}}>Contact de la personne:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       disabled={true}
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="personneContact"
                                       name="personneContact"
                                       value={formData.personneContact}/>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="adresse" style={{display: "block", textAlign: "left"}}>Adresse:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder="ex.: 3493 Rue Lambert"
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="adresse"
                                       name="adresse"
                                       value={formData.adresse}
                                       onChange={handleChange}/>
                                <span ref={adresseRef} className="error-message"></span>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="ville" style={{display: "block", textAlign: "left"}}>Ville:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder="ville"
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="ville"
                                       name="ville"
                                       value={formData.ville}
                                       onChange={handleChange}/>
                                <span ref={villeRef} className="error-message"></span>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="codePostal" style={{display: "block", textAlign: "left"}}>Code postal:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder="ex.: R4O5V2"
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="codePostal"
                                       name="codePostal"
                                       value={formData.codePostal}
                                       onChange={handleChange}/>
                                <span ref={codePostalRef} className="error-message"></span>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="telephone" style={{display: "block", textAlign: "left"}}>Téléphone:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       disabled={true}
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="telephone"
                                       name="telephone"
                                       value={formData.telephone}/>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="telecopieur" style={{display: "block", textAlign: "left"}}>Télécopieur:</label>
                                <PhoneInput
                                    id="telecopieur"
                                    defaultCountry="CA"
                                    placeholder="Entrer numéro télécopieur"
                                    value={formData.telecopieur}
                                    onChange={value => setFormData({ ...formData, telecopieur: value })}
                                />
                                <span ref={telecopieurRef} className="error-message"></span>
                            </div>
                        </div>

                        <br/>

                        <label style={{display: "block", textAlign: "left"}}><b>Identification du stagiaire</b></label>
                        <div className="participant">
                            <div>
                                <label htmlFor="nomStagiaire" style={{display: "block", textAlign: "left"}}>Nom du stagiaire:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       disabled={true}
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="nomStagiaire"
                                       name="nomStagiaire"
                                       value={formData.nomStagiaire}/>
                            </div>

                            <br/>

                            <div>
                                <label htmlFor="dateStage" style={{display: "block", textAlign: "left"}}>Date du stage:</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       disabled={true}
                                       style={{color: 'grey', fontSize: '20px'}}
                                       id="dateStage"
                                       name="dateStage"
                                       value={formData.dateStage}/>
                            </div>

                            <br/>

                            <div className='radioGroup'>
                                <label htmlFor="dateStage" style={{display: "block", textAlign: "left"}}>Stage (encercler):</label>
                                <label>
                                    <input type="radio" name="stage" value="1" onChange={handleChange}/>
                                    1
                                </label>
                                <label>
                                    <input type="radio" name="stage" value="2" onChange={handleChange} />
                                    2
                                </label>
                                <span ref={stageRef} className="error-message"></span>
                            </div>
                        </div>

                        <div>
                            <label style={{display: "block", textAlign: "left"}}><b>Évaluation</b></label>
                            <br/>
                            <div>
                                <div className='questionStyle'>
                                    <label htmlFor="tachesConformes">Les tâches confiées au stagiaire sont conformes aux tâches annoncées dans l’entente de stage.</label>
                                    {renderDropdown("tachesConformes")}
                                    <span ref={tachesConformesRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="mesuresAccueil">Des mesures d’accueil facilitent l’intégration du nouveau stagiaire.</label>
                                    {renderDropdown("mesuresAccueil")}
                                    <span ref={mesuresAccueilRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="tempsConsacreSuffisant">Le temps réel consacré à l'encadrement du stagiaire est suffisant</label>
                                    {renderDropdown("tempsConsacreSuffisant")}
                                    <span ref={tempsConsacreSuffisantRef} className="error-message"></span>
                                </div>


                                <div>
                                    <label style={{display: "block", textAlign: "left"}}>Préciser le nombre d'heures/semaine:</label>
                                    <div>
                                        <label htmlFor="nbHeuresPremierMois" style={{display: "block", textAlign: "left"}}>Premier mois:</label>
                                        <div>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                                   style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                                   id="nbHeuresPremierMois"
                                                   name="nbHeuresPremierMois"
                                                   value={formData.nbHeuresPremierMois}
                                                   onChange={handleChange}/>
                                        </div>
                                        <span ref={nbHeuresPremierMoisRef} className="error-message"></span>
                                    </div>
                                    <div>
                                        <label htmlFor="nbHeuresDeuxiemeMois" style={{display: "block", textAlign: "left"}}>Deuxième mois:</label>
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="nbHeuresDeuxiemeMois"
                                               name="nbHeuresDeuxiemeMois"
                                               value={formData.nbHeuresDeuxiemeMois}
                                               onChange={handleChange}/>
                                        <span ref={nbHeuresDeuxiemeMoisRef} className="error-message"></span>
                                    </div>
                                    <div>
                                        <label htmlFor="nbHeuresTroisiemeMois" style={{display: "block", textAlign: "left"}}>Troisième mois:</label>
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="nbHeuresTroisiemeMois"
                                               name="nbHeuresTroisiemeMois"
                                               value={formData.nbHeuresTroisiemeMois}
                                               onChange={handleChange}/>
                                        <span ref={nbHeuresTroisiemeMoisRef} className="error-message"></span>
                                    </div>
                                </div>

                                <div className='questionStyle'>
                                    <label htmlFor="environnementRespecteNormes">L’environnement de travail respecte les normes d’hygiène et de sécurité au travail.</label>
                                    {renderDropdown("environnementRespecteNormes")}
                                    <span ref={environnementRespecteNormesRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="climatEstAgreable">Le climat de travail est agréable.</label>
                                    {renderDropdown("climatEstAgreable")}
                                    <span ref={climatEstAgreableRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="accessibleParTransportEnCommun">Le milieu de stage est accessible par transport en commun</label>
                                    {renderDropdown("accessibleParTransportEnCommun")}
                                    <span ref={accessibleParTransportEnCommunRef} className="error-message"></span>
                                </div>


                                <div className='questionStyle'>
                                    <label htmlFor="salaireInteressant">Le salaire offert est intéressant pour le stagiaire</label>
                                    {renderDropdown("salaireInteressant")}
                                    <span ref={salaireInteressantRef} className="error-message"></span>
                                </div>
                                <div>
                                    <div className='questionStyle px-3'>
                                        <label htmlFor="salaireInteressant">Préciser:</label>
                                        <div className="row" style={{width: "50%"}}>
                                            <input className='form-control saisie saisie-user px-3 m-0' type='number'
                                                   style={{color: 'grey', fontSize: '20px'}}
                                                   id="preciserSalaire"
                                                   name="preciserSalaire"
                                                   value={formData.preciserSalaire}
                                                   onChange={handleChange}/>
                                            $/l'heure.
                                        </div>
                                    </div>
                                    <span ref={preciserSalaireHeureRef} className="error-message"></span>
                                </div>


                                <div className='questionStyle'>
                                    <label htmlFor="communicationFaciliteDeroulement">La communication avec le superviseur de stage facilite le déroulement</label>
                                    {renderDropdown("communicationFaciliteDeroulement")}
                                    <span ref={communicationFaciliteDeroulementRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="equipementFourniEstAdequat">L'équipement fourni est adéquat pour réaliser les tâches confiées</label>
                                    {renderDropdown("equipementFourniEstAdequat")}
                                    <span ref={equipementFourniEstAdequatRef} className="error-message"></span>
                                </div>
                                <div className='questionStyle'>
                                    <label htmlFor="volumeDeTravailEstAcceptable">Le volume de travail est acceptable</label>
                                    {renderDropdown("volumeDeTravailEstAcceptable")}
                                    <span ref={volumeDeTravailEstAcceptableRef} className="error-message"></span>
                                </div>

                                <div className='questionStyle'>
                                    <label htmlFor="commentaires">COMMENTAIRES</label>
                                    <textarea id="commentaires" name="commentaires"
                                              value={formData.commentaires}
                                              onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{display: "block", textAlign: "left"}}><b>OBSERVATIONS GÉNÉRALES</b></label>

                            <div>
                                <div className='questionStyle'>
                                    <label htmlFor="nbStage">Ce milieu est à privilégier pour le:</label>
                                    {renderChoixNbStages("nbStage")}
                                    <span ref={nbStagesRef} className="error-message"></span>
                                </div>

                                <div className='questionStyle'>
                                    <label htmlFor="nbStagiaires">Ce milieu est ouvert à accueillir:</label>
                                    {renderChoixStagiaires("nbStagiaires")}
                                    <span ref={nbStagiairesRef} className="error-message"></span>
                                </div>

                                <div className='questionStyle'>
                                    <label htmlFor="desireAcueillirMemeStagiaire">Ce milieu désire accueillir le même stagiaire pour un prochain stage:</label>
                                    <label>
                                        <input type="radio" name="desireAcueillirMemeStagiaire" value="OUI" onChange={handleChange}/>
                                        Oui
                                    </label>
                                    <label>
                                        <input type="radio" name="desireAcueillirMemeStagiaire" value="NON" onChange={handleChange}/>
                                        Non
                                    </label>
                                    <span ref={desireAcueillirMemeStagiaireRef} className="error-message"></span>
                                </div>

                                <div className='questionStyle'>
                                    <label htmlFor="offreQuartsVariables">Ce milieu offre des quarts de travail variables:</label>
                                    <label>
                                        <input type="radio" name="offreQuartsVariables" value="OUI" onChange={handleChange}/>
                                        Oui
                                    </label>
                                    <label>
                                        <input type="radio" name="offreQuartsVariables" value="NON" onChange={handleChange}/>
                                        Non
                                    </label>
                                    <span ref={offreQuartsVariablesRef} className="error-message"></span>
                                </div>

                                <div>
                                    <label className="row px-3">
                                        De:
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="premierQuartDebut"
                                               name="premierQuartDebut"
                                               value={formData.premierQuartDebut}
                                               onChange={handleChange}/>
                                        à
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="premierQuartFin"
                                               name="premierQuartFin"
                                               value={formData.premierQuartFin}
                                               onChange={handleChange}/>
                                    </label>
                                    <span ref={premierQuartDebutRef} className="error-message"></span>
                                    <span ref={premierQuartFinRef} className="error-message"></span>
                                </div>
                                <div>
                                    <label className="row px-3">
                                        De:
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="deuxiemeQuartDebut"
                                               name="deuxiemeQuartDebut"
                                               value={formData.deuxiemeQuartDebut}
                                               onChange={handleChange}/>
                                        à
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="deuxiemeQuartFin"
                                               name="deuxiemeQuartFin"
                                               value={formData.deuxiemeQuartFin}
                                               onChange={handleChange}/>
                                    </label>
                                    <span ref={deuxiemeQuartDebutRef} className="error-message"></span>
                                    <span ref={deuxiemeQuartFinRef} className="error-message"></span>
                                </div>
                                <div>
                                    <label className="row px-3">
                                        De:
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="troisiemeQuartDebut"
                                               name="troisiemeQuartDebut"
                                               value={formData.troisiemeQuartDebut}
                                               onChange={handleChange}/>
                                        à
                                        <input className='form-control saisie saisie-user px-3 m-0' type='time'
                                               style={{color: 'grey', fontSize: '20px', width: "35%"}}
                                               id="troisiemeQuartFin"
                                               name="troisiemeQuartFin"
                                               value={formData.troisiemeQuartFin}
                                               onChange={handleChange}/>
                                    </label>
                                    <span ref={troisiemeQuartDebutRef} className="error-message"></span>
                                    <span ref={troisiemeQuartFinRef} className="error-message"></span>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div>
                            <div className="row">
                                <div className="row">
                                    {
                                        formData.signatureGestionnaire && (
                                            <label style={{display: "block", textAlign: "left"}}>
                                                Signature de l’enseignant responsable du stagiaire:
                                                <img src={formData.signatureGestionnaire} alt="signatureGestionnaire"
                                                     style={{ width: '50px', height: '20px' }} />
                                            </label>
                                        )
                                    }

                                    <div>
                                        <label htmlFor="dateSignatureGestionnaire"
                                               style={{ display: "block", textAlign: "left" }}>Date de la signature:</label>
                                        <input className='form-control saisie saisie-user px-3 m-0' type='date'
                                               placeholder="date signature"
                                               style={{ color: 'grey', fontSize: '20px' }}
                                               id="dateSignatureGestionnaire"
                                               name="dateSignatureGestionnaire"
                                               value={formData.dateSignatureGestionnaire}
                                               onChange={handleChange} />
                                        <span ref={dateSignatureGestionnaireRef} className="error-message"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={handleSubmit} className='buttonStyle'>Soumettre l'évaluation</button>

                    <PDFDownloadLink
                        document={<GenereEvaluationMilieuStagePDF formData={formData}/>}
                        fileName="evaluation-milieu-stage.pdf">
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

export default EvaluationMilieuStageForm
