import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import './Entrevue.css'

const CreateEntrevueForm = ({onAdd}) => {
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [description, setDescription] = useState('');

    const dateRef = useRef(null);
    const heureRef = useRef(null);
    const descriptionRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault()

        let annuler = false;

        if (
            !date ||
            !heure ||
            !description
        ) {
            annuler = true;
        }

        if(date.trim() === ''){
            dateRef.current.innerHTML = " * Veuillez entrer la date de l'entrevue *"
        } else {
            dateRef.current.innerHTML = ""
        }

        if(heure.trim() === ''){
            heureRef.current.innerHTML = " * Veuillez entrer l'heure de l'entrevue *"
        }else {
            heureRef.current.innerHTML = ""
        }

        if (description.trim() === ''){
            descriptionRef.current.innerHTML = "* Veuillez entrer la description de l'entrevue *"
        } else {
            descriptionRef.current.innerHTML = ""
        }

        if (annuler === true) {
        } else {
            const dateHeure = date + ", " + heure;
            console.log(dateHeure)
            onAdd({
                dateHeure,
                description
            })
        }
    }

    return (
        <div className="root vh-100">
            <div className='fondIU'>
                <div className="divForm ">
                    <form autoComplete="off" name='abc'  id="formm"  className='form font add-form ' onSubmit={onSubmit}>
                        <h2 className="h3 font text-center">CRÉATION DE L'ENTREVUE</h2>
                        <div className="w-100">
                            <div className='form-group'>
                                <label htmlFor="dateId" style={{display: "block", textAlign: "left"}}>Date</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='date' placeholder="date"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       id="dateId"
                                       value={date}
                                       onChange={(e) => setDate(e.target.value)}/>
                                <p ref={dateRef} className="font px-1 textAvertissement text-danger"></p>

                                <label htmlFor="heureId" style={{display: "block", textAlign: "left"}}>Heure</label>
                                <input className='form-control saisie saisie-user px-3 m-0' type='time' placeholder="heure"
                                       style={{color: 'grey', fontSize : '20px'}}
                                       id="heureId"
                                       value={heure}
                                       onChange={(e) => setHeure(e.target.value)}/>
                                <p ref={heureRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <label htmlFor="descriptionId" style={{display: "block", textAlign: "left"}}>Description</label>
                            <div className='form-group'>
                                <input className='form-control saisie saisie-user px-3 m-0' type='text'
                                       placeholder="ex.: réunion par teams, lien de la réunion"
                                       id="descriptionId"
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                                <p ref={descriptionRef} className="font px-1 textAvertissement text-danger"></p>
                            </div>

                            <input type='submit' value="Créer l'entrevue" className='btn btn-block bg-black text-light m-0 mb-2 '/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEntrevueForm
