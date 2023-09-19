import {useRef, useState} from "react";
import './ConnexionPage.css'
import {Link} from "react-router-dom";

const ConnexionForm = ({onAdd}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const showPasswRef = useRef(null);

    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
    const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$');

    const onSubmit = (e) => {
        e.preventDefault()

        let annuler = false;

        if (
            !email ||
            !password
        ) {
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

        if (password.trim() ==='') {
            passwordRef.current.innerHTML = '* Veuillez entrer votre mot de passe *'
        } else {
            passwordRef.current.innerHTML = '';
        }

        if (password.trim()!=='' && !validPassword) {
            passwordRef.current.innerHTML = '* Le mot de passe doit etre de 6-20 caractères, 1 caractère special et 1 caractère en majuscule *'
            annuler = true;
        }

        if (annuler === true) {
        } else {
            onAdd({
                email,
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
    }

    return (
        <div className="rootConnection vh-100  ">
            <div className='fondIUConnection'>
                <div className="divFormConnection">
                    <form autoComplete="off" name='abc'  id="formm"  className='formConnection font add-form' onSubmit={onSubmit}>
                        <h2 className="h3 text-center">CONNEXION UTILISATEUR</h2>

                        <div className='form-group'>
                            <input className='form-control saisieConnection saisie-user px-3 m-0' type='text' placeholder='Email'
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <p ref={emailRef} className="font px-1 textAvertissement text-danger"></p>
                        </div>
                        <div className='form-group'>
                            <input ref={showPasswRef} id="pass" className='form-control saisieConnection saisie-psw-connection m-0' type='password' placeholder='Mot de passe'
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <p ref={passwordRef} className="font px-1 textAvertissement text-danger"></p>
                            <div className="d-flex justify-content-end pt-0 pb-3">
                                <h5 className="font px-3 pt-2 ">AFFICHER LE MOT DE PASSE</h5>
                                <input onClick={showPass} className='mdp' type="checkbox" />
                            </div>
                        </div>
                        <input type='submit' value='Connexion' className='btn btn-block bg-black text-light m-0 mb-2'/>
                        <Link to='/connexionMain' className='btn btn-block bg-danger m-0 mt-0 text-light'>
                            <span style={{fontSize : '20px'}}> Retour</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConnexionForm
