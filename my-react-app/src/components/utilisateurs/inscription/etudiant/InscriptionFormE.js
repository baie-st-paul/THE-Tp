import {useRef, useState} from "react";
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {Link} from "react-router-dom";
import "../../login/pages/Connexion.css"

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
    const validName = firstName.match(/^[a-z ,.'-]+$/i);
    const validLastName = lastName.match(/^[a-z ,.'-]+$/i);
    const validMatricule = matricule.match(/^[0-9\b]+$/);
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
    const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$');

    const role = "Student"
    const userType = {
        matricule: matricule,
        program: program
    }

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
            annuler = true;
            firstNameRef.current.innerHTML  = '* Veuillez entrer votre prenom *';
        } else {
            firstNameRef.current.innerHTML = '';
        }

        if(lastName.trim() === '') {
            annuler = true;
            lastNameRef.current.innerHTML = '* Veuillez entrer votre nom *';
        } else {
            lastNameRef.current.innerHTML = ''
        }

        if (firstName.trim() !== '' && !validName){
            firstNameRef.current.innerHTML  = '* Prenom invalide *';
            annuler = true;
        }
        if (lastName.trim() !== '' && !validLastName){
            lastNameRef.current.innerHTML = '* Nom invalide *';
            annuler = true;
        }

        if (matricule.trim() === '') {
            annuler = true;
            matriculeRef.current.innerHTML = '* Veuillez entrer votre matricule *';
        } else {
            matriculeRef.current.innerHTML = '';
        }

        if (matricule.trim() !== '' && !validMatricule) {
            annuler = true;
            matriculeRef.current.innerHTML = '* Matricule invalide *';
        }

        if (matricule.trim() !== '' && matricule.length !== 7) {
            annuler = true;
            matriculeRef.current.innerHTML = '* Matricule doit être d\'une longueur de 7 *';
            annuler = true;
        }

        if (email.trim() === '') {
            annuler = true;
            emailRef.current.innerHTML = '* Veuillez entrer votre email *';
        } else {
            emailRef.current.innerHTML = ''
        }

        if (email.trim()!== '' && !validEmail) {
            annuler = true;
            emailRef.current.innerHTML = '* Email n\'est pas valide *';
        }

        if (phoneNumber.trim()=== '') {
            annuler = true;
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
            annuler = true;
            programRef.current.innerHTML = '* Veuillez entrer votre programme d\'étude *'
        } else {
            programRef.current.innerHTML = '';
        }

        if (password.trim() ==='') {
            annuler = true;
            passwordRef.current.innerHTML = '* Veuillez entrer votre mot de passe *'
        } else {
            passwordRef.current.innerHTML = '';
        }

        if (confirmPassword.trim() === '') {
            annuler = true;
            confirmPasswordRef.current.innerHTML = '* Veuillez entrer la confirmation de mot de passe *'
        } else {
            confirmPasswordRef.current.innerHTML ='';
        }

        if (password.trim()!=='' && !validPassword) {
            annuler = true;
            passwordRef.current.innerHTML = '* Le mot de passe doit etre de 6-20 caractères, 1 caractère special et 1 caractère en majuscule *'
            annuler = true;
        }

        if (confirmPassword.trim()!=='' && password.trim()!== '' && confirmPassword !== password) {
            annuler = true;
            confirmPasswordRef.current.innerHTML = '* La confirmation est différente du mot de passe *'
            annuler = true
        } else {
            confirmPasswordRef.current.innerHTML = '';
        }

        if (!annuler) {
            onAdd({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role,
                userType
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
        <div>
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                            gap: 16, display: 'flex'}}>
                            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                                gap: 16, display: 'flex'}}>

                                <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                                    display: 'flex'}}>
                                    <div style={{color: '#4A4543', fontSize: 42, fontFamily: 'Roboto', fontWeight: '400',
                                        wordWrap: 'break-word'}}>Bienvenue étudiant</div>
                                    <div style={{color: '#808080', fontSize: 16, fontFamily: 'Roboto', fontWeight: '400',
                                        letterSpacing: 0.16, wordWrap: 'break-word'}}>Veuillez entrer vos informations.</div>
                                </div>

                                <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                                    gap: 10, display: 'flex'}}>

                                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8,
                                        display: 'inline-flex'}}>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex', width: 220}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Prénom</label>

                                            <input ref={firstNameRef} className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='text' placeholder='Entrer le prénom'
                                                   value={firstName}
                                                   onChange={(e) => setFirstName(e.target.value)}/>
                                            <p ref={firstNameRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Nom de famille</label>

                                            <input className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='text' placeholder='Entrer le nom de famille'
                                                   value={lastName}
                                                   onChange={(e) => setLastName(e.target.value)}/>
                                            <p ref={lastNameRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>
                                    </div>

                                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8,
                                        display: 'inline-flex'}}>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Matricule</label>

                                            <input className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='text' placeholder='Entrer la matricule'
                                                   value={matricule}
                                                   onChange={(e) => setMatricule(e.target.value)}/>
                                            <p ref={matriculeRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Programme d'étude</label>

                                            <select
                                                className='form-control m-0 inputStyle'
                                                style={{width: 220, height: 43}}
                                                value={program}
                                                onChange={(e) => setProgram(e.target.value)}>

                                                <option disabled={true} value="">Sélectionner</option>
                                                <option value="Informatique">Informatique</option>
                                                <option value="Architecture">Architecture</option>
                                            </select>
                                            <p ref={programRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>
                                    </div>

                                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8,
                                        display: 'inline-flex'}}>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex', width: 220}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Numéro de téléphone</label>

                                            <PhoneInput
                                                className="form-group m-0"
                                                style={{width: 220, borderRadius: 8, border: '1px #DADADA solid'}}
                                                placeholder="Entrer num."
                                                defaultCountry="CA"
                                                value={phoneNumber}
                                                onChange={setPhoneNumber}/>
                                            <p ref={phoneNumberRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Email</label>

                                            <input className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='text' placeholder='Entrer l’email'
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}/>
                                            <p ref={emailRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>
                                    </div>

                                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8,
                                        display: 'inline-flex'}}>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex', width: 220}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Mot de passe</label>

                                            <input ref={showPasswRef} className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='password' placeholder='Entrer le mot de passe'
                                                   value={password}
                                                   onChange={(e) => setPassword(e.target.value)}/>
                                            <p ref={passwordRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>

                                        <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                            alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                            <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Confirmer le mot de passe</label>

                                            <input ref={showPassConfwRef} className='form-control m-0 inputStyle'
                                                   style={{width: 220}}
                                                   type='password' placeholder='Entrer le mot de passe'
                                                   value={confirmPassword}
                                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                                            <p ref={confirmPasswordRef} className="font px-1 textAvertissement text-danger"></p>
                                        </div>
                                    </div>

                                    <div style={{width: 152, justifyContent: 'space-between', alignItems: 'center',
                                        display: 'inline-flex'}}>
                                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8,
                                            display: 'flex'}}>
                                            <input onClick={showPass} type="checkbox"
                                                   style={{width: 14, height: 14, borderRadius: 2,
                                                       border: '1px #DADADA solid'}} />
                                            <div style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                                fontWeight: '500', wordWrap: 'break-word'}}>Voir le mot de passe</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                                display: 'flex'}}>
                                <div style={{width: 448, height: 45, background: '#FE8660',
                                    borderRadius: 8}}>
                                    <input type='submit' value="S'inscrire" className='btn btn-block'
                                           style={{color: 'white', fontSize: 16, fontFamily: 'Roboto',
                                               fontWeight: '500', wordWrap: 'break-word'}}/>
                                </div>
                            </div>

                            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4,
                                display: 'inline-flex'}}>
                                <div style={{color: '#808080', fontSize: 17, fontFamily: 'Roboto', fontWeight: '500',
                                    wordWrap: 'break-word'}}>Vous avez déjà un compte ?</div>

                                <Link to='/utilisateurConnexion' className='btn'
                                      style={{color: '#DE8C73', fontSize: 17,
                                          fontFamily: 'Roboto', fontWeight: '500',
                                          wordWrap: 'break-word'}}>Se connecter</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InscriptionFormE
