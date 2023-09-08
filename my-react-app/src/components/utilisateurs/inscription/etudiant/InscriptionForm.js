import {useState} from "react";
import "./InscriptionPage.css"

//const InscriptionForm = ({onAdd}) => {
const InscriptionForm = () => {
    const [prenom, setPrenom] = useState('');
    const [nomFamille, setNomFamille] = useState('');
    const [matricule, setMatricule] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [programmeEtude, setProgrammeEtude] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if (
            !prenom &&
            !nomFamille &&
            !matricule &&
            !email &&
            !telephone &&
            !programmeEtude &&
            !password &&
            !confirmPassword
        ) {
            alert('Veuillez remplir tous les champs d\'inscription')
            return
        }

        if (
            !prenom
        ) {
            alert('Veuillez ajouter le prenom')
           
        }

        if (
            !nomFamille
        ) {
            alert('Veuillez ajouter le nom de famille')
           
        }

        if (
            !matricule
        ) {
            alert('Veuillez ajouter la matricule')
           
        }

        if (
            !email
        ) {
            alert('Veuillez ajouter l\'email')
          
        }

        if (
            !telephone
        ) {
            alert('Veuillez ajouter le numero de téléphone')
           
        }

        if (
            !programmeEtude
        ) {
            alert('Veuillez ajouter le programme d\'étude')
           
        }

        if (
            !password
        ) {
            alert('Veuillez ajouter le mot de passe')
           
        }

        if (
            !confirmPassword
        ) {
            alert('Veuillez ajouter la confirmation du mot de passe')
           
        }

        /*onAdd({
            prenom,
            nomFamille,
            matricule,
            email,
            telephone,
            programmeEtude,
            password,
            confirmPassword
        })*/
        setPrenom('')
        setNomFamille('')
        setMatricule('')
        setEmail('')
        setTelephone('')
        setProgrammeEtude('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="root border  vh-100  ">
        <div className='card-body fondIU '>
           <div className="divForm">
            <form autoComplete="off" className='form font add-form' onSubmit={onSubmit}>
            <h1 className="font text-center">Inscription Etudiant</h1>
                <div className='form-group '>
                    <input className='form-control saisie saisie-user ' type='text' placeholder='prenom'
                           value={prenom}
                           onChange={(e) => setPrenom(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='nom de famille'
                           value={nomFamille}
                           onChange={(e) => setNomFamille(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='matricule'
                           value={matricule}
                           onChange={(e) => setMatricule(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='telephone'
                           value={telephone}
                           onChange={(e) => setTelephone(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='programme étude'
                           value={programmeEtude}
                           onChange={(e) => setProgrammeEtude(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-psw' type='password' placeholder='mot de passe'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-psw' type='password' placeholder='confirmer le mot de passe'
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <input type='submit' value='Inscription' className='btn btn-block bg-black text-light m-0'/>
            </form>
        </div>
        </div>
        </div>
    )
}

export default InscriptionForm
