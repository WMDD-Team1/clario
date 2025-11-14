import {
  DashboardActiveIcon,
  DashboardInactiveIcon,
  FaqActiveIcon,
  FaqInactiveIcon,
  LogOutIcon,
  MoneyActiveIcon,
  MoneyInactiveIcon,
  SettingsActiveIcon,
  SettingsInactiveIcon,
  WorkActiveIcon,
  WorkInactiveIcon,
} from '@/assets/icons';
import Menu from './Menu';

const Sidebar = () => {
  const topMenu = [
    {
      route: '/dashboard',
      activeIcon: DashboardActiveIcon,
      inactiveIcon: DashboardInactiveIcon,
      tooltip: 'Dashboard',
    },
    {
      route: '/projects',
      activeIcon: WorkActiveIcon,
      inactiveIcon: WorkInactiveIcon,
      tooltip: 'My Work',
    },
    {
      route: '/transactions',
      activeIcon: MoneyActiveIcon,
      inactiveIcon: MoneyInactiveIcon,
      tooltip: 'Transactions',
    },
    {
      route: '/settings',
      activeIcon: SettingsActiveIcon,
      inactiveIcon: SettingsInactiveIcon,
      tooltip: 'Settings',
    },
  ];

  const bottomMenu = [
    {
      route: '/faq',
      activeIcon: FaqActiveIcon,
      inactiveIcon: FaqInactiveIcon,
      tooltip: 'Support & FAQ',
    },
    {
      route: '/logout',
      activeIcon: LogOutIcon,
      inactiveIcon: LogOutIcon,
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
