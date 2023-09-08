import Dropdown from 'react-bootstrap/Dropdown';
import '../utilisateurs/dropdown.css'

//il faudrait changer pour que le form etudiant soit sur la même page que utilisateursMain

function DropdownUsers({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle  className='w-100 border-0' variant="" id="dropdown-basic" size="lg">
            {titre}
            </Dropdown.Toggle>

            <Dropdown.Menu  style={{backgroundColor : '#c5c6d0'}} className='border w-100'>
                <Dropdown.Item href="/etudiant">Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeur">Employeur</Dropdown.Item>
                <Dropdown.Item href="/gestionnaire">Gestionnaire</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsers;
