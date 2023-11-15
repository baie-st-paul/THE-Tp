import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import CardPageOffresS from '../cards/CardPageOffresS';
import { offres, offresIds } from './GenerateOffresTest';


jest.mock('../FetchsUpdateStatusS', () => ({
  updateStatusOffreVuS: jest.fn(),
}));

describe('CardPageOffresS Component Tests', () => {
  it('renders component with no offers', () => {
    render(<CardPageOffresS offres={[]} candidaturesOffreId={[]} />);
    const noOffersText = screen.getByText('Aucune offre disponible');
    expect(noOffersText).toBeInTheDocument();
  });

  it('renders component with offers', () => {
    render(<CardPageOffresS offres={offres} candidaturesOffreId={offresIds} />);
    const offreTitle = screen.getByText(offres[0].titre);
    expect(offreTitle).toBeInTheDocument();
  });

  it('renders detailed offre on button click', () => {
    render(<CardPageOffresS offres={offres} candidaturesOffreId={offresIds} />);
    fireEvent.click(screen.getAllByText('voir plus')[0]);
    const detailedOverlay = screen.getByText('Section : Offres');
    expect(detailedOverlay).toBeInTheDocument();
  });

  it('updates offre status to "vu" on button click', () => {
    const handleUpdateStatusMock = jest.fn();

    render(<CardPageOffresS offres={offres} candidaturesOffreId={offresIds} handleUpdateStatus={handleUpdateStatusMock}/>);
    const nbVusAvantClick = screen.getAllByText("Je l'ai vu").length;
    const vuButton = screen.getAllByText("Je l'ai vu")[1];

    fireEvent.click(vuButton);

    const nbVusApresClick = screen.getAllByText("Je l'ai vu").length;

    expect(handleUpdateStatusMock).toHaveBeenCalledWith(offres[1].titre, 'vu');
    expect(nbVusApresClick).toBe(nbVusAvantClick - 1);
  });
});
