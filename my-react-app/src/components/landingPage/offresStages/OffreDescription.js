import React from "react";
import { Card, Button } from 'react-bootstrap';

const OffreDescription = ({ offre }) => {
    const [readMore, setReadMore] = React.useState(false);
    const textToShow = readMore ? offre.description : `${offre.description.substring(0, 100)}...`;

    return (
        <Card.Body>
            <Card.Text>
                {textToShow}
            </Card.Text>
            <Button onClick={() => setReadMore(!readMore)}>
                {readMore ? 'Voir moins' : 'Voir plus'}
            </Button>
        </Card.Body>
    );
}

export default OffreDescription;
