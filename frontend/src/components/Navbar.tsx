import {
  DashboardActiveIcon,
  DashboardInactiveIcon,
  MoneyActiveIcon,
  MoneyInactiveIcon,
  SettingsInactiveIcon,
  WorkActiveIcon,
  WorkInactiveIcon,
} from '@/assets/icons';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    activeIcon: DashboardActiveIcon,
    inactiveIcon: DashboardInactiveIcon,
  },
  {
    name: 'Money flow',
    path: '/transactions',
    activeIcon: MoneyActiveIcon,
    inactiveIcon: MoneyInactiveIcon,
  },
  {
    name: 'My Work',
    path: '/my-work',
    activeIcon: WorkActiveIcon,
    inactiveIcon: WorkInactiveIcon,
  },
  {
    name: 'Settings',
    path: '/settings',
    activeIcon: SettingsInactiveIcon, // only one version provided
    inactiveIcon: SettingsInactiveIcon,
  },
];

const Navbar = () => {
  return (
    <nav
      className="
        fixed bottom-[40px] left-0 mx-[30px] w-[90%]
        bg-white border-t border-gray-200
        flex items-center justify-around
        py-[20px]
        md:hidden
        rounded-[30px] shadow-sm
        z-50
      "
    >
      {menuItems.map(({ name, path, activeIcon: ActiveIcon, inactiveIcon: InactiveIcon }) => (
        <NavLink
          key={path}
          to={path}
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs font-medium transition ${
              isActive
                ? 'text-[var(--primitive-colors-brand-primary-925)]'
                : 'text-[var(--primitive-colors-brand-primary-500-base)] hover:text-blue-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`
                    flex items-center justify-center
                     rounded-2xl
                    ${isActive ? 'bg-blue-50' : ''}
                  `}
              >
                {isActive ? <ActiveIcon /> : <InactiveIcon />}
              </div>
              <span className="mt-1">{name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
