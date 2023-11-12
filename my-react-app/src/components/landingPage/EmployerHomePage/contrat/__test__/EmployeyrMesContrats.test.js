import {render, fireEvent, screen, act } from '@testing-library/react';
import EmployeurMesContrats from '../EmployeurMesContrats';
import React from 'react';

describe('Tests Employeur voit ses contrats', () => {

    let contrats = [{
        employerId : 1,
        id : 1,
        nomDePoste : 'Dev',
        nomEtudiant : 'dan',
        prenomEtudiant : 'dan',
        statutEmployeur : 'Pas_Signer',
        statutEtudiant : 'Pas_Signer',
        statutGestionnaire : "Pas_Signer",
        studentId : "1234567"
    }, {
        employerId : 2,
        id : 2,
        nomDePoste : 'Dev1',
        nomEtudiant : 'dan1',
        prenomEtudiant : 'dan1',
        statutEmployeur : 'Pas_Signer',
        statutEtudiant : 'Pas_Signer',
        statutGestionnaire : "Pas_Signer",
        studentId : "1234565"
    }]

    it('should show contracts if there is any', () => {
        act(() => {
            render(<EmployeurMesContrats employerId={1} contratsTest={contrats}></EmployeurMesContrats>)
        })
        const row = document.querySelectorAll('tr');
        expect(row.length).toBe(3)
        const element = screen.getByText('1234567');
        expect(element).toBeInTheDocument();
    })

    it('should filter properly', () => {
        const { getByTestId } =
            render(<EmployeurMesContrats employerId={1234} contratsTest={contrats}></EmployeurMesContrats>)
        const inputElement = getByTestId('input');

        fireEvent.change(inputElement, { target: { value: '1234567' } });
        const element = screen.getByText('1234567');
        expect(element).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: '999999' }});
        const row = document.querySelectorAll('tr');
        expect(row.length).toBe(1)
    })
})
