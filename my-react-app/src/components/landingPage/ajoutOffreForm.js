import {useRef, useState} from "react";
import "../utilisateurs/inscription/InscriptionPage.css"
import "../stylesGenerales.css"
import {Link} from "react-router-dom";

const AjoutOffreForm = ({onAdd}) => {

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [salaire, setSalaire] = useState('');
    const [typeEtudiant, setTypeEtudiant] = useState('');
    const titreRef = useRef(null);
    const descriptionRef = useRef(null);
    const salaireRef = useRef(null)
    const typeEtudiantRef = useRef(null);

    const validSalaire = salaire.match(/^[0-9\b\$]+$/);
    const onSubmit = (e) => {
        e.preventDefault()

        let annuler = false;

        if (
            !titre ||
            !description ||
            !salaire ||
            !typeEtudiant     
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
        if (salaire.trim() === ''){
            salaireRef.current.innerHTML = " * Veuillez entrer le salaire d'emploi *"
        }else{
            salaireRef.current.innerHTML = ""
        }
        if (typeEtudiant.trim() === ''){
            typeEtudiantRef.current.innerHTML = " * Veuillez choisir le type d'etudiant *"
        }else {
            typeEtudiantRef.current.innerHTML = ""
        }
        if (salaire.trim()!== '' && !validSalaire){
            salaireRef.current.innerHTML = " * Salaire invalide *"
        }

        if (annuler === true) {
        } else {
            onAdd({
             titre,
             description,
             salaire,
             typeEtudiant
            })
        }
    }

    return (
        <div className="root vh-100">
            <div className='fondIU'>
                <div className="divForm">
                    <form autoComplete="off" name='abc'  id="formm"  className='form font add-form' onSubmit={onSubmit}>
                        <h2 className="h3 font text-center">AJOUTER UN OFFRE D'EMPLOI</h2>
                        <div className="w-100">
                            <div  className='form-group'>
                                <input ref={titreRef} className='form-control saisie saisie-user px-3 mb-0' type='text' placeholder="Titre"
                                       value={titre}
                                       onChange={(e) => setTitre(e.target.value)}/>
                                <p ref={titreRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder='Description sommaire'
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                                <p ref={descriptionRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder='Salaire offert' 
                                       value={salaire}
                                       onChange={(e) => setSalaire(e.target.value)} />
                                <p ref={salaireRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                          
                            <div className='form-group'>
                                <select
                                    className='form-control saisie saisie-user px-3 m-0' style={{color: 'grey', fontSize : '20px'}}
                                    value={typeEtudiant}
                                    onChange={(e) => setTypeEtudiant(e.target.value)}>
                                    <option  disabled={true} value=""><span style={{color: 'grey'}}>Type etudiant</span></option>
                                    <option value="Informatique">Informatique</option>
                                    <option value="Architecture">Architecture</option>
                                </select>
                                <p ref={typeEtudiantRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <input type='submit' value="Ajouter l'offre" className='btn btn-block bg-black text-light m-0 mb-2'/>
                            <Link to='/' className='btn btn-block bg-danger m-0 mt-0 text-light'>
                                <span style={{fontSize : '20px'}}>Retour</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AjoutOffreForm;
