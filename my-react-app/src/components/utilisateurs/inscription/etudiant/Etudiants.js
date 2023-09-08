import Etudiant from "./Etudiant";

const Etudiants = ({etudiants}) => {
    return (
        <>
            <tbody>
                {
                    React.Children.toArray(
                        etudiants.map((etudiant) => <Etudiant/>)
                    )
                }
            </tbody>
        </>
    )
}

export default Etudiants
