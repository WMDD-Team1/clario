import { Search } from 'lucide-react';
import Menu from './Menu';

const Sidebar = () => {
    const topMenu = [
        {
            route: "/dashboard",
            icon: <Search />
        },
        {
            route: "/projects",
            icon: <Search />
        },
        {
            route: "/dashboard",
            icon: <Search />
        },
        {
            route: "/dashboard",
            icon: <Search />
        }
    ];

    const bottomMenu = [
        {
            route: "/dashboard",
            icon: <Search />
        },
        {
            route: "/projects",
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