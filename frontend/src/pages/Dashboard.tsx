import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutSliceAction } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"; // ✅ updated import path
import type { RootState } from "@/store";

export const Dashboard = () => {
  const { user, logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { data: appUser, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  const isDevMode = window.location.pathname === "/dev-dashboard";

  if (!isDevMode) {
    if (loading) return <p>Loading Dashboard...</p>;
    if (error) return <p>Error getting your user: {error}</p>;
    if (!appUser) return <p>No user found</p>;
  }

  const handleLogout = () => {
    dispatch(logoutSliceAction());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Hello, {appUser?.name} {appUser?.id}</h1>
        <Button
          buttonColor="darkButton"
          width="10rem"
          textColor="white"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </>
  );
};
