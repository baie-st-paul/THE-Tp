import React, {useEffect, useState} from "react";

const EtudiantEmbauchePage = () => {
    const [etudiants, setEtudiants] = useState([])
    const  [filtre, setFiltre] = useState('')

    useEffect(() => {
        //getEtudiantsEmbauches();
    },[])

    async function getEtudiantsEmbauches() {
        try {
            fetch(
                `http://localhost:8081/api/v1/gestionnaire/candidatures/acceptees`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    const data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setEtudiants(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (etudiants !== undefined){
                setEtudiants(etudiants)
            }
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="display-4 text-center">Liste des candidatures acceptées</h1>

        </div>
    )
}

export default EtudiantEmbauchePage
