import { Search } from 'lucide-react';
import Menu from './Menu';

const Sidebar = () => {
    const topMenu = [
        {
            route: "/dashboard",
            icon: <Search />
        },
        {
            route: "/my-work",
            icon: <Search />
        },
        {
            route: "/dashboard1",
            icon: <Search />
        },
        {
            route: "/dashboard2",
            icon: <Search />
        }
    ];

    const bottomMenu = [
        {
            route: "/dashboard3",
            icon: <Search />
        },
        {
            route: "/projects4",
            icon: <Search />
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