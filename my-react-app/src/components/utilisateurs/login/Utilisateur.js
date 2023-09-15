import {Component} from "react";

export class CurrentUtilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: ""
        }
    }
}

const Utilisateur = ({utilisateur}) => {
    return (
        <div className="utilisateur">
            <h3>{utilisateur.email}</h3>
        </div>
    )
}

export default Utilisateur
