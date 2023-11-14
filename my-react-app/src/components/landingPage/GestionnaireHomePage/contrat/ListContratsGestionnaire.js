import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
const ListContratsGestionnaire = ({contratsTest}) => {
    const [contrats, setContrats] = useState(contratsTest)
    const [filtre, setFiltre] = useState('')
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState("");
    const [contrat, setContrat] = useState(null)

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchContrats()
    }, []);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const fetchContrats = async () => {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/getContrats`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json()
                            setContrats(data)
                            console.log(data)
                        }
                        else {
                            const data = await res.json();
                            console.log('Erreur', res.status, data);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            setContrats(contratsTest)
            console.log(contrats)
        }
    }

    const handleSignerContrat = async (contrat) => {
        console.log(contrat)
        const token = localStorage.getItem('token');
        try{
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/signContract`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
                    body : JSON.stringify(contrat)
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json();
                        } else {
                            console.error("Failed to fetch data");
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
        }

    const handleAcceptConfirmation = () => {
        setIsConfirmationModalOpen(false);
        console.log("Accepted")
        let arrTmp = [...contrats]
        let idx = arrTmp.findIndex((x) => x.id === contrat.id)
        arrTmp[idx].statutGestionnaire = 'Signer'
        setContrats(arrTmp)
        handleSignerContrat(contrat)
    };
    
    
    
    const openConfirmationModal = (type, contrat1) => {
        setIsConfirmationModalOpen(true);
        setContrat(contrat1)
        setConfirmationType(type)
        
    };
    
    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="container w-100">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="display-4 text-center">Liste de tous les contrats</h1>
                </div>
                {contrats.length > 0  ?
                    <div className="table-responsive table-container">
                        <div className='text-start mt-3 mb-2'> <label ><h4>Trouver par matricule &nbsp; </h4></label>
                            <input data-testid="input" onChange={ (event)=> setFiltre(event.target.value)}></input>
                        </div>
                        <table className="table w-100 text-start">
                            <thead>
                            <tr>
                                <th className="header-cell h5">Nom, Prénom</th>
                                <th className="header-cell h5">Matricule</th>
                                <th className='header-cell h5'>Nom de compagnie</th>
                                <th className='header-cell h5'>Poste</th>
                                <th className="header-cell h5">Signé par étudiant</th>
                                <th className="header-cell h5">Signé par employeur</th>
                                <th className="header-cell h5" >Signé par gestionnaire</th>
                            </tr>
                            </thead>
                            <tbody className='w-100'>
                            {contrats.length > 0  && contrats.filter(etudiantNf => etudiantNf.studentId.includes(filtre))
                                .map((etudiant, index) => (
                                    <tr key={index} className="table-row align-middle">
                                        <td  data-label="Nom" className="fw-semibold">{etudiant.nomEtudiant + ', ' + etudiant.prenomEtudiant}</td>
                                        <td  data-label="Matricule" className="fw-semibold">{etudiant.studentId}</td>
                                        <td data-label="Poste" className="fw-semibold">{etudiant.nomDeCompanie}</td>
                                        <td  data-label="Matricule" className="fw-semibold">{etudiant.nomDePoste}</td>
                                        <td data-label="Signé par étudiant" className="fw-semibold">{etudiant.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                        <td data-label="Signé par employeur" className="fw-semibold">{etudiant.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                        {
                                    etudiant.statutGestionnaire === 'Pas_Signer' ?
                                    <td data-label="Signé par étudiant"><button className='m-0 text-center btn btn-primary' onClick={()=>openConfirmationModal('accept',etudiant)}><span className='h6'>Signer le contrat</span></button></td>
                                    :
                                    <td data-label="Signé par étudiant" className="fw-semibold">Signé</td>
                                    }
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    : <div>AUCUN CONTRAT À AFFICHER</div> }
            </div>
            <ReactModal
                        isOpen={isConfirmationModalOpen}
                        onRequestClose={closeConfirmationModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Confirmation Modal"
                    >
                        <h2 title="Confirmation modal">Confirmation</h2>
                        {confirmationType === "accept" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir signer le contrat ?</p>
                                <button title="ConfirmAccept" className="btn btn-success" onClick={handleAcceptConfirmation}>
                                    Oui
                                </button>
                            </>
                        ) : (
                            <>
                                <p>Êtes-vous sûr de vouloir refuser  ?</p>
                                <button title="ConfirmRefuse" className="btn btn-danger" >
                                    Oui
                                </button>
                            </>
                        )}
                        <button title="ConfirmNon" className="btn btn-secondary" onClick={closeConfirmationModal}>
                            Non
                        </button>
                    </ReactModal>       
        </div>
    )
}

export default ListContratsGestionnaire
