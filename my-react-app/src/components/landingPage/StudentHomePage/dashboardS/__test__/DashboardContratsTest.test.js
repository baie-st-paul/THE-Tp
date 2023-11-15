import {fireEvent, render, screen} from "@testing-library/react";
import {contract} from "./GenerateTestData";
import React from "react";
import CardPageContratsS from "../cards/CardPageContratsS";

jest.mock('../FetchsUpdateStatusS', () => ({
    updateStatusContratVuS: jest.fn(),
}));

describe('CardPageContratsS Component Tests', () => {
    it('renders component with no contracts', () => {
        render(<CardPageContratsS contrats={contract} />);
        const noOffersText = screen.getByText('Aucun contrats disponible');
        expect(noOffersText).toBeInTheDocument();
    });

    it('renders contracts list correctly', () => {
        const { getByText } = render(<CardPageContratsS contrats={[contract]} />);
        expect(getByText(`${contract.prenomEtudiant}, ${contract.nomEtudiant}`)).toBeInTheDocument();
    });

    it('shows detailed contract on "voir plus" click', () => {
        const { getByText } = render(<CardPageContratsS contrats={[contract]} />);
        fireEvent.click(getByText('voir plus'));
        expect(getByText("Matricule:")).toBeInTheDocument();
        expect(getByText('Fermer')).toBeInTheDocument();
    });

});