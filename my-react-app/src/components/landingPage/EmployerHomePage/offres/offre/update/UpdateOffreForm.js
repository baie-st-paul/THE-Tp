import React, {useEffect, useRef, useState} from "react";

const UpdateOffreForm = ({offreStage, onUpdate}) => {
    const [id, setId] = useState(offreStage.id)
    const [titre, setTitre] = useState(offreStage.titre);
    const [description, setDescription] = useState(offreStage.description);
    const [salaire, setSalaire] = useState(offreStage.salaire);
    const [studentProgram, setStudentProgram] = useState(offreStage.studentProgram);
    const [dateDebut, setDateDebut] = useState(offreStage.dateDebut);
    const [dateFin, setDateFin] = useState(offreStage.dateFin);
    const [nbMaxEtudiants, setNbMaxEtudiants] = useState('');

    const titreRef = useRef(null);
    const descriptionRef = useRef(null);
    const salaireRef = useRef(null)
    const studentProgramRef = useRef(null);
    const dateDebutRef = useRef(null);
    const dateFinRef = useRef(null);
    const nbMaxEtudiantsRef = useRef(null);

    useEffect(() => {
        setId(offreStage.id)
        setTitre(offreStage.titre)
        setDescription(offreStage.description)
        setSalaire(offreStage.salaire)
        setStudentProgram(offreStage.studentProgram)
        setDateDebut(offreStage.dateDebut)
        setDateFin(offreStage.dateFin)
        setNbMaxEtudiants(offreStage.nbMaxEtudiants)
    }, []);


    const onSubmit = (e) => {
        e.preventDefault()

        let annuler = false;

        if (
            !titre ||
            !description ||
            !salaire ||
            !studentProgram ||
            !dateDebut ||
            !dateFin ||
            !nbMaxEtudiants
        ) {
            annuler = true;
        }

        if (titre.trim() === ''){
            titreRef.current.innerHTML  = "* Veuillez entrer le titre d'emploi *";
        }else{
            titreRef.current.innerHTML  = "";
        }
        if (description.trim() === ''){
            descriptionRef.current.innerHTML = "* Veuillez entrer la description d'emploi *"
        }else {
            descriptionRef.current.innerHTML = ""
        }
        if (salaire === ''){
            salaireRef.current.innerHTML = " * Veuillez entrer le salaire d'emploi *"
        }else{
            salaireRef.current.innerHTML = ""
        }
        if (studentProgram.trim() === ''){
            studentProgramRef.current.innerHTML = " * Veuillez choisir le type d'etudiant *"
        }else {
            studentProgramRef.current.innerHTML = ""
        }
        if (salaire === 0){
            salaireRef.current.innerHTML = " * Salaire invalide *"
        }
        if(dateDebut.trim() === ''){
            dateDebutRef.current.innerHTML = " * Veuillez entrer la date de debut *"
        }else {
            dateDebutRef.current.innerHTML = ""
        }

        if(dateFin.trim() === ''){
            dateFinRef.current.innerHTML = " * Veuillez entrer la date de fin *"
        }else {
            dateFinRef.current.innerHTML = ""
        }

        if (nbMaxEtudiants === ''){
            nbMaxEtudiantsRef.current.innerHTML = " * Veuillez entrer le nombre max. d’étudiants *"
        }else {
            nbMaxEtudiantsRef.current.innerHTML = ""
        }

        if (annuler === true) {
        } else {
            onUpdate({
                id,
                titre,
                description,
                salaire,
                studentProgram,
                dateDebut,
                dateFin,
                nbMaxEtudiants
            })
        }
    }

    return (
        <div className="root vh-100">
            <div className='fondIU'>
                <div className="divForm">
                    <form autoComplete="off" name='abc'  id="formm"  className='form font add-form' onSubmit={onSubmit}>
                        <h2 className="h3 font text-center">METTRE A JOUR UNE OFFRE D'EMPLOI</h2>
                        <div className="w-100">
                            <div  className='form-group'>
                                <input ref={titreRef} className='form-control saisie saisie-user px-3 mb-0' type='text' placeholder="Titre"
                                       value={titre}
                                       onChange={(e) => setTitre(e.target.value)}/>
                                <p ref={titreRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <textarea
                                    className="form-control saisie saisie-user px-3 m-0"
                                    placeholder='Description sommaire'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <p ref={descriptionRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='number' placeholder='Salaire offert'
                                       value={salaire}
                                       onChange={(e) => setSalaire(e.target.value)} />
                                <p ref={salaireRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <div className='form-group'>
                                <select
                                    className='form-control saisie saisie-user px-3 m-0' style={{color: 'grey', fontSize : '20px'}}
                                    value={studentProgram}
                                    onChange={(e) => setStudentProgram(e.target.value)}>
                                    <option  disabled={true} value="" style={{color: 'grey'}}>Type etudiant</option>
                                    <option value="Informatique">Informatique</option>
                                    <option value="Architecture">Architecture</option>
                                </select>
                                <p ref={studentProgramRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <div className='form-group'>
                                <input
                                    className='form-control saisie saisie-user px-3 m-0'
                                    type='number'
                                    placeholder='Nombre max. d’étudiants'
                                    style={{color: 'grey', fontSize : '20px'}}
                                    value={nbMaxEtudiants}
                                    onChange={(e) => setNbMaxEtudiants(e.target.value)}
                                />
                                <p ref={nbMaxEtudiantsRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder='Date de debut'
                                       style={{color: 'grey', fontSize : '20px'}}
                                       value={dateDebut}
                                       onChange={(e) => setDateDebut(e.target.value)}/>
                                <p ref={dateDebutRef} className="font px-1 textAvertissement text-danger"></p>

                                <input className="form-control saisie saisie-user px-3 m-0" type="date" placeholder="Date de fin"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       value={dateFin}
                                       onChange={(e) => setDateFin(e.target.value)}/>
                                <p ref={dateFinRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <input type='submit' value="Mettre à jour l'offre" className='btn btn-block bg-black text-light m-0 mb-2'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateOffreForm;
