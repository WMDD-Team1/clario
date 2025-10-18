import { Header } from "../header"
import { Sidebar } from "../sidebar"
import { DashboardContent } from "../dashboard-content"

// eslint-disable-next-line no-undef
export function DesktopLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Sidebars */}
      <Sidebar position="top" />
      <Sidebar position="bottom" />

      {/* Main content area */}
      <main className="pt-5 md:pl-25 min-h-screen pb-24 md:pb-0">
        {children ? children : <DashboardContent />}
      </main>
    </>
  )
}
