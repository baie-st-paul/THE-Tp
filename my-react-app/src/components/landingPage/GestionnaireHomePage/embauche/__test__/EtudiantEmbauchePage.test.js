import {BrowserRouter} from "react-router-dom";
import EtudiantEmbauchePage from "../EtudiantEmbauchePage";
import {fireEvent, render, screen} from "@testing-library/react";
import {testList, testList1, testList1Acceptes, testList2} from "../../../offresStages/student/info/__test__/TestList";

const MockEtudiantEmbauchePage = ({listeCandidature}) => {
    return (
        <BrowserRouter>
            <EtudiantEmbauchePage
                listeCandidature={listeCandidature}
            />
        </BrowserRouter>
    )
}

describe("Test the EtudiantEmbauchePage Component", () => {
    it('should render div Aucune offre', () => {
        render(<MockEtudiantEmbauchePage listeEtudiant={[]}/>)
        expect(screen.getByText('Aucune offre')).toBeInTheDocument()
    });

    it("should render Button voir lettre motivation disabled si lettre n'est pas la" , ()=> {
        render(<MockEtudiantEmbauchePage listeEtudiant={testList1Acceptes}/>)
        expect(screen.getByText('danil')).toBeInTheDocument();
        const bouttonElement = screen.getByText('Lettre de motivation')
        expect(bouttonElement).toBeInTheDocument()
        expect(bouttonElement).toHaveClass('disabled')
    });
});
