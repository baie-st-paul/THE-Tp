import {useRef, useState} from "react";
import "../InscriptionPage.css"
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {Link} from "react-router-dom";
import '../../../stylesGenerales.css'

const InscriptionFormE = ({onAdd}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [matricule, setMatricule] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [program, setProgram] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const matriculeRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const programRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const showPasswRef = useRef(null);
    const showPassConfwRef = useRef(null);

    const validMatricule = matricule.match(/^[0-9\b]+$/);
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
    const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$');

    const onSubmit = (e) => {
        e.preventDefault()

        let annuler = false;

        if (
            !firstName ||
            !lastName ||
            !matricule ||
            !email ||
            !phoneNumber ||
            !program ||
            !password ||
            !confirmPassword
        ) {
            annuler = true;
        }

        if (
            firstName.trim() === ''
        ) {
            firstNameRef.current.innerHTML  = '* Veuillez entrer votre prenom *';
        } else {
            firstNameRef.current.innerHTML = '';
        }

        if(lastName.trim() === '') {
            lastNameRef.current.innerHTML = '* Veuillez entrer votre nom *';
        } else {
            lastNameRef.current.innerHTML = ''
        }

        if (matricule.trim() === '') {
            matriculeRef.current.innerHTML = '* Veuillez entrer votre matricule *';
        } else {
            matriculeRef.current.innerHTML = '';
        }

        if (matricule.trim() !== '' && !validMatricule) {
            matriculeRef.current.innerHTML = '* Matricule invalide *';
        }

        if (matricule.trim() !== '' && matricule.length !== 7) {
            matriculeRef.current.innerHTML = '* Matricule doit être d\'une longueur de 7 *';
            annuler = true;
        }

        if (email.trim() === '') {
            emailRef.current.innerHTML = '* Veuillez entrer votre émail';
        } else {
            emailRef.current.innerHTML = ''
        }

        if (email.trim()!== '' && !validEmail) {
            emailRef.current.innerHTML = '* Email n\'est pas valide *';
        }

        if (phoneNumber.trim()=== '') {
            phoneNumberRef.current.innerHTML = '* Veuillez entrer votre numéro de téléphone *'
        }
        else {
            phoneNumberRef.current.innerHTML = '';
        }

        if (phoneNumber.trim()!=='' && !isValidPhoneNumber(phoneNumber)) {
            phoneNumberRef.current.innerHTML = '* Le numero de telephone n\'est pas valide *'
            annuler = true;
        }

        if (program.trim() === '') {
            programRef.current.innerHTML = '* Veuillez entrer votre programme d\'étude *'
        } else {
            programRef.current.innerHTML = '';
        }

        if (password.trim() ==='') {
            passwordRef.current.innerHTML = '* Veuillez entrer votre mot de passe *'
        } else {
            passwordRef.current.innerHTML = '';
        }

        if (confirmPassword.trim() === '') {
            confirmPasswordRef.current.innerHTML = '* Veuillez entrer la confirmation de mot de passe *'
        } else {
            confirmPasswordRef.current.innerHTML ='';
        }

        if (password.trim()!=='' && !validPassword) {
            passwordRef.current.innerHTML = '* Le mot de passe doit etre de 6-20 caractères, 1 caractère special et 1 caractère en majuscule *'
            annuler = true;
        }

        if (confirmPassword.trim()!=='' && password.trim()!== '' && confirmPassword !== password) {
            confirmPasswordRef.current.innerHTML = '* La confirmation est différente du mot de passe *'
            annuler = true
        } else {
            confirmPasswordRef.current.innerHTML = '';
        }

        if (annuler === true) {
        } else {
            onAdd({
                firstName,
                lastName,
                matricule,
                email,
                phoneNumber,
                program,
                password
            })
        }
    }

    function showPass(){
        if (showPasswRef.current.type === "password") {
            showPasswRef.current.type = "text";
        } else {
            showPasswRef.current.type = "password";
        }
        if (showPassConfwRef.current.type === "password") {
            showPassConfwRef.current.type = "text";
        } else {
            showPassConfwRef.current.type = "password";
        }
    }

    return (
        <div className="root vh-100">
            <div className='fondIU'>
                <div className="divForm">
                    <form autoComplete="off" name='abc'  id="formm"  className='form font add-form' onSubmit={onSubmit}>
                        <h2 className="h3 text-center">INSCRIPTION ÉTUDIANT</h2>
                        <div className="w-100">
                            <div  className='form-group'>
                                <input ref={firstNameRef} className='form-control saisie saisie-user px-3 mb-0' type='text' placeholder='Prénom'
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>
                                <p ref={firstNameRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder='Nom de famille'
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>
                                <p ref={lastNameRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder='Matricule'
                                       value={matricule}
                                       onChange={(e) => setMatricule(e.target.value)}/>
                                <p ref={matriculeRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text' placeholder='Email'
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <p ref={emailRef} className="font px-1 textAvertissement text-danger"></p>
                                <select
                                    className='form-control saisie saisie-user px-3 m-0'
                                    value={program}
                                    onChange={(e) => setProgram(e.target.value)}>
                                    <option disabled={true} value="">Programme d'étude</option>
                                    <option value="Informatique">Informatique</option>
                                    <option value="Architecture">Architecture</option>
                                </select>
                                <p ref={programRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div>
                                <PhoneInput
                                    className="form-group"
                                    placeholder="Entrer numéro téléphone"
                                    defaultCountry="CA"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}/>
                                <p ref={phoneNumberRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user m-0' type='text' placeholder='Programme étude'
                                       value={program}
                                       onChange={(e) => setProgram(e.target.value)}/>
                                <p ref={programRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input ref={showPasswRef} id="pass" className='form-control saisie saisie-psw m-0' type='password' placeholder='Mot de passe'
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <p ref={passwordRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>
                            <div className='form-group'>
                                <input ref={showPassConfwRef} id="passC" className='form-control saisie saisie-psw m-0' type='password' placeholder='Confirmer le mot de passe'
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <p ref={confirmPasswordRef} className="font px-1 textAvertissement text-danger"></p>
                                <div className="d-flex justify-content-end pt-0 pb-3">
                                    <h5 className="font px-3 pt-2 ">AFFICHER LE MOT DE PASSE</h5>
                                    <input onClick={showPass} className='mdp' type="checkbox" />
                                </div>
                            </div>
                            <input type='submit' value='Inscription' className='btn btn-block bg-black text-light m-0 mb-2'/>
                            <Link to='/' className='btn btn-block bg-danger m-0 mt-0 text-light'>
                                <span style={{fontSize : '20px'}}> Retour</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InscriptionFormE
