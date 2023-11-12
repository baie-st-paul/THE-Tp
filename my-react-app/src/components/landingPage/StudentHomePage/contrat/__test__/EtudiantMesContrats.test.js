import {render, fireEvent, screen, act, waitForElement  } from '@testing-library/react';
import EtudiantMesContrats from '../EtudiantMesContrats.js'
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
       render(<EtudiantMesContrats employerId={1} contratsTest={contrats}></EtudiantMesContrats>)
    })
      const row = document.querySelectorAll('tr');
      expect(row.length).toBe(3) 
      const element = screen.getByText('Dev');
      expect(element).toBeInTheDocument();
      
    })
})
