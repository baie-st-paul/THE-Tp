import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export default function ButtonConvoquer({ matricule : matricule}) {
    const navigate = useNavigate()
    const [entrevues, setEntrevues] = useState([]);
     useEffect(() => {
        allEntrevuesStudentMatricule();
        }, [])
    
    async function allEntrevuesStudentMatricule() {
        try {
                const res = await fetch(
                    `http://localhost:8081/api/v1/stages/entrevues/${matricule}`,
                    {
                        method: "GET",
                        headers: {
                            'Content-type': 'application/json'
                        },
                    }
                ).catch((error) => {
                    console.error("Error:", error);
                }).then(
                    async (response) => {
                        const data = await response.json();
                        console.log(data)
                        try{
                            console.log(response.status)
                        }
                        catch (e) {
                            console.log(e)
                        }
                        console.log(data)
                        setEntrevues(data)
                    }
                );
           
        } catch (error) {
            console.log("Error fetching data:", error)
        }   
    }

    function handleConvoquerEntrevue(matricule) {
        console.log(matricule)
        navigate(`/createEntrevue`, {
            state: matricule
        })
    }

  return (
    <>
    {entrevues.length > 0 ?
        entrevues.map((entrevue, i) => (
            <td key={i} data-label="ENTREVUE PRÉVUE" scope="row" className='headerElement breakWord h4 pe-3'>
                {entrevue.dateHeure}
            </td>
        )) :
        <td className='headerElement h4'>
            <button title="CONVOQUER" className='btn btn-primary' style={{height : "60px", width: '120px' }}
                    onClick={()=> handleConvoquerEntrevue({matricule})}>
                Convoquer
            </button>
        </td>
    }
    </>
  )
}
