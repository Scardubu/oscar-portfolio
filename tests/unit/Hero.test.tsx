import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/components/Hero";

// PRD Phase 1: Hero Section Unit Tests
describe("Hero Component", () => {
  it("renders Oscar's hero headline and value proposition", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: "Hey, I'm Oscar 👋" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("AI that solves real problems")
    ).toBeInTheDocument();
  });

  it("renders all 4 hero metrics", () => {
    render(<Hero />);

    expect(screen.getByText("Production Users")).toBeInTheDocument();
    expect(screen.getByText("ML Accuracy")).toBeInTheDocument();
    expect(screen.getByText("System Uptime")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct text", () => {
    render(<Hero />);

    expect(screen.getByText("View My Work")).toBeInTheDocument();
    expect(screen.getByText("Let's Talk 💬")).toBeInTheDocument();
    expect(screen.getByText("Download CV")).toBeInTheDocument();
  });

  it("renders headshot image with correct alt text", () => {
    render(<Hero />);
    
    // PRD Hero-006: Accessible image
    const image = screen.getByAltText("Oscar Ndugbu - Full-Stack ML Engineer");
    expect(image).toBeInTheDocument();
  });

  it("has proper semantic HTML structure", () => {
    const { container } = render(<Hero />);
    
    // Check for semantic section element
    const section = container.querySelector('section[aria-label="Hero section"]');
    expect(section).toBeInTheDocument();
  });
});
