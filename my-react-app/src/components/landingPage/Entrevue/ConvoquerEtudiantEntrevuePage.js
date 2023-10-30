import React, {useState} from "react";
import CreateEntrevueForm from "./CreateEntrevueForm";
import {useLocation, useNavigate} from "react-router-dom";

const ConvoquerEtudiantEntrevuePage = () => {
    const [erreur] = useState(false);
    const [entrevues, setEntrevues] = useState([]);
    const navigate = useNavigate();

    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    const location = useLocation();
    let matricule = location.state;
    console.log(matricule)

    const createEntrevue = async (entrevue) => {
        console.log(erreur)

        entrevue["status"] = "EnAttente"
        entrevue["idEmployeur"] = employerId
        entrevue["idEtudiant"] = matricule
        console.log(JSON.stringify(entrevue))

        const res = await fetch(
            'http://localhost:8081/api/v1/stages/entrevues',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                body: JSON.stringify(entrevue)
            }
        )

        try{
            console.log(res.status)
            if (res.status === 400) {
                console.log(res.status)
            }
        } catch (e) {
            console.log(e)
        }

        const data = await res.json()
        setEntrevues([...entrevues, data])
        console.log(data)
    }

    function handleNavigate(entrevues) {
        console.log(entrevues)
        navigate(`/entrevueOk`, {
            state: entrevues
        })
    }

    return (
       <>
           <h1 className="display-4 text-center" title="Entrevue">Entrevue</h1>
            {<CreateEntrevueForm onAdd={createEntrevue}/>}
            {
                entrevues.length > 0 ?
                    handleNavigate(entrevues)
                    : console.log('nothing yet')
            }
        </>
    )
}

export default ConvoquerEtudiantEntrevuePage
