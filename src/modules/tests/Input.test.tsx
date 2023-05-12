import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store/configureStore";

import Input from "../Input.module";

describe("input works correctly", () => {
  it("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("input element when typing displays correct value", async () => {
    render(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    const input = screen.getByTestId("search");
    await act(() => {
      userEvent.type(input, "react");
    });
    const inputValue = (input as HTMLInputElement).value;
    expect(inputValue).toBe("react");
  });
});
