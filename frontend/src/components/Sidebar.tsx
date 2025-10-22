import { Search } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between w-[90px] h-[calc(100vh-200px)] fixed left-0'>
        <div className='flex flex-col items-center justify-between p-5 bg-[#F5F9FF] shadow-md'>
            <ul>
                <li>
                    <Search size={22} />
                </li>
                <li>
                    <Search size={22} />
                </li>
                <li>
                    <Search size={22} />
                </li>
                <li>
                    <Search size={22} />
                </li>
            </ul>
        </div>
        <div className='flex flex-col items-center justify-between p-5 bg-[#F5F9FF] shadow-md'>
            <ul>
                <li>
                    <Search size={22} />
                </li>
                <li>
                    <Search size={22} />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar