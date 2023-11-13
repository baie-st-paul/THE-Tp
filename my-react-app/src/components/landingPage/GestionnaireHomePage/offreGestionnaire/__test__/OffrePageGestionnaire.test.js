import {BrowserRouter} from "react-router-dom";
import OffresPageGestionnaire from "../OffrePageGestionnaire";
import {render, screen} from "@testing-library/react";
import {testListOffre} from "./TestListOffre";

const MockOffresPageGestionnaire = ({listeOffres}) => {
    return (
        <BrowserRouter>
            <OffresPageGestionnaire
                listeOffres={listeOffres}
            />
        </BrowserRouter>
    )
}

describe("Test the OffresPageGestionnaire Component", () => {
    it('should render text from list', ()=> {
        render(<MockOffresPageGestionnaire listeOffres={testListOffre}/>)
    });
});
