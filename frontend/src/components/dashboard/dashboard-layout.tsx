import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { DashboardContent } from "./dashboard-content"
import { MobileNav } from "./mobile-nav"

const topNavItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "money-flow", label: "Money Flow" },
  { id: "my-work", label: "My Work" },
  { id: "settings", label: "Settings" },
]

const bottomNavItems = [
  { id: "support", label: "Support & FAQ" },
  { id: "logout", label: "Log Out" },
]

export function DashboardLayout() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="hidden md:block">
        <Sidebar items={topNavItems} activeItem={activeItem} onItemClick={setActiveItem} position="top" />
      </div>
      <div className="hidden md:block">
        <Sidebar items={bottomNavItems} activeItem={activeItem} onItemClick={setActiveItem} position="bottom" />
      </div>
      <main className="pt-5 md:pl-25 min-h-screen pb-24 md:pb-0">
        <DashboardContent />
      </main>
      <MobileNav />
    </div>
  )
}

