import { render, screen } from "@testing-library/react"
import { AIInsights } from "@/components/dashboard/ai-insights"

describe("AIInsights", () => {
  it("renders title and description", () => {
    render(<AIInsights />)
    expect(screen.getByText("AI Insights")).toBeInTheDocument()
    expect(screen.getByText("Trends & Comparisons")).toBeInTheDocument()
  })

  it("renders placeholder content container", () => {
    const { container } = render(<AIInsights />)
    expect(container.querySelector(".text-sm.text-gray-500")).toBeInTheDocument()
  })
})
