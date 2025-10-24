import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

interface Props {
    items: {
        route: string,
        activeIcon: ReactNode,
        inactiveIcon: ReactNode,
        tooltip?: string
    }[],
}

const Menu = ({ items }: Props) => {
    const [activeRoute, setActiveRoute] = useState(items[0].route);
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        setActiveRoute(route);
        navigate(route)
    }

    return (
        <div className='flex flex-col items-center justify-between p-5 bg-[#F5F9FF] shadow-md rounded-[30px]'>
            <ul className='flex flex-col gap-5'>
                {items.map(item => (
                    <MenuItem route={item.route} key={item.route} onClick={handleClick} tooltip={item.tooltip}>
                        {item.route === activeRoute ? item.activeIcon : item.inactiveIcon}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}

export default Menu