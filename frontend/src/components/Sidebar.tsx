import { Search } from 'lucide-react';
import Menu from './Menu';
import {
  DashboardActiveIcon,
  DashboardInactiveIcon,
  FaqInactiveIcon,
  LogOutIcon,
  MoneyActiveIcon,
  MoneyInactiveIcon,
  SettingsInactiveIcon,
  WorkActiveIcon,
  WorkInactiveIcon,
} from '@/assets/icons';

const Sidebar = () => {
  const topMenu = [
    {
      route: '/dashboard',
      activeIcon: <DashboardActiveIcon />,
      inactiveIcon: <DashboardInactiveIcon />,
      tooltip: 'Dashboard',
    },
    {
      route: '/my-work',
      activeIcon: <WorkActiveIcon />,
      inactiveIcon: <WorkInactiveIcon />,
      tooltip: 'My Work',
    },
    {
      route: '/transactions',
      activeIcon: <MoneyActiveIcon />,
      inactiveIcon: <MoneyInactiveIcon />,
      tooltip: 'Transactions',
    },
    {
      route: '/settings',
      activeIcon: <SettingsInactiveIcon />,
      inactiveIcon: <SettingsInactiveIcon />,
      tooltip: 'Settings',
    },
  ];

  const bottomMenu = [
    {
      route: '/faq',
      activeIcon: <FaqInactiveIcon />,
      inactiveIcon: <FaqInactiveIcon />,
      tooltip: 'Support & FAQ',
    },
    {
      route: '/logout',
      activeIcon: <LogOutIcon />,
      inactiveIcon: <LogOutIcon />,
      tooltip: 'Log out',
    },
  ];

  return (
    <div className="hidden md:flex flex-col justify-between w-[90px] h-[calc(100vh-200px)] fixed left-[40px]">
      <Menu items={topMenu} />

      <Menu items={bottomMenu} />
    </div>
  );
};

export default Sidebar;
