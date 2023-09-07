import Dropdown from 'react-bootstrap/Dropdown';

//il faudrait changer pour que le form etudiant soit sur la même page que utilisateursMain

function DropdownUsers({titre}) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {titre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/etudiant">Étudiant</Dropdown.Item>
                <Dropdown.Item href="/employeur">Employeur</Dropdown.Item>
                <Dropdown.Item href="/gestionnaire">Gestionnaire</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownUsers;
