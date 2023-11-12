import Utilisateur from "./Utilisateur";

const Utilisateurs = ({utilisateurs}) => {
    return (
        <>
            <tbody>
                {
                    React.Children.toArray(
                        utilisateurs.map((utilisateur) => <Utilisateur/>)
                    )
                }
            </tbody>
        </>
    )
}

export default Utilisateurs
