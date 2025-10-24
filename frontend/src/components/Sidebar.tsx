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
} from "@/assets/icons";

const Sidebar = () => {
    const topMenu = [
        {
            route: "/dashboard",
            activeIcon: <DashboardActiveIcon />,
            inactiveIcon: <DashboardInactiveIcon/>,
            tooltip: "Dashboard"
        },
        {
            route: "/my-work",
            activeIcon: <WorkActiveIcon />,
            inactiveIcon: <WorkInactiveIcon/>,
            tooltip: "My Work"
        },
        {
            route: "/dashboard1",
            activeIcon: <MoneyActiveIcon />,
            inactiveIcon: <MoneyInactiveIcon/>,
            tooltip: ""
        },
        {
            route: "/dashboard2",
            activeIcon: <SettingsInactiveIcon />,
            inactiveIcon: <SettingsInactiveIcon/>,
            tooltip: ""
        }
    ];

    const bottomMenu = [
        {
            route: "/dashboard3",
            activeIcon: <FaqInactiveIcon />,
            inactiveIcon: <FaqInactiveIcon/>,
            tooltip: ""
        },
        {
            route: "/logout",
            activeIcon: <LogOutIcon />,
            inactiveIcon: <LogOutIcon/>,
            tooltip: "Log out"
        },
    ];

    return (
        <div className='flex flex-col justify-between w-[90px] h-[calc(100vh-200px)] fixed left-[40px]'>
            <Menu items={topMenu} />

            <Menu items={bottomMenu} />
        </div>
    )
}

export default Sidebar