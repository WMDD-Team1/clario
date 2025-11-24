import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { logout as logoutSliceAction } from '@store/userSlice';
import api from '@api/api';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await api.post('/auth/logout', {}, { withCredentials: true });
      } catch (err) {
        console.error('Logout error:', err);
      }

      dispatch(logoutSliceAction());

      navigate('/login');
    };

    doLogout();
  }, []);

  return null;
};

export default Logout;
