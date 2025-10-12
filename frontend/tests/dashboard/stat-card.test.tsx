import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatCard } from "@/components/dashboard/stat-card"

describe("StatCard", () => {
  it("renders label and value correctly", () => {
    render(<StatCard icon={<span>Icon</span>} label="Total Income" value="$12,000" />)
    expect(screen.getByText("Total Income")).toBeInTheDocument()
    expect(screen.getByText("$12,000")).toBeInTheDocument()
  })

  it("renders icon", () => {
    render(<StatCard icon={<span data-testid="test-icon">Icon</span>} label="Test Label" value="100" />)
    expect(screen.getByTestId("test-icon")).toBeInTheDocument()
  })
})
