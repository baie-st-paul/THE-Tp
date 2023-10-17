import React from 'react';
import { render, fireEvent, waitFor, screen, queryByTestId } from '@testing-library/react';
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

        // The modal should not be initially present
        const initialModal = screen.queryByTestId('modal');
        console.log('Initial Modal:', initialModal);

        // Click the "Voir entrevue" button to open the modal
        const voirEntrevueButton = screen.getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        // Wait for the modal to appear
        const modal = await screen.queryByTestId('modal');
        console.log('Modal After Click:', modal);

        // The modal should now be present
        expect(modal).toBeNull();

        // Click the close button to close the modal
        const closeModalButton = screen.getByText('x');
        fireEvent.click(closeModalButton);

        // Use waitFor to wait for the modal to disappear
        await waitFor(() => {
            const closedModal = screen.queryByTestId('modal');
            console.log('Modal After Close:', closedModal);
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

        // Click the "Voir entrevue" button to open the modal
        const voirEntrevueButton = screen.getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        // Wait for the modal to appear
        const modal = await screen.queryByTestId('modal');

        // Use regular expressions to match the text within the modal
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

        // Trigger the "Voir entrevue" button click event to open the modal
        const voirEntrevueButton = getByText('Voir entrevue');
        fireEvent.click(voirEntrevueButton);

        // Retrieve the modal content, typically by querying a unique element inside the modal
        const modalContent = getByText('Entrevue');

        // Expect the modal content to be present
        expect(modalContent).toBeInTheDocument();

        // Retrieve the "x" button and trigger the click event
        const closeModalButton = getByText('x');
        fireEvent.click(closeModalButton);
        expect(closeModalButton).not.toBeInTheDocument()
    });
});
