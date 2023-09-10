import Dropdown from 'react-bootstrap/Dropdown';
import './dropdown.css'

function DropdownUsersConnexion({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle  className='w-100 border-0' variant="" id="dropdown-basic" size="lg">
                {titre}
            </Dropdown.Toggle>

            <Dropdown.Menu  style={{backgroundColor : '#c5c6d0'}} className='border w-100'>
                <Dropdown.Item href="/etudiantConnexion">Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeurConnexion">Employeur</Dropdown.Item>
                <Dropdown.Item href="/gestionnaireConnexion">Gestionnaire</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsersConnexion;
