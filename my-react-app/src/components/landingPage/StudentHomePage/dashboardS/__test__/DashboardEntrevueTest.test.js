import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { entrevue } from './GenerateTestData';
import CardPageEntrevuesS from "../cards/CardPageEntrevuesS";


jest.mock('../FetchsUpdateStatusS', () => ({
    updateStatusEntrevuesVuS: jest.fn(),
}));

describe('CardPageEntrevuesS Component Tests', () => {
    it('renders component with no interviews', () => {
        render(<CardPageEntrevuesS entrevues={entrevue} />);
        const noEntrevuesText = screen.getByText('Aucune entrevue disponible');
        expect(noEntrevuesText).toBeInTheDocument();
    });

    it('renders entrevues list correctly', () => {
        const { getByText } = render(<CardPageEntrevuesS entrevues={[entrevue]} />);
        expect(getByText(entrevue.dateHeure)).toBeInTheDocument();
    });

    it('shows detailed entrevue on "voir plus" click', () => {
        const { getByText } = render(<CardPageEntrevuesS entrevues={[entrevue]} />);
        fireEvent.click(getByText('voir plus'));
        expect(getByText("Matricule de l'étudiant:")).toBeInTheDocument();
        expect(getByText('Fermer')).toBeInTheDocument();
    });


});