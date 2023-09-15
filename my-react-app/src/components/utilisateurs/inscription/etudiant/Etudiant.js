import {Component} from "react";

export class CurrentEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: ""
        }
    }
}

const Etudiant = ({etudiant}) => {
    return (
        <div className="etudiant">
            <h3>{etudiant.email}</h3>
        </div>
    )
}

export default Etudiant
