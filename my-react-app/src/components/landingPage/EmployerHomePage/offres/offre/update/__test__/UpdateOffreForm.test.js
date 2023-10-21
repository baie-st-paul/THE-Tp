import {BrowserRouter} from "react-router-dom";
import UpdateOffreForm from "../UpdateOffreForm";
import {fireEvent, render, screen} from "@testing-library/react";

const mockedOnUpdate = jest.fn();

const MockUpdateOffreForm = ({onUpdate}) => {
    return (
        <BrowserRouter>
            <UpdateOffreForm
                offreStage={[]}
                onUpdate={onUpdate}
            />
        </BrowserRouter>
    )
}

describe("Test the UpdateOffreForm Component", () => {
    it("should render all input of form", () => {
        render(<MockUpdateOffreForm onUpdate={mockedOnUpdate}/>);
        expect(screen.getByPlaceholderText('Description sommaire')).toBeInTheDocument();
        expect(screen.getByRole('button', {Name: /Mettre à jour l'offre/i}));
    });

    it("should be able to type into input", () => {
        render(<MockUpdateOffreForm onUpdate={mockedOnUpdate}/>);
        const inputElement = screen.getByPlaceholderText('Description sommaire');

        fireEvent.click(inputElement)
        fireEvent.change(inputElement, {
            target: {value: "Un développeur Web est responsable de la conception, du codage et de la modification des sites Web, y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et l'expérience utilisateur. Les développeurs Web doivent créer des conceptions de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation claire pour une convivialité optimale."}
        })
        expect(inputElement.value).toBe("Un développeur Web est responsable de la conception, du codage et de la modification des sites Web, y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et l'expérience utilisateur. Les développeurs Web doivent créer des conceptions de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation claire pour une convivialité optimale.")
    });
});
