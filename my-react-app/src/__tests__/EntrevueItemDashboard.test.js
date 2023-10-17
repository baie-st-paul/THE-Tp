import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EntrevueItemDashboard from '../components/landingPage/StudentHomePage/DashBoard/EntrevueItemDashboard';
import {format} from "date-fns";

describe('EntrevueItemDashboard Component', () => {
    it('renders the component with the provided enterprise name', () => {
        const nomEntreprise = 'Company XYZ';
        const entrevue = {
            entreprise: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        const { getByText } = render(
            <EntrevueItemDashboard nomEntreprise={nomEntreprise} entrevue={entrevue} />
        );

        expect(getByText(nomEntreprise, { exact: false })).toBeInTheDocument();
    });

    it('opens and closes the modal when "Voir entrevue" button is clicked', async () => {
        const nomEntreprise = 'Company XYZ';
        const entrevue = {
            entreprise: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        render(
            <EntrevueItemDashboard nomEntreprise={nomEntreprise} entrevue={entrevue} />
        );

        const initialModal = screen.queryByTestId('modal');

        const voirEntrevueButton = screen.getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        const modal = await screen.queryByTestId('modal');

        expect(modal).toBeNull();

        const closeModalButton = screen.getByText('x');
        fireEvent.click(closeModalButton);

        await waitFor(() => {
            const closedModal = screen.queryByTestId('modal');
            expect(closedModal).toBeNull();
        });
    });

    it('displays interview details in the modal', async () => {
        const nomEntreprise = 'Company XYZS';
        const entrevue = {
            entreprise: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        render(
            <EntrevueItemDashboard nomEntreprise={nomEntreprise} entrevue={entrevue} />
        );

        const voirEntrevueButton = screen.getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        const modal = await screen.queryByTestId('modal');

        expect(screen.getByText(entrevue.entreprise, { container: modal })).toBeInTheDocument();
        expect(screen.getByText(entrevue.description, { container: modal })).toBeInTheDocument();
        expect(screen.getByText(format(new Date(entrevue.dateHeure), "dd-MM-yyyy HH:mm"), { container: modal })).toBeInTheDocument();
    });

    it('closes the modal when "x" button is clicked', () => {
        const nomEntreprise = 'Company XYZ';
        const entrevue = {
            entreprise: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };
        const closeModalMock = jest.fn();

        const { getByText } = render(
            <EntrevueItemDashboard nomEntreprise={nomEntreprise} entrevue={entrevue} closeModal={closeModalMock} />
        );

        const voirEntrevueButton = getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        const modalContent = getByText('Entrevue');

        expect(modalContent).toBeInTheDocument();

        const closeModalButton = getByText('x');
        fireEvent.click(closeModalButton);
        expect(closeModalButton).not.toBeInTheDocument()
    });
});
