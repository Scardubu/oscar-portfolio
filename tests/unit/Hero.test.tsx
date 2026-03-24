import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/components/Hero";

// PRD Phase 1: Hero Section Unit Tests
describe("Hero Component", () => {
  it("renders Oscar's hero headline and value proposition", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /Hey, I’m Oscar 👋/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /I architect production AI systems that distill frontier intelligence into elegant, trusted tools people rely on every single day/i
      )
    ).toBeInTheDocument();
  });

  it("renders all 4 hero metrics", () => {
    render(<Hero />);

    expect(screen.getByText("Global Impact")).toBeInTheDocument();
    expect(screen.getByText("AI Precision")).toBeInTheDocument();
    expect(screen.getByText("Unwavering Reliability")).toBeInTheDocument();
    expect(screen.getByText("Built for Scale")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct text", () => {
    render(<Hero />);

    expect(screen.getByText("Explore selected systems")).toBeInTheDocument();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
    expect(screen.getByText("Bookmark for updates")).toBeInTheDocument();
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
    expect(screen.getByText(/SabiScore flagship platform/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Open to Senior ML \/ Full-Stack Roles & Consulting/i)
    ).toBeInTheDocument();
  });
});
