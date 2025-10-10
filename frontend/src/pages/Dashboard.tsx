import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutSliceAction } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@components/Button";

export const Dashboard = () => {
  const { user, logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { data: appUser, loading, error } = useAppSelector(
    (state) => state.user
  );

  if (loading) return <p>Loading Dashboard...</p>
  if (error) return <p>Error getting your user: {error}</p>
  if (!appUser) return <p>No user found</p>

  const handleLogout = () => {
    dispatch(logoutSliceAction());
    logout({ logoutParams: { returnTo: window.location.origin } })
  }


  return (
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
  );
};
