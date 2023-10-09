import React, {useState} from "react";
import CreateEntrevueForm from "./CreateEntrevueForm";

const ConvoquerEtudiantEntrevuePage = () => {
    const [entrevues, setEntrevues] = useState([]);
    const [erreur, setErreur] = useState(false);

    let employerId = localStorage.getItem('employer_id')
    let etudiantId = localStorage.getItem('student_id')

    const createEntrevue = async (entrevue) => {
        console.log(erreur)

        entrevue["status"] = "EnAttente"
        entrevue["idEmployeur"] = employerId
        entrevue["idEtudiant"] = etudiantId
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
