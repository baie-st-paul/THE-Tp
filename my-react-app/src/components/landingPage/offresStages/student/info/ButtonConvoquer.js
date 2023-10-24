import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export default function ButtonConvoquer({matricule, entrevues}) {
    const navigate = useNavigate()

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
