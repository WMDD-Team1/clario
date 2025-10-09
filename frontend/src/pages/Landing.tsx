import { useAuth0 } from "@auth0/auth0-react";
import Button from "@components/Button";

export const Landing = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    // If already logged in, redirect to dashboard
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-400 text-white">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Clario</h1>
      <p className="text-lg mb-8 max-w-md text-center">
        The secure way to manage your app. Please log in to continue.
      </p>
      <Button
        onClick={() => loginWithRedirect()}
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Log In / Sign Up
      </Button>
    </div>
  );
};
