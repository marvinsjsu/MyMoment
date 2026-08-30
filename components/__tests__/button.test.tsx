import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Button from "../button";

describe("Button", () => {
  it("renders the label", () => {
    render(<Button label="Press me" />);
    expect(screen.getByText("Press me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(<Button label="Go" onPress={onPress} />);
    fireEvent.press(screen.getByText("Go"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not throw when onPress is not provided", () => {
    render(<Button label="No handler" />);
    expect(() => fireEvent.press(screen.getByText("No handler"))).not.toThrow();
  });

  it("renders the primary theme variant", () => {
    render(<Button label="Upload" theme="primary" onPress={jest.fn()} />);
    expect(screen.getByText("Upload")).toBeTruthy();
  });
});
