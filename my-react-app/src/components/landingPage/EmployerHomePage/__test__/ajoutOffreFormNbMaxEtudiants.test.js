import { render, screen, fireEvent } from '@testing-library/react';
import AjoutOffreForm from '../ajoutOffreForm';

describe('AjoutOffreForm', () => {
  it('should show error message when "nbMaxEtudiants" is empty', () => {
    // onAdd est necessaire mais ne sera pas utilisé pour ce test
    render(<AjoutOffreForm onAdd={() => {}} />); 

    const nbMaxEtudiantsInput = screen.getByPlaceholderText(/Nombre max. d’étudiants/i);
    
    fireEvent.change(nbMaxEtudiantsInput, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: /Ajouter l'offre/i }));

    const errorMessage = screen.getByText("* Veuillez entrer le nombre max. d’étudiants *");
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not show error message when "nbMaxEtudiants" has a valid value', () => {
    render(<AjoutOffreForm onAdd={() => {}} />);

    const nbMaxEtudiantsInput = screen.getByPlaceholderText(/Nombre max. d’étudiants/i);
    
    fireEvent.change(nbMaxEtudiantsInput, { target: { value: '5' } });
    fireEvent.submit(screen.getByRole('button', { name: /Ajouter l'offre/i }));

    const errorMessage = screen.queryByText("* Veuillez entrer le nombre max. d’étudiants *");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
