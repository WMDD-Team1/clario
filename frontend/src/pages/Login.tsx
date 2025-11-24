import ToggleButton from '@components/ToggleButton';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const options = [
    { key: 'signup', label: 'Sign Up' },
    { key: 'login', label: 'Login' },
  ];

  const selected = pathname.includes('signup') ? options[0] : options[1];

  const handleToggle = (option: { key: string; label: string }) => {
    navigate(`/${option.key}`);
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] scr">
      <div className="hidden h-screen lg:flex w-1/2 relative overflow-hidden">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Fmobile_landing.svg?alt=media&token=7dbd9a4e-619f-4717-b27a-e88a884b7e4e"
          className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-center"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex flex-col max-w-md px-6 py-10 gap-[30px]">
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Flogo.svg?alt=media&token=233ce12a-9ead-4ee3-b0bb-1f54877e80e0"
              alt="logo"
            />
          </div>
          <ToggleButton options={options} option={selected} onClick={handleToggle} />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
