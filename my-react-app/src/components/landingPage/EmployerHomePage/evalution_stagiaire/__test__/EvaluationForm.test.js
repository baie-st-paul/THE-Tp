import { render, screen, fireEvent } from '@testing-library/react';
import EvaluationForm from '../EvaluationForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@react-pdf/renderer', () => {
    return {
        PDFDownloadLink: () => null,
        StyleSheet: {
            create: () => null
        }
    };
});

const mockedOnSubmit = jest.fn();

const MockEvaluationForm = ({onSubmit}) => {
    return (
        <BrowserRouter>
            <EvaluationForm
                onSubmit={onSubmit}
            />
        </BrowserRouter>
    )
}

describe('Test the EvaluationForm Component', () => {
    it('should render the form with all inputs', () => {
        render(<MockEvaluationForm onSubmit={mockedOnSubmit}/>);

        expect(screen.getByLabelText('Nom de l’élève :')).toBeInTheDocument();
        expect(screen.getByLabelText('Programme d\'étude :')).toBeInTheDocument();
        expect(screen.getByLabelText('Nom de l’entreprise :')).toBeInTheDocument();
        expect(screen.getByLabelText('Nom du superviseur :')).toBeInTheDocument();
        expect(screen.getByLabelText('Fonction du superviseur :')).toBeInTheDocument();
        expect(screen.getByLabelText('Téléphone :')).toBeInTheDocument();

        expect(screen.findByRole('button', {Name: /Soumettre l'Évaluation en PDF/i}));
    });

    it('updates the form data when inputs change', () => {
        render(<MockEvaluationForm onSubmit={mockedOnSubmit}/>);

        const nomEleveInput = screen.getByLabelText('Nom de l’élève :');
        const programmeEtudesInput = screen.getByLabelText('Programme d\'étude :');
        const nomEntrepriseInput = screen.getByLabelText('Nom de l’entreprise :');
        const nomSuperviseurInput = screen.getByLabelText('Nom du superviseur :');
        const fonctionSuperviseurInput = screen.getByLabelText('Fonction du superviseur :');
        const telephoneSuperviseurInput = screen.getByLabelText('Téléphone :');

        fireEvent.change(nomEleveInput, { target: { value: 'John Doe' } });
        fireEvent.change(programmeEtudesInput, { target: { value: 'Informatique' } });
        fireEvent.change(nomEntrepriseInput, { target: { value: 'Dev Inc' } });
        fireEvent.change(nomSuperviseurInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(fonctionSuperviseurInput, { target: { value: 'Dev' } });
        fireEvent.change(telephoneSuperviseurInput, { target: { value: '514-123-4567' } });

        expect(nomEleveInput.value).toBe('John Doe');
        expect(nomEntrepriseInput.value).toBe('Dev Inc');
        expect(nomSuperviseurInput.value).toBe('Jane Doe');
        expect(fonctionSuperviseurInput.value).toBe('Dev');
        expect(telephoneSuperviseurInput.value).toBe('+1 514 123 4567');
    });

    it('calls the onSubmit function when the form is submitted', () => {
        render(<MockEvaluationForm onSubmit={mockedOnSubmit}/>);

        const form = screen.getByText("Soumettre l'Évaluation en PDF");
        fireEvent.click(form);
    });
});
