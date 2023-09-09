import {useState} from "react";
import "./InscriptionPage.css"
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const InscriptionForm = ({onAdd}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [matricule, setMatricule] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [program, setProgram] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validMatricule = matricule.match(/^[0-9\b]+$/);
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);

    const onSubmit = (e) => {
        e.preventDefault()
        if (
            !firstName &&
            !lastName &&
            !matricule &&
            !email &&
            !phoneNumber &&
            !program &&
            !password &&
            !confirmPassword
        ) {
            alert('Veuillez remplir tous les champs d\'inscription')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !firstName
        ) {
            alert('Veuillez ajouter le prenom')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !lastName
        ) {
            alert('Veuillez ajouter le nom de famille')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !matricule
        ) {
            alert('Veuillez ajouter la matricule')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !email
        ) {
            alert('Veuillez ajouter l\'email')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !phoneNumber
        ) {
            alert('Veuillez ajouter le numero de téléphone')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !program
        ) {
            alert('Veuillez ajouter le programme d\'étude')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !password
        ) {
            alert('Veuillez ajouter le mot de passe')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (
            !confirmPassword
        ) {
            alert('Veuillez ajouter la confirmation du mot de passe')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (!validMatricule) {
            alert('La matricule doit seulement avoir des chiffres')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (matricule.length !== 7) {
            alert('La matricule doit être d\'une longueur de 7')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (!validEmail) {
            alert('Email invalide')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if(!isValidPhoneNumber(phoneNumber)) {
            alert('Le numéro de téléphone est invalide')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        if (password.length < 6) {
            alert('Mot de passe trop petit')
            setFirstName('')
            setLastName('')
            setMatricule('')
            setEmail('')
            setPhoneNumber('')
            setProgram('')
            setPassword('')
            setConfirmPassword('')
            return
        }

        onAdd({
            firstName,
            lastName,
            matricule,
            email,
            phoneNumber,
            program,
            password
        })
        setFirstName('')
        setLastName('')
        setMatricule('')
        setEmail('')
        setPhoneNumber('')
        setProgram('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="root border vh-100  ">
        <div className='card-body fondIU'>
           <div className="divForm">
            <form autoComplete="off" className='form font add-form' onSubmit={onSubmit}>
            <h1 className="font text-center">Inscription Etudiant</h1>
                <div className='form-group '>
                    <input className='form-control saisie saisie-user ' type='text' placeholder='prenom'
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='nom de famille'
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}/>
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
                <PhoneInput
                    placeholder="Entrer numéro téléphone"
                    defaultCountry="CA"
                    value={phoneNumber}
                    onChange={setPhoneNumber}/>
                <div className='form-group'>
                    <input className='form-control saisie saisie-user' type='text' placeholder='programme étude'
                           value={program}
                           onChange={(e) => setProgram(e.target.value)}/>
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
