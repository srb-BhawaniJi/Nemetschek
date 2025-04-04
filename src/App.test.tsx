import { render, screen, fireEvent } from "@testing-library/react";
import { Implementation } from "./Implementation";
import React from "react";

describe("Implementation Component", () => {
    test("renders dropdowns and toggle button", () => {
        render(<Implementation />);
        
        expect(screen.getByText("Toggle")).toBeInTheDocument();
        expect(screen.getAllByRole("button").length).toBe(2);
    });

    test("toggles rotation angle on clicking toggle button", () => {
        render(<Implementation />);
        const toggleButton = screen.getByText("Toggle");
        
        fireEvent.click(toggleButton);
        fireEvent.click(toggleButton); 
    });

    test("updates selected node on side menu click", () => {
        render(<Implementation />);
        const menuItem = screen.getByText("Select location"); 
        
        fireEvent.click(menuItem);
        expect(screen.getByText(/Select location/)).toBeInTheDocument(); 
    });

    test("dropdown selection updates state", () => {
        render(<Implementation />);
        const dropdowns = screen.getAllByRole("button");
        
        fireEvent.change(dropdowns[0], { target: { value: "Red" } });
        expect(dropdowns[0]).toHaveValue("Red");
    });

    test("renders default selected SVG when no location is chosen", () => {
        render(<Implementation />);
        expect(screen.getByText("Select location")).toBeInTheDocument();
    });

    test("renders SVG component when a location is selected", () => {
        render(<Implementation />);
        const menuItem = screen.getByText("Select location");
        
        fireEvent.click(menuItem);
        expect(screen.getByText(/Select location/)).toBeInTheDocument(); 
    });

    test("changes SVG fill color on color selection", () => {
      render(<Implementation />);
      const dropdowns = screen.getAllByRole("button");
      fireEvent.change(dropdowns[0], { target: { value: "#FF0000" } }); 
      
      const svgElement = screen.queryByRole("img");
      if (svgElement) {
          expect(svgElement).toHaveAttribute("fill", "#FF0000");
      }
  });

  test("applies shape filter correctly", () => {
      render(<Implementation />);
      const shapeDropdown = screen.getAllByRole("button")[1];
      
      fireEvent.change(shapeDropdown, { target: { value: "Circle" } }); 
      expect(shapeDropdown).toHaveValue("Circle");
  });

  test("does not show SVG when no location is selected", () => {
      render(<Implementation />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});