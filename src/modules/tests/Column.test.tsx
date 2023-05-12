import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { IssueArrayProp } from "../../helpers/constants";
import { store } from "../../store/configureStore";
import Column from "../Column.module";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe("columns displays correctly", () => {
  it("renders column based on props", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Column name="open" issues={IssueArrayProp} path="" />
        </DndProvider>
      </Provider>
    );
    const task = screen.getByText("Bug");
    expect(task).toBeInTheDocument();
  });
});
