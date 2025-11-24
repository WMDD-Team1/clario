import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUser } from '@store/userSlice';
import React, { useEffect } from 'react';
import Loading from './Loading';

export function UserLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (loading) return <Loading />;

  return <>{children}</>;
}
