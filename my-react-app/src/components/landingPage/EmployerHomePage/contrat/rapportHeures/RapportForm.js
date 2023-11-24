import React, { useState, useRef } from 'react';
import RapportPDF from './RapportPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const RapportForm = ({ onSubmit }) => {
    const initialState = {
        nomEmployeur: " ",
        nomSuperviseur: " ",
        titre: " ",
        nomStagiaire: " ",
        semaines: Array(15).fill({ semaineDe: '', semaineAu: '', heuresReelles: '', heuresSupervision: '' }),
        signature: " ",
        fonction: " "
    }

    const [formData, setFormData] = useState(initialState)
    const [signature, setSignature] = useState('');
    const employerId = localStorage.getItem('employer_id');
    const token = localStorage.getItem('token');

    const nomEmployeurRef = useRef(null);
    const nomSuperviseurRef = useRef(null);
    const titreRef = useRef(null);
    const nomStagiaireRef = useRef(null);
    const signatureRef = useRef(null);
    const fonctionRef = useRef(null);

    const handleSignature = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/stages/signatures/employer/get/${employerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });

            if (!response.ok) {
                throw new Error('Erreur de réseau ou réponse non-OK du serveur');
            }

            const data = await response.json();
            const base64Signature = data.imageLink;

            if (base64Signature && !base64Signature.startsWith('data:image')) {
                setSignature(`data:image/png;base64,${base64Signature}`);
            } else {
                setSignature(base64Signature);
                setFormData(prevState => ({
                    ...prevState,
                    signature: base64Signature
                }));
            }

        } catch (error) {
            console.error('Erreur lors de la récupération de la signature:', error);
            setSignature(null);
        }
    };

    const handleChange = (e, rowIndex, key) => {
        const { value } = e.target;
        setFormData((prevFormData) => {
            const updatedTableData = [...prevFormData.semaines];
            updatedTableData[rowIndex] = { ...updatedTableData[rowIndex], [key]: value };

            if (key === 'semaineDe' && updatedTableData[rowIndex].semaineDe !== '') {
                const firstDate = new Date(updatedTableData[rowIndex].semaineDe);
                const secondDate = new Date(firstDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                updatedTableData[rowIndex].semaineAu = secondDate.toISOString().split('T')[0];
            }

            return { ...prevFormData, semaines: updatedTableData };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formIsValid = true;

        if (formData.nomEmployeur.trim() === "") {
            formIsValid = false;
            nomEmployeurRef.current.innerHTML = "Le nom de l'employeur est requis";
            nomEmployeurRef.current.focus();
        } else {
            nomEmployeurRef.current.innerHTML = "";
        }

        if (formData.nomSuperviseur.trim() === "") {
            formIsValid = false;
            nomSuperviseurRef.current.innerHTML = "Le nom du superviseur est requis";
            nomSuperviseurRef.current.focus();
        } else {
            nomSuperviseurRef.current.innerHTML = "";
        }

        if (formData.titre.trim() === "") {
            formIsValid = false;
            titreRef.current.innerHTML = "Le titre est requis";
            titreRef.current.focus();
        } else {
            titreRef.current.innerHTML = "";
        }

        if (formData.nomStagiaire.trim() === "") {
            formIsValid = false;
            nomStagiaireRef.current.innerHTML = "Le nom du stagiaire est requis";
            nomStagiaireRef.current.focus();
        } else {
            nomStagiaireRef.current.innerHTML = "";
        }

        if (formData.signature.trim() === "") {
            formIsValid = false;
            signatureRef.current.innerHTML = "La signature est requise";
            signatureRef.current.focus();
        } else {
            signatureRef.current.innerHTML = "";
        }

        if (formData.fonction.trim() === "") {
            formIsValid = false;
            fonctionRef.current.innerHTML = "La fonction est requise";
            fonctionRef.current.focus();
        } else {
            fonctionRef.current.innerHTML = "";
        }

        if (formIsValid) {
            onSubmit(formData);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom Employeur:
                    <input
                        type="text"
                        name="nomEmployeur"
                        value={formData.nomEmployeur}
                        onChange={(e) => setFormData({ ...formData, nomEmployeur: e.target.value })}
                    />
                    <span ref={nomEmployeurRef}></span>
                </label>
                <label>
                    Nom Superviseur:
                    <input
                        type="text"
                        name="nomSuperviseur"
                        value={formData.nomSuperviseur}
                        onChange={(e) => setFormData({ ...formData, nomSuperviseur: e.target.value })}
                    />
                    <span ref={nomSuperviseurRef}></span>
                </label>
                <label>
                    Titre:
                    <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    />
                    <span ref={titreRef}></span>
                </label>
                <label>
                    Nom Stagiaire:
                    <input
                        type="text"
                        name="nomStagiaire"
                        value={formData.nomStagiaire}
                        onChange={(e) => setFormData({ ...formData, nomStagiaire: e.target.value })}
                    />
                    <span ref={nomStagiaireRef}></span>
                </label>

                <table>
                    <thead>
                    <tr>
                        <th>Semaine de</th>
                        <th>Semaine au</th>
                        <th>Heures réelles travaillées</th>
                        <th>Heures réelles de supervision directe</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData.semaines.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <input
                                    type="date"
                                    value={rowData.semaineDe}
                                    onChange={(e) => handleChange(e, rowIndex, 'semaineDe')}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={rowData.semaineAu}
                                    onChange={(e) => handleChange(e, rowIndex, 'semaineAu')}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={rowData.heuresReelles}
                                    onChange={(e) => handleChange(e, rowIndex, 'heuresReelles')}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={rowData.heuresSupervision}
                                    onChange={(e) => handleChange(e, rowIndex, 'heuresSupervision')}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className='signatureContainer'>
                    Signature:
                    {signature ? (
                        <img src={signature} alt="Signature" style={{ width: '100px', height: '50px' }} />
                    ) : (
                        <button type="button" onClick={handleSignature} className='signatureContainer buttonStyleSignature'>
                            Signer
                        </button>
                    )}
                    <span ref={signatureRef} className="error-message"></span>
                </div>


                <label>
                    Fonction:
                    <input
                        type="text"
                        name="fonction"
                        value={formData.fonction}
                        onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                    />
                    <span ref={fonctionRef}></span>
                </label>

                <button type="submit">Submit</button>
                <div className="text-center" style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
                    <strong>Note: </strong>
                    Veuillez retourner ce formulaire complété dès la fin du stage
                </div>
            </form>
            
            <PDFDownloadLink
                        document={<RapportPDF formData={formData} />}
                        fileName="rapport-heures.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Chargement du document...' : 'Télécharger en PDF')}
            </PDFDownloadLink>
        </div>
    );
}

export default RapportForm;