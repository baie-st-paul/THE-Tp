import Dropdown from 'react-bootstrap/Dropdown';

function DropdownUsersInscription({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" style={{color: "white"}}>
                <span style={{color: "white"}}>{titre}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{backgroundColor : '#C07B4C'}}>
                <Dropdown.Item href="/etudiantInscription" style={{color: "white"}}>Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeurInscription" style={{color: "white"}}>Employeur</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsersInscription;
