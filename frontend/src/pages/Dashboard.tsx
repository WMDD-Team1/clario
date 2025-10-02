import { useAppSelector } from "@/store/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@components/Button";

export const Dashboard = () => {
  const { user, logout } = useAuth0();
  const { data: appUser, loading, error } = useAppSelector(
    (state) => state.user
  );


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Hello, {user?.name} {user?.sub}</h1>
      <p>Backend name {appUser?.name || "N/A"}</p>
      <Button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-2xl shadow-md hover:bg-red-700 transition"
      >
        Log out
      </Button>
    </div>
  );
};
