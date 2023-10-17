import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import SectionEntrevue from "../components/landingPage/StudentHomePage/SectionViewEntrevue/SectionEntrevue";

describe('SectionEntrevue', () => {
    it('renders without errors', () => {
        const { container } = render(<SectionEntrevue />);
        expect(container).toBeInTheDocument();
    });

    it('displays the list of interviews', () => {
        const { getByText } = render(<SectionEntrevue />);
        expect(getByText('Liste des Entrevues')).toBeInTheDocument();
    });

    it('expands the interview description when "More" button is clicked', () => {
        const { getByText } = render(<SectionEntrevue />);
        const moreButton = getByText('More');
        fireEvent.click(moreButton);
        expect(getByText('Less')).toBeInTheDocument();
    });

    it('triggers the confirmation modal when "Accepter" button is clicked', () => {
        const { queryAllByTestId, getByText } = render(<SectionEntrevue />);
        const acceptButtons = queryAllByTestId('accept-button-1');
        const acceptButton = acceptButtons[0];

        fireEvent.click(acceptButton);
        expect(getByText('Confirmation')).toBeInTheDocument();
    });

    it('triggers the confirmation modal when "Refuser" button is clicked', () => {
        const { queryAllByTestId, getByText } = render(<SectionEntrevue />);
        const refuseButtons = queryAllByTestId('refuser-button-1');
        const refuseButton = refuseButtons[0];

        fireEvent.click(refuseButton);
        expect(getByText('Confirmation')).toBeInTheDocument();
    });

    it('handles accepting an interview in the confirmation modal', () => {
        const { queryAllByTestId, getByText, queryByText } = render(<SectionEntrevue />);
        const acceptButton = queryAllByTestId('accept-button-2')[1];
        fireEvent.click(acceptButton);

        const confirmAcceptButton = getByText('Oui');
        fireEvent.click(confirmAcceptButton);
        expect(queryByText('Confirmation')).toBeNull();
    });

    it('handles refusing an interview in the confirmation modal', () => {
        const { queryAllByTestId, getByText, queryByText } = render(<SectionEntrevue />);
        const refuseButton = queryAllByTestId('refuser-button-2')[1];
        fireEvent.click(refuseButton);

        const confirmRefuseButton = getByText('Oui');
        fireEvent.click(confirmRefuseButton);
        expect(queryByText('Confirmation')).toBeNull();
    });
});
