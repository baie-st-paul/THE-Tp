import React, {useState, useEffect} from 'react'
import CreateEntrevueForm from "../Entrevue/CreateEntrevueForm";

export default function ButtonConvoquer({matricule, offre, entrevues , setModal, candidatureId, entrevueToModify }) {
    const [isPresent, setIsPresent] = useState([])

    useEffect(() => {
       init() 
    },[offre])
 
    function init(){
        setIsPresent(entrevues.filter(entrevue =>
            entrevue.student.matricule === matricule
            && entrevue.offreStage.id === offre.offreStage.id
        ))
        console.log("isPresent", isPresent)
    }
    function handleConvoquerEntrevue(candidatureId) { 
        setModal(candidatureId); 
    }



    return (
        <>
            {isPresent.length > 0 /*|| isPresent[0].status !== 'Refusee'*/ ?
                <>
                    { isPresent[0].status !== 'Refusee' ?
                        <td data-label="ENTREVUE" scope="row" className='headerElement breakWord h6 pe-3'>
                            {isPresent[0].dateHeure}
                            {
                                isPresent[0].status === 'Acceptee' ?
                                    <span className="badge bg-success ms-2">Acceptée</span>
                                    :
                                    <span className="badge bg-warning text-dark ms-2">En attente</span>
                            }
                        </td> :
                        <td data-label="ENTREVUE" scope="row" className='headerElement breakWord h6 pe-3'>
                            {isPresent[0].dateHeure}
                            <button title="RECONVOQUER" className='badge bg-danger text-dark ms-2' style={{borderColor: "red"}}
                                    onClick={()=>{
                                        handleConvoquerEntrevue({candidatureId})
                                        entrevueToModify(isPresent[0])
                                    }}>
                                Refusée, <br/> Convoquer à nouveau
                            </button>
                        </td>
                    }
                </>
                 :
                <td data-label="ENTREVUE" className='headerElement breakWord h6 pe-3'>
                    { offre.status === "Interview" ?
                        <button title="CONVOQUER" className='btn btn-primary pb-5 pt-0 text-start' style={{height : "58px", width: '105px' }}
                                onClick={()=> handleConvoquerEntrevue({candidatureId})}>
                            Convoquer
                        </button>
                        :
                        <span className="badge bg-info text-dark ms-2">Pas d'entrevue</span>
                    }
                </td>
            }
        </>
    )
}
