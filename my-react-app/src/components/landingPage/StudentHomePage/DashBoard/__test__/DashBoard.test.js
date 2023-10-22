import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";

describe("Dashboard", () => {
    it("renders without error", () => {
        render(<Dashboard />);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("displays a 'No entrevues available' message when there are no entrevues", () => {
        render(<Dashboard />);
        expect(screen.getByText("Nouvelles Entrevues")).toBeInTheDocument();
    });

    it("renders EntrevueItemDashboard components for available entrevues", () => {
        const entrevues = [
            {
                entreprise: "Entreprise A",
                dateHeure: "2023-10-15T14:00:00",
                description: "Description A",
                status: "En_attente"
            },
            {
                entreprise: "Entreprise B",
                dateHeure: "2023-10-20T10:30:00",
                description: "Description B",
                statut: "Accepté",
                status: "En_attente"
            }
        ];

        render(<Dashboard />);

        entrevues.forEach((entrevue) => {
            expect(screen.getByText("Nouvelles Entrevues")).toBeInTheDocument();
            expect(screen.getByText(entrevue.entreprise)).toBeInTheDocument();
            expect(screen.getByText(entrevue.description)).toBeInTheDocument();
        });
    });
});
