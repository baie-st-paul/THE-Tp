import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import SectionEntrevue from "../SectionEntrevue";
import {BrowserRouter} from "react-router-dom";

describe('SectionEntrevue', () => {
    const entrevueTest = [
        {
            companyName: "Entreprise A",
            dateHeure: "2023-10-15T14:00:00",
            description: "Description A, Description A, Description A, Description A, Description A, Description A, " +
                "Description A, Description A, Description A, Description A, Description A, Description A, Description A, " +
                "Description A, Description A, Description A, Description A, Description A, Description A, Description A",
            status: "EnAttente"
        }
    ]

    it('renders without errors', () => {
        const { container } = render(
            <BrowserRouter>
                <SectionEntrevue entrevueTest={entrevueTest}/>
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it('displays the list of interviews', () => {
        const { getByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );
        expect(getByText('Liste des Entrevues')).toBeInTheDocument();
    });

    it('expands the interview description when "More" button is clicked', () => {
        const { getByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );
        const moreButton = getByText('Plus');
        fireEvent.click(moreButton);
        expect(getByText('Moins')).toBeInTheDocument();
    });

    it('triggers the confirmation modal when "Accepter" button is clicked', () => {
        const { queryAllByTestId,
            getByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );
        const acceptButtons = queryAllByTestId('accept-button-1');
        const acceptButton = acceptButtons[0];

        fireEvent.click(acceptButton);
        expect(getByText('Confirmation')).toBeInTheDocument();
    });

    it('triggers the confirmation modal when "Refuser" button is clicked', () => {
        const { queryAllByTestId,
            getByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );
        const refuseButtons = queryAllByTestId('refuser-button-1');
        const refuseButton = refuseButtons[0];

        fireEvent.click(refuseButton);
        expect(getByText('Confirmation')).toBeInTheDocument();
    });

    it('handles accepting an interview in the confirmation modal', () => {
        const { queryAllByTestId,
            getByText, queryByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );

        const acceptButton = queryAllByTestId('accept-button-2');
        acceptButton.forEach((button) => {
            fireEvent.click(button);

            const confirmAcceptButton = getByText('Oui');
            fireEvent.click(confirmAcceptButton);
            expect(queryByText('Confirmation')).toBeNull();
        })
    });

    it('handles refusing an interview in the confirmation modal', () => {
        const { queryAllByTestId,
            getByText, queryByText } =
            render(
                <BrowserRouter>
                    <SectionEntrevue entrevueTest={entrevueTest}/>
                </BrowserRouter>
            );

        const refuseButton = queryAllByTestId('refuser-button-2');
        refuseButton.forEach((button) => {
            fireEvent.click(button);

            const confirmRefuseButton = getByText('Oui');
            fireEvent.click(confirmRefuseButton);
            expect(queryByText('Confirmation')).toBeNull();
        })
    });
});
