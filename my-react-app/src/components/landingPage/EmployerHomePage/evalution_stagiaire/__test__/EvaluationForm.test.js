import { render, screen, fireEvent } from '@testing-library/react';
import EvaluationForm from '../EvaluationForm';
import { BrowserRouter } from 'react-router-dom';

const lesEvaluation = [{
    id: 1,
    nomEleve: "John Doe",
    programmeEtude: "Informatique",
    nomEntreprise: "Dev Inc",
    nomSuperviseur: "Jane Doe",
    fonctionSuperviseur: "Dev",
    numeroTelephone: "514-123-4567",
    dateDebut: "2021-10-22",
    dateFin: "2021-10-27",
    planifierOrganiser: "Totalement en accord",
    respecterEngagement: "Totalement en accord",
    autonomieInitiative: "Totalement en accord",
    efficaciteEfficience: "Totalement en accord",
    capaciteApprentissage: "Totalement en accord",
    qualiteTravail: "Totalement en accord",
    espritEquipe: "Totalement en accord",
    respectRegles: "Totalement en accord",
    assiduitePonctualite: "Totalement en accord",
    gestionTache: "Totalement en accord",
    respectHierarchie: "Totalement en accord",
    respectNormes: "Totalement en accord",
    respectConfidentialite: "Totalement en accord",
    respectProcedures: "Totalement en accord",
    respectCollaborateurs: "Totalement en accord",
    respectClientPartenaire: "Totalement en accord",
    respectMateriel: "Totalement en accord",
    respectEcheancier: "Totalement en accord",
    respectBudget: "Totalement en accord",
    respectRythmeTravail: "Totalement en accord",
    respectPolitiqueEntreprise: "Totalement en accord",
    respectCodeDeontologie: "Totalement en accord",
    respectLieuDeTravail: "Totalement en accord",
    respectDroitsHumains: "Totalement en accord",
    respectLois: "Totalement en accord",
    respectReglements: "Totalement en accord",
    respectNormesSanteSecurite: "Totalement en accord",
    respectNormesQualite: "Totalement en accord",
    respectNormesEnvironnement: "Totalement en accord",
    respectNormesEthiques: "Totalement en accord",
    respectNormesSecurite: "Totalement en accord",
    respectNormesInformation: "Totalement en accord"
}]

const MockEvaluationForm = ({lesEvaluation}) => {
    return (
        <BrowserRouter>
            <EvaluationForm
                lesEvaluation={lesEvaluation}
            />
        </BrowserRouter>
    )
} 

 // Mock pour PDFDownloadLink
 jest.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: ({ children }) => children({ loading: false, error: null, url: 'test.pdf' }),
}));


jest.mock('@react-pdf/renderer', () => ({
    __esModule: true,
    Document: () => null,
    Page: () => null,
    Text: () => null,
    View: () => null,
    StyleSheet: {
        create: () => ({})
    }
}));

const onSubmitMock = jest.fn();

 /* const MockEvaluationForm = () => {
  return (
    <BrowserRouter>
      <EvaluationForm onSubmit={onSubmitMock} />
    </BrowserRouter>
  );
};  */
 
describe('EvaluationForm', () => {
  beforeEach(() => {
    render(<MockEvaluationForm  lesEvaluations={lesEvaluation}/>);
  });

  it('renders the form with all inputs', () => {
    expect(screen.getByLabelText(/Nom de l’élève/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Programme d’études/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de l’entreprise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom du superviseur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fonction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
  });

  it('updates the form data when inputs change', () => {
    const nomEleveInput = screen.getByLabelText(/Nom de l’élève/i);
    const programmeEtudesInput = screen.getByLabelText(/Programme d’études/i);
    const nomEntrepriseInput = screen.getByLabelText(/Nom de l’entreprise/i);
    const nomSuperviseurInput = screen.getByLabelText(/Nom du superviseur/i);
    const fonctionSuperviseurInput = screen.getByLabelText(/Fonction/i);
    const telephoneSuperviseurInput = screen.getByLabelText(/Téléphone/i);

    fireEvent.change(nomEleveInput, { target: { value: 'John Doe' } });
    fireEvent.change(programmeEtudesInput, { target: { value: 'Informatique' } });
    fireEvent.change(nomEntrepriseInput, { target: { value: 'Dev Inc' } });
    fireEvent.change(nomSuperviseurInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(fonctionSuperviseurInput, { target: { value: 'Dev' } });
    fireEvent.change(telephoneSuperviseurInput, { target: { value: '514-123-4567' } });

    expect(nomEleveInput.value).toBe('John Doe');
    expect(programmeEtudesInput.value).toBe('Informatique');
    expect(nomEntrepriseInput.value).toBe('Dev Inc');
    expect(nomSuperviseurInput.value).toBe('Jane Doe');
    expect(fonctionSuperviseurInput.value).toBe('Dev');
    expect(telephoneSuperviseurInput.value).toBe('514-123-4567');
  });

  it('calls the onSubmit function when the form is submitted', () => {
    const form = screen.getByTestId('evaluation-form');
    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalled();
  });
});