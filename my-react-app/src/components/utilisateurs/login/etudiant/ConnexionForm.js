import {useState} from "react";
import './ConnexionPage.css'

const ConnexionForm = ({onAdd}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);

    const onSubmit = (e) => {
        e.preventDefault()

        if (
            !email &&
            !password
        ) {
            alert('Veuillez remplir les champs d\'inscription')
            setEmail('')
            setPassword('')
            return
        }

        if (
            !email
        ) {
            alert('Veuillez ajouter l\'email')
            setEmail('')
            setPassword('')
            return
        }

        if (
            !password
        ) {
            alert('Veuillez ajouter le mot de passe')
            setEmail('')
            setPassword('')
            return
        }

        if (!validEmail) {
            alert('Email invalide')
            setEmail('')
            setPassword('')
            return
        }

        onAdd({
            email,
            password
        })
        setEmail('')
        setPassword('')
    }

    return (
        <div className="root border vh-100  ">
            <div className='card-body fondIU'>
                <div className="divForm">
                    <form autoComplete="off" className='form font add-form' onSubmit={onSubmit}>
                        <h1 className="font text-center">Connexion Utilisateur</h1>
                        <div className='form-group'>
                            <input className='form-control saisie saisie-user' type='text' placeholder='email'
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <input className='form-control saisie saisie-psw' type='password' placeholder='mot de passe'
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <input type='submit' value='Connexion' className='btn btn-block bg-black text-light m-0'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConnexionForm
