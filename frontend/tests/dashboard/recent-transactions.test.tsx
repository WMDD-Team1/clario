import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

describe("RecentTransactions", () => {
  const mockTransactions = [
    { date: "Sept 12", amount: 1200 },
    { date: "Sept 14", amount: 2500 },
  ]

  it("renders title correctly", () => {
    render(<RecentTransactions title="Recent Income" transactions={mockTransactions} icon={<span>Icon</span>} />)
    expect(screen.getByText("Recent Income")).toBeInTheDocument()
  })

  it("renders all transactions", () => {
    render(<RecentTransactions title="Recent Income" transactions={mockTransactions} icon={<span>Icon</span>} />)
    expect(screen.getByText("Sept 12")).toBeInTheDocument()
    expect(screen.getByText("$1,200")).toBeInTheDocument()
    expect(screen.getByText("Sept 14")).toBeInTheDocument()
    expect(screen.getByText("$2,500")).toBeInTheDocument()
  })
})
