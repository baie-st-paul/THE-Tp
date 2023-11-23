import React, {useState, useEffect} from 'react'

export default function ButtonConvoquer({matricule, offre, entrevues , setModal }) {
    const [isPresent, setIsPresent] = useState([])

    useEffect(() => {
        setIsPresent(entrevues.filter(x =>
            x.student.matricule + " " + x.offreStage.titre ===
            matricule + " " + offre))
        console.log(isPresent)
    }, [])

    function handleConvoquerEntrevue(matricule) {
        console.log(matricule)
        setModal();
    }

    return (
        <>
            {isPresent.length > 0 ?
                <td data-label="ENTREVUE" scope="row" className='headerElement breakWord h6 pe-3'>
                    {isPresent[0].dateHeure}
                </td>
                :
                <td data-label="ENTREVUE" className='headerElement h6 px-3 pe-0  '>
                    <button title="CONVOQUER" className='btn btn-primary pb-5 pt-0 text-start' style={{height : "58px", width: '105px' }}
                            onClick={()=> handleConvoquerEntrevue({matricule})}>
                        Convoquer
                    </button>
                </td>
            }
        </>
    )
}
