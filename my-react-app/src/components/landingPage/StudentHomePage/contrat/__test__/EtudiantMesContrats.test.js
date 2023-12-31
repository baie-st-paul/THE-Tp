import {render, fireEvent, screen, act  } from '@testing-library/react';
import EtudiantMesContrats from '../EtudiantMesContrats.js'
import React from 'react';
import {BrowserRouter} from "react-router-dom";

describe('Tests Etudiant voit ses contrats', () => {

    let contrats = [
        {
            id: 1,
            statusVuPasVuE: "pasVu",
            statusVuPasVuG: "vu",
            statusVuPasVuS: "vu",
            statutEmployeur: "Pas_Signer",
            statutEtudiant: "Pas_Signer",
            statutGestionnaire: "Pas_Signer",

            candidatureDTO: {
                employer: {
                    id: 1,
                    companyName: 'Dev'
                },
                offreStage: {
                    titre: 'Dev'
                },
                student: {
                    firstName: 'dan',
                    lastName: 'dan',
                    matricule: '1234567'
                }
            },
        },
        {
            id: 2,
            statusVuPasVuE: "pasVu",
            statusVuPasVuG: "vu",
            statusVuPasVuS: "vu",
            statutEmployeur: "Pas_Signer",
            statutEtudiant: "Pas_Signer",
            statutGestionnaire: "Pas_Signer",

            candidatureDTO: {
                employer: {
                    id: 2,
                    companyName: 'Dev1'
                },
                offreStage: {
                    titre: 'Dev1'
                },
                student: {
                    firstName: 'dan1',
                    lastName: 'dan1',
                    matricule: '1234565'
                }
            },
        }]

    let unContrat = [{
        id: 1,
        statusVuPasVuE: "pasVu",
        statusVuPasVuG: "vu",
        statusVuPasVuS: "vu",
        statutEmployeur: "Pas_Signer",
        statutEtudiant: "Pas_Signer",
        statutGestionnaire: "Pas_Signer",

        candidatureDTO: {
            employer: {
                id: 1,
                companyName: 'Dev'
            },
            offreStage: {
                titre: 'Dev'
            },
            student: {
                firstName: 'dan',
                lastName: 'dan',
                matricule: '1234567'
            }
        },
    }]

    let contratsSigne = [{
        id: 1,
        statusVuPasVuE: "pasVu",
        statusVuPasVuG: "vu",
        statusVuPasVuS: "vu",
        statutEmployeur: "Signer",
        statutEtudiant: "Signer",
        statutGestionnaire: "Signer",

        candidatureDTO: {
            employer: {
                id: 1,
                companyName: 'Dev'
            },
            offreStage: {
                titre: 'Dev'
            },
            student: {
                firstName: 'dan',
                lastName: 'dan',
                matricule: '1234567'
            }
        },
    }, {
        id: 2,
        statusVuPasVuE: "pasVu",
        statusVuPasVuG: "vu",
        statusVuPasVuS: "vu",
        statutEmployeur: "Signer",
        statutEtudiant: "Signer",
        statutGestionnaire: "Signer",

        candidatureDTO: {
            employer: {
                id: 2,
                companyName: 'Dev1'
            },
            offreStage: {
                titre: 'Dev1'
            },
            student: {
                firstName: 'dan1',
                lastName: 'dan1',
                matricule: '1234565'
            }
        },
    }]

    it('should show contracts if there is any', () => {
        act(() => {
            render(
                <BrowserRouter>
                    <EtudiantMesContrats contratsTest={unContrat}/>
                </BrowserRouter>
            )
        })

        const row = document.querySelectorAll('tr');
        expect(row.length).toBe(2)

        const element = screen.getByText('1234567');
        expect(element).toBeInTheDocument();
    })

    it('should have a button "sign" if user need to sign the document', ()=>{
        act(() => {
            render(
                <BrowserRouter>
                    <EtudiantMesContrats contratsTest={contrats}/>
                </BrowserRouter>
            )
        })

        const button = screen.getAllByText('Signer le contrat', { selector: 'span' })[0]
        expect(button).toBeInTheDocument();
    })

    it('should have no buttons if contracts are signed', ()=>{
        act(() => {
            render(
                <BrowserRouter>
                    <EtudiantMesContrats contratsTest={contratsSigne}/>
                </BrowserRouter>
            )
        })

        const elementsSigne =  screen.getAllByText('Signé')
        expect(elementsSigne.length).toBe(6)
    })

    it('should replace button by text after clicking on "sign"', ()=>{
        act(() => {
            render(
                <BrowserRouter>
                    <EtudiantMesContrats contratsTest={unContrat}/>
                </BrowserRouter>
            )
        })

        fireEvent.click(screen.getByText('Signer le contrat'));
        fireEvent.click(screen.getByText('Oui'));
        expect(screen.getByText('Signé')).toBeInTheDocument();
    })

    it('should do nothing when clicked on no in modal window', ()=>{
        // pas supprimer
        let unContrat = [{
            id: 1,
            statusVuPasVuE: "pasVu",
            statusVuPasVuG: "vu",
            statusVuPasVuS: "vu",
            statutEmployeur: "Pas_Signer",
            statutEtudiant: "Pas_Signer",
            statutGestionnaire: "Pas_Signer",

            candidatureDTO: {
                employer: {
                    id: 1,
                    companyName: 'Dev'
                },
                offreStage: {
                    titre: 'Dev'
                },
                student: {
                    firstName: 'dan',
                    lastName: 'dan',
                    matricule: '1234567'
                }
            },
        }]

        act(() => {
            render(
                <BrowserRouter>
                    <EtudiantMesContrats contratsTest={unContrat}/>
                </BrowserRouter>
            )
        })

        fireEvent.click(screen.getByText('Signer le contrat'));
        fireEvent.click(screen.getByText('Non'));
        expect(screen.getByText('Signer le contrat')).toBeInTheDocument();
    })
})
