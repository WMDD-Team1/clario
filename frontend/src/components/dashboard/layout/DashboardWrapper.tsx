/* eslint-disable no-undef */
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export function DashboardWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopLayout>{children}</DesktopLayout>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileLayout />
      </div>
    </div>
  );
}
