import { DesktopLayout } from "./DesktopLayout";
// import { MobileLayout } from "./MobileLayout";

// eslint-disable-next-line no-undef
export function DashboardWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopLayout>{children}</DesktopLayout>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* <MobileLayout>{children}</MobileLayout> */}
      </div>
    </div>
  );
}
