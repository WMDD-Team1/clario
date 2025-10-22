import { ReactNode } from "react"
import MenuItem from "./MenuItem"

interface Props {
    items: { route: string, icon: any }[]
}

const Menu = ({ items }: Props) => {
    return (
        <div className='flex flex-col items-center justify-between p-5 bg-[#F5F9FF] shadow-md rounded-[30px]'>
            <ul className='flex flex-col gap-5'>
                {items.map(item => (
                    <MenuItem route={item.route}>
                        {item.icon as ReactNode}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}

export default Menu