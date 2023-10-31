import {render} from "@testing-library/react";
import CreateSignature from "../CreateSignature";
import "jest-canvas-mock";

describe("Test the CreateSignature Component", () => {
    it("should render CreateSignature", () => {
        render(<CreateSignature/>);
    });
});
