import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EntrevueItemDashboard from '../EntrevueItemDashboard';
import {format} from "date-fns";

describe('EntrevueItemDashboard Component', () => {
    it('renders the component with the provided enterprise name', () => {
        const entrevue = {
            companyName: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        const { getByText } = render(
            <EntrevueItemDashboard nomEntreprise={entrevue.companyName} entrevue={entrevue} />
        );

        expect(getByText(entrevue.companyName, { exact: false })).toBeInTheDocument();
    });

    it('opens and closes the modal when "Voir entrevue" button is clicked', async () => {
        const entrevue = {
            companyName: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        render(
            <EntrevueItemDashboard nomEntreprise={entrevue.companyName} entrevue={entrevue} />
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
        const entrevue = {
            companyName: 'Company XYZS',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };

        render(
            <EntrevueItemDashboard nomEntreprise={entrevue.companyName} entrevue={entrevue} />
        );

        const voirEntrevueButton = screen.getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        const modal = await screen.queryByTestId('modal');

        expect(screen.getAllByText(entrevue.companyName, { container: modal }).length).toBe(2);
        expect(screen.getByText(entrevue.description, { container: modal })).toBeInTheDocument();
        expect(screen.getByText(format(new Date(entrevue.dateHeure), "dd-MM-yyyy HH:mm"), { container: modal })).toBeInTheDocument();
    });

    it('closes the modal when "x" button is clicked', () => {
        const entrevue = {
            companyName: 'Company XYZ',
            dateHeure: '2023-10-15T14:00:00',
            description: 'Description 1',
        };
        const closeModalMock = jest.fn();

        const { getByText } = render(
            <EntrevueItemDashboard nomEntreprise={entrevue.companyName} entrevue={entrevue} closeModal={closeModalMock} />
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
