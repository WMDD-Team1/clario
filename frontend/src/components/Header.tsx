import { useState } from 'react'
import SearchBar from './SearchBar'
import UserPicture from './UserPicture'
import { useAppSelector } from '@/store/hooks';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data } = useAppSelector((state) => state.user);
    
    return (
        <div className='flex m-[40px] justify-between items-center'>
            <div className={`logo transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                }`}>
                <img src="/clario.svg" alt="Clario logo" />
            </div>
            <div className='flex items-center justify-between gap-[20px]'>
                <SearchBar isSearchOpen={isSearchOpen} onSearchOpen={setIsSearchOpen} />
                <div className={`transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                    }`}>
                    <UserPicture imgURL={data?.picture} />
                </div>
            </div>
        </div>
    )
}

export default Header