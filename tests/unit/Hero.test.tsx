import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/components/Hero";

// PRD Phase 1: Hero Section Unit Tests
describe("Hero Component", () => {
  it("renders Oscar's hero headline and value proposition", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /Oscar Ndugbu — Full-Stack ML Engineer shipping production AI systems/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I design and ship end-to-end ML products/i)
    ).toBeInTheDocument();
  });

  it("renders all 4 hero metrics", () => {
    render(<Hero />);

    expect(screen.getByText("Production users")).toBeInTheDocument();
    expect(screen.getByText("Model accuracy")).toBeInTheDocument();
    expect(screen.getByText("System uptime")).toBeInTheDocument();
    expect(screen.getByText("Years shipping")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct text", () => {
    render(<Hero />);

    expect(screen.getByText("Explore shipped work")).toBeInTheDocument();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
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

  it("renders the location badge and SabiScore proof callout", () => {
    render(<Hero />);

    expect(screen.getByText("Nigeria NG • Remote-First")).toBeInTheDocument();
    expect(screen.getByText(/SabiScore/i)).toBeInTheDocument();
    expect(screen.getByText(/Production proof/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Python • TypeScript • FastAPI • Next\.js • MLOps/i)
    ).toBeInTheDocument();
  });
});
