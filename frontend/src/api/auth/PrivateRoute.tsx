import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Error from '@components/Error';
import Header from '@components/Header';
import Loading from '@components/Loading';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import { fetchUser } from '@store/userSlice';
import { ReactNode, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, []);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Header />
      {isDesktop ? <Sidebar /> : <Navbar />}
      <div className="grow-1 md:ml-[170px] mx-[20px] mb-[160px] md:mb-[40px]">{children}</div>
    </>
  );
};
