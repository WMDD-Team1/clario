import { useAppSelector } from '@/store/hooks';
import { useAuth0 } from "@auth0/auth0-react";
import Error from '@components/Error';
import Header from '@components/Header';
import Loading from "@components/Loading";
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { data: user, loading, error } = useAppSelector(
    (state) => state.user
  );

  if (loading || isLoading) return <Loading />
  if (error) return <Error message={error}></Error>
  if (!isAuthenticated) return <Navigate to="/" replace />

  return isAuthenticated ? (<>
    <Header />
    <Sidebar />
    <Navbar />
    <div className='grow-1 md:ml-[170px] mx-[40px] mb-[160px] md:mb-[40px]'>
      {children}
    </div>
  </>) : <Navigate to="/" />;
};
