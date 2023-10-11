import { render, screen, fireEvent } from '@testing-library/react';
import CreateEntrevueForm from "../CreateEntrevueForm";

describe("Test the CreateEntrevueForm Component", () => {
    test("render the CreateEntrevueForm with 4 input", async () => {
        render(<CreateEntrevueForm/>);
        const buttonList = await screen.findAllByRole("input");
        expect(buttonList).toHaveLength(4);
    });
});
