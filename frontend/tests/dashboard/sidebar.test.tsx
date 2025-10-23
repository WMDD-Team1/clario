import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Sidebar } from "@/components/dashboard/sidebar"

const mockItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "settings", label: "Settings" },
]

describe("Sidebar", () => {
  it("renders all navigation items", () => {
    render(<Sidebar items={mockItems} activeItem="dashboard" onItemClick={() => {}} position="top" />)

    mockItems.forEach((item) => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument()
    })
  })

  it("highlights the active item", () => {
    const { container } = render(
      <Sidebar items={mockItems} activeItem="dashboard" onItemClick={() => {}} position="top" />,
    )

    const activeButton = screen.getByLabelText("Dashboard")
    expect(activeButton).toHaveClass("bg-gray-500")
  })

  it("calls onItemClick when a button is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Sidebar items={mockItems} activeItem="dashboard" onItemClick={handleClick} position="top" />)

    await user.click(screen.getByLabelText("Settings"))
    expect(handleClick).toHaveBeenCalledWith("settings")
  })

  it("applies correct position classes", () => {
    const { container, rerender } = render(
      <Sidebar items={mockItems} activeItem="dashboard" onItemClick={() => {}} position="top" />,
    )

    expect(container.querySelector(".top-28")).toBeInTheDocument()

    rerender(<Sidebar items={mockItems} activeItem="dashboard" onItemClick={() => {}} position="bottom" />)

    expect(container.querySelector(".bottom-6")).toBeInTheDocument()
  })
})
