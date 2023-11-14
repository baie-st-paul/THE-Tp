import {render, fireEvent, screen, act } from '@testing-library/react';
import React from 'react';
import ListContratsGestionnaire from "../ListContratsGestionnaire";

describe('Tests Gestionnaire voit tous les contrats', () => {

    let contrats = [{
        employerId : 1,
        id : 1,
        nomDeCompany : 'Dev',
        nomEtudiant : 'dan',
        prenomEtudiant : 'dan',
        statutEmployeur : 'Pas_Signer',
        statutEtudiant : 'Pas_Signer',
        statutGestionnaire : "Pas_Signer",
        studentId : "1234567"
    }, {
        employerId : 2,
        id : 2,
        nomDeCompany : 'Dev1',
        nomEtudiant : 'dan1',
        prenomEtudiant : 'dan1',
        statutEmployeur : 'Pas_Signer',
        statutEtudiant : 'Pas_Signer',
        statutGestionnaire : "Pas_Signer",
        studentId : "1234565"
    }]

    let unContrat = [{ 
        employerId : 1,
        id : 1,
        nomDePoste : 'Dev',
        nomEtudiant : 'dan',
        prenomEtudiant : 'dan',
        statutEmployeur : 'Pas_Signer',
        statutEtudiant : 'Pas_Signer',
        statutGestionnaire : "Pas_Signer",
        studentId : "1234567"
    }
    ]
    
    
    let contratsSigne = [{ 
        employerId : 1,
        id : 1,
        nomDePoste : 'Dev',
        nomEtudiant : 'dan',
        prenomEtudiant : 'dan',
        statutEmployeur : 'Signer',
        statutEtudiant : 'Signer',
        statutGestionnaire : "Signer",
        studentId : "1234567"
    }, {
         employerId : 2,
         id : 2,
         nomDePoste : 'Dev1',
         nomEtudiant : 'dan1',
         prenomEtudiant : 'dan1',
         statutEmployeur : 'Signer',
         statutEtudiant : 'Signer',
         statutGestionnaire : "Signer",
         studentId : "1234565"
    }]

    it('should show contracts if there is any', () => {
        act(() => {
            render(<ListContratsGestionnaire contratsTest={unContrat}/>)
        })
        const row = document.querySelectorAll('tr')
        expect(row.length).toBe(2)
        const element = screen.getByText('1234567');
        expect(element).toBeInTheDocument();
    })

    it('should filter properly', () => {
        const { getByTestId } =
            render(<ListContratsGestionnaire contratsTest={contrats}/>)
        const inputElement = getByTestId('input');

        fireEvent.change(inputElement, { target: { value: '1234567' } });
        const element = screen.getByText('1234567');
        expect(element).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: '999999' }});
        const row = document.querySelectorAll('tr');
        expect(row.length).toBe(1)
    })

    it('should have a button "sign" if user need to sign the document', ()=>{
        act(() => {
            render(<ListContratsGestionnaire contratsTest={contrats}></ListContratsGestionnaire>)
         })
         const button = screen.getAllByText('Signer le contrat', { selector: 'span' })[0] 
         expect(button).toBeInTheDocument();
    } )

    it('should have no buttons if contracts are signed', ()=>{
        act(() => {
            render(<ListContratsGestionnaire contratsTest={contratsSigne}></ListContratsGestionnaire>)
         })
         const elementsSigne =  screen.getAllByText('Signé')
         expect(elementsSigne.length).toBe(6)
    })

    it('should replace button by text after clicking on "sign"', ()=>{
        act(() => {
            render(<ListContratsGestionnaire contratsTest={unContrat}></ListContratsGestionnaire>)
         })
         fireEvent.click(screen.getByText('Signer le contrat'));
         fireEvent.click(screen.getByText('Oui'));
         expect(screen.getByText('Signé')).toBeInTheDocument();
    })

    it('should do nothing when clicked on no in modal window', ()=>{
        // pas supprimer
        let unContrat = [{ 
            employerId : 1,
            id : 1,
            nomDePoste : 'Dev',
            nomEtudiant : 'dan',
            prenomEtudiant : 'dan',
            statutEmployeur : 'Pas_Signer',
            statutEtudiant : 'Pas_Signer',
            statutGestionnaire : "Pas_Signer",
            studentId : "1234567"
        }
        ]
        act(() => {
            render(<ListContratsGestionnaire contratsTest={unContrat}></ListContratsGestionnaire>)
         })
         fireEvent.click(screen.getByText('Signer le contrat'));
         fireEvent.click(screen.getByText('Non'));
         expect(screen.getByText('Signer le contrat')).toBeInTheDocument();
    })
})
