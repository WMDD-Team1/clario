import {
  DashboardActiveIcon,
  DashboardInactiveIcon,
  MoneyActiveIcon,
  MoneyInactiveIcon,
  SettingsActiveIcon,
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
    name: 'My Work',
    path: '/projects',
    activeIcon: WorkActiveIcon,
    inactiveIcon: WorkInactiveIcon,
  },
  {
    name: 'Money flow',
    path: '/transactions',
    activeIcon: MoneyActiveIcon,
    inactiveIcon: MoneyInactiveIcon,
  },
  {
    name: 'Settings',
    path: '/settings',
    activeIcon: SettingsActiveIcon,
    inactiveIcon: SettingsInactiveIcon,
  },
];

const Navbar = () => {
  return (
    <nav
      className="
        fixed bottom-[40px] right-[30px] left-[30px]
        bg-[var(--general-alpha)] border-t border-[var(--primitive-colors-gray-light-mode-200)]
        flex items-center justify-around
        py-[20px]
        md:hidden
        rounded-[30px] shadow-sm
        z-1000
      "
    >
      {menuItems.map(({ name, path, activeIcon: ActiveIcon, inactiveIcon: InactiveIcon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs font-medium transition ${
              isActive
                ? 'text-[var(--brand-subtext)]'
                : 'text-[var(--sub-text)] hover:text-[var(--brand-alpha)]'
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
