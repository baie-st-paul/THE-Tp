import { render, screen, fireEvent } from '@testing-library/react';
import ConvoquerEtudiantEntrevuePage from "../ConvoquerEtudiantEntrevuePage";
import {BrowserRouter} from "react-router-dom";

const mockedResponseEntrevues = jest.fn();

const MockConvoquerEtudiantEntrevuePage = () => {
    return (
        <BrowserRouter>
            <ConvoquerEtudiantEntrevuePage/>
        </BrowserRouter>
    )
}

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockedResponseEntrevues)
    })
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Test the ConvoquerEtudiantEntrevuePage Component", () => {
    it("should render same h2", () => {
        render(<MockConvoquerEtudiantEntrevuePage/>);
        const h2Element = screen.getByTitle(/Entrevue/i);
        expect(h2Element).toBeInTheDocument();
    });
});
