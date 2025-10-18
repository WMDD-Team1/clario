import React from "react"

interface NavItem {
  id: string
  label: string
}

interface SidebarProps {
  position: "top" | "bottom"
}

export function Sidebar({ position }: SidebarProps) {
  // Define top and bottom items
  const topItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "money-flow", label: "Money Flow" },
    { id: "my-work", label: "My Work" },
    { id: "settings", label: "Settings" },
  ]

  const bottomItems: NavItem[] = [
    { id: "support", label: "Support & FAQ" },
    { id: "logout", label: "Log Out" },
  ]

  const items = position === "top" ? topItems : bottomItems
  const positionClasses = position === "top" ? "top-28" : "bottom-6"
  const [activeItem, setActiveItem] = React.useState("dashboard")

  return (
    <aside className={`fixed left-6 ${positionClasses} z-20`}>
      <div className="bg-gray-700 rounded-3xl p-2 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => setActiveItem(item.id)}
              className={`w-14 h-14 rounded-2xl transition-colors ${
                activeItem === item.id ? "bg-gray-500" : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={item.label}
            />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-600 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
