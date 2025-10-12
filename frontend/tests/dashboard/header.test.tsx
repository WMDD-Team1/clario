import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Header } from "@/components/dashboard/header"

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />)
    expect(screen.getByText("Logo")).toBeInTheDocument()
  })

  it("renders the search input", () => {
    render(<Header />)
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument()
  })

  it("renders the user avatar", () => {
    const { container } = render(<Header />)
    const avatar = container.querySelector(".bg-black.rounded-full")
    expect(avatar).toBeInTheDocument()
  })
})
