import Dropdown from 'react-bootstrap/Dropdown';

function DropdownUsersInscription({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                <span>{titre}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{backgroundColor : '#C07B4C'}}>
                <Dropdown.Item href="/etudiantInscription">Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeurInscription">Employeur</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsersInscription;
