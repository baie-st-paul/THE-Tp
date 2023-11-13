import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";
import Dashboard from "../Dashboard";

describe("Dashboard", () => {
    const entrevues = [
        {
            companyName: "Entreprise A",
            dateHeure: "2023-10-15T14:00:00",
            description: "Description A",
            status: "EnAttente"
        }
    ];

    it("renders without error", () => {
        render(<Dashboard entrevuesTest={entrevues}/>);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("displays a 'No entrevues available' message when there are no entrevues", () => {
        render(<Dashboard entrevuesTest={entrevues}/>);
        expect(screen.getByText("Nouvelles Entrevues")).toBeInTheDocument();
    });

    it("renders EntrevueItemDashboard components for available entrevues", () => {
        render(<Dashboard entrevuesTest={entrevues}/>)

        expect(screen.getByText("Nouvelles Entrevues")).toBeInTheDocument();
        expect(screen.findByRole('button', {Name: /Voir entrevue/i}));

        const buttonEntrevues = screen.getByText("Voir entrevue")
        fireEvent.click(buttonEntrevues)
        entrevues.forEach((entrevue) => {
            expect(screen.getAllByText(entrevue.companyName).length).toBe(2);
            expect(screen.getByText(entrevue.description)).toBeInTheDocument();
        })
    });
});
