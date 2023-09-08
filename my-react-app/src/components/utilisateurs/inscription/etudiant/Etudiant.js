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
            password: ""
        }
    }
}

const Etudiant = ({etudiant}) => {
    return (
        <div className="etudiant">
            <h3>{etudiant.matricule}</h3>
            <h3>{etudiant.firstName}</h3>
            <h3>{etudiant.lastName}</h3>
        </div>
    )
}

export default Etudiant
