import React, {useState, useEffect} from 'react'

export default function ButtonConvoquer({matricule, offre, entrevues , setModal, candidatureId, entrevueToModify }) {
    const [isPresent, setIsPresent] = useState([])

    useEffect(() => {
        init()
    },[entrevues])   

    function init(){
        Promise.all([
        setIsPresent(entrevues.filter(entrevue =>
            entrevue.student.matricule === matricule
            && entrevue.offreStage.id === offre.offreStage.id
        ))])

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
                                offre.status === 'Accepted' ?
                                    <span className="badge bg-success ms-2">Acceptée</span>
                                    :
                                    <span className="badge bg-warning text-dark ms-2">En attente</span>
                            }
                        </td> :
                         
                        <td data-label="ENTREVUE" scope="row" className='headerElement breakWord h6 pe-3'>
                            { offre.status !== 'Accepted' ?
                            <div>
                            {isPresent[0].dateHeure}
                            <button title="RECONVOQUER" className='badge bg-danger text-white ms-2' style={{borderColor: "red"}}
                                    onClick={()=>{
                                        handleConvoquerEntrevue({candidatureId})
                                        entrevueToModify(isPresent[0])
                                    }}>
                                Refusée, <br/> Re-convoquer
                            </button>
                        </div>  :   <div>
                            {isPresent[0].dateHeure}
                            <br></br>
                            <button title="RECONVOQUER" className='badge bg-danger text-white ms-2 w-75' style={{borderColor: "red"}}
                                    >
                                        
                                Refusée
                            </button>
                        </div> }
                        </td>
                    }
                </>
                :
                <td data-label="ENTREVUE" className='headerElement breakWord h6 pe-1 px-3 '>
                    { offre.status === "In_review" ?
                        <button title="CONVOQUER" className='btn btn-primary pb-5 pt-0 text-start ' style={{height : "58px", width: '105px' }}
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
