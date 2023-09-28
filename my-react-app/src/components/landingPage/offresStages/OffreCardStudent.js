import React from "react";
import { Card, Button } from 'react-bootstrap';

const OffreCardStudent = ({ offre }) => {
    const [readMore, setReadMore] = React.useState(false);
    const textToShow = readMore ? offre.description : `${offre.description.substring(0, 100)}...`;

    return (
        <Card style={{ width: '40rem', margin: '20px auto' }}>
            <Card.Body>
                <Card.Title>{offre.titre}</Card.Title>
                <Card.Text>
                    {textToShow}
                </Card.Text>
                <Button onClick={() => setReadMore(!readMore)}>
                    {readMore ? 'Voir moins' : 'Voir plus'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default OffreCardStudent;
