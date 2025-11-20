import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Tooltip } from "@mui/material";

interface Props {
    items: {
        route: string,
        activeIcon: React.ElementType,
        inactiveIcon: React.ElementType,
        tooltip?: string
    }[],
}

const Menu = ({ items }: Props) => {

    return (
        <div className='flex flex-col items-center justify-between py-[30px] px-5 bg-white  rounded-[30px] shadow-[0_85px_24px_0_rgba(0,0,0,0),_0_54px_22px_0_rgba(0,0,0,0.01),_0_31px_18px_0_rgba(0,0,0,0.02),_0_14px_14px_0_rgba(0,0,0,0.04),_0_3px_7px_0_rgba(0,0,0,0.04)]'>
            <nav className='flex flex-col gap-10'>
                {items.map(({ tooltip, route, activeIcon: ActiveIcon, inactiveIcon: InactiveIcon }) => (
                    <Tooltip key={route} title={tooltip} arrow placement="right" slotProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: "var(--primitive-colors-brand-primary-925)",
                                fontSize: "14px",
                                color: "white"
                            }
                        }
                    }}>
                        <NavLink
                            key={route}
                            to={route}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center text-xs font-medium transition ${isActive
                                    ? 'text-[var(--primitive-colors-brand-primary-925)]'
                                    : 'text-[var(--primitive-colors-brand-primary-500-base)]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`
                                            flex items-center justify-center
                                            rounded-2xl
                                        `}
                                    >
                                        {isActive ?
                                            <ActiveIcon /> :
                                            <div className="group">
                                                <InactiveIcon className="block group-hover:hidden" />
                                                <ActiveIcon className="hidden group-hover:block" />
                                            </div>
                                        }
                                    </div>
                                </>
                            )}
                        </NavLink>
                    </Tooltip>
                ))}
            </nav>
        </div>
    )
}

export default Menu