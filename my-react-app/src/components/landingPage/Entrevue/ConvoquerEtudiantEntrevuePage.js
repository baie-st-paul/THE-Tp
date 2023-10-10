import React, {useEffect, useState} from "react";
import CreateEntrevueForm from "./CreateEntrevueForm";
import {useLocation} from "react-router-dom";

const ConvoquerEtudiantEntrevuePage = (props) => {
    const [erreur, setErreur] = useState(false);

    let employerId = localStorage.getItem('employer_id')

    const location = useLocation();
    let matricule = location.state;
    console.log(matricule)

    const createEntrevue = async (entrevue) => {
        console.log(erreur)

        entrevue["status"] = "EnAttente"
        entrevue["idEmployeur"] = employerId
        entrevue["idEtudiant"] = matricule
        console.log(JSON.stringify(entrevue))

        await fetch(
            'http://localhost:8081/api/v1/stages/entrevues',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(entrevue)
            }
        ).catch((err) => {
            console.log(err)
        }).then(
            (res) => {
                const data= res.json()
                try{
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }

                console.log(data)
            }
        )
    }

    return (
        <div className="container mt-4">
            <h2>Entrevue</h2>
            {<CreateEntrevueForm onAdd={createEntrevue}/>}
        </div>
    )
}

export default ConvoquerEtudiantEntrevuePage
