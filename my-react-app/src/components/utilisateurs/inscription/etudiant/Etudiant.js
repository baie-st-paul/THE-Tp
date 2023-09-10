import {Component} from "react";

export class CurrentEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            matricule: "",
            program: "",
            email: "",
            token: ""
        }
    }
}

const Etudiant = ({etudiant}) => {
    return (
        <div className="etudiant">
            <h3>{etudiant.matricule}</h3>
            <h3>{etudiant.firstName}</h3>
            <h3>{etudiant.lastName}</h3>
            <h3>{etudiant.email}</h3>
        </div>
    )
}

export default Etudiant
