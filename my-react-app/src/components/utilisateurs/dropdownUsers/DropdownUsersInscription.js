import Dropdown from 'react-bootstrap/Dropdown';
import './dropdown.css'

function DropdownUsersInscription({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle className='w-100 border-0' variant="" id="dropdown-basic" size="lg">
                <span>{titre}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu  style={{backgroundColor : '#c5c6d0'}} className='border w-100'>
                <Dropdown.Item href="/etudiantInscription">Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeurInscription">Employeur</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsersInscription;
