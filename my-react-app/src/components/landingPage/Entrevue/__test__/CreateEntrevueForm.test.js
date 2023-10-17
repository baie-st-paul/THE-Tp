import { render, screen, fireEvent } from '@testing-library/react';
import CreateEntrevueForm from "../CreateEntrevueForm";
import {BrowserRouter} from "react-router-dom";

const mockedOnAdd = jest.fn();

const MockCreateEntrevueForm = ({onAdd}) => {
    return (
        <BrowserRouter>
            <CreateEntrevueForm
                onAdd={onAdd}
            />
        </BrowserRouter>
    )
}

describe("Test the CreateEntrevueForm Component", () => {
    it("should render all input of form", () => {
        render(<MockCreateEntrevueForm onAdd={mockedOnAdd}/>);
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Heure')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByRole('button', {Name: /créer l'entrevue/i}));
    });

    it("should link", () => {
        render(<MockCreateEntrevueForm onAdd={mockedOnAdd}/>);
        const links: HTMLAnchorElement[] = screen.getAllByRole("link");
        expect(links[0].textContent).toEqual("Retour");
        expect(links[0].href).toContain("/EmployeurHomePage");
    });

    it("should be able to type into input", () => {
        render(<MockCreateEntrevueForm onAdd={mockedOnAdd}/>);
        const inputElementDate = screen.getByLabelText('Date');
        const inputElementHeure = screen.getByLabelText('Heure');
        const inputElementDescription = screen.getByLabelText('Description');

        fireEvent.click(inputElementDate)
        fireEvent.change(inputElementDate, {
            target: {value: "2023-10-11"}
        })
        expect(inputElementDate.value).toBe("2023-10-11")

        fireEvent.click(inputElementHeure)
        fireEvent.change(inputElementHeure, {
            target: {value: "15:00"}
        })
        expect(inputElementHeure.value).toBe("15:00")

        fireEvent.click(inputElementDescription)
        fireEvent.change(inputElementDescription, {
            target: {value: "réunion par teams, lien par email"}
        })
        expect(inputElementDescription.value).toBe("réunion par teams, lien par email")
    });

    it("should be able to add from input", () => {
        render(<MockCreateEntrevueForm onAdd={mockedOnAdd}/>);

        const inputElementDate = screen.getByLabelText('Date');
        fireEvent.click(inputElementDate)
        fireEvent.change(inputElementDate, {
            target: {value: "2023-10-11"}
        })

        const inputElementHeure = screen.getByLabelText('Heure');
        fireEvent.click(inputElementHeure)
        fireEvent.change(inputElementHeure, {
            target: {value: "15:00"}
        })

        const inputElementDescription = screen.getByLabelText('Description');
        fireEvent.click(inputElementDescription)
        fireEvent.change(inputElementDescription, {
            target: {value: "réunion par teams, lien par email"}
        })

        const buttonElement = screen.getByRole('button', {Name: /créer l'entrevue/i});
        fireEvent.click(buttonElement)
        expect(mockedOnAdd).toBeCalled()
    });
});
