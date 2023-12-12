import {useRef, useState} from "react";
import './ConnexionPage.css'
import {Link} from "react-router-dom";
import "./Connexion.css"

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
            passwordRef.current.innerHTML = '* Le mot de passe est invalide *'
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
        <div>
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
                            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 40, display: 'flex'}}>
                                <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                                    <div style={{color: '#4A4543', fontSize: 42, fontFamily: 'Roboto',
                                        fontWeight: '400', wordWrap: 'break-word'}}>Content de vous revoir</div>
                                    <div style={{color: '#808080', fontSize: 16, fontFamily: 'Roboto', fontWeight: '400',
                                        letterSpacing: 0.16, wordWrap: 'break-word'}}>Veuillez entrer vos informations.</div>
                                </div>
                                <div style={{flexDirection: 'column', justifyContent: 'flex-start',
                                    alignItems: 'flex-start', gap: 20, display: 'flex'}}>

                                    <div className='form-group' style={{flexDirection: 'column', justifyContent: 'flex-start',
                                        alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                        <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                            fontWeight: '500', wordWrap: 'break-word'}}>Email</label>

                                        <input className='form-control m-0 inputStyle'
                                               type='text' placeholder="Entrer l'email"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                        <p ref={emailRef} className="font px-1 textAvertissement text-danger"></p>
                                    </div>

                                    <div className='form-group'style={{flexDirection: 'column', justifyContent: 'flex-start',
                                        alignItems: 'flex-start', gap: 8, display: 'flex'}}>

                                        <label style={{color: '#4A4543', fontSize: 14, fontFamily: 'Roboto',
                                            fontWeight: '500', wordWrap: 'break-word'}}>Mot de passe</label>

                                        <input ref={showPasswRef}
                                               className='form-control m-0 inputStyle'
                                               type='password' placeholder='Entrer le mot de passe'
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                        <p ref={passwordRef} className="font px-1 textAvertissement text-danger"></p>
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
                                gap: 16, display: 'flex'}}>
                                <div style={{width: 360, height: 45, position: 'relative',
                                    background: '#FE8660', borderRadius: 8, overflow: 'hidden'}}>
                                    <input type='submit' value="Se connecter" className='btn btn-block'
                                           style={{color: 'white', fontSize: 16, fontFamily: 'Roboto',
                                               fontWeight: '500', wordWrap: 'break-word'}}/>
                                </div>
                            </div>

                            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4,
                                display: 'inline-flex'}}>
                                <div style={{color: '#808080', fontSize: 17, fontFamily: 'Roboto', fontWeight: '500',
                                    wordWrap: 'break-word'}}>Pas de compte ?</div>

                                <Link to='/' className='btn'
                                      style={{color: '#DE8C73', fontSize: 17,
                                          fontFamily: 'Roboto', fontWeight: '500',
                                          wordWrap: 'break-word'}}>Créer un compte</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConnexionForm
