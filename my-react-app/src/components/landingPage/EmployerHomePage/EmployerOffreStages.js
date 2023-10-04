import EmployerOffreCard from "./EmployerOffreCard";

const EmployerOffreStages = ({offreStages, onDelete, onUpdate, showUpdate}) => {
    return (
        <>
            {offreStages.map((offre) => (
                <EmployerOffreCard
                    key={offre.id}
                    offre={offre}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    showUpdate={showUpdate}
                />
            ))}
        </>
    )
}

export default EmployerOffreStages
